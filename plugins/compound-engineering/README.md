# Compounding Engineering Plugin

AI-powered development tools that get smarter with every use. Make each unit of engineering work easier than the last.

## Components

| Component | Count |
|-----------|-------|
| Agents | 27 |
| Commands | 19 |
| Skills | 13 |
| MCP Servers | 3 |

## Agents

Agents are organized into categories for easier discovery.

### Review (14)

| Agent | Description |
|-------|-------------|
| `agent-native-reviewer` | Verify features are agent-native (action + context parity) |
| `architecture-strategist` | Analyze architectural decisions and compliance |
| `code-simplicity-reviewer` | Final pass for simplicity and minimalism |
| `data-integrity-guardian` | Database migrations and data integrity |
| `data-migration-expert` | Validate ID mappings match production, check for swapped values |
| `deployment-verification-agent` | Create Go/No-Go deployment checklists for risky data changes |
| `dhh-rails-reviewer` | Rails review from DHH's perspective |
| `kieran-rails-reviewer` | Rails code review with strict conventions |
| `kieran-python-reviewer` | Python code review with strict conventions |
| `kieran-typescript-reviewer` | TypeScript code review with strict conventions |
| `pattern-recognition-specialist` | Analyze code for patterns and anti-patterns |
| `performance-oracle` | Performance analysis and optimization |
| `security-sentinel` | Security audits and vulnerability assessments |
| `julik-frontend-races-reviewer` | Review JavaScript/Stimulus code for race conditions |

### Research (4)

| Agent | Description |
|-------|-------------|
| `best-practices-researcher` | Gather external best practices and examples |
| `framework-docs-researcher` | Research framework documentation and best practices |
| `git-history-analyzer` | Analyze git history and code evolution |
| `repo-research-analyst` | Research repository structure and conventions |

### Design (3)

| Agent | Description |
|-------|-------------|
| `design-implementation-reviewer` | Verify UI implementations match Figma designs |
| `design-iterator` | Iteratively refine UI through systematic design iterations |
| `figma-design-sync` | Synchronize web implementations with Figma designs |

### Workflow (5)

| Agent | Description |
|-------|-------------|
| `bug-reproduction-validator` | Systematically reproduce and validate bug reports |
| `every-style-editor` | Edit content to conform to Every's style guide |
| `lint` | Run linting and code quality checks on Ruby and ERB files |
| `pr-comment-resolver` | Address PR comments and implement fixes |
| `spec-flow-analyzer` | Analyze user flows and identify gaps in specifications |

### Docs (1)

| Agent | Description |
|-------|-------------|
| `ankane-readme-writer` | Create READMEs following Ankane-style template for Ruby gems |

## Commands

### Workflow Commands

Core workflow commands use `workflows:` prefix to avoid collisions with built-in commands:

| Command | Description |
|---------|-------------|
| `/workflows:plan` | Create implementation plans |
| `/workflows:review` | Run comprehensive code reviews |
| `/workflows:work` | Execute work items systematically |
| `/workflows:compound` | Document solved problems to compound team knowledge |

### Utility Commands

| Command | Description |
|---------|-------------|
| `/changelog` | Create engaging changelogs for recent merges |
| `/create-agent-skill` | Create or edit Claude Code skills |
| `/generate_command` | Generate new slash commands |
| `/heal-skill` | Fix skill documentation issues |
| `/plan_review` | Multi-agent plan review in parallel |
| `/report-bug` | Report a bug in the plugin |
| `/reproduce-bug` | Reproduce bugs using logs and console |
| `/resolve_parallel` | Resolve TODO comments in parallel |
| `/resolve_pr_parallel` | Resolve PR comments in parallel |
| `/resolve_todo_parallel` | Resolve todos in parallel |
| `/triage` | Triage and prioritize issues |
| `/playwright-test` | Run browser tests on PR-affected pages |
| `/xcode-test` | Build and test iOS apps on simulator |

## Skills

### Architecture & Design

| Skill | Description |
|-------|-------------|
| `agent-native-architecture` | Build AI agents using prompt-native architecture |

### Development Tools

| Skill | Description |
|-------|-------------|
| `andrew-kane-gem-writer` | Write Ruby gems following Andrew Kane's patterns |
| `compound-docs` | Capture solved problems as categorized documentation |
| `create-agent-skills` | Expert guidance for creating Claude Code skills |
| `dhh-ruby-style` | Write Ruby/Rails code in DHH's 37signals style |
| `dspy-ruby` | Build type-safe LLM applications with DSPy.rb |
| `frontend-design` | Create production-grade frontend interfaces |
| `skill-creator` | Guide for creating effective Claude Code skills |

### Content & Workflow

| Skill | Description |
|-------|-------------|
| `every-style-editor` | Review copy for Every's style guide compliance |
| `file-todos` | File-based todo tracking system |
| `git-worktree` | Manage Git worktrees for parallel development |

### Image Generation

| Skill | Description |
|-------|-------------|
| `gemini-imagegen` | Generate and edit images using Google's Gemini API |

**gemini-imagegen features:**
- Text-to-image generation
- Image editing and manipulation
- Multi-turn refinement
- Multiple reference image composition (up to 14 images)

**Requirements:**
- `GEMINI_API_KEY` environment variable
- Python packages: `google-genai`, `pillow`

## MCP Servers

| Server | Description |
|--------|-------------|
| `playwright` | Browser automation via `@playwright/mcp` |
| `context7` | Framework documentation lookup via Context7 |
| `linear` | Official Linear MCP server for project management |

### Playwright

**Tools provided:**
- `browser_navigate` - Navigate to URLs
- `browser_take_screenshot` - Take screenshots
- `browser_click` - Click elements
- `browser_fill_form` - Fill form fields
- `browser_snapshot` - Get accessibility snapshot
- `browser_evaluate` - Execute JavaScript

### Context7

**Tools provided:**
- `resolve-library-id` - Find library ID for a framework/package
- `get-library-docs` - Get documentation for a specific library

Supports 100+ frameworks including Rails, React, Next.js, Vue, Django, Laravel, and more.

### Linear

**Tools provided:**
- Finding, creating, and updating Linear issues
- Managing projects and teams
- Creating comments and updates
- OAuth authenticated via browser flow

**Setup:**
Run `/mcp` once to authenticate via browser OAuth flow. Credentials are stored in `~/.mcp-auth`.

**Integration:**
- `/workflows:plan` creates Linear issues
- `/workflows:work` includes issue IDs in branches and commits
- `/report-bug` creates Linear issues for bug reports

**Linear Magic Links (Auto-Linking):**

Linear automatically creates bidirectional links between issues, commits, PRs, and branches:

| Source | Pattern | Result |
|--------|---------|--------|
| **Branch name** | `feat/ENG-123-description` | Auto-links branch → issue |
| **Commit message** | `feat(ENG-123): description`<br>`Closes ENG-123` | Auto-links commit → issue<br>Marks issue done when merged |
| **PR description** | `Closes ENG-123`<br>`Fixes ENG-123`<br>`Resolves ENG-123` | Auto-links PR → issue<br>Closes issue when PR merged |
| **Issue description** | GitHub PR URL | Shows rich PR preview |
| **Issue description** | Other issue IDs (e.g., `ENG-456`) | Auto-links between issues |
| **Issue comments** | GitHub PR/commit URLs | Auto-links with previews |

**Supported Keywords:** `Closes`, `Fixes`, `Resolves` (case-insensitive, can reference multiple issues)

**Example Workflow:**
1. Create issue: `ENG-123`
2. Create branch: `feat/ENG-123-add-auth` (auto-linked)
3. Commit: `feat(ENG-123): implement login` + `Closes ENG-123` (auto-linked)
4. Create PR with `Closes ENG-123` in body (auto-linked)
5. Merge PR → Linear automatically marks `ENG-123` as Done ✅

MCP servers start automatically when the plugin is enabled.

## Installation

```bash
claude /plugin install compound-engineering
```

## Known Issues

### MCP Servers Not Auto-Loading

**Issue:** The bundled MCP servers (Playwright, Context7, and Linear) may not load automatically when the plugin is installed.

**Workaround:** Manually add them to your project's `.claude/settings.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"],
      "env": {}
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    },
    "linear": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.linear.app/mcp"]
    }
  }
}
```

Or add them globally in `~/.claude/settings.json` for all projects.

**Linear Setup:** After adding, run `/mcp` to authenticate via browser OAuth.

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## License

MIT
