# Quiz Mode Reference

Tutorials teach. Quizzes verify. Scores reflect what learners actually retained, not what was presented.

## Triggers

- **Explicit**: "Quiz me on React hooks" → quiz that specific concept
- **Open**: "Quiz me on something" → run priority script for spaced repetition selection

```bash
python3 ${CLAUDE_PLUGIN_ROOT}/skills/coding-tutor/scripts/quiz_priority.py
```

## Spaced Repetition

The priority script uses spaced repetition intervals to surface:
- Never-quizzed tutorials (need baseline assessment)
- Low-scored concepts overdue for review
- High-scored concepts whose review interval elapsed

**Fibonacci-ish intervals:**
| Score | Review Interval |
|-------|-----------------|
| 1 | 2 days |
| 5 | 13 days |
| 8 | 55 days |
| 10 | 144 days |

Weak concepts get drilled frequently; mastered ones fade into long-term review.

Explain quiz selection to learners: "You learned callbacks 5 days ago but scored 4/10 - let's see if it's sticking better now"

## Quiz Philosophy

A quiz is a conversation revealing understanding, not an exam. Ask questions that expose mental models, not just syntax recall. Find the edges of knowledge: where does solid understanding fade into uncertainty?

**Ask only 1 question at a time.** Wait for the answer before asking the next.

## Question Types

Mix based on what the concept demands:
- **Conceptual**: "When would you use X over Y?"
- **Code reading**: "What does this code in your app do?"
- **Code writing**: "Write a scope that does X"
- **Debugging**: "What's wrong here?"

Use learner's codebase for examples whenever possible.

## Scoring

After the quiz, update `understanding_score` honestly:

| Score | Meaning |
|-------|---------|
| 1-3 | Can't recall concept, needs re-teaching |
| 4-5 | Vague memory, partial answers |
| 6-7 | Solid understanding, minor gaps |
| 8-9 | Strong grasp, handles edge cases |
| 10 | Could teach this to someone else |

Update `last_quizzed: DD-MM-YYYY` in frontmatter.

## Recording Quiz History

Append to tutorial's `## Quiz History` section:

```markdown
### Quiz - DD-MM-YYYY
**Q:** [Question asked]
**A:** [Brief summary of response and what it revealed about understanding]
Score updated: 5 → 7
```

This history helps future quizzes avoid repetition and track progression.
