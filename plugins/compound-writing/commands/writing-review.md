---
name: writing:review
description: Exhaustive parallel editorial review of written content
argument-hint: "[path to draft.md or 'latest']"
---

# Writing Review Command

Multi-agent editorial review that examines content from every angle.

## Input

<draft_path> #$ARGUMENTS </draft_path>

If "latest" is provided, find the most recent draft in `drafts/`.

## Workflow Overview

This command executes the **review phase**:
1. Load draft and context
2. Launch parallel review agents
3. Collect and prioritize findings
4. Present interactive triage
5. Apply accepted fixes

## Phase 1: Load Context

### Read Draft
```
Read the draft file
Extract:
- Title and metadata
- Word count
- Style used
- Voice profile (if any)
```

### Load Review Context
```
If voice profile exists: Load for voice-guardian
If style guide specified: Load rules
Find sources.md for fact-checking
```

## Phase 2: Parallel Review Agents

Launch ALL relevant agents simultaneously:

### Core Reviews (Always Run)

```
Task voice-guardian: "Check voice consistency in this draft.
Voice profile: [profile or 'infer from content']
Draft: [draft content]
Return: Voice score, drift areas, specific fixes."

Task clarity-editor: "Review for clarity, concision, jargon, and passive voice.
Draft: [draft content]
Return: Prioritized issues with before/after fixes."

Task fact-checker: "Verify all claims against sources.
Draft: [draft content]
Sources: [sources.md content]
Return: Claim verification report."

Task structure-architect: "Analyze flow and structure.
Draft: [draft content]
Return: Flow analysis, gap identification, structure assessment."
```

### Style Reviews (Based on Context)

If using Every style:
```
Task every-style-editor: "Check against Every's style guide.
Draft: [draft content]
Return: Style violations with line numbers and fixes."
```

If technical content:
```
Skill: pragmatic-writing
Apply pragmatic writing principles and report issues.
```

If opinion/persuasive content:
```
Skill: dhh-writing
Apply DHH's direct, opinionated style checks.
```

### Publishing Reviews (If Requested)

```
Task publishing-optimizer: "Analyze for SEO and social potential.
Draft: [draft content]
Return: SEO recommendations, social hooks, headline alternatives."
```

## Phase 3: Collect and Prioritize Findings

### Categorize Issues

```markdown
## Review Summary

### Critical (Must Fix)
Issues that significantly harm the piece:
- Factual errors
- Unsupported claims
- Major clarity problems
- Structural gaps

### Important (Should Fix)
Issues that noticeably weaken the piece:
- Voice drift
- Passive voice
- Unnecessary jargon
- Flow problems

### Polish (Nice to Fix)
Minor improvements:
- Word choice refinements
- Rhythm adjustments
- Style guide details
```

### Deduplicate
Multiple agents may flag the same issue. Combine duplicates and note agreement:
```
"Passive voice in paragraph 3" - flagged by: clarity-editor, voice-guardian
```

## Phase 4: Interactive Triage

Present each issue with options:

```markdown
---

**[Critical]** Unsupported claim in paragraph 3

> "Studies show that 73% of developers prefer..."

No source provided for this statistic.

**Suggested fix**: Add citation or remove claim.

What would you like to do?
1. Accept fix (add citation placeholder)
2. Skip (keep as is)
3. Custom (provide your fix)
4. Remove claim entirely

---

**[Important]** Passive voice: 4 instances detected

Lines: 12, 34, 56, 78

**Suggested fixes**:
- "The code was written" → "The developer wrote the code"
- "It was decided" → "We decided"
- [etc.]

What would you like to do?
1. Accept all
2. Accept some (show each)
3. Skip all
4. Custom

---
```

### Track Decisions
```markdown
## Triage Log
- Issue 1: Accepted
- Issue 2: Skipped (reason: intentional stylistic choice)
- Issue 3: Custom fix applied
```

## Phase 5: Apply Fixes

### Create New Version
After triage, apply all accepted fixes:
- Create `draft-v2.md` (or increment version)
- Preserve original
- Log all changes

### Re-Run Critical Checks
After fixes applied:
- Fact-check any new claims added
- Voice-guardian quick check on changed sections
- Verify no new issues introduced

## Output

### Review Report
Save to `drafts/[slug]/review-v1.md`:

```markdown
# Editorial Review: [Title]

## Summary
- Issues found: X
- Critical: X
- Important: X
- Polish: X

## Agent Reports

### Voice Guardian
[Full report]

### Clarity Editor
[Full report]

### Fact Checker
[Full report]

### Structure Architect
[Full report]

## Triage Decisions
[Log of all decisions]

## Next Steps
- [ ] Address remaining skipped issues
- [ ] Final proofread
- [ ] Prepare for publishing
```

### Updated Draft
If fixes were applied, save `draft-v2.md` with:
- Updated content
- Change log in metadata
- New voice score

## Post-Review Options

**Question**: "Review complete. [X] issues found, [Y] fixed. What next?"

**Options**:
1. **View full report** - Show detailed review-v1.md
2. **Run another review pass** - Re-run with fresh eyes
3. **Prepare for publishing** - `/writing:compound` to capture patterns
4. **Make manual edits** - Open draft for hands-on refinement
5. **Publish** - Move to publishing workflow

## Quality Gates

Review is complete when:
- [ ] All critical issues addressed
- [ ] Voice score ≥ 85
- [ ] All claims verified or flagged
- [ ] Flow analysis passed
- [ ] Style guide compliance checked
