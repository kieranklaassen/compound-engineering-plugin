# Common Writing Patterns

Index of frequently used patterns captured from successful writing.

## How to Use This Library

Patterns are extracted via `/writing:compound` from pieces that work well. They're organized by type:

- **Hooks** (`hooks/`) - Opening patterns that grab attention
- **Structures** (`structures/`) - Article architectures that flow
- **Transitions** (`transitions/`) - Phrases that connect ideas smoothly
- **Voice** (`voice/`) - Voice elements and exemplars

## Pattern Format

Each pattern file follows this structure:

```markdown
---
title: "Pattern Name"
type: hook | structure | transition | voice
extracted_from: "source piece path"
created: YYYY-MM-DD
tags: [topic1, topic2]
---

## Pattern
[Description]

## Example
> [Actual text from source]

## When to Use
- Context 1
- Context 2

## How to Apply
1. Step 1
2. Step 2

## Variations
- Variation 1
- Variation 2
```

## Quick Reference

### Hook Patterns

| Pattern | When to Use |
|---------|-------------|
| Concrete Example | Technical topics, tutorials |
| Surprising Stat | Data-driven pieces |
| Tension | Problem-solution articles |
| Question | Exploratory essays |

### Structure Patterns

| Pattern | When to Use |
|---------|-------------|
| Problem-Solution | How-to, fixes |
| Journey | Transformations, case studies |
| Listicle | Reference content, tips |
| Story | Narrative pieces |

### Transition Patterns

| Type | Example |
|------|---------|
| Causal | "That's why..." |
| Contrast | "But here's the thing..." |
| Continuation | "And it gets better..." |
| Reversal | "Until it doesn't." |

## Adding New Patterns

When you run `/writing:compound` on a successful piece, it automatically:
1. Extracts effective patterns
2. Creates pattern files in the appropriate directory
3. Updates this index

You can also manually add patterns by creating files following the format above.

## Pattern Discovery Tips

Look for patterns when:
- A piece gets unusually high engagement
- Editing significantly improves a section
- A structure works well for multiple topics
- A transition feels invisible

Patterns compound: the more you capture, the faster you write.
