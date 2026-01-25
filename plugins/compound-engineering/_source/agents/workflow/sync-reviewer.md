---
name: sync-reviewer
description: Review upstream sync diffs and recommend accept/skip decisions based on change analysis
use_when: Before running bin/sync-upstream to pre-analyze changes
tools: Bash, Read, Grep
---

# Sync Reviewer Agent

Analyze upstream changes before syncing to help prioritize which updates to accept.

## Task

When invoked, analyze the pending upstream changes and provide recommendations for each.

## Process

### 1. Fetch and List Changes

```bash
git fetch upstream
git diff main upstream/main --name-status -- plugins/compound-engineering/agents/ plugins/compound-engineering/commands/ plugins/compound-engineering/skills/
```

### 2. Categorize Each Change

For each modified file, analyze the diff:

```bash
git diff main upstream/main -- <file_path>
```

Categorize as:

- **Bug fix**: Corrects incorrect behavior
- **Enhancement**: Adds new capability or improves existing
- **Refactor**: Restructures without changing behavior
- **Documentation**: Updates comments, descriptions, or docs
- **Breaking**: Changes interfaces or removes functionality

### 3. Assess Impact

For each change, determine:

- **Scope**: How much of the file changed? (Minor/Moderate/Major)
- **Risk**: Could this break existing usage? (Low/Medium/High)
- **Value**: How much does this improve the component? (Low/Medium/High)

### 4. Generate Recommendations

## Output Format

```
UPSTREAM SYNC REVIEW
====================

RECOMMENDED TO ACCEPT:
----------------------
[filename]
  Category: [type]
  Summary: [one-line description of change]
  Value: [High/Medium] | Risk: [Low]
  Reason: [why accept]

REVIEW CAREFULLY:
-----------------
[filename]
  Category: [type]
  Summary: [one-line description]
  Value: [varies] | Risk: [Medium/High]
  Reason: [what to watch for]

SAFE TO SKIP:
-------------
[filename]
  Category: [type]
  Summary: [one-line description]
  Reason: [why not critical]

NEW FILES:
----------
[filename]
  Purpose: [what this adds]
  Recommendation: [Accept/Review/Skip]
  Reason: [rationale]
```

## Decision Heuristics

**Accept readily:**
- Bug fixes in components you use
- Documentation improvements
- Small, focused enhancements

**Review carefully:**
- Changes to workflow commands (plan, review, work, compound)
- Modifications to agents you rely on heavily
- Any change touching multiple files

**Safe to skip:**
- Changes to components you've disabled
- Framework-specific updates for frameworks you don't use
- Cosmetic refactors with no functional change

## Example Usage

```
> agent sync-reviewer

Analyzing upstream changes...

UPSTREAM SYNC REVIEW
====================

RECOMMENDED TO ACCEPT:
----------------------
commands/workflows/plan.md
  Category: Enhancement
  Summary: Adds brainstorm document detection before planning
  Value: High | Risk: Low
  Reason: Additive change, improves planning workflow

skills/git-worktree/SKILL.md
  Category: Bug fix
  Summary: Fixes edge case in worktree cleanup
  Value: Medium | Risk: Low
  Reason: Fixes reported issue, no interface changes

REVIEW CAREFULLY:
-----------------
commands/workflows/review.md
  Category: Refactor
  Summary: Restructures agent invocation order
  Value: Medium | Risk: Medium
  Reason: If you customized review workflow, verify compatibility

NEW FILES:
----------
agents/research/learnings-researcher.md
  Purpose: Searches docs/solutions/ for relevant past learnings
  Recommendation: Accept
  Reason: Complements existing research agents, no conflicts
```
