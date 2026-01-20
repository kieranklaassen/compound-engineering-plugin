# OpenCode Compatible Configs

This directory contains compound-engineering agent, command, and skill configurations ported for [OpenCode](https://opencode.ai) compatibility.

## Installation

Copy the contents to your OpenCode config directory:

```bash
# Copy agents
cp -r opencode/agents/* ~/.config/opencode/agent/compound-engineering/

# Copy commands
cp opencode/commands/* ~/.config/opencode/command/

# Copy skills
cp -r opencode/skills/* ~/.config/opencode/skill/
```

Or all at once:

```bash
cp -r opencode/agents/* ~/.config/opencode/agent/compound-engineering/ && \
cp opencode/commands/* ~/.config/opencode/command/ && \
cp -r opencode/skills/* ~/.config/opencode/skill/
```

## Differences from Claude Code

OpenCode uses a different schema for the `tools` field:

- **Claude Code**: Comma-separated string (e.g., `tools: Read, Edit, Bash`)
- **OpenCode**: Record/object format (e.g., `tools:\n  Bash: false`)

These ported configs use the OpenCode-compatible record format.

## Contents

### Agents (27)

| Category | Agent | Description |
|----------|-------|-------------|
| **Design** | design-implementation-reviewer | Verify UI implementation matches Figma designs |
| | design-iterator | Iterative design refinement with screenshots |
| | figma-design-sync | Sync implementation with Figma designs |
| **Docs** | ankane-readme-writer | Write READMEs following Ankane style |
| **Research** | best-practices-researcher | Research external best practices |
| | framework-docs-researcher | Gather framework documentation |
| | git-history-analyzer | Analyze git history and code evolution |
| | repo-research-analyst | Research repository structure and patterns |
| **Review** | agent-native-reviewer | Ensure features are agent-native |
| | architecture-strategist | Architectural code review |
| | code-simplicity-reviewer | Review code for simplicity |
| | data-integrity-guardian | Review database migrations |
| | data-migration-expert | Validate data migration PRs |
| | deployment-verification-agent | Pre/post deploy checklists |
| | dhh-rails-reviewer | Rails review in DHH style |
| | julik-frontend-races-reviewer | Review JS for race conditions |
| | kieran-python-reviewer | Python code review |
| | kieran-rails-reviewer | Rails code review |
| | kieran-typescript-reviewer | TypeScript code review |
| | pattern-recognition-specialist | Detect design patterns |
| | performance-oracle | Performance analysis |
| | security-sentinel | Security audits |
| **Workflow** | bug-reproduction-validator | Reproduce and validate bugs |
| | every-style-editor | Style guide compliance |
| | lint | Run linting checks |
| | pr-comment-resolver | Address PR comments |
| | spec-flow-analyzer | Analyze specs for user flows |

### Commands (23)

- `agent-native-audit` - Comprehensive agent-native architecture review
- `changelog` - Create changelogs for recent merges
- `create-agent-skill` - Create or edit Claude Code skills
- `deepen-plan` - Enhance plans with parallel research
- `deploy-docs` - Validate docs for GitHub Pages
- `feature-video` - Record feature walkthrough videos
- `generate_command` - Create new slash commands
- `heal-skill` - Fix incorrect SKILL.md files
- `lfg` - Full autonomous engineering workflow
- `plan_review` - Multi-agent plan review
- `release-docs` - Build documentation site
- `report-bug` - Report plugin bugs
- `reproduce-bug` - Reproduce bugs with logs/screenshots
- `resolve_parallel` - Resolve TODO comments in parallel
- `resolve_pr_parallel` - Resolve PR comments in parallel
- `resolve_todo_parallel` - Resolve CLI todos in parallel
- `test-browser` - Run browser tests on affected pages
- `triage` - Triage and categorize findings
- `xcode-test` - Build and test iOS apps
- `workflows-compound` - Document solved problems
- `workflows-plan` - Transform features into plans
- `workflows-review` - Multi-agent code reviews
- `workflows-work` - Execute work plans

### Skills (14)

- `agent-browser` - Browser automation via CLI
- `agent-native-architecture` - Build agent-first applications
- `andrew-kane-gem-writer` - Write Ruby gems in Ankane style
- `compound-docs` - Capture solved problems as docs
- `create-agent-skills` - Guide for creating skills
- `dhh-rails-style` - Ruby/Rails in DHH style
- `dspy-ruby` - DSPy.rb framework for LLM apps
- `every-style-editor` - Every's editorial standards
- `file-todos` - File-based todo tracking
- `frontend-design` - Production-grade frontend interfaces
- `gemini-imagegen` - Image generation with Gemini API
- `git-worktree` - Git worktree management
- `rclone` - Cloud storage management
- `skill-creator` - Guide for creating effective skills
