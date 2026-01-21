---
name: scratchpad
description: Real-time feedback tracking system for iterative writing refinement. Captures preferences, tracks draft performance, and builds a preference profile that guides future content.
---

# Scratchpad Skill

A persistent feedback system that learns what works and what doesn't across your writing session.

## When to Use This Skill

This skill applies when:
- Collecting feedback on draft variations
- Building a preference profile during a session
- Tracking what resonates vs. what falls flat
- Refining voice and style iteratively

## Core Concept

The scratchpad is your session's memory of preferences:

```
Draft 1 → Feedback: "love the opening" → Scratchpad learns: strong hooks work
Draft 2 → Feedback: "too formal" → Scratchpad learns: prefer casual
Draft 3 → Uses learnings → Better alignment
```

## Scratchpad Structure

```markdown
# Session Scratchpad

## Preference Profile

### ✓ What Works
- [Positive pattern with example]

### ✗ What Doesn't
- [Negative pattern with example]

## Draft Feedback Log

### [Draft ID] - [timestamp]
**Sentiment**: positive/negative/neutral
**Feedback**: [user's words]
**Principle**: [extracted learning]

## Strategy Adjustments
Based on feedback, adjust:
- [strategy]: [how to adjust]
```

## Feedback Entry Format

When capturing feedback:

```yaml
entry:
  draft_id: "draft-3"
  timestamp: "2025-01-16T10:30:00"
  sentiment: "negative"
  raw_feedback: "the opening is weak, doesn't grab me"
  category: "hooks"
  principle: "Needs stronger, more provocative openings"
  action: "Prioritize hook-effectiveness strategy"
```

## Preference Categories

### Voice & Tone
Track formality, personality, emotional register:
- "too corporate" → prefer casual
- "love the warmth" → maintain personal touch
- "feels distant" → add more direct address

### Structure & Flow
Track pacing, organization, transitions:
- "lost me in the middle" → improve transitions
- "perfect build-up" → use tension-release pattern
- "too long" → cut more aggressively

### Content & Substance
Track examples, data, depth:
- "needs more proof" → add data/examples
- "love the stats" → lead with data
- "too abstract" → use concrete examples

### Style & Language
Track word choice, rhythm, clarity:
- "jargon heavy" → simplify language
- "punchy sentences work" → vary length more
- "repetitive" → use elegant variation

## Building the Preference Profile

After 3+ feedback entries, synthesize:

```markdown
## Auto-Generated Preference Profile

Based on [N] feedback entries:

### Voice Tendency
[Inferred voice preference with confidence %]

### Structural Preference
[How they like content organized]

### Content Style
[What types of examples/proof resonate]

### Language Patterns
[Sentence style, word choice preferences]

### Recommended Strategies
1. [strategy-name]: High priority because [feedback evidence]
2. [strategy-name]: Medium priority because [feedback evidence]

### Strategies to Avoid
1. [strategy-name]: Conflicts with [feedback evidence]
```

## Integration Points

### Reading Scratchpad
Before creating drafts:
```
1. Load .scratchpad.md
2. Extract preference profile
3. Weight recent feedback higher (recency decay)
4. Apply to strategy selection
```

### Writing to Scratchpad
After receiving feedback:
```
1. Parse feedback for sentiment
2. Categorize the feedback
3. Extract actionable principle
4. Append to log
5. Regenerate preference profile
```

### Conflict Resolution
When feedback contradicts:
```
Entry 1: "too casual"
Entry 5: "too formal"

Resolution options:
1. Recency wins (Entry 5 takes precedence)
2. Ask for clarification
3. Find the middle ground
```

## Recency Weighting

More recent feedback matters more:

| Age | Weight |
|-----|--------|
| Current turn | 1.0 |
| 1-3 turns ago | 0.8 |
| 4-6 turns ago | 0.5 |
| 7+ turns ago | 0.3 |

## Draft ID Tracking

Every draft gets a unique ID:
- IDs persist across the session
- Never reuse IDs
- Refinements keep original ID
- New explorations increment

```
Response 1: draft-1, draft-2, draft-3
Response 2: draft-4, draft-5, draft-6  (exploration)
Response 3: draft-4 refined (keeps ID)
```

## Scratchpad Lifecycle

```
Session Start
    │
    ▼
┌─────────────────────────────┐
│  /writing:feedback          │◄──┐
│  Add entry to scratchpad    │   │
└──────────────┬──────────────┘   │
               │                   │
               ▼                   │
┌─────────────────────────────┐   │
│  /writing:draft             │   │
│  Read & apply preferences   │   │
└──────────────┬──────────────┘   │
               │                   │
               ▼                   │
         User reviews              │
               │                   │
               └───────────────────┘

               │
               ▼
┌─────────────────────────────┐
│  /writing:compound          │
│  Persist to pattern library │
└─────────────────────────────┘
```

## Example Session

```
Turn 1:
  User: /writing:draft "AI in healthcare"
  Assistant: Creates draft-1, draft-2, draft-3

Turn 2:
  User: /writing:feedback draft-1 love the stat opening
  Scratchpad: ✓ Statistical hooks resonate

Turn 3:
  User: /writing:feedback draft-3 too formal, sounds like a press release
  Scratchpad: ✗ Avoid formal/corporate tone

Turn 4:
  User: /writing:draft refine draft-1
  Assistant: Reads scratchpad, applies preferences
  Creates refined draft-1 (keeps ID, uses casual tone + stats)

Turn 5:
  User: /writing:feedback draft-1 perfect, this is it
  Scratchpad: ✓ Casual + data-driven = winning combo

Turn 6:
  User: /writing:compound draft-1
  Pattern library: Adds "casual-data-hook" pattern
```

## Scratchpad File Location

Default: `drafts/.scratchpad.md`

Can be configured per project in `.claude/writing-config.yaml`:
```yaml
scratchpad:
  path: "drafts/.scratchpad.md"
  persist_sessions: true
  max_entries: 50
  auto_summarize_at: 10
```
