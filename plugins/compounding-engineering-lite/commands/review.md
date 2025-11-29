---
name: review
description: Perform code reviews with continuous learning via .claude/practices/
argument-hint: "[PR number, branch name, file path, or 'latest' for recent changes]"
---

# Review Command (Lite)

<command_purpose>Perform code reviews using multi-agent analysis while incorporating and updating project practices for continuous improvement.</command_purpose>

## Philosophy

**Each review makes future reviews better.** This command doesn't just find issues—it learns from them and documents patterns for the entire team.

## Prerequisites

- Git repository
- For PR reviews: GitHub CLI (`gh`) installed and authenticated

## Execution Flow

### Step 1: Load Project Practices (ALWAYS FIRST)

<critical_requirement>Before reviewing ANY code, read the existing practices.</critical_requirement>

<task_list>

- [ ] Check if `.claude/practices/` directory exists
- [ ] If exists: Read `.claude/practices/index.md`
- [ ] Note all documented patterns, anti-patterns, and lessons
- [ ] These will inform the review and help identify violations

```bash
# Check for practices directory
if [ -d ".claude/practices" ]; then
  cat .claude/practices/index.md
fi
```

If practices don't exist, note this for Step 5 (we'll create them based on findings).

</task_list>

### Step 2: Determine Review Target

<review_target>$ARGUMENTS</review_target>

<task_list>

- [ ] Determine target type: PR number, branch name, file path, or current changes
- [ ] For PRs: Fetch metadata with `gh pr view --json`
- [ ] For branches: Get diff against main/master
- [ ] For 'latest': Review uncommitted or recent changes

</task_list>

### Step 3: Run Parallel Review Agents

<parallel_tasks>

Launch these agents simultaneously:

1. **Task practices-reviewer** - Reviews with practice context, identifies new lessons
2. **Task architecture-strategist** - Architectural compliance and design quality
3. **Task pattern-recognition-specialist** - Design patterns and anti-patterns
4. **Task security-sentinel** - Security vulnerabilities and OWASP compliance
5. **Task performance-oracle** - Performance issues and scalability concerns

</parallel_tasks>

### Step 4: Simplicity Pass

After parallel reviews complete:

**Task code-simplicity-reviewer** - Final pass for YAGNI and minimalism

### Step 5: Synthesize Findings and Update Practices

<critical_requirement>This is what makes the lite plugin valuable—continuous improvement.</critical_requirement>

#### 5a. Consolidate Findings

<synthesis_tasks>

- [ ] Collect findings from all agents
- [ ] Categorize by type: security, performance, architecture, patterns, quality
- [ ] Assign severity: P1 (Critical), P2 (Important), P3 (Suggestions)
- [ ] Remove duplicates and overlapping findings
- [ ] Identify which findings relate to documented practices

</synthesis_tasks>

#### 5b. Identify New Lessons

From the review, extract:

- **New Patterns**: Effective approaches worth documenting
- **New Anti-Patterns**: Mistakes to avoid in future
- **Lessons Learned**: Insights that could help future reviews
- **Convention Refinements**: Updates to existing practices

#### 5c. Update Practices Directory

<practices_update>

**If `.claude/practices/` doesn't exist, create it:**

```bash
mkdir -p .claude/practices/{patterns,anti-patterns,lessons}
```

**Create/update `index.md` with new learnings:**

```markdown
# Project Practices

> Continuously refined through code reviews. Last updated: [DATE]

## Patterns to Use

[Add new patterns discovered]

## Patterns to Avoid

[Add new anti-patterns discovered]

## Lessons Learned

### [TODAY'S DATE]
- [New lessons from this review]

## Conventions

[Project-specific conventions]
```

**For significant patterns, create detail documents:**
- `.claude/practices/patterns/[pattern-name].md`
- `.claude/practices/anti-patterns/[anti-pattern-name].md`
- `.claude/practices/lessons/[YYYY-MM-DD]-[topic].md`

</practices_update>

### Step 6: Present Summary

<output_format>

```markdown
## Review Complete

**Target:** [PR/branch/files reviewed]
**Practices Applied:** [X patterns checked]
**New Lessons Identified:** [Y]

### Findings Summary

- **P1 Critical (Blocks Merge):** [count]
- **P2 Important (Should Fix):** [count]
- **P3 Suggestions:** [count]

### P1 Critical Issues
[List with file:line references]

### P2 Important Issues
[List with file:line references]

### P3 Suggestions
[List of minor improvements]

### Practices Updated

**New Patterns Documented:**
- [Pattern name]: [Brief description]

**New Anti-Patterns Documented:**
- [Anti-pattern name]: [What to avoid]

**Lessons Added:**
- [Lesson summary]

### Files Updated
- `.claude/practices/index.md` - Added [X] new entries
- `.claude/practices/patterns/[name].md` - [If created]
- `.claude/practices/lessons/[date]-[topic].md` - [If created]

### Next Steps

1. **Address P1 issues** before merging
2. **Review P2 issues** and fix what's practical
3. **Consider P3 suggestions** for future improvement
4. **Commit practices updates** to share learnings with team:
   ```bash
   git add .claude/practices/
   git commit -m "docs: update practices from code review"
   ```
```

</output_format>

## The Compounding Effect

```
Review 1: Find issues, document first patterns
    ↓
Review 2: Apply patterns, find new issues, refine practices
    ↓
Review 3: Catch more issues early, practices compound
    ↓
Review N: Team knowledge grows, reviews become more effective
```

**Each unit of review work makes subsequent reviews easier—not harder.**

## Quick Reference

```bash
# Review a PR
/review 123

# Review current branch changes
/review

# Review specific file
/review src/auth/login.ts

# Review latest uncommitted changes
/review latest
```
