# Compounding Engineering Lite

A lightweight, language-agnostic plugin for code review with continuous learning. Drop it into any project with existing workflows to add AI-powered reviews that get smarter over time.

## Philosophy

**Each unit of engineering work should make subsequent units easier—not harder.**

Unlike one-off code reviews, this plugin creates a feedback loop:

```
Review → Identify Patterns → Document → Future Reviews Improve
   ↑                                            ↓
   └────────────────────────────────────────────┘
```

## What's Included

- **6 Specialized Agents** - Focused review perspectives
- **2 Commands** - `/review` and `/compound`
- **1 Skill** - Practices management

## Installation

```bash
# Add the marketplace (if not already added)
claude /plugin marketplace add https://github.com/itlackey/compounding-engineering-plugin

# Install the lite plugin
claude /plugin install compounding-engineering-lite
```

## Quick Start

### Run Your First Review

```bash
# Review current changes
/review

# Review a specific PR
/review 123

# Review a branch
/review feature/my-branch
```

The review will:
1. Check `.claude/practices/index.md` for existing project knowledge
2. Run 6 specialized agents in parallel
3. Synthesize findings by severity
4. Identify new patterns and lessons
5. Update the practices directory

### Document a Lesson

After solving a problem or gaining an insight:

```bash
/compound
```

This captures the lesson in `.claude/practices/` for future reference.

## The Practices Directory

The plugin creates and maintains a `.claude/practices/` directory in your project:

```
.claude/practices/
├── index.md              # Quick-reference index (read before every review)
├── patterns/             # Effective patterns to follow
├── anti-patterns/        # Mistakes to avoid
├── lessons/              # Chronological insights
└── conventions/          # Project-specific rules
```

### How It Works

1. **Before Review**: The `/review` command reads `index.md` to load existing knowledge
2. **During Review**: Agents check code against documented patterns and anti-patterns
3. **After Review**: New learnings are added to the practices directory
4. **Over Time**: Reviews become more effective as practices compound

## Agents

### Review Agents

| Agent | Purpose |
|-------|---------|
| **practices-reviewer** | Reviews with practice context, identifies new lessons to document |
| **architecture-strategist** | Analyzes architectural decisions and component boundaries |
| **code-simplicity-reviewer** | Ensures YAGNI adherence and minimal complexity |
| **pattern-recognition-specialist** | Detects design patterns, anti-patterns, and duplication |
| **performance-oracle** | Identifies performance issues and scalability concerns |
| **security-sentinel** | Scans for vulnerabilities and OWASP compliance |

## Commands

### `/review`

Comprehensive code review with practices integration.

```bash
/review                    # Review current changes
/review 123                # Review PR #123
/review feature/branch     # Review a branch
/review src/file.ts        # Review specific file
```

**Output includes:**
- Findings categorized by severity (P1/P2/P3)
- Patterns applied from existing practices
- New lessons identified
- Practices updates made

### `/compound`

Document a lesson learned.

```bash
/compound                              # Document recent lesson
/compound "found a cleaner auth pattern"  # With context hint
```

**Creates:**
- Pattern, anti-pattern, or lesson document
- Updates to `index.md`

## Skill

### `practices`

Manage the `.claude/practices/` directory.

```bash
skill: practices
```

Provides templates and operations for:
- Initializing the practices directory
- Adding patterns, anti-patterns, and lessons
- Searching existing practices
- Maintaining the index

## Why "Lite"?

This is a condensed version of the full [compounding-engineering](../compounding-engineering/) plugin:

| Feature | Lite | Full |
|---------|------|------|
| Language-specific agents | - | Rails, Python, TypeScript |
| Framework reviewers | - | DHH-style, Kieran-style |
| MCP servers | - | Playwright, Context7 |
| Workflow commands | 2 | 16 |
| Specialized skills | 1 | 11 |
| **Focus** | Universal practices | Full-stack Rails |

**Use Lite when:**
- You have an existing workflow you want to enhance
- You work with multiple languages/frameworks
- You want minimal setup
- You value continuous learning

**Use Full when:**
- You're building Rails applications
- You want comprehensive workflow automation
- You need specialized reviewers for specific frameworks

## Workflow Integration

The lite plugin is designed to complement existing workflows:

```bash
# Your existing workflow
git checkout -b feature/new-thing
# ... make changes ...
git commit -m "Add new feature"

# Add the lite review step
/review

# Address findings, then document any lessons
/compound

# Continue your workflow
git push
gh pr create
```

## Sharing Practices with Your Team

Commit the practices directory to share knowledge:

```bash
git add .claude/practices/
git commit -m "docs: update practices from code review"
git push
```

New team members benefit from documented patterns and lessons immediately.

## Example Practices Index

After a few reviews, your `index.md` might look like:

```markdown
# Project Practices

> Last updated: 2024-11-29

## Patterns to Use

| Pattern | Description |
|---------|-------------|
| Early validation | Validate inputs at system boundaries |
| Explicit error handling | Always handle errors explicitly, never silently |

## Patterns to Avoid

| Anti-Pattern | Why |
|--------------|-----|
| N+1 queries | Causes performance degradation at scale |
| Hardcoded secrets | Security vulnerability |

## Recent Lessons

### 2024-11-29
- Race condition in cache invalidation fixed by using atomic operations

### 2024-11-28
- API rate limiting needed after production incident
```

## License

MIT

## Contributing

Contributions welcome! Please read the main repository's contribution guidelines.
