---
name: writing:plan
description: Transform a topic or brief into a researched outline with sources
argument-hint: "[topic, brief, or idea]"
---

# Writing Plan Command

Transform a topic or brief into a comprehensive research package and structured outline.

## Input

<topic> #$ARGUMENTS </topic>

---

## Skills to Load

Before starting, load these skills:

```
Skill: writing-orchestration
  - Two-gate assessment framework
  - Baseline strategies reference

Skill: context-notes
  - Handoff protocol for /writing:draft
```

---

## Step 1: Parse Input

Determine what we're working with:

| Input Type | Example | Action |
|------------|---------|--------|
| Vague topic | "AI" | Go to Step 2 (needs clarification) |
| Topic with angle | "Why AI will replace junior devs" | Skip to Step 3 |
| Full brief | "Blog post for CTOs about AI hiring" | Skip to Step 3 |
| Existing outline | "drafts/ai-hiring/outline.md" | Skip to Step 5 |

---

## Step 2: Clarify the Brief (BRAINSTORM)

**Use AskUserQuestion** to clarify vague inputs:

```
Question: "Let's sharpen this topic. What angle do you want to take?"

Options:
1. "Controversial take" - Challenge conventional wisdom
2. "How-to/Tutorial" - Teach something specific
3. "Story/Case study" - Narrative-driven
4. "Analysis/Opinion" - Your perspective on trends
5. Other - Describe your angle
```

**Then ask about audience:**

```
Question: "Who specifically are you writing for?"

Options:
1. "Technical practitioners" - Developers, engineers
2. "Business leaders" - CTOs, founders, managers
3. "General audience" - Curious non-experts
4. "Specific persona" - Describe them
```

**Then ask about outcome:**

```
Question: "What should readers do after reading?"

Options:
1. "Change their mind" - Shift perspective
2. "Take action" - Specific next step
3. "Share/discuss" - Spread the idea
4. "Learn something" - Understand a concept
```

**Then ask about format:**

```
Question: "What format and length?"

Options:
1. "Blog post (1000-2000 words)" - Standard long-form
2. "Newsletter (500-1000 words)" - Punchy, personal
3. "Deep dive (2500+ words)" - Comprehensive
4. "Social thread" - Twitter/LinkedIn series
```

**Capture answers as the brief:**

```markdown
## Brief

**Topic**: [original input]
**Angle**: [selected angle]
**Audience**: [selected audience]
**Desired Action**: [selected outcome]
**Format**: [selected format]
**Length**: [word count target]
```

---

## Step 3: Search Your Library (ALWAYS DO THIS)

Your past work is your best resource. Search local files first:

### 3a. Search Past Writing

```bash
# Search drafts/ for similar topics
grep -ri "[keywords from topic]" drafts/ --include="*.md"

# Search published/ if it exists
grep -ri "[keywords from topic]" published/ --include="*.md"

# Check .claude/writing-knowledge/pieces/ for past work
ls .claude/writing-knowledge/pieces/
```

**If relevant past pieces found:**
- Read them for voice, structure, hooks that worked
- Note reusable elements
- Check if this is a sequel/follow-up opportunity

### 3b. Load Patterns Library

```bash
# Check patterns you've captured
ls .claude/writing-knowledge/patterns/
cat .claude/writing-knowledge/patterns/hooks/*.md
cat .claude/writing-knowledge/patterns/structures/*.md
```

**Or check plugin patterns:**
```bash
ls docs/patterns/
```

**If patterns found for this topic type:**
- Load top 3 relevant patterns
- Note hook formulas that match
- Check structure templates

### 3c. Load Voice Profile

```bash
# Check available voice profiles
ls .claude/writing-knowledge/voices/
```

**If voice profile exists:**
- Load the profile
- Note key traits, prohibited words, rhythm patterns

### 3d. Check Scratchpad

```bash
cat drafts/.scratchpad.md
```

**Load any session preferences** from scratchpad.

### 3e. Summarize Local Research

```markdown
## From Your Library

**Past pieces on similar topics:**
- [piece 1] - [what's reusable]
- [piece 2] - [what's reusable]

**Patterns to use:**
- Hook: [pattern name]
- Structure: [pattern name]

**Voice profile:** [profile name or "infer from samples"]

**Scratchpad preferences:**
- [preference 1]
- [preference 2]
```

---

## Step 4: External Research (OPTIONAL)

**MANDATORY: Use the AskUserQuestion tool here. Do NOT output options as plain text.**

Your library is loaded. Do you need anything from outside?

```yaml
tool: AskUserQuestion
question: "I found [X] relevant pieces in your library. Do you need any external research?"
header: "Web Research"
multiSelect: true
options:
  - label: "No, use my library"
    description: "I have everything I need from past work"
  - label: "Find supporting stats"
    description: "Back up specific claims with external data"
  - label: "Check competitors"
    description: "See what others have written on this"
  - label: "Deep web research"
    description: "Full external research package"
```

Based on selection:

**If "No, use my library":**
- Skip to Step 5 (Two-Gate Assessment)
- Note in sources.md: "Original content - library sources only"

**If "Find supporting stats":**
```
Use AskUserQuestion:

Question: "What specific claims need external data?"
Options:
1. [Inferred from topic]
2. [Alternative claim]
3. Other - Describe what you need
```

Then run targeted web search only for that specific data.

**If "Check competitors":**
```
Task source-researcher: "Find top 3-5 existing pieces on: [topic]
Focus on: angles, gaps, differentiation opportunities"
```

**If "Deep web research":**
Run full research agents (sources, audience, competitors).

**Wait for any selected research to complete before proceeding.**

---

## Step 5: Two-Gate Assessment

Load the two-gate framework from `writing-orchestration` skill:

### Gate 1: Material Sufficiency

Ask: "Could I write this without inventing facts?"

**Checklist:**
- [ ] Have 3+ concrete examples
- [ ] Have data to support key claims
- [ ] Have expert voices to cite
- [ ] No major claims without sources

**If FAILS:**

```
Use AskUserQuestion:

Question: "Research gaps found. What should we do?"

Options:
1. "Deeper research" - Find more sources (describe what's missing)
2. "Narrow the angle" - Reduce scope to what we can support
3. "Proceed anyway" - Mark unsupported claims for later
```

### Gate 2: Message Clarity

Ask: "Do I know exactly what point to make?"

**Checklist:**
- [ ] Can state thesis in one sentence
- [ ] Angle is differentiated from competitors
- [ ] CTA is clear and actionable
- [ ] Know why this matters to audience

**If FAILS:**

```
Use AskUserQuestion:

Question: "The message needs sharpening. What's the ONE thing you want readers to remember?"

Options:
1. [Suggested thesis based on research]
2. [Alternative thesis]
3. [Alternative thesis]
4. Other - State your thesis
```

---

## Step 6: Generate Hook Options (BRAINSTORM)

Create 4-5 hook options using different patterns:

```
Use AskUserQuestion:

Question: "Which opening hook resonates most?"

Options:
1. **Story hook**: "[Concrete example/anecdote opening]"
2. **Stat hook**: "[Surprising statistic] + implication"
3. **Question hook**: "[Provocative question readers want answered]"
4. **Tension hook**: "[Problem that demands resolution]"
5. Other - Describe your ideal opening
```

---

## Step 7: Create Structure (BRAINSTORM)

Load structure patterns from knowledge base, then:

```
Use AskUserQuestion:

Question: "Which structure fits this piece?"

Options:
1. **Problem → Solution → Proof** - Classic persuasion
2. **Story → Lesson → Application** - Narrative-driven
3. **Myth → Reality → Implication** - Contrarian take
4. **List of [N] points** - Scannable insights
5. Custom - Describe your structure
```

---

## Step 8: Build Beat-by-Beat Outline

Using selected hook and structure:

```markdown
## Outline: [Working Title]

### Hook (0-50 words)
[Actual opening text or close approximation]
**Pattern used**: [hook type]

### Section 1: [Title] (~X words)
**Purpose**: [What this accomplishes]
**Key points**:
- [Point 1]
- [Point 2]
**Source needed**: [Specific source from research]
**Transition to next**: [How to move forward]

### Section 2: [Title] (~X words)
[Continue pattern...]

### Section 3: [Title] (~X words)
[Continue pattern...]

### Conclusion (~X words)
**Summary**: [Key takeaway restated]
**CTA**: [Specific action]
**Final line**: [Memorable closer - callback to hook?]

---

**Total estimated length**: X words
**Reading time**: X minutes
**Structure pattern**: [pattern name]
**Voice profile**: [profile name]
```

---

## Step 9: Save Output Files

Create in `drafts/[slug]/`:

```
drafts/
└── [slug]/
    ├── outline.md          # The structured outline
    ├── research.md         # Combined research package
    ├── sources.md          # Source list with citations
    └── brief.md            # Original brief and decisions
```

---

## Step 10: Output Context Notes

Generate handoff for `/writing:draft`:

```markdown
<context_notes>
## Research Summary
[2-3 sentences summarizing research phase]

## Material Available
- [Concrete example 1]
- [Data point 1 with source]
- [Quote 1 with attribution]

## Message Clarity
**Thesis**: [One sentence thesis]
**Audience**: [Specific audience]
**Desired Action**: [What reader should do]

## Voice Configuration
**Profile**: [voice profile name or "infer"]
**Style Guide**: [style guide name or "none"]
**Channel**: [blog/newsletter/social/docs]

## Mode
EXPLORATION
</context_notes>
```

---

## Step 11: Post-Planning Options

**MANDATORY: Use the AskUserQuestion tool here. Do NOT output options as plain text.**

```yaml
tool: AskUserQuestion
question: "Outline ready at `drafts/[slug]/outline.md`. What would you like to do next?"
header: "Next"
options:
  - label: "Open outline"
    description: "View the outline in editor for review"
  - label: "Deepen research"
    description: "Get more sources on specific sections"
  - label: "Review outline"
    description: "Get structural feedback before drafting"
  - label: "Start drafting"
    description: "Run /writing:draft drafts/[slug]/outline.md"
```

Based on selection:
- **Open outline** → Run `open drafts/[slug]/outline.md` to open in default editor
- **Deepen research** → Ask which sections need more sources, then run source-researcher agent
- **Review outline** → Run structure-architect agent on the outline
- **Start drafting** → Call `/writing:draft drafts/[slug]/outline.md`
- **Other** (automatically provided) → Accept free text for adjustments

---

## Quality Checklist

Before completing:
- [ ] Brief is fully clarified (what, who, why, format)
- [ ] Research covers sources, audience, competitors
- [ ] Material sufficiency gate passed
- [ ] Message clarity gate passed
- [ ] Hook is concrete (not abstract)
- [ ] Each section has clear purpose and sources
- [ ] Transitions are planned
- [ ] CTA is specific
- [ ] Context notes ready for handoff
