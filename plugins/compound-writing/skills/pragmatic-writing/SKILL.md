---
name: pragmatic-writing
description: This skill should be used when writing technical content in the style of Hunt/Thomas (The Pragmatic Programmer) and Joel Spolsky (Joel on Software). It applies when creating technical essays, documentation, tutorials, or explanatory content that needs to be clear, engaging, and actionable.
---

# Pragmatic Writing Skill

Writing style modeled on the masters of technical communication: Andy Hunt, Dave Thomas (The Pragmatic Programmer), and Joel Spolsky (Joel on Software). This skill transforms technical content into engaging, memorable prose.

## When to Use This Skill

This skill applies when:
- Creating technical blog posts, essays, or articles
- Writing documentation that needs personality
- Explaining complex concepts to developers
- Crafting tutorials or how-to guides
- Writing "lessons learned" or postmortem content
- Any technical writing that should be read, not just referenced

## Core Philosophy

> "The difference between 'almost right' and 'right' is the difference between the lightning bug and the lightning." — Mark Twain (quoted by Pragmatic Programmers)

Technical writing doesn't have to be dry. The best technical writers make complex ideas feel obvious, use concrete examples before abstract theory, and treat the reader as a smart colleague.

## The 10 Core Techniques

Reference the complete technique guide at [techniques.md](./references/techniques.md).

### 1. Concrete Before Abstract

**Always** start with a concrete example, then extract the principle.

```
❌ "Dependency injection is a design pattern where dependencies are passed
    to objects rather than created by them."

✅ "Imagine your class needs a database connection. You could create it
    yourself:

    def initialize
      @db = Database.new("localhost:5432")
    end

    But now your class is stuck with that exact database. What if you
    want to test with a fake one? What if production uses a different host?

    Instead, accept it as a parameter:

    def initialize(db)
      @db = db
    end

    That's dependency injection. Simple."
```

### 2. Physical Analogies

Map abstract concepts to physical experiences readers already understand.

See [examples.md](./references/examples.md) for analogy patterns:
- Software abstractions → Physical tools
- Code patterns → Architectural patterns
- System design → Everyday systems (postal service, restaurants)

### 3. Conversational Register

Write like you're explaining to a smart colleague at a whiteboard.

**Markers of conversational register:**
- Contractions (don't, won't, can't)
- Direct address (you, your)
- Questions (But what if...? Why does this matter?)
- Asides (By the way, Incidentally)
- Admissions (To be honest, I'm not sure, It depends)

### 4. Humor as Architecture

Use humor strategically, not decoratively:
- Memorable hooks ("Good code is its own best documentation")
- Tension release after complex explanations
- Self-deprecation to build rapport
- Absurdist examples to highlight bad patterns

### 5. The "Aha!" Structure

Build to moments of realization:
1. Present a familiar problem
2. Show the common (flawed) approach
3. Reveal why it fails
4. Present the insight
5. Show the better way
6. Connect back to the principle

### 6. Short Paragraphs, Varied Length

- No paragraph over 4 sentences
- Alternate between longer explanations and punchy one-liners
- Use single-sentence paragraphs for emphasis

Like this.

### 7. Code as Evidence

Code examples should:
- Be runnable (no pseudo-code unless necessary)
- Be minimal (show only what matters)
- Progress from broken to fixed
- Include comments only for non-obvious things

### 8. The Principle Box

After a concrete exploration, box the principle:

> **Tip 23: Always Design for Concurrency**
> Allow for concurrency, and you will design cleaner interfaces with fewer assumptions.

### 9. Friendly Warnings

When discussing pitfalls:
- Acknowledge you've made the mistake too
- Explain why it's tempting
- Show the consequences
- Provide the escape hatch

See [anti-patterns.md](./references/anti-patterns.md) for common technical writing mistakes.

### 10. The Callback

End by connecting back to the opening example or question. Close the loop.

## Voice Characteristics

### Sentence Patterns
- Average length: 15-20 words
- Mix of simple, compound, complex
- Questions every 3-4 paragraphs
- Direct statements for key points

### Vocabulary
**Use**: specific, concrete, everyday words
**Avoid**: jargon without explanation, buzzwords, corporate-speak

### Tone
- Confident but not arrogant
- Curious and exploratory
- Practical and results-focused
- Occasionally irreverent

## Applying the Skill

### For Blog Posts
1. Open with a problem or scenario
2. Explore the messy middle
3. Reveal the insight
4. Show the solution
5. Extract the principle
6. Callback to opening

### For Documentation
1. Start with what the reader wants to do
2. Show the simplest working example
3. Expand with options and edge cases
4. Explain the "why" after the "how"

### For Tutorials
1. State the goal clearly
2. Show the end result first
3. Build up in small, testable steps
4. Explain mistakes, not just successes

## Quality Checklist

Before publishing, verify:
- [ ] Opens with concrete example or scenario
- [ ] Physical analogy for key concepts
- [ ] Conversational tone throughout
- [ ] At least one moment of humor or levity
- [ ] Principles boxed or highlighted
- [ ] Code examples are minimal and runnable
- [ ] Paragraphs under 4 sentences
- [ ] Callbacks to opening

## References

- [techniques.md](./references/techniques.md) - Full technique guide with examples
- [examples.md](./references/examples.md) - Before/after transformations
- [anti-patterns.md](./references/anti-patterns.md) - Seven deadly sins of technical writing
- [sources.md](./references/sources.md) - Original source material
