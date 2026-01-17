---
name: ai-pattern-detector
description: Detect and flag common AI-generated writing patterns that make content feel generic or robotic. Use during review to humanize drafts.
---

# AI Pattern Detector

Identifies AI writing patterns that make content feel generic, hollow, or robotic.

## When to Use

- During `/writing:review` for AI-assisted drafts
- When content "sounds like ChatGPT"
- Before publishing to ensure human voice

## Detection Categories

### 1. Red Flag Words

Words overused by LLMs that signal AI generation:

| Word | Why It's Flagged | Better Alternative |
|------|------------------|-------------------|
| delve | #1 AI tell | explore, examine, look at |
| tapestry | hollow sophistication | mix, combination, blend |
| vibrant | meaningless flair | specific descriptor |
| multifaceted | vague complexity | complex, varied |
| realm | fantasy-speak | area, field, space |
| meticulous | over-formal | careful, thorough |
| pivotal | inflated importance | important, key |
| testament | hollow grandeur | shows, proves |

### 2. Corporate AI Speak

| Avoid | Use Instead |
|-------|-------------|
| leverage | use |
| utilize | use |
| optimize | improve |
| facilitate | help, enable |
| streamline | simplify |
| endeavor | try, effort |
| synergy | working together |

### 3. Formulaic Phrases

**Openings to cut:**
- "In today's ever-evolving world..."
- "In the realm of..."
- "It's important to note that..."
- "Let's dive in..."
- "Without further ado..."

**Hedging to remove:**
- "Generally speaking..."
- "To some extent..."
- "From a broader perspective..."
- "When it comes to..."

**Conclusions to rewrite:**
- "In summary..." / "In conclusion..."
- "All in all..."
- "At the end of the day..."

### 4. Structural Patterns

**The Rule of Three Problem:**
LLMs overuse triple structures:
- "adjective, adjective, and adjective"
- "short phrase, short phrase, and short phrase"

*Fix: Vary your rhythm. Use 2 or 4 items. Break the pattern.*

**Paragraph Uniformity:**
AI tends to write paragraphs of similar length.

*Fix: Mix short punchy paragraphs with longer developed ones.*

## Review Process

1. **Run Vale linting** with AISlop.yml and AIPhrases.yml rules
2. **Scan for structural patterns** (rule of three, uniform paragraphs)
3. **Check opening and closing** for formulaic phrases
4. **Flag hollow intensifiers** (game-changer, revolutionary, etc.)

## Output Format

```markdown
## AI Pattern Report

### Red Flags Found: [count]

| Line | Pattern | Suggestion |
|------|---------|------------|
| 12 | "delve into" | "explore" or "examine" |
| 34 | "In today's ever-evolving..." | Cut entirely, start with your point |

### Structural Issues

- [ ] Rule of three overuse (3 instances)
- [ ] Uniform paragraph length
- [ ] Formulaic opening
- [ ] Formulaic closing

### Humanization Suggestions

1. [Specific suggestion based on content]
2. [Specific suggestion based on content]
```

## Integration

Works with Vale rules:
- `Every/AISlop.yml` - Individual AI words
- `Every/AIPhrases.yml` - Formulaic phrases

Run via:
```bash
bash ${CLAUDE_PLUGIN_ROOT}/skills/editing/every-style-editor/scripts/lint.sh [draft]
```
