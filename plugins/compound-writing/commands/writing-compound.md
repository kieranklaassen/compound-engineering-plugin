---
name: writing:compound
description: Capture learnings from successful writing to improve future work
argument-hint: "[path to published piece or 'latest']"
---

# Writing Compound Command

Turn this piece's successes into permanent improvements for future writing.

## Input

<piece_path> #$ARGUMENTS </piece_path>

If "latest" is provided, find the most recent published/approved piece.

## The Compound Philosophy

> Each piece of writing should make the next piece easier to write.

This command extracts what worked and encodes it for reuse:
- Hook formulas that grabbed attention
- Structure patterns that flowed well
- Voice elements that landed
- Transitions that felt invisible

## Workflow Overview

1. Analyze what made this piece work
2. Extract reusable patterns
3. Update style documentation
4. Create templates for similar pieces
5. Log anti-patterns that were edited out

## Phase 1: Success Analysis

### Load the Piece and History
```
Read the final published version
Read all draft versions (v1, v2, etc.)
Read review reports
Identify:
- What changed between drafts
- What reviewers praised
- What the writer kept unchanged
```

### Identify What Worked

Use AskUserQuestion:
```
What made this piece successful?
1. The hook grabbed attention
2. The structure was clear
3. The voice was consistent
4. The examples were concrete
5. Something else: [describe]
```

Allow multiple selections to understand success factors.

## Phase 2: Extract Patterns

### Hook Analysis
```markdown
## Hook Extraction

**Opening text**:
> [First 50-100 words]

**Hook type**: [Story/Stat/Tension/Question/Surprise]

**Why it worked**:
- [Specific reason 1]
- [Specific reason 2]

**Formula abstracted**:
[General pattern that could be reused]

**Similar topics it could work for**:
- [Topic 1]
- [Topic 2]
```

### Structure Analysis
```markdown
## Structure Extraction

**Pattern used**: [Problem-Solution/Journey/Listicle/Story]

**Section breakdown**:
1. [Section type] - [purpose] - [word count]
2. [Section type] - [purpose] - [word count]
...

**What made this structure work**:
- [Insight 1]
- [Insight 2]

**Topics this structure fits**:
- [Topic type 1]
- [Topic type 2]
```

### Voice Analysis
```markdown
## Voice Extraction

**Consistent elements identified**:
- Vocabulary patterns: [words/phrases used repeatedly]
- Sentence rhythm: [short-long patterns]
- Tone markers: [specific indicators]

**Voice profile additions**:
```yaml
# New exemplar
exemplars:
  - path: "[this piece path]"
    why: "[specific voice element demonstrated]"
```

**Prohibited additions** (if anti-patterns found):
- "[Word/phrase]" - because: [reason]
```

### Transition Analysis
```markdown
## Transitions Extraction

**Smooth transitions found**:
1. Between [section X] and [section Y]:
   > "[transition text]"
   - Type: [causal/contrast/continuation]
   - Why it worked: [reason]

2. [Continue for notable transitions]

**Transition formulas**:
- "[Formula 1]" - use when: [context]
- "[Formula 2]" - use when: [context]
```

## Phase 3: Update Documentation

### Update Pattern Files

Create or update files in `docs/patterns/`:

```
docs/patterns/
├── hooks/
│   └── [hook-type]-[topic].md      # New hook pattern
├── structures/
│   └── [pattern-name].md           # Structure template
├── transitions/
│   └── common-transitions.md       # Append new transitions
└── voice/
    └── [voice-name]-exemplars.md   # New exemplar reference
```

### Pattern File Format
```markdown
---
title: "[Pattern Name]"
type: [hook/structure/transition/voice]
extracted_from: "[original piece path]"
created: [timestamp]
tags: [topic1, topic2]
---

## Pattern

[Description of the pattern]

## Example

> [The actual text from the piece]

## When to Use

- [Context 1]
- [Context 2]

## How to Apply

1. [Step 1]
2. [Step 2]

## Variations

- [Variation 1]
- [Variation 2]
```

### Update Voice Profile

If voice profile exists, append new learnings:
```yaml
# Add to exemplars
exemplars:
  - path: "[new piece]"
    why: "[what it demonstrates]"

# Add to prohibited if anti-patterns found
prohibited:
  - "[new prohibited item]"
```

## Phase 4: Create Templates

### If Structure Was Novel

Create a reusable template:

```markdown
# Template: [Template Name]

**Best for**: [Topic types this works for]

**Structure**:

## Hook
[Hook formula with placeholders]

## Section 1: [Purpose]
[Guidance for this section]
- Include: [required elements]
- Avoid: [anti-patterns]

## Section 2: [Purpose]
[Continue pattern...]

## Conclusion
[Closing formula]

**Word count target**: [range]
**Key elements**: [list]
```

Save to `docs/patterns/structures/[template-name].md`

## Phase 5: Log Anti-Patterns

### What Was Edited Out

From review history, identify:
- Phrases that were consistently cut
- Structures that were reorganized
- Claims that needed rework

```markdown
## Anti-Patterns Identified

### Phrases to Avoid
- "[Phrase]" - cut because: [reason]
- "[Phrase]" - cut because: [reason]

### Structural Issues
- [Issue] - fixed by: [solution]

### Claims That Failed Fact-Check
- "[Claim type]" - always verify: [specific check]
```

Add to appropriate style guide or voice profile.

## Output

### Compound Report
Save to `docs/patterns/compound-log/[date]-[piece-slug].md`:

```markdown
# Compound Report: [Piece Title]

**Date**: [timestamp]
**Piece**: [path to original]

## What Worked
[Summary of success factors]

## Patterns Extracted
- Hook pattern: [saved to path]
- Structure template: [saved to path]
- Transitions: [X] added to common-transitions.md
- Voice exemplar: [added to profile]

## Anti-Patterns Logged
- [X] phrases added to prohibited list
- [X] structural warnings documented

## Files Updated
- `docs/patterns/hooks/[file].md`
- `docs/patterns/structures/[file].md`
- `docs/patterns/transitions/common-transitions.md`
- `.claude/voice-profiles/[name].yaml`

## The Compound Effect
This piece adds [X] reusable patterns to your writing system.
Next similar piece will benefit from: [specific improvements]
```

## Post-Compound Options

**Question**: "Compounding complete. [X] patterns extracted. What next?"

**Options**:
1. **View patterns** - Open the extracted pattern files
2. **Start new piece** - `/writing:plan` with new patterns available
3. **Review pattern library** - See all accumulated patterns
4. **Export voice profile** - Save voice profile for sharing

## The Compound Loop

```
Write → Review → Edit → Compound →
  ↓
Next piece starts with more patterns
  ↓
Write (faster) → Review (fewer issues) → Edit (lighter) → Compound →
  ↓
Each cycle gets easier
```
