---
name: writing:knowledge
description: Manage workspace knowledge - voice profiles, patterns, and reference materials
argument-hint: "[search|add|list|import] [query or content]"
---

# Writing Knowledge Command

Build and query your writing knowledge base - voice profiles, proven patterns, and reference materials.

## Input

<knowledge_input> #$ARGUMENTS </knowledge_input>

**Input Types:**
- `search "opening hooks for technical content"` → Query knowledge
- `add pattern "The Callback Close..."` → Add new pattern
- `list patterns` → Browse patterns
- `list voice-profiles` → Browse voices
- `import voice-profile samples/*.md` → Extract voice from samples

---

## Skills to Load

```
Skill: voice-capture
  - Extract voice patterns from samples
  - Build voice profiles

Skill: scratchpad
  - Connect session preferences to knowledge
```

---

## Knowledge Architecture

```
.claude/writing-knowledge/
├── voice-profiles/          # Encoded writing voices
│   ├── kieran-blog.yaml
│   └── company-formal.yaml
├── patterns/                 # Proven patterns
│   ├── hooks/               # Opening formulas
│   ├── structures/          # Article templates
│   ├── transitions/         # Flow techniques
│   └── closings/            # Ending formulas
├── references/              # Source materials
│   ├── style-guides/
│   └── exemplars/
└── index.md                 # Searchable index
```

---

## Action: `search`

**Usage:** `/writing:knowledge search "query"`

### Step 1: Parse Query

```
Extract:
- Keywords: [main terms]
- Intent: [hooks/structure/voice/style/all]
- Context: [if any specific context mentioned]
```

### Step 2: Search All Sources

```
Search in parallel:
1. Voice profiles → Relevant traits and guidance
2. Patterns → Matching techniques
3. References → Example excerpts
4. Scratchpad → Session preferences that apply
```

### Step 3: Rank Results

```
Ranking factors:
- Keyword match strength
- Recency of creation/update
- Usage count (if tracked)
- Success rate (if tracked)
```

### Step 4: Present Results

```markdown
## Knowledge Search: "[query]"

### Voice Profile Match
**[profile-name]** recommends:
- [Relevant guidance 1]
- [Relevant guidance 2]

### Relevant Patterns
**[pattern-name]** (used Xx, Y% positive)
> "[Example or formula]"
**When to use**: [context]

**[pattern-name-2]** (used Xx, Y% positive)
> "[Example or formula]"

### Reference Examples
From `exemplars/[file].md`:
- [Relevant excerpt with context]

### Session Preferences
From scratchpad:
- [Any relevant current preferences]
```

### Step 5: Offer Next Steps (BRAINSTORM)

```
Use AskUserQuestion:

Question: "Found [N] relevant results. What would you like to do?"

Options:
1. **Use [top pattern]** - Apply to current draft
2. **Show more details** - Expand on specific result
3. **Refine search** - Try different keywords
4. **Add to current piece** - Insert pattern into outline/draft
```

---

## Action: `add`

**Usage:** `/writing:knowledge add [type] "[content]"`

### Step 1: Determine Type

| Command | Type | Destination |
|---------|------|-------------|
| `add pattern hooks "..."` | Hook pattern | patterns/hooks/ |
| `add pattern structure "..."` | Structure | patterns/structures/ |
| `add pattern transition "..."` | Transition | patterns/transitions/ |
| `add voice-profile "..."` | Voice traits | voice-profiles/ |
| `add reference "..."` | Reference material | references/ |

### Step 2: Extract Attributes (BRAINSTORM)

```
Use AskUserQuestion:

Question: "Adding new [type]. Let me capture the details:"

Options for pattern:
1. **Quick add** - Just save with basic metadata
2. **Full documentation** - Add examples, when to use, variations
```

If full documentation:

```
Question: "When should this pattern be used?"

Options:
1. [Suggested context 1]
2. [Suggested context 2]
3. [Suggested context 3]
4. Custom - Describe the context
```

### Step 3: Create Pattern File

```markdown
---
title: "[Pattern Name]"
type: [hook/structure/transition/closing]
created: [timestamp]
source: "manual"
tags: [tag1, tag2]
usage_count: 0
success_rate: null
---

## Pattern

[Description of the pattern]

## Formula

"[Pattern with placeholders]"

## Example

> [Concrete example]

## When to Use

- [Context 1]
- [Context 2]

## Variations

- [Variation 1]
- [Variation 2]
```

### Step 4: Update Index

Append to `.claude/writing-knowledge/index.md`:

```markdown
### [Category]
- **[pattern-name]**: [brief description] - [date added]
```

### Step 5: Confirm

```markdown
✓ Pattern added: [pattern-name]

**Saved to**: [file path]
**Tags**: [tags]
**Searchable via**: "/writing:knowledge search [keywords]"
```

---

## Action: `list`

**Usage:** `/writing:knowledge list [category]`

### Categories

```
/writing:knowledge list patterns      → All patterns
/writing:knowledge list hooks         → Hook patterns only
/writing:knowledge list structures    → Structure templates
/writing:knowledge list voice-profiles → All voice profiles
/writing:knowledge list references    → Reference materials
/writing:knowledge list all           → Everything
```

### Output Format

```markdown
## [Category] ([count] items)

### Most Used
1. **[name]** - [description] - used [N]x
2. **[name]** - [description] - used [N]x

### Recently Added
1. **[name]** - [description] - [date]
2. **[name]** - [description] - [date]

### By Tag
**[tag]**: [pattern1], [pattern2]
**[tag]**: [pattern3], [pattern4]
```

### Offer Actions (BRAINSTORM)

```
Use AskUserQuestion:

Question: "Showing [N] [category]. What would you like to do?"

Options:
1. **View details** - Show full pattern for [top item]
2. **Search within** - Filter by keyword
3. **Edit** - Modify an existing pattern
4. **Delete** - Remove outdated pattern
5. **Done** - Exit
```

---

## Action: `import`

**Usage:** `/writing:knowledge import [type] [source]`

### Import Voice Profile

```bash
/writing:knowledge import voice-profile samples/my-best-posts/*.md
```

#### Step 1: Load Samples

```
Load skill: voice-capture

Read all files matching the pattern
Extract for each:
- Word count
- Sentence patterns
- Vocabulary frequency
- Tone markers
```

#### Step 2: Analyze Voice (BRAINSTORM)

```
Use AskUserQuestion:

Question: "Analyzed [N] writing samples. I found these consistent patterns:

**Vocabulary**: [findings]
**Rhythm**: [findings]
**Tone**: [findings]

What should I call this voice profile?"

Options:
1. **[auto-suggested-name]** - Based on detected style
2. **Custom name** - Enter your own
```

#### Step 3: Create Profile

```yaml
# .claude/writing-knowledge/voice-profiles/[name].yaml

name: "[name]"
created: [timestamp]
source: "imported from [N] samples"

traits:
  vocabulary:
    technical_level: [accessible/moderate/expert]
    formality: [casual/professional/academic]
    distinctive_words: [list]
    prohibited: [list]

  rhythm:
    avg_sentence_length: [X] words
    pattern: "[description]"
    paragraph_length: [X] sentences

  tone:
    emotional_register: [warm/neutral/intense]
    personality: [high/medium/low]
    direct_address: [yes/no]
    humor: [present/absent]

channels:
  blog: "[channel-specific guidance]"
  newsletter: "[channel-specific guidance]"
  social: "[channel-specific guidance]"

exemplars:
  - path: "[sample-1-path]"
    why: "[what it demonstrates]"
  - path: "[sample-2-path]"
    why: "[what it demonstrates]"
```

#### Step 4: Confirm

```markdown
✓ Voice profile created: [name]

**Based on**: [N] samples
**Key traits**:
- [trait 1]
- [trait 2]
- [trait 3]

**Use with**: `/writing:draft` will now offer this voice
**Edit**: `.claude/writing-knowledge/voice-profiles/[name].yaml`
```

### Import Patterns

```bash
/writing:knowledge import patterns competitor-analysis.md
```

Extracts patterns from analysis documents and adds to pattern library.

### Import References

```bash
/writing:knowledge import reference company-style-guide.pdf
```

Adds to references for use by style-checking agents.

---

## Two-Level Knowledge System

### Level 1: Instant Access (Brief)

Loaded into every writing session automatically:
- Active voice profile traits
- Top 5 proven patterns (by usage/success)
- Key prohibitions

### Level 2: Deep Lookup (Search)

Queried on demand via `/writing:knowledge search`:
- All pattern variations
- Complete exemplar library
- Historical feedback data
- Full reference materials

---

## Integration with Commands

### /writing:plan
```
Before planning:
1. Load Level 1 knowledge (brief)
2. Check for relevant patterns for topic
3. Apply voice profile constraints
```

### /writing:draft
```
During drafting:
1. Query Level 2 for specific techniques
2. Match patterns to content type
3. Enforce voice profile rules
```

### /writing:review
```
During review:
1. Check against voice profile
2. Verify pattern usage
3. Flag knowledge violations
```

### /writing:compound
```
After success:
1. Extract new patterns → add to knowledge
2. Update pattern usage counts
3. Reinforce what worked
```

---

## Building Your Knowledge Base

### Start with Voice Profile

```bash
# Capture voice from your best writing
/writing:knowledge import voice-profile ~/blog/best-posts/*.md

# Or define manually
/writing:knowledge add voice-profile "direct, uses analogies, avoids jargon"
```

### Add Patterns as You Write

```bash
# After compounding a successful piece
/writing:compound latest

# Manually add a technique
/writing:knowledge add pattern hooks "Start with the ending - reveal outcome first"
```

### Import References

```bash
# Add style guides
/writing:knowledge import reference company-style-guide.pdf

# Add exemplars
/writing:knowledge import reference best-blog-post.md
```

---

## Natural Language Queries

These all work:

```bash
/writing:knowledge search "how do I write better openings?"
/writing:knowledge search "examples of data-driven hooks"
/writing:knowledge search "what does my blog voice sound like?"
/writing:knowledge search "patterns for technical tutorials"
/writing:knowledge search "transitions between sections"
```

---

## Quality Checklist

Before completing:
- [ ] Action correctly identified (search/add/list/import)
- [ ] Knowledge type determined
- [ ] Relevant sources searched/created
- [ ] Results formatted clearly
- [ ] Index updated (for add/import)
- [ ] User offered relevant next steps
