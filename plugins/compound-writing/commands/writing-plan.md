---
name: writing:plan
description: Transform a topic or brief into a researched outline with sources
argument-hint: "[topic, brief, or idea]"
---

# Writing Plan Command

Transform a topic or brief into a comprehensive research package and structured outline.

## Input

<topic> #$ARGUMENTS </topic>

## Workflow Overview

This command executes the **research and planning phase** of the writing workflow:
1. Clarify the brief (what, who, why)
2. Parallel research (sources, audience, competitors)
3. Two-gate assessment (material sufficiency, message clarity)
4. Create structured outline with hooks

## Phase 1: Clarify the Brief

Before any research, answer these questions:

### The Core Questions
1. **What's the argument?** - The specific point to make (not just the topic)
2. **Who's the reader?** - Specific audience, not "everyone"
3. **What should they do after?** - The call to action

### Brief Clarification
If the input is vague, use AskUserQuestion to clarify:

```
Questions to ask:
- "What's the specific angle or argument? (Not just the topic, but your take)"
- "Who specifically are you writing for?"
- "What should readers do after reading?"
- "What channel? (blog, newsletter, social, documentation)"
- "Target length? (short: <1000 words, medium: 1000-2500, long: 2500+)"
```

Only proceed when you have clear answers.

## Phase 2: Parallel Research

Launch three research agents simultaneously:

```
Task source-researcher: "Research sources for: [topic]
Find:
- Primary sources (original research, data)
- Expert perspectives
- Supporting statistics
- Concrete examples
Return structured source list with quotes and reliability ratings."

Task source-researcher: "Analyze the target audience for: [topic]
Determine:
- What they already know
- Their emotional state
- Their goals and objections
- The action they should take
Return audience profile."

Task source-researcher: "Analyze competitor content for: [topic]
Find:
- Top existing pieces on this topic
- Their angles and approaches
- Gaps and weaknesses
- Differentiation opportunities
Return competitive analysis."
```

## Phase 3: Two-Gate Assessment

### Gate 1: Material Sufficiency
Ask: "Could I write this without inventing facts?"

**Pass criteria:**
- [ ] Concrete examples available
- [ ] Data to support key claims
- [ ] Expert voices to cite
- [ ] No major claims without sources

**If fails:** Return to research with specific gaps identified.

### Gate 2: Message Clarity
Ask: "Do I know the specific point to make?"

**Pass criteria:**
- [ ] Can state the thesis in one sentence
- [ ] The angle is differentiated from competitors
- [ ] The CTA is clear and actionable

**If fails:** Clarify the angle before proceeding.

## Phase 4: Create Outline

Using the structure-architect agent patterns:

### Generate Hook Options

Create 3-5 hook options:
- **Story opening**: Concrete example first
- **Surprising stat**: Data that demands explanation
- **Tension**: Problem that needs resolution
- **Question**: Something reader genuinely wants answered

Present options to user with recommendation.

### Create Beat-by-Beat Outline

```markdown
## Outline: [Title]

### Hook (0-50 words)
[Actual opening text or close approximation]

### Section 1: [Title] (~X words)
**Purpose**: [What this accomplishes]
**Key points**:
- Point 1
- Point 2
**Source needed**: [Specific source from research]
**Transition**: [How to move to next section]

### Section 2: [Title] (~X words)
[Continue pattern...]

### Conclusion (~X words)
**Summary**: [Key takeaway restated]
**CTA**: [Specific action]
**Final line**: [Memorable closer]

---

**Total estimated length**: X words
**Reading time**: X minutes
```

## Output Files

Create in `drafts/[slug]/`:

```
drafts/
└── [slug]/
    ├── outline.md          # The structured outline
    ├── research.md         # Combined research package
    └── sources.md          # Source list with citations
```

## Post-Planning Options

After creating the outline, use AskUserQuestion:

**Question**: "Outline ready at `drafts/[slug]/outline.md`. What next?"

**Options**:
1. **Deepen research** - Get more sources on specific sections
2. **Review outline** - Get structural feedback before drafting
3. **Start drafting** - Run `/writing:draft drafts/[slug]/outline.md`
4. **Adjust angle** - Refine the thesis or approach

## Quality Checklist

Before completing:
- [ ] Brief is clarified (what, who, why)
- [ ] Research covers sources, audience, competitors
- [ ] Material sufficiency gate passed
- [ ] Message clarity gate passed
- [ ] Hook is concrete (not abstract)
- [ ] Each section has clear purpose
- [ ] Transitions are planned
- [ ] CTA is specific
