---
name: writing:feedback
description: Capture real-time feedback into scratchpad for iterative refinement
argument-hint: "[draft-ID or 'general'] [feedback text]"
---

# Writing Feedback Command

Capture what works and what doesn't into a persistent scratchpad that guides future drafts.

## Input

<feedback_input> #$ARGUMENTS </feedback_input>

**Input Format:**
- `draft-2 love the opening hook` → Positive feedback on draft-2
- `3 too formal` → Negative feedback on draft-3
- `general prefer short sentences` → General preference
- `draft-1 👍` → Quick thumbs up
- `draft-2 👎 too corporate` → Quick thumbs down with reason

---

## Skills to Load

```
Skill: scratchpad
  - Preference profile structure
  - Recency weighting
  - Conflict detection
```

---

## Step 1: Parse Input

```
Extract from input:
- target: Draft ID (e.g., "draft-2", "3") or "general"
- feedback: The feedback text after the target
- timestamp: Current time
```

---

## Step 2: Detect Sentiment

Analyze feedback for sentiment:

| Signal Words | Sentiment |
|-------------|-----------|
| love, good, perfect, yes, great, 👍, ✓ | Positive |
| bad, weak, wrong, no, hate, 👎, ✗ | Negative |
| prefer, should, could, try | Suggestion |
| ? | Question (needs clarification) |

---

## Step 3: Categorize Feedback

Determine which aspect of writing this affects:

| Category | Examples |
|----------|----------|
| **Voice & Tone** | "too formal", "love the warmth", "sounds corporate" |
| **Structure & Flow** | "opening is weak", "lost me in the middle", "perfect build-up" |
| **Content & Substance** | "needs more examples", "love the stats", "too abstract" |
| **Style & Language** | "jargon heavy", "punchy sentences work", "too long" |

---

## Step 4: Extract Principle

Transform raw feedback into actionable principle:

| Raw Feedback | Extracted Principle |
|--------------|---------------------|
| "draft-2's opening is too weak" | Openings need stronger hooks |
| "love the stats in draft-1" | Data points resonate |
| "too formal" | Prefer conversational tone |
| "the gardening analogy was perfect" | Concrete analogies work |
| "lost me in section 3" | Transitions need work |

---

## Step 5: Check for Conflicts

If new feedback contradicts existing scratchpad entries:

```
Use AskUserQuestion:

Question: "I'm seeing conflicting preferences:

Previous: '[earlier feedback]' → [principle]
Current: '[new feedback]' → [principle]

Which should take priority?"

Options:
1. **New feedback wins** - Update preference to current
2. **Keep previous** - This piece is an exception
3. **Both are true** - Context-dependent, keep both with notes
4. **Clarify** - Help me understand the nuance
```

---

## Step 6: Update Scratchpad

Append to `drafts/.scratchpad.md`:

```markdown
---
## Feedback Entry [timestamp]

**Target**: [draft-ID or general]
**Sentiment**: [positive/negative/suggestion]
**Category**: [voice/structure/content/style]
**Raw**: "[Original feedback text]"

**Principle extracted**: [Actionable learning]
**Strategy impact**: [Which strategies to prioritize/avoid]

---
```

---

## Step 7: Regenerate Preference Profile

After 3+ entries, update the preference profile at top of scratchpad:

```markdown
---
updated: [timestamp]
entries: [count]
---

# Writing Scratchpad

## Preference Profile (Auto-Generated)

### What Works ✓
- [Pattern 1] - evidence: [draft-IDs]
- [Pattern 2] - evidence: [draft-IDs]

### What Doesn't ✗
- [Anti-pattern 1] - evidence: [draft-IDs]
- [Anti-pattern 2] - evidence: [draft-IDs]

### Voice Tendency
Inferred preference: [description]
Confidence: [high/medium/low based on consistency]

### Strategy Recommendations
Based on [N] feedback entries:
- Prioritize: [strategy-1], [strategy-2]
- Avoid: [strategy-3]
- Neutral: [strategy-4]

### Conflicts Noted
- [Any unresolved conflicts with context]
```

---

## Step 8: Confirm Capture

Output confirmation:

```markdown
✓ Feedback captured for [target]

**Sentiment**: [positive/negative/suggestion]
**Category**: [category]
**Principle**: [extracted principle]

**Scratchpad now has [N] entries:**
- What Works ✓: [key patterns]
- What Doesn't ✗: [key anti-patterns]

Next drafts will apply these preferences.
```

---

## Quick Shortcuts

For fast feedback capture:

```bash
# Positive feedback
/writing:feedback 2 good - love the opening hook
/writing:feedback draft-1 👍

# Negative feedback
/writing:feedback 3 bad - too formal, sounds corporate
/writing:feedback 2 👎 weak opening

# General preferences
/writing:feedback general prefer short punchy sentences
/writing:feedback general always lead with data

# Compare drafts
/writing:feedback draft-2 better than draft-1, more concrete
```

---

## Integration with Other Commands

### /writing:draft reads scratchpad

```
Before creating new drafts:
1. Load drafts/.scratchpad.md
2. Extract preference profile
3. Apply "What Works ✓" patterns
4. Avoid "What Doesn't ✗" anti-patterns
5. Weight recent feedback higher
```

### /writing:review considers scratchpad

```
During review:
1. Check draft against scratchpad preferences
2. Flag violations of "What Doesn't Work"
3. Highlight alignment with "What Works"
4. Add new learnings to scratchpad
```

### /writing:compound promotes patterns

```
When compounding:
1. Identify preferences with 3+ occurrences
2. Promote to permanent pattern library
3. Add to voice profile
4. Clear promoted entries from scratchpad
```

---

## Scratchpad Lifecycle

```
Session Start
    │
    ▼
┌───────────────────────────┐
│ /writing:feedback         │◀──┐
│ Add entry to scratchpad   │   │
└─────────────┬─────────────┘   │
              │                  │
              ▼                  │
┌───────────────────────────┐   │
│ /writing:draft            │   │
│ Read & apply preferences  │   │
└─────────────┬─────────────┘   │
              │                  │
              ▼                  │
       User reviews              │
              │                  │
              └──────────────────┘
              │
              ▼
┌───────────────────────────┐
│ /writing:compound         │
│ Promote to pattern library│
└───────────────────────────┘
```

---

## Recency Weighting

More recent feedback carries more weight:

| Age | Weight | Meaning |
|-----|--------|---------|
| Current turn | 1.0 | Highest priority |
| 1-3 turns ago | 0.8 | Still very relevant |
| 4-6 turns ago | 0.5 | Consider but may be outdated |
| 7+ turns ago | 0.3 | Background context only |

When preferences conflict, recency typically wins unless user specifies otherwise.

---

## Example Session

```
Turn 1:
  User: /writing:draft "AI in healthcare"
  → Creates draft-1, draft-2, draft-3

Turn 2:
  User: /writing:feedback draft-1 love the stat opening
  → Scratchpad: ✓ Statistical hooks resonate

Turn 3:
  User: /writing:feedback draft-3 too formal, sounds like a press release
  → Scratchpad: ✗ Avoid formal/corporate tone

Turn 4:
  User: /writing:feedback general prefer conversational tone with data
  → Scratchpad: ✓ Conversational + data-driven = winning combo

Turn 5:
  User: /writing:draft refine draft-1
  → Reads scratchpad, applies: stat hook + conversational tone
  → Avoids: formal language
  → Creates refined draft-1

Turn 6:
  User: /writing:feedback draft-1 perfect, this is it
  → Scratchpad: ✓ Confirmed: casual + data = success
  → Ready for /writing:compound
```

---

## Quality Checklist

Before completing:
- [ ] Input parsed correctly (target + feedback)
- [ ] Sentiment detected accurately
- [ ] Category assigned appropriately
- [ ] Principle extracted (actionable, specific)
- [ ] Conflicts checked and resolved
- [ ] Scratchpad updated
- [ ] Preference profile regenerated (if 3+ entries)
- [ ] Confirmation shown to user
