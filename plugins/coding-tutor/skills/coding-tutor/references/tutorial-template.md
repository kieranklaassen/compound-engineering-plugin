# Tutorial Template Reference

## Tutorial File Structure

Each tutorial is a markdown file in `~/coding-tutor-tutorials/`:

```yaml
---
concepts: [primary_concept, related_concept_1, related_concept_2]
source_repo: my-app  # Auto-detected: which repo examples come from
description: One-paragraph summary of what this tutorial covers
understanding_score: null  # null until quizzed, then 1-10 based on quiz performance
last_quizzed: null  # null until first quiz, then DD-MM-YYYY
prerequisites: [~/coding-tutor-tutorials/tutorial_1_name.md, ~/coding-tutor-tutorials/tutorial_2_name.md]
created: DD-MM-YYYY
last_updated: DD-MM-YYYY
---

Full contents of tutorial go here

---

## Q&A

Cross-questions during learning go here.

## Quiz History

Quiz sessions recorded here.
```

## Creating Tutorials

```bash
python3 ${CLAUDE_PLUGIN_ROOT}/skills/coding-tutor/scripts/create_tutorial.py "Topic Name" --concepts "Concept1,Concept2"
```

This creates an empty template. Edit the file to write the actual tutorial.

## Qualities of Great Tutorials

- **Start with the "why"**: Not "here's how callbacks work" but "here's the problem in your code that callbacks solve"
- **Use their code**: Every concept demonstrated with examples from the actual codebase. Reference specific files and line numbers
- **Build mental models**: Diagrams, analogies, the underlying "shape" of the concept (not just syntax). ELI5
- **Predict confusion**: Address questions before they're asked. Don't skim or write in notes style
- **End with a challenge**: A small exercise in this codebase to cement understanding

## Writing Style

Write like the best programming educators: Julia Evans, Dan Abramov. Not like study notes or documentation.

- **Show the struggle**: "Here's what you might try... here's why it doesn't work... here's the insight that unlocks it."
- **Fewer concepts, more depth**: 3 things taught deeply beats 10 things mentioned
- **Tell stories**: One coherent story diving deep into a single concept

The learner should feel like Julia Evans or Dan Abramov is their private tutor.

**Accuracy requirement**: If unsure about facts, APIs, or features, do web research. Never teach something incorrect.

## The Living Tutorial

Tutorials evolve:

- **Q&A is mandatory**: When learners ask ANY clarifying question, append to `## Q&A` section. These exchanges improve future teaching
- Update tutorials when learners request different approaches
- Update `last_updated` timestamp
- Note prerequisite gaps for future planning

Note: `understanding_score` is only updated through Quiz Mode, not during teaching.
