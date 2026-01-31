# Bundle-Based Configure: compound-engineering-plugin

## Problem Statement

The current `/compound:configure` command asks 5 high-level questions that don't map well to the actual component structure. As upstream adds more components (now 29 agents, 25 commands, 16 skills), the configuration becomes increasingly imprecise.

**Issues with current approach:**
- Questions are too coarse ("Do you use Figma?")
- No awareness of component dependencies (e.g., `/workflows:review` spawns specific agents)
- Hard to maintain as upstream adds components
- Doesn't reflect how developers actually think about their workflow

**Goal:** Replace the 5-question approach with a bundle-based system that:
1. Groups related components logically
2. Respects dependencies between bundles
3. Scales as upstream adds components
4. Matches developer mental models (workflow-based, not feature-based)

---

## Bundle Definition

### Always-On Bundles

| Bundle | Components |
|--------|------------|
| **core** | workflows/plan, review, work, compound, brainstorm + repo-research-analyst, learnings-researcher + compound-docs, brainstorming, git-worktree |
| **code-review** | architecture-strategist, code-simplicity-reviewer, pattern-recognition-specialist, performance-oracle, security-sentinel |
| **research** | best-practices-researcher, framework-docs-researcher, git-history-analyzer, spec-flow-analyzer + deepen-plan, plan_review |
| **pr-workflow** | pr-comment-resolver + resolve_parallel, resolve_pr_parallel, resolve_todo_parallel, triage, changelog |
| **fork-tools** | sync-reviewer + sync-upstream + configure |

### Ask Bundles (User Choice)

| Bundle | Components |
|--------|------------|
| **ruby-rails** | kieran-rails-reviewer, dhh-rails-reviewer, lint, julik-frontend-races-reviewer + dhh-rails-style |
| **ruby-gems** | ankane-readme-writer + andrew-kane-gem-writer |
| **python** | kieran-python-reviewer |
| **typescript** | kieran-typescript-reviewer |
| **data-migrations** | data-integrity-guardian, data-migration-expert, deployment-verification-agent |
| **browser-automation** | bug-reproduction-validator + agent-browser + test-browser, reproduce-bug |
| **frontend-design** | design-iterator + frontend-design *(depends on browser-automation)* |
| **utilities** | gemini-imagegen, rclone, file-todos, dspy-ruby + feature-video, lfg |

### Off-by-Default Bundles

| Bundle | Components |
|--------|------------|
| **figma** | figma-design-sync, design-implementation-reviewer *(depends on browser-automation)* |
| **agent-native-dev** | agent-native-reviewer + agent-native-architecture + agent-native-audit |
| **plugin-dev** | skill-creator, create-agent-skills + create-agent-skill, generate_command, heal-skill, deploy-docs, release-docs, report-bug |
| **every-style** | every-style-editor agent + skill |
| **ios-xcode** | xcode-test |

---

## Dependency Graph

```
frontend-design ──┐
                  ├──► browser-automation
figma ────────────┘
```

**Resolution rule:** If a bundle is enabled and its dependency is not, auto-enable the dependency and log it.

---

## Config File Format

### User Config: `~/.claude/compound-engineering.config.json`

```json
{
  "version": "2.0",
  "bundles": {
    "ruby-rails": true,
    "ruby-gems": false,
    "python": false,
    "typescript": true,
    "data-migrations": true,
    "browser-automation": true,
    "frontend-design": true,
    "figma": false,
    "agent-native-dev": false,
    "plugin-dev": false,
    "every-style": false,
    "ios-xcode": false,
    "utilities": false
  }
}
```

### Bundle Definitions: `plugins/compound-engineering/bundles.json`

```json
{
  "version": "1.0",
  "bundles": {
    "core": {
      "always_on": true,
      "agents": ["repo-research-analyst", "learnings-researcher"],
      "commands": ["workflows/plan", "workflows/review", "workflows/work", "workflows/compound", "workflows/brainstorm"],
      "skills": ["compound-docs", "brainstorming", "git-worktree"]
    },
    "ruby-rails": {
      "default": "ask",
      "question": "Do you work with Ruby/Rails?",
      "agents": ["kieran-rails-reviewer", "dhh-rails-reviewer", "lint", "julik-frontend-races-reviewer"],
      "skills": ["dhh-rails-style"]
    },
    "frontend-design": {
      "default": "ask",
      "question": "Want frontend design iteration tools?",
      "depends_on": ["browser-automation"],
      "agents": ["design-iterator"],
      "skills": ["frontend-design"]
    }
    // ... etc
  }
}
```

---

## Implementation Plan

### Phase 1: Bundle Definition File

**File:** `plugins/compound-engineering/bundles.json`

1. Create JSON schema for bundle definitions
2. Define all 18 bundles with their components
3. Mark dependencies, defaults, and questions

**Deliverables:**
- `bundles.json` - Complete bundle definitions
- `bundles.schema.json` - JSON schema for validation

---

### Phase 2: Update `bin/build` Script

**File:** `plugins/compound-engineering/bin/build`

Current behavior:
- Reads `compound.config.json` with `agents.enabled/disabled`, `commands.enabled/disabled`, etc.

New behavior:
1. Read `bundles.json` for bundle definitions
2. Read user config for bundle selections
3. Resolve dependencies (auto-enable if needed)
4. Flatten bundles to component lists
5. Copy enabled components from `_source/` to output dirs

**Changes:**
- Add `resolve_dependencies()` function
- Add `flatten_bundles()` function
- Update copy logic to work with resolved component list
- Log dependency resolutions

---

### Phase 3: Update `/compound:configure` Command

**File:** `plugins/compound-engineering/commands/configure.md`

New flow:
1. Find installed plugin path (same as before)
2. Load `bundles.json` to get questions
3. Ask bundle questions using AskUserQuestion:
   - Language bundles (Ruby/Rails, Ruby Gems, Python, TypeScript)
   - Workflow bundles (Data & Migrations, Browser Automation)
   - Design bundles (Frontend Design, Figma) - skip if Browser = no
   - Niche bundles (Agent-Native, Plugin Dev, Every.to, iOS)
   - Utilities (last)
4. Build config object with bundle selections
5. Save to `~/.claude/compound-engineering.config.json`
6. Run `bin/build`
7. Show summary with dependency resolutions

**Question optimization:**
- Skip Frontend Design and Figma questions if Browser Automation = no
- Group niche bundles into one multi-select question
- Total: ~8-10 questions max

---

### Phase 4: Migration

**For existing users with old config format:**

1. Detect old format (has `agents.enabled/disabled` structure)
2. Map old selections to new bundles as best as possible
3. Write new format
4. Log migration

**Migration mapping:**
```
Old: agents.disabled includes "kieran-python-reviewer"
New: bundles.python = false

Old: skills.disabled includes "gemini-imagegen"
New: bundles.utilities = false (or partial)
```

---

## File Changes Summary

| File | Action |
|------|--------|
| `bundles.json` | Create - bundle definitions |
| `bundles.schema.json` | Create - JSON schema |
| `bin/build` | Update - bundle resolution logic |
| `commands/configure.md` | Rewrite - new question flow |
| `compound.config.json` | Update format - bundles instead of components |
| `compound.config.schema.json` | Update - new schema |

---

## Question Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. "Do you work with Ruby/Rails?"                    [Y/N] │
├─────────────────────────────────────────────────────────────┤
│ 2. "Do you write Ruby gems?"                         [Y/N] │
├─────────────────────────────────────────────────────────────┤
│ 3. "Do you work with Python?"                        [Y/N] │
├─────────────────────────────────────────────────────────────┤
│ 4. "Do you work with TypeScript?"                    [Y/N] │
├─────────────────────────────────────────────────────────────┤
│ 5. "Do you work with database migrations?"           [Y/N] │
├─────────────────────────────────────────────────────────────┤
│ 6. "Need browser automation/testing?"                [Y/N] │
├─────────────────────────────────────────────────────────────┤
│    If YES to #6:                                            │
│ 7. "Want frontend design iteration tools?"           [Y/N] │
│ 8. "Do you use Figma?"                               [Y/N] │
├─────────────────────────────────────────────────────────────┤
│ 9. "Enable any specialist tools?" [Multi-select]           │
│    □ Agent-Native Development (building AI apps)           │
│    □ Plugin Development (building Claude Code plugins)     │
│    □ Every.to Style (content writing)                      │
│    □ iOS/Xcode Development                                 │
├─────────────────────────────────────────────────────────────┤
│ 10. "Enable utilities?" [Multi-select]                     │
│     □ Image Generation (Gemini)                            │
│     □ Cloud Storage (rclone)                               │
│     □ File TODOs                                           │
│     □ DSPy Ruby                                            │
│     □ Feature Videos                                       │
│     □ LFG (autonomous workflow)                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Success Criteria

1. **User can configure in <2 minutes** with 8-10 clear questions
2. **Dependencies are auto-resolved** with clear logging
3. **Scales with upstream changes** - just add components to bundles.json
4. **Migration works** for existing users with old config format
5. **Build output shows** exactly what was enabled and why

---

## Open Questions

1. Should we support individual component overrides on top of bundles?
   - e.g., "Enable ruby-rails bundle but disable lint agent"
   - Adds complexity, probably not needed for v1

2. Should multi-select questions use AskUserQuestion's multiSelect feature?
   - Yes, cleaner UX for niche/utilities bundles

3. Should we show component counts per bundle during questions?
   - e.g., "Ruby/Rails (5 agents, 1 skill)"
   - Helps users understand impact
