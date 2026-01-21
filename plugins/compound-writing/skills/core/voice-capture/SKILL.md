---
name: voice-capture
description: This skill should be used when extracting voice profiles from sample text, creating voice documentation, or matching a specific writing style. It applies when users provide sample text and want to capture the voice for future use.
---

# Voice Capture Skill

Extract and encode writing voice from sample text into reusable voice profiles. This skill transforms examples of writing you like into documented patterns that can guide future writing.

## When to Use This Skill

This skill applies when:
- A user provides sample text and asks "write like this"
- Creating a voice profile from existing content
- Documenting a brand voice for consistency
- Capturing an author's style for future reference
- Analyzing differences between two writing styles

## Core Philosophy

> Voice isn't just word choice. It's sentence rhythm, paragraph structure, emotional register, and a thousand small decisions that create a distinctive sound.

This skill captures those decisions systematically so they can be applied to new content.

## Voice Profile Structure

A complete voice profile has three layers. See [voice-profile-template.yaml](./assets/voice-profile-template.yaml) for the full template.

### Layer 1: Immutable Traits

Core characteristics that define the voice:

```yaml
traits:
  - direct           # vs. indirect, circumspect
  - conversational   # vs. formal, academic
  - technically-informed  # level of assumed expertise

register: informal   # formal / semiformal / informal

prohibited:
  - "synergy"
  - passive voice in openings
  - exclamation marks (except in quotes)
```

### Layer 2: Channel Guidance

How the voice adapts by medium:

```yaml
channels:
  blog:
    length: "1000-2000 words"
    personality: "full"
    storytelling: "encouraged"

  newsletter:
    length: "300-500 words"
    personality: "high - direct address okay"
    storytelling: "personal anecdotes"

  social:
    length: "280 chars or thread"
    personality: "punchy, hooks required"
    storytelling: "minimal - punchlines only"

  documentation:
    length: "as needed"
    personality: "minimal"
    storytelling: "none - clarity first"
```

### Layer 3: Example Library

Exemplars that demonstrate the voice:

```yaml
exemplars:
  - path: "samples/great-opening.md"
    why: "Concrete example first, theory second"
    demonstrates: ["hook", "pacing"]

  - path: "samples/transition.md"
    why: "Invisible transition technique"
    demonstrates: ["flow", "structure"]

  - path: "samples/closing.md"
    why: "Strong CTA without being salesy"
    demonstrates: ["conclusion", "call-to-action"]
```

## Extraction Process

### Step 1: Collect Samples

Minimum: 3 samples (ideally 5-10)
Total words: At least 2,000 words
Variety: Different topics, same author/brand

### Step 2: Analyze Dimensions

Reference [analysis-dimensions.md](./references/analysis-dimensions.md) for the full framework.

#### Vocabulary Analysis
- **Complexity**: Simple ↔ Complex
- **Formality**: Casual ↔ Formal
- **Jargon**: Technical ↔ Accessible
- **Signature words**: Frequently used phrases

#### Sentence Analysis
- **Length**: Average words per sentence
- **Variety**: Standard deviation of sentence length
- **Structure**: Simple vs. compound vs. complex ratio
- **Fragments**: Used for emphasis? How often?

#### Paragraph Analysis
- **Length**: Average sentences per paragraph
- **Opening patterns**: How do paragraphs typically start?
- **Closing patterns**: How do paragraphs typically end?

#### Rhythm Analysis
- **Pacing**: Quick (short sentences) vs. measured (longer)
- **Punctuation style**: Dashes, semicolons, parentheses
- **White space**: Dense vs. airy paragraphs

#### Emotional Analysis
- **Tone**: Optimistic, skeptical, neutral, passionate
- **Distance**: Intimate (I, you) vs. distant (one, they)
- **Stakes**: High urgency vs. calm reflection

### Step 3: Document Patterns

For each dimension, document:
1. The observed pattern
2. A concrete example
3. A counter-example (what this voice avoids)

### Step 4: Create Profile

Use [extraction-templates.md](./references/extraction-templates.md) to structure your findings.

Output: `.claude/voice-profiles/[name].yaml`

## Using Voice Profiles

### In Writing Commands

```yaml
# In /writing:draft
style:
  voice_profile: "kieran-blog"
  # OR
  voice_profile: ".claude/voice-profiles/client-name.yaml"
```

### For Voice Guardian

The voice-guardian agent uses profiles to:
- Score voice consistency (0-100)
- Identify drift points
- Suggest specific fixes

Target score: 85+

### For New Writers

When onboarding writers to match an existing voice:
1. Share the voice profile
2. Share the exemplars
3. Run voice-guardian on their drafts

## Quick Extraction Workflow

For rapid voice capture (when you need a profile fast):

```markdown
## Quick Profile: [Name]

**Based on**: [X] samples totaling [Y] words

### Core Traits
- [Trait 1]
- [Trait 2]
- [Trait 3]

### Sentence Patterns
Average length: [X] words
Common patterns:
- [Pattern 1]
- [Pattern 2]

### Vocabulary Markers
**Signature words**: [list]
**Avoided words**: [list]

### Tone
[Brief description]

### Quick Examples
Good: "[example that nails the voice]"
Bad: "[example that would violate it]"
```

## Common Extraction Challenges

### Challenge: Too Few Samples

**Problem**: Can't identify patterns from 1-2 samples.
**Solution**: Ask for more content or analyze published work from the same source.

### Challenge: Inconsistent Source

**Problem**: The sample voice varies significantly.
**Solution**: Either document the variation (multiple profiles) or focus on the most recent/best examples.

### Challenge: Style vs. Voice

**Problem**: Confusing topic-specific style with core voice.
**Solution**: Analyze samples on different topics. What stays constant? That's the voice.

### Challenge: Unconscious Patterns

**Problem**: Author doesn't know what makes their voice distinctive.
**Solution**: Compare to other writers. What's different? That's often the key.

## Quality Checklist

A voice profile is complete when:
- [ ] All three layers are populated
- [ ] At least 3 exemplars are documented
- [ ] Prohibited patterns are explicit
- [ ] Channel variations are noted
- [ ] A test passage can be evaluated against it
- [ ] Someone unfamiliar with the voice could use it

## References

- [extraction-templates.md](./references/extraction-templates.md) - Templates for structured extraction
- [analysis-dimensions.md](./references/analysis-dimensions.md) - All dimensions to analyze
- [example-profiles.md](./references/example-profiles.md) - Sample voice profiles for reference
- [voice-profile-template.yaml](./assets/voice-profile-template.yaml) - The YAML template
