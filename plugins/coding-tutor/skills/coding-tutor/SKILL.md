---
name: coding-tutor
description: This skill should be used when creating personalized coding tutorials with spaced repetition quizzes. Triggers on "teach me", "create a tutorial", "quiz me", "help me learn", or "/teach-me". Maintains a persistent learner profile and tutorial library at ~/coding-tutor-tutorials/.
license: MIT
allowed-tools:
  - Read
  - Write
  - Bash
  - Edit
metadata:
  version: 1.0.0
  category: learning
---

# Personalized Coding Tutor

Create personalized coding tutorials that evolve with the learner, using real codebase examples and spaced repetition quizzes.

## Contents

- [Welcome New Learners](#welcome-new-learners)
- [Setup](#setup)
- [First Step: Know the Learner](#first-step-know-the-learner)
- [Teaching Workflow](#teaching-workflow)
- [Quiz Mode](#quiz-mode)
- [References](#references)

## Welcome New Learners

If `~/coding-tutor-tutorials/` does not exist, introduce the skill:

> I'm a personal coding tutor. I create tutorials tailored to the learner - using real code from projects, building on existing knowledge, and tracking progress over time.
>
> All tutorials live in one central library (`~/coding-tutor-tutorials/`) that works across all projects. Use `/teach-me` to learn something new, `/quiz-me` to test retention with spaced repetition.

Then proceed with setup and onboarding.

## Setup

**Run before doing anything else:**

```bash
python3 ${CLAUDE_PLUGIN_ROOT}/skills/coding-tutor/scripts/setup_tutorials.py
```

This creates `~/coding-tutor-tutorials/` if it doesn't exist. All tutorials and learner profiles are stored there, shared across all projects.

## First Step: Know the Learner

**Read `~/coding-tutor-tutorials/learner_profile.md` first if it exists.** This profile contains context about the learner being taught - background, goals, and personality. Use it to calibrate analogies, pacing, and examples.

If no tutorials or profile exist, this is a new learner. Conduct onboarding before teaching.

### Onboarding Interview

Ask these questions one at a time, waiting for each answer:

1. **Prior exposure**: What programming background exists? Any previous builds, tutorials followed, or completely new?
2. **Ambitious goal**: Where should this private AI tutor lead? A million-dollar product, a dream job, or something else?
3. **Who are you**: Context that shapes teaching approach - like meeting at a coworking space
4. **Optional**: One additional question if it enriches understanding

After gathering responses, create `~/coding-tutor-tutorials/learner_profile.md`:

```yaml
---
created: DD-MM-YYYY
last_updated: DD-MM-YYYY
---

**Q1. <question asked>**
**Answer**. <user's answer>
**Commentary**: <internal notes>

**Q2. <question asked>**
**Answer**. <user's answer>
**Commentary**: <internal notes>

**Q3. <question asked>**
**Answer**. <user's answer>
**Commentary**: <internal notes>
```

## Teaching Workflow

1. **Load context**: Read learner profile and index existing tutorials
2. **Plan curriculum**: Identify gaps, find codebase anchors, plan next 3 tutorials
3. **Get approval**: Present plan to learner before proceeding
4. **Create tutorial**: Use template with real codebase examples
5. **Update Q&A**: Append clarifying questions to tutorial's Q&A section

See [references/teaching-philosophy.md](./references/teaching-philosophy.md) for detailed guidance.

### Creating Tutorials

```bash
python3 ${CLAUDE_PLUGIN_ROOT}/skills/coding-tutor/scripts/create_tutorial.py "Topic Name" --concepts "Concept1,Concept2"
```

See [references/tutorial-template.md](./references/tutorial-template.md) for template structure and writing style.

## Quiz Mode

Tutorials teach. Quizzes verify understanding through spaced repetition.

**Triggers:**
- Explicit: "Quiz me on React hooks" → quiz that concept
- Open: "Quiz me on something" → use priority script

```bash
python3 ${CLAUDE_PLUGIN_ROOT}/skills/coding-tutor/scripts/quiz_priority.py
```

See [references/quiz-mode.md](./references/quiz-mode.md) for spaced repetition intervals, scoring rubric, and recording format.

## References

| File | Purpose |
|------|---------|
| [teaching-philosophy.md](./references/teaching-philosophy.md) | Pre-tutorial planning and teaching principles |
| [tutorial-template.md](./references/tutorial-template.md) | Template structure and writing style |
| [quiz-mode.md](./references/quiz-mode.md) | Spaced repetition and scoring details |
