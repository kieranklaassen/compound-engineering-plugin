---
name: compound
description: Document a lesson learned to compound your team's knowledge
argument-hint: "[optional: brief context about what was learned]"
---

# /compound

Document lessons learned to build compounding team knowledge.

## Purpose

Captures insights while context is fresh, creating structured documentation in `.claude/practices/` for future reference. Each documented lesson makes the team smarter.

**Why "compound"?** Each documented lesson compounds your team's knowledge. The first time you solve a problem takes research. Document it, and the next occurrence takes minutes. Knowledge compounds.

## Usage

```bash
/compound                    # Document a recent lesson
/compound [brief context]    # Provide context hint
```

## Process

### Step 1: Gather Context

Extract from the recent conversation:

- **What was the problem?** The issue or challenge faced
- **What was tried?** Investigation steps and failed attempts
- **What worked?** The solution or insight gained
- **Why does it matter?** Impact and relevance to future work
- **How to prevent/repeat?** Prevention strategies or replication steps

<context_questions>
If context is unclear, ask:

```
I need a few details to document this properly:

1. What problem did you solve or insight did you gain?
2. What approaches didn't work (if any)?
3. What was the solution or key learning?

[Continue after user provides details]
```
</context_questions>

### Step 2: Check Existing Practices

Search `.claude/practices/` for related documentation:

```bash
# Check if practices exist
ls -la .claude/practices/

# Search for similar topics
grep -r "[keyword]" .claude/practices/
```

**If similar exists:** Decide whether to update existing or create new with cross-reference.

### Step 3: Classify the Lesson

Determine the type:

- **Pattern**: An effective approach worth repeating
- **Anti-Pattern**: A mistake or approach to avoid
- **Lesson**: A general insight or learning
- **Convention**: A project-specific rule to follow

### Step 4: Create Documentation

<documentation_structure>

**Ensure directory exists:**

```bash
mkdir -p .claude/practices/{patterns,anti-patterns,lessons}
```

**For Patterns** - Create `.claude/practices/patterns/[pattern-name].md`:

```markdown
# [Pattern Name]

## When to Use
[Describe the situations where this pattern applies]

## The Pattern
[Describe the approach]

## Example
```[language]
[Code example showing the pattern]
```

## Why It Works
[Explain the benefits]

## Related
- [Links to related practices]
```

**For Anti-Patterns** - Create `.claude/practices/anti-patterns/[anti-pattern-name].md`:

```markdown
# [Anti-Pattern Name]

## The Problem
[What goes wrong when this pattern is used]

## What to Avoid

```[language]
// DON'T do this
[Bad example]
```

## What to Do Instead

```[language]
// DO this instead
[Good example]
```

## Why It's Wrong
[Explain the issues]

## Real Example
[Describe when this was encountered]
```

**For Lessons** - Create `.claude/practices/lessons/[YYYY-MM-DD]-[topic].md`:

```markdown
# [Lesson Title]

**Date:** [YYYY-MM-DD]
**Context:** [Brief context of when this was learned]

## The Situation
[What happened]

## What We Tried
- [Attempt 1 and result]
- [Attempt 2 and result]

## What Worked
[The solution or insight]

## Key Takeaway
[The main lesson in one sentence]

## Applicability
[When this lesson applies in future]
```

</documentation_structure>

### Step 5: Update Index

Add the new entry to `.claude/practices/index.md`:

```markdown
## [Category: Patterns/Anti-Patterns/Lessons]

- **[Name]**: [One-line description] → [./category/filename.md]
```

Also add to the Lessons Learned section with today's date.

### Step 6: Present Summary

<output_format>

```
Lesson documented

File created:
- .claude/practices/[category]/[filename].md

Index updated:
- .claude/practices/index.md

Summary:
[One-line summary of what was documented]

What's next?
1. Continue workflow (recommended)
2. Link to related practices
3. View documentation
4. Commit changes to share with team:
   git add .claude/practices/ && git commit -m "docs: add [lesson type]"
```

</output_format>

## The Compounding Philosophy

```
Problem Solved → Document Lesson → Future Occurrence → Quick Lookup
    ↓                                                       ↓
    └───────── Knowledge Compounds Over Time ───────────────┘
```

**Each unit of engineering work should make subsequent units of work easier—not harder.**

## Auto-Invoke Triggers

Consider using /compound after phrases like:
- "that worked"
- "I figured it out"
- "the issue was..."
- "I learned that..."
- "next time I should..."

## Examples

```bash
# After fixing a tricky bug
/compound the issue was a race condition in the cache invalidation

# After discovering a useful pattern
/compound found a cleaner way to handle authentication state

# After learning from a code review
/compound PR feedback showed we should validate inputs earlier
```
