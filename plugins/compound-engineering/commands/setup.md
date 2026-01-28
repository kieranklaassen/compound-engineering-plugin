---
name: compound-engineering-setup
description: Configure compound-engineering plugin agents and preferences for your project
argument-hint: "[--global to configure globally]"
---

# Compound Engineering Setup

Configure which review agents and workflows to use for this project. Creates a `.claude/compound-engineering.json` configuration file.

## Step 0: Detect Existing Config & Custom Agents

<detection>

### Check for existing configuration:

```bash
# Check project config
test -f .claude/compound-engineering.json && echo "PROJECT_CONFIG_EXISTS"

# Check global config
test -f ~/.claude/compound-engineering.json && echo "GLOBAL_CONFIG_EXISTS"
```

### Scan for custom local agents:

```bash
# Project-level custom agents
ls .claude/agents/*.md 2>/dev/null | head -20

# Global custom agents
ls ~/.claude/agents/*.md 2>/dev/null | head -20

# Project-level custom skills (that might be reviewers)
ls .claude/skills/*/SKILL.md 2>/dev/null | head -20
```

**For each discovered agent/skill file:**
1. Read the file's YAML frontmatter or first few lines
2. Extract `name` and `description`
3. Check if name contains "review" or description mentions "code review"
4. Store as `customAgents[]` array for later

**Example discovered agents:**
```
Found 3 custom agents:
- my-team-reviewer (.claude/agents/my-team-reviewer.md) - "Team-specific Rails conventions"
- api-reviewer (.claude/agents/api-reviewer.md) - "REST API design review"
- test-coverage-checker (~/.claude/agents/test-coverage-checker.md) - "Verify test coverage"
```

</detection>

## Step 1: Determine Setup Mode (New vs Modify)

<setup_mode_check>

**If config already exists:**

```
AskUserQuestion:
  questions:
    - question: "Configuration found. What would you like to do?"
      header: "Setup"
      options:
        - label: "Modify existing config"
          description: "Add/remove agents from your current configuration"
        - label: "Start fresh"
          description: "Delete current config and set up from scratch"
        - label: "View current config"
          description: "Show what's currently configured"
```

**If "View current config":**
1. Read and display the current `.claude/compound-engineering.json`
2. Show which agents are configured for each category
3. Ask again what they want to do

**If "Modify existing config":** → Go to Step 2B (Modify Flow)

**If "Start fresh":** → Go to Step 2A (New Setup Flow)

**If no config exists:** → Go to Step 2A (New Setup Flow)

</setup_mode_check>

## Step 2A: New Setup Flow

<new_setup>

### Detect Project Type

```bash
# Check for common project indicators
ls Gemfile package.json requirements.txt pyproject.toml Cargo.toml go.mod 2>/dev/null
test -f config/routes.rb && echo "RAILS"
test -f tsconfig.json && echo "TYPESCRIPT"
```

**Detection Rules:**
- `Gemfile` + `config/routes.rb` → **Rails**
- `Gemfile` without Rails → **Ruby**
- `package.json` + `tsconfig.json` → **TypeScript**
- `package.json` without TypeScript → **JavaScript**
- `requirements.txt` OR `pyproject.toml` → **Python**
- `Cargo.toml` → **Rust**
- `go.mod` → **Go**
- None → **General**

### Choose Setup Mode

```
AskUserQuestion:
  questions:
    - question: "How would you like to configure review agents?"
      header: "Setup mode"
      options:
        - label: "Quick Setup (Recommended)"
          description: "Smart defaults for {detected_type} + any custom agents found"
        - label: "Advanced Setup"
          description: "Manually select each agent including custom ones"
        - label: "Minimal Setup"
          description: "Only essential agents (security + simplicity)"
```

### Quick Setup - Apply Defaults + Custom Agents

**For detected project type, use these defaults:**

| Project Type | Review Agents | Plan Review Agents |
|--------------|---------------|-------------------|
| Rails | kieran-rails-reviewer, dhh-rails-reviewer, code-simplicity-reviewer, security-sentinel, performance-oracle | kieran-rails-reviewer, code-simplicity-reviewer |
| Python | kieran-python-reviewer, code-simplicity-reviewer, security-sentinel, performance-oracle | kieran-python-reviewer, code-simplicity-reviewer |
| TypeScript | kieran-typescript-reviewer, code-simplicity-reviewer, security-sentinel, performance-oracle | kieran-typescript-reviewer, code-simplicity-reviewer |
| General | code-simplicity-reviewer, security-sentinel, performance-oracle | code-simplicity-reviewer |

**If custom agents were discovered:**

```
AskUserQuestion:
  questions:
    - question: "Found {N} custom agents. Add them to your review configuration?"
      header: "Custom agents"
      multiSelect: true
      options:
        - label: "{custom_agent_1_name}"
          description: "{custom_agent_1_description}"
        - label: "{custom_agent_2_name}"
          description: "{custom_agent_2_description}"
        - label: "Skip - don't add custom agents"
          description: "Only use built-in agents"
```

Add selected custom agents to `reviewAgents` array.

### Advanced Setup - Manual Selection

**Question 1: Built-in Review Agents**

```
AskUserQuestion:
  questions:
    - question: "Which built-in review agents should run on every PR?"
      header: "Built-in agents"
      multiSelect: true
      options:
        - label: "kieran-rails-reviewer"
          description: "Rails conventions, naming, clarity"
        - label: "kieran-typescript-reviewer"
          description: "TypeScript best practices, type safety"
        - label: "kieran-python-reviewer"
          description: "Python patterns, typing, best practices"
        - label: "dhh-rails-reviewer"
          description: "Opinionated Rails style"
```

**Question 2: Custom Agents (if any discovered)**

```
AskUserQuestion:
  questions:
    - question: "Which of your custom agents should run on every PR?"
      header: "Your agents"
      multiSelect: true
      options:
        - label: "{custom_agent_1_name}"
          description: "{custom_agent_1_description} ({path})"
        - label: "{custom_agent_2_name}"
          description: "{custom_agent_2_description} ({path})"
```

**Question 3: Quality & Security**

```
AskUserQuestion:
  questions:
    - question: "Which quality and security agents should run?"
      header: "Quality"
      multiSelect: true
      options:
        - label: "code-simplicity-reviewer (Recommended)"
          description: "Ensures code is as simple as possible"
        - label: "security-sentinel (Recommended)"
          description: "Security vulnerabilities and OWASP compliance"
        - label: "performance-oracle"
          description: "Performance issues and optimization"
        - label: "agent-native-reviewer"
          description: "Verify features are AI-accessible"
```

**Question 4: Conditional Agents**

```
AskUserQuestion:
  questions:
    - question: "Enable smart agents that run based on what files changed?"
      header: "Conditional"
      multiSelect: true
      options:
        - label: "Migration agents (Recommended)"
          description: "data-migration-expert for DB changes"
        - label: "Frontend agents"
          description: "julik-frontend-races-reviewer for JS/TS"
        - label: "Architecture agents"
          description: "architecture-strategist for structural changes"
        - label: "Data agents"
          description: "data-integrity-guardian for model changes"
```

</new_setup>

## Step 2B: Modify Existing Config

<modify_config>

Read current configuration and present current state:

```markdown
## Current Configuration

**Project Type:** {type}

**Review Agents ({count}):**
- ✓ kieran-rails-reviewer
- ✓ code-simplicity-reviewer
- ✓ security-sentinel
- ✓ my-custom-reviewer (custom)

**Plan Review Agents ({count}):**
- ✓ kieran-rails-reviewer
- ✓ code-simplicity-reviewer

**Conditional Agents:**
- Migrations: data-migration-expert, deployment-verification-agent
- Frontend: julik-frontend-races-reviewer
- Architecture: (none)
- Data: (none)
```

```
AskUserQuestion:
  questions:
    - question: "What would you like to modify?"
      header: "Modify"
      options:
        - label: "Add agents"
          description: "Add more agents to your configuration"
        - label: "Remove agents"
          description: "Remove agents you don't want"
        - label: "Change conditional agents"
          description: "Modify which agents run for specific file types"
        - label: "Done"
          description: "Save and exit"
```

### Add Agents Flow

Show agents NOT currently in config:

```
AskUserQuestion:
  questions:
    - question: "Select agents to ADD to your configuration:"
      header: "Add agents"
      multiSelect: true
      options:
        - label: "dhh-rails-reviewer"
          description: "Opinionated Rails style (not currently enabled)"
        - label: "performance-oracle"
          description: "Performance issues (not currently enabled)"
        - label: "{new_custom_agent}"
          description: "Your custom agent (discovered in .claude/agents/)"
```

### Remove Agents Flow

Show agents currently IN config:

```
AskUserQuestion:
  questions:
    - question: "Select agents to REMOVE from your configuration:"
      header: "Remove agents"
      multiSelect: true
      options:
        - label: "kieran-rails-reviewer"
          description: "Currently enabled - will be removed"
        - label: "security-sentinel"
          description: "Currently enabled - will be removed"
```

After each modification, loop back to "What would you like to modify?" until user selects "Done".

</modify_config>

## Step 3: Write Configuration

<write_config>

**Determine target path:**
- If `--global`: `~/.claude/compound-engineering.json`
- Otherwise: `.claude/compound-engineering.json`

**Create directory if needed:**
```bash
mkdir -p .claude  # or ~/.claude for global
```

**Write JSON configuration:**

```json
{
  "version": "1.0",
  "projectType": "{detected_type}",
  "reviewAgents": [
    "kieran-rails-reviewer",
    "code-simplicity-reviewer",
    "security-sentinel",
    "my-custom-reviewer"
  ],
  "planReviewAgents": [
    "kieran-rails-reviewer",
    "code-simplicity-reviewer"
  ],
  "customAgents": {
    "my-custom-reviewer": ".claude/agents/my-custom-reviewer.md",
    "api-reviewer": "~/.claude/agents/api-reviewer.md"
  },
  "conditionalAgents": {
    "migrations": ["data-migration-expert", "deployment-verification-agent"],
    "frontend": ["julik-frontend-races-reviewer"],
    "architecture": ["architecture-strategist", "pattern-recognition-specialist"],
    "data": ["data-integrity-guardian"]
  },
  "options": {
    "agentNative": true,
    "parallelReviews": true
  }
}
```

**Note:** The `customAgents` object maps custom agent names to their file paths, so workflows know where to find them.

</write_config>

## Step 4: Summary

<summary>

```markdown
## Configuration Complete!

**Saved to:** `.claude/compound-engineering.json`
**Project Type:** Rails

### Review Agents (run on every PR)
**Built-in:**
- kieran-rails-reviewer
- code-simplicity-reviewer
- security-sentinel

**Custom:**
- my-custom-reviewer (.claude/agents/)

### Plan Review Agents
- kieran-rails-reviewer
- code-simplicity-reviewer

### Conditional Agents (run when relevant files change)
| Trigger | Agents |
|---------|--------|
| DB Migrations | data-migration-expert, deployment-verification-agent |
| Frontend (JS/TS) | julik-frontend-races-reviewer |
| Architecture | architecture-strategist |
| Data/Models | data-integrity-guardian |

---

**What's next:**
1. Run `/workflows:review` to test your configuration
2. Run `/compound-engineering-setup` to modify settings anytime
3. Commit `.claude/compound-engineering.json` to share with your team

**Add more custom agents:**
Create `.claude/agents/my-agent.md` with your custom review logic,
then re-run `/compound-engineering-setup` to add it to your config.
```

</summary>

## Creating Custom Agents

<custom_agents_guide>

To create your own review agent that gets auto-discovered:

### 1. Create the agent file

**Project-level:** `.claude/agents/my-reviewer.md`
**Global:** `~/.claude/agents/my-reviewer.md`

### 2. Use this template:

```markdown
---
name: my-team-reviewer
description: Reviews code for our team's specific conventions
---

# My Team Reviewer

You are a code reviewer specializing in our team's conventions.

## Review Checklist

- [ ] Check naming conventions match our style guide
- [ ] Verify error handling follows our patterns
- [ ] Ensure logging is consistent
- [ ] Check for proper documentation

## When reviewing, focus on:

1. **Naming**: We use snake_case for methods, PascalCase for classes
2. **Errors**: All errors should be logged with context
3. **Tests**: Every public method needs a test

## Output format

Provide findings as a bulleted list with file:line references.
```

### 3. Re-run setup

```bash
/compound-engineering-setup
```

Your agent will be discovered and offered as an option!

</custom_agents_guide>

## Available Built-in Agents

<available_agents>

**Code Review (language-specific):**
- `kieran-rails-reviewer` - Rails conventions and best practices
- `kieran-python-reviewer` - Python patterns and typing
- `kieran-typescript-reviewer` - TypeScript type safety
- `dhh-rails-reviewer` - Opinionated Rails style

**Quality & Security:**
- `code-simplicity-reviewer` - Code simplicity and YAGNI
- `security-sentinel` - Security vulnerabilities
- `performance-oracle` - Performance optimization
- `architecture-strategist` - Architectural patterns
- `pattern-recognition-specialist` - Code patterns and anti-patterns
- `agent-native-reviewer` - AI accessibility verification

**Specialized (conditional):**
- `data-migration-expert` - Database migration safety
- `deployment-verification-agent` - Deployment checklists
- `data-integrity-guardian` - Data model integrity
- `julik-frontend-races-reviewer` - JavaScript race conditions

</available_agents>
