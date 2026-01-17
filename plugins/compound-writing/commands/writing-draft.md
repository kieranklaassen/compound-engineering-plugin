---
name: writing:draft
description: Transform an outline into prose following style preferences
argument-hint: "[path to outline.md]"
---

# Writing Draft Command

Execute an outline into prose, following style preferences and voice profiles.

## Input

<outline_path> #$ARGUMENTS </outline_path>

## Workflow Overview

This command executes the **drafting phase**:
1. Load outline and research
2. Load applicable style guide
3. Pre-draft checklist
4. Section-by-section drafting with voice guardian loop
5. Quality checkpoints

## Phase 1: Load Context

### Read Outline and Research
```
Read the outline file at [outline_path]
Read associated research.md and sources.md in same directory
Extract:
- The thesis/argument
- The hook
- Section structure
- Source requirements per section
```

### Load Style Guide
Check for applicable style:

1. **Check for voice profile**: `.claude/voice-profiles/[name].yaml`
2. **Check for style skill**: `every-style-editor`, `dhh-writing`, `pragmatic-writing`
3. **Ask if none found**: "Which style should I use? (Every style, DHH style, Pragmatic style, or provide custom)"

### Extract Channel Guidance
Based on outline metadata or ask:
- Blog: longer form, storytelling allowed
- Newsletter: personality forward, direct address okay
- Social: punchy, hooks required
- Documentation: clear, step-by-step, minimal personality

## Phase 2: Pre-Draft Checklist

Before writing any prose, verify:

- [ ] **Opening is concrete** - Story or example first, not theory
- [ ] **Each section has clear purpose** - Know what each must accomplish
- [ ] **Sources are sufficient** - Every claim can be supported
- [ ] **Voice is defined** - Know the style to match

If any fail, return to `/writing:plan` to address.

## Phase 3: Section-by-Section Drafting

### The Producer-Critic Loop

For each section, use iterative voice-guardian feedback:

```
Loop for each section:
  1. Draft the section following:
     - Outline beats
     - Style guide rules
     - Baseline strategies (short sentences, active voice, concrete examples)

  2. Run voice-guardian check:
     Task voice-guardian: "Check this section against voice profile:
     [section text]
     Voice profile: [profile details]
     Return score (0-100) and specific fixes needed."

  3. If score < 85:
     - Apply suggested fixes
     - Re-check until score ≥ 85

  4. If score ≥ 85:
     - Move to next section
```

### Baseline Writing Strategies

Apply these to all content:
- **Short sentences**: Average 15-20 words
- **Active voice**: Subject does the action
- **Concrete examples**: Show, don't tell
- **One idea per paragraph**: No cramming
- **Strong verbs**: Avoid "is", "was", "has"

### Situational Strategies

Apply based on context:

**For technical content**:
- Concrete before abstract
- Physical analogies for concepts
- Code examples where helpful

**For persuasive content**:
- Acknowledge objections
- Use social proof
- Build to the ask

**For storytelling**:
- Sensory details
- Dialogue where appropriate
- Tension and release

## Phase 4: Draft Assembly

### Combine Sections
```markdown
# [Title]

[Hook - opening 50 words]

[Section 1]

[Section 2]

...

[Conclusion with CTA]
```

### Quality Checkpoints

Verify before saving:
- [ ] Opening hooks within first 50 words
- [ ] No paragraph over 4 sentences
- [ ] Concrete example in each major section
- [ ] All claims have sources
- [ ] Clear CTA at end
- [ ] Overall voice score ≥ 85

## Output

Save draft to: `drafts/[slug]/draft-v1.md`

```markdown
---
title: "[Title]"
version: 1
style: "[style used]"
voice_score: [final score]
word_count: [count]
reading_time: "[X] minutes"
created: [timestamp]
---

[Draft content]

---

## Draft Notes
- Sources used: [list]
- Style guide applied: [name]
- Voice profile: [name or "none"]
```

## Post-Draft Options

After creating draft, use AskUserQuestion:

**Question**: "Draft ready at `drafts/[slug]/draft-v1.md` ([X] words, voice score: [Y]). What next?"

**Options**:
1. **Run editorial review** - `/writing:review drafts/[slug]/draft-v1.md`
2. **Tighten/edit manually** - Open draft for hands-on editing
3. **Generate variations** - Create 2 more drafts with different angles
4. **Quick style check** - Run clarity-editor pass only

## Common Issues

### Voice Score Won't Reach 85
- Review voice profile - may be too strict
- Check if content type matches voice
- Consider adjusting profile for this piece

### Draft Feels Flat
- Add more concrete examples
- Strengthen the opening hook
- Vary sentence length more
- Add tension or stakes

### Too Long/Too Short
- Review outline section estimates
- Cut less essential sections for shorter
- Expand examples for longer
