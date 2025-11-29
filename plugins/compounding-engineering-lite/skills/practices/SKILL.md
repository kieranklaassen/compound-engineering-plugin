---
name: practices
description: Manage project practices in .claude/practices/ for continuous learning and improvement
allowed-tools:
  - Read    # Read existing practices
  - Write   # Create/update practice documents
  - Bash    # Create directories, list files
  - Grep    # Search existing practices
---

# Practices Skill

**Purpose:** Manage the `.claude/practices/` directory to build searchable institutional knowledge through continuous code review learning.

## Overview

This skill maintains a structured practices directory that captures:
- **Patterns**: Effective approaches to repeat
- **Anti-Patterns**: Mistakes to avoid
- **Lessons**: Insights from experience
- **Conventions**: Project-specific rules

The practices directory serves as a living knowledge base that grows smarter with every code review.

---

## Directory Structure

```
.claude/practices/
├── index.md              # Main index with quick-reference lists
├── patterns/             # Effective patterns to follow
│   └── [pattern-name].md
├── anti-patterns/        # Things to avoid
│   └── [anti-pattern-name].md
├── lessons/              # Chronological insights
│   └── [YYYY-MM-DD]-[topic].md
└── conventions/          # Project-specific rules
    └── [convention-name].md
```

---

## Index Template

When creating a new practices directory or updating the index:

```markdown
# Project Practices

> Continuously refined through code reviews. Last updated: [DATE]

## Quick Stats
- Patterns documented: [X]
- Anti-patterns identified: [Y]
- Lessons learned: [Z]

## Patterns to Use

Effective approaches proven in this project:

| Pattern | Description | Link |
|---------|-------------|------|
| [Name] | [One-line description] | [./patterns/name.md] |

## Patterns to Avoid

Anti-patterns that have caused issues:

| Anti-Pattern | Why to Avoid | Link |
|--------------|--------------|------|
| [Name] | [Brief reason] | [./anti-patterns/name.md] |

## Recent Lessons

### [Most Recent Date]
- [Lesson summary]

### [Previous Date]
- [Lesson summary]

## Conventions

Project-specific conventions to follow:

- **[Convention Name]**: [Description]

---

*This document is automatically updated by code reviews. Commit changes to share with your team.*
```

---

## Document Templates

### Pattern Template

```markdown
# [Pattern Name]

**Category:** [e.g., Architecture, Testing, Error Handling]
**Added:** [YYYY-MM-DD]

## When to Use

[Describe situations where this pattern applies]

## The Pattern

[Describe the approach in detail]

## Example

```[language]
[Code example demonstrating the pattern]
```

## Benefits

- [Benefit 1]
- [Benefit 2]

## Considerations

- [Any caveats or things to watch for]

## Related

- [Links to related patterns or lessons]
```

### Anti-Pattern Template

```markdown
# [Anti-Pattern Name]

**Category:** [e.g., Security, Performance, Architecture]
**Added:** [YYYY-MM-DD]
**Severity:** [Low/Medium/High]

## The Problem

[What goes wrong when this pattern is used]

## What to Avoid

```[language]
// DON'T do this
[Example of the bad pattern]
```

## What to Do Instead

```[language]
// DO this instead
[Example of the correct approach]
```

## Why It's Wrong

[Detailed explanation of the issues]

## Real Example

[Describe when this was actually encountered in the project]

## Detection

[How to spot this anti-pattern in code reviews]
```

### Lesson Template

```markdown
# [Lesson Title]

**Date:** [YYYY-MM-DD]
**Context:** [Brief context]
**Tags:** [relevant, tags]

## The Situation

[What happened that led to this lesson]

## What We Tried

1. **[First attempt]**: [Result]
2. **[Second attempt]**: [Result]

## What Worked

[The solution or approach that succeeded]

## Key Takeaway

> [The main lesson in one memorable sentence]

## Applicability

This lesson applies when:
- [Situation 1]
- [Situation 2]

## Related

- [Links to related practices]
```

---

## Operations

### Initialize Practices Directory

```bash
# Create directory structure
mkdir -p .claude/practices/{patterns,anti-patterns,lessons,conventions}

# Create index file
cat > .claude/practices/index.md << 'EOF'
# Project Practices

> Continuously refined through code reviews. Last updated: [TODAY]

## Quick Stats
- Patterns documented: 0
- Anti-patterns identified: 0
- Lessons learned: 0

## Patterns to Use

*No patterns documented yet. Add patterns as you discover effective approaches.*

## Patterns to Avoid

*No anti-patterns documented yet. Add anti-patterns as you identify mistakes to avoid.*

## Recent Lessons

*No lessons documented yet. Use `/compound` after solving problems to add lessons.*

## Conventions

*No conventions documented yet. Add project-specific rules as they emerge.*
EOF
```

### Add a New Pattern

1. Create file in `.claude/practices/patterns/[name].md` using template
2. Update index.md to add entry in Patterns to Use table
3. Update Quick Stats count

### Add a New Anti-Pattern

1. Create file in `.claude/practices/anti-patterns/[name].md` using template
2. Update index.md to add entry in Patterns to Avoid table
3. Update Quick Stats count

### Add a New Lesson

1. Create file in `.claude/practices/lessons/[YYYY-MM-DD]-[topic].md` using template
2. Update index.md Recent Lessons section (most recent first)
3. Update Quick Stats count

### Search Practices

```bash
# Search all practices for a term
grep -r "[search term]" .claude/practices/

# List all patterns
ls .claude/practices/patterns/

# List recent lessons
ls -lt .claude/practices/lessons/ | head -10
```

---

## Integration Points

**Used by:**
- `/review` command - Reads practices before reviewing, updates after
- `/compound` command - Creates new practice documents

**Workflow:**
```
Code Review
    ↓
Read index.md (load context)
    ↓
Review with practices in mind
    ↓
Identify new learnings
    ↓
Create/update practice docs
    ↓
Update index.md
    ↓
Commit to share with team
```

---

## Best Practices

### DO:
- Keep practice documents concise and actionable
- Include real code examples
- Update the index immediately when adding documents
- Commit practices to share with the team
- Review practices periodically to remove outdated ones

### DON'T:
- Add trivial or obvious patterns
- Let the index get out of sync with documents
- Skip the "Why" explanations
- Create practices without real examples

---

## Maintenance

### Weekly Review (Optional)
- Check if any practices need updating
- Remove obsolete patterns
- Consolidate similar lessons

### After Each Code Review
- Add any new patterns discovered
- Document anti-patterns that caused issues
- Update existing practices if refined

### Sharing with Team
```bash
# Commit practice updates
git add .claude/practices/
git commit -m "docs: update practices from code review"
git push
```

---

## Success Criteria

The practices system is working when:
- Reviews reference documented practices
- New team members can learn from practices
- The same mistakes don't repeat
- Patterns improve over time
- Knowledge compounds with each review
