---
name: context-notes
description: Structured context passing protocol between writing commands. Ensures seamless handoffs with all necessary information preserved.
---

# Context Notes Skill

A protocol for passing structured context between writing commands, ensuring nothing gets lost in handoffs.

## When to Use This Skill

This skill applies when:
- Handing off from plan to draft
- Passing review findings to revision
- Preserving research across commands
- Maintaining continuity in multi-step workflows

## The Context Notes Block

Every command handoff includes a context notes block:

```markdown
<context_notes>
## Research Summary
[2-3 sentences of gathered research]

## Material Available
- [Concrete example 1]
- [Data point 1]
- [Quote or source 1]

## Message Clarity
**Thesis**: [One sentence thesis]
**Audience**: [Specific audience]
**Desired Action**: [What reader should do]

## Voice Configuration
**Profile**: [voice profile name or "infer"]
**Style Guide**: [style guide name or "none"]
**Channel**: [blog/newsletter/social/docs]

## Mode
[EXPLORATION or REFINEMENT]

## Scratchpad Summary
[Key preferences from scratchpad]
</context_notes>
```

## Context Flow Between Commands

### /writing:plan → /writing:draft

```markdown
<context_notes>
## Research Summary
Researched AI adoption in healthcare. Found 73% of hospitals now use AI diagnostics.
Mayo Clinic case study shows 40% faster diagnosis times.

## Material Available
- Stat: 73% hospital AI adoption (source: HealthTech 2025)
- Case: Mayo Clinic 40% improvement
- Quote: "AI is the stethoscope of the 21st century" - Dr. Sarah Chen

## Message Clarity
**Thesis**: AI diagnostics are becoming standard of care, not optional
**Audience**: Hospital administrators considering AI investment
**Desired Action**: Request a demo of our AI platform

## Voice Configuration
**Profile**: kieran-blog
**Style Guide**: none
**Channel**: blog

## Mode
EXPLORATION
</context_notes>
```

### /writing:draft → /writing:review

```markdown
<context_notes>
## Draft Status
- Version: draft-v1
- Word count: 847
- Voice score: 82 (target: 85)
- Drafts created: 3 (user selected draft-2)

## Strategies Applied
- Baseline: All 10 applied
- Situational: hook-stat-surprise, ladder-abstraction, tension-builder

## Known Issues
- Opening may need strengthening (voice score dip)
- Paragraph 4 is dense (consider breaking)

## Scratchpad Summary
- ✓ User prefers data-driven openings
- ✗ User dislikes formal tone
</context_notes>
```

### /writing:review → /writing:draft (revision)

```markdown
<context_notes>
## Review Summary
- Critical issues: 2
- Important issues: 4
- Polish issues: 3

## Accepted Fixes
1. Strengthen opening with specific stat (was too vague)
2. Break paragraph 4 into two
3. Replace passive voice in conclusion

## Rejected Fixes
1. Adding more technical jargon (user prefers accessible)

## Mode
REFINEMENT (working on draft-2)
</context_notes>
```

## Context Notes Protocol

### Required Fields

Every context notes block MUST include:

| Field | Required For | Purpose |
|-------|--------------|---------|
| Message Clarity | plan→draft | Ensures writer knows the goal |
| Material Available | plan→draft | Prevents fact invention |
| Voice Configuration | all handoffs | Maintains consistency |
| Mode | draft commands | Determines draft count |
| Draft Status | review handoffs | Tracks versions |

### Optional Fields

| Field | When to Include |
|-------|-----------------|
| Research Summary | When research was performed |
| Scratchpad Summary | When feedback exists |
| Known Issues | When issues are pre-identified |
| Accepted/Rejected Fixes | After review triage |

## Two-Gate Assessment in Context

Context notes encode the two-gate assessment results:

### Gate 1: Material Sufficiency
```markdown
## Material Available
- [List of concrete materials]
- [No invented facts needed]
```
If this section is empty or vague → Gate 1 failed → need more research

### Gate 2: Message Clarity
```markdown
## Message Clarity
**Thesis**: [Clear one-sentence thesis]
**Audience**: [Specific audience]
**Desired Action**: [Clear CTA]
```
If any field is vague → Gate 2 failed → need clarification

## Context Preservation

### What Gets Preserved
- Research findings
- User preferences (scratchpad)
- Voice configuration
- Draft history and IDs

### What Gets Fresh Each Command
- Strategy selection (based on current content)
- Quality scores
- Issue lists

## Example: Full Workflow Context Flow

```
/writing:plan "AI in healthcare"
    │
    ├─ Outputs: outline.md
    ├─ Outputs: sources.md
    └─ Outputs: <context_notes> with research + message clarity
           │
           ▼
/writing:draft (receives context_notes)
    │
    ├─ Reads: context_notes
    ├─ Reads: scratchpad preferences
    ├─ Creates: draft-1, draft-2, draft-3
    └─ Outputs: <context_notes> with draft status
           │
           ▼
/writing:feedback draft-2 "love it, but opening is weak"
    │
    └─ Updates: scratchpad
           │
           ▼
/writing:review draft-2 (receives context_notes + scratchpad)
    │
    ├─ Reads: context_notes (voice, strategies)
    ├─ Reads: scratchpad (preferences)
    ├─ Runs: parallel agent reviews
    └─ Outputs: <context_notes> with review findings
           │
           ▼
/writing:draft refine draft-2 (REFINEMENT mode)
    │
    ├─ Reads: context_notes (accepted fixes)
    ├─ Reads: scratchpad (preferences)
    └─ Outputs: refined draft-2
           │
           ▼
/writing:compound draft-2
    │
    ├─ Reads: full context history
    └─ Extracts: patterns to knowledge base
```

## Context Notes File

For long-running projects, context can persist in `drafts/.context.md`:

```markdown
---
project: "AI Healthcare Blog Series"
created: 2025-01-16
last_updated: 2025-01-16
---

# Project Context

## Research Archive
[All research from plan phase]

## Voice Configuration
[Locked voice settings]

## Session History
[Command sequence with outcomes]

## Active Draft
[Current draft being worked on]
```

## Integration with Commands

All commands should:

1. **Read context notes** from previous command output or `.context.md`
2. **Validate required fields** before proceeding
3. **Generate updated context notes** for next command
4. **Preserve scratchpad preferences** across handoffs
