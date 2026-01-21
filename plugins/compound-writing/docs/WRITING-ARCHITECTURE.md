# The Writing Process: Agents & Skills Architecture

> A comprehensive framework mapping the entire writing process to specialized agents and skills.

## Overview

This document defines the complete phase-by-phase breakdown of professional writing workflows, from ideation to final form. Use this as a reference for extending the compound-writing plugin.

---

## Phase Map

| Phase | Focus | Current Plugin Coverage |
|-------|-------|------------------------|
| 1. Discovery | Ideas, strategy, research | `/writing:plan` + `source-researcher` |
| 2. Architecture | Thesis, structure, outline | `/writing:plan` + `structure-architect` |
| 3. Creation | First draft, gap filling | `/writing:draft` + voice skills |
| 4. Revision | Big picture edits | `/writing:review` (partial) |
| 5. Editing | Sentence-level polish | `clarity-editor`, `every-style-editor` |
| 6. Polish | Proofread, headlines | `publishing-optimizer` |
| 7. Optimization | SEO, format adaptation | `publishing-optimizer` (partial) |
| 8. QA | Final verification | `/writing:review` |

---

## Complete Agent Roster

### Currently Implemented (7)

| Agent | Phase | Function |
|-------|-------|----------|
| `source-researcher` | Discovery | Gather information, sources, examples |
| `structure-architect` | Architecture | Create outlines, analyze flow |
| `voice-guardian` | Creation/Editing | Maintain voice consistency |
| `clarity-editor` | Editing | Sentence-level clarity |
| `fact-checker` | Editing | Verify claims and sources |
| `every-style-editor` | Editing | Every's style guide compliance |
| `publishing-optimizer` | Polish/Optimization | SEO, social, newsletters |

### Proposed Additions (11)

| Agent | Phase | Function | Priority |
|-------|-------|----------|----------|
| `ideation-agent` | Discovery | Generate ideas, find angles | Medium |
| `strategist-agent` | Discovery | Define audience, purpose | Medium |
| `thesis-agent` | Architecture | Crystallize core argument | Low |
| `drafter-agent` | Creation | Generate prose from outline | High |
| `gap-analyst` | Creation | Find missing pieces | Medium |
| `dev-editor-agent` | Revision | Big-picture critique | High |
| `line-editor-agent` | Editing | Prose craft, rhythm | Medium |
| `copy-editor-agent` | Editing | Grammar, style guide | Medium |
| `proofreader-agent` | Polish | Final error catch | Low |
| `headline-agent` | Polish | Craft titles, hooks | Medium |
| `adaptation-agent` | Optimization | Format for platforms | Low |

---

## Skill Types

### 1. Core Skills (Every Project)

Essential skills loaded for all writing workflows.

| Skill | Purpose | Status |
|-------|---------|--------|
| `writing-orchestration` | Two-agent architecture, strategies | Implemented |
| `scratchpad` | Session preference memory | Implemented |
| `context-notes` | Structured handoffs | Implemented |
| `voice-capture` | Extract voice from samples | Implemented |

### 2. Voice Skills (Select Per Project)

Define the writing style and tone.

| Skill | Style | Status |
|-------|-------|--------|
| `pragmatic-writing` | Hunt/Thomas, Joel Spolsky | Implemented |
| `dhh-writing` | Direct, opinionated | Implemented |
| `voice-hemingway` | Sparse, direct, concrete | Proposed |
| `voice-conversational` | Friendly, accessible | Proposed |
| `voice-academic` | Formal, hedged, citation-heavy | Proposed |
| `voice-technical` | Precise, jargon-appropriate | Proposed |

### 3. Style Guide Skills (Select One)

Ensure consistency with established standards.

| Skill | Standard | Status |
|-------|----------|--------|
| `every-style-editor` | Every's house style | Implemented |
| `style-guide-ap` | AP Stylebook | Proposed |
| `style-guide-chicago` | Chicago Manual | Proposed |
| `style-guide-custom` | Organizational rules | Template |

### 4. Domain Skills (Load as Needed)

Specialized knowledge for specific fields.

| Skill | Domain | Contains |
|-------|--------|----------|
| `domain-saas` | SaaS/B2B | Metrics, terminology, examples |
| `domain-finance` | Finance | Terms, compliance, regulations |
| `domain-healthcare` | Medical | Terminology, HIPAA, clinical |
| `domain-legal` | Legal | Language, disclaimers, contracts |
| `domain-expert-[x]` | Custom | "10 books" deep expertise |

### 5. Format Skills (Load for Output)

Transform content for different platforms.

| Skill | Output | Key Constraints |
|-------|--------|-----------------|
| `format-blog-post` | Long-form blog | SEO, headers, readability |
| `format-twitter-thread` | Twitter/X | 280 chars, hooks, numbering |
| `format-linkedin` | LinkedIn | Professional, engagement |
| `format-newsletter` | Email | Subject lines, previews |
| `format-whitepaper` | B2B docs | Formal, comprehensive |

---

## Pipeline Flow

```
DISCOVERY                 ARCHITECTURE              CREATION
┌──────────┐             ┌──────────┐             ┌──────────┐
│ Ideation │──▶ Brief ──▶│  Thesis  │──▶ Outline ▶│ Drafter  │
│ Strategy │             │ Architect│             │   Gap    │
│ Research │             └──────────┘             │ Analyst  │
└──────────┘                                      └────┬─────┘
                                                       │
     ┌─────────────────────────────────────────────────┘
     ▼
REVISION                  EDITING                   POLISH
┌──────────┐             ┌──────────┐             ┌──────────┐
│Dev Editor│──▶ Revised ▶│   Line   │──▶ Clean ──▶│Proofread │
│ Revision │    Draft    │   Copy   │    Draft   │ Headline │
└──────────┘             │   Fact   │             └────┬─────┘
                         └──────────┘                  │
     ┌─────────────────────────────────────────────────┘
     ▼
OPTIMIZATION              QA
┌──────────┐             ┌──────────┐
│   SEO    │──▶ Final ──▶│    QA    │──▶ PUBLISH
│Adaptation│             │  Agent   │
│  Style   │             └──────────┘
└──────────┘
```

---

## The "10 Books Expert" Pattern

For domain expertise, create skills grounded in foundational texts:

```yaml
name: domain-expert-behavioral-economics
description: Deep expertise from Kahneman, Thaler, Ariely, Cialdini
triggers: ["behavioral economics", "cognitive bias", "nudge"]
```

**Structure:**
1. Core Texts (5) - The foundational works
2. Secondary Texts (5) - Supporting perspectives
3. Key Frameworks - How to apply the knowledge
4. Reasoning Patterns - Example thought processes

This pattern can be applied to any domain where deep expertise is needed.

---

## Implementation Roadmap

### Phase 1: Foundation (Current)
- [x] Core workflow commands (plan, draft, review, compound)
- [x] Basic agents (7)
- [x] Core skills (orchestration, scratchpad, context-notes)
- [x] Two voice skills (pragmatic, dhh)

### Phase 2: Creation Enhancement
- [ ] `drafter-agent` - Dedicated prose generation
- [ ] `dev-editor-agent` - Big-picture structural critique
- [ ] Additional voice skills (hemingway, conversational)

### Phase 3: Editing Depth
- [ ] `line-editor-agent` - Prose craft focus
- [ ] `copy-editor-agent` - Grammar/style specialist
- [ ] Style guide skills (AP, Chicago)

### Phase 4: Optimization
- [ ] `headline-agent` - Titles and hooks
- [ ] `adaptation-agent` - Platform formatting
- [ ] Format skills (twitter, linkedin, newsletter)

### Phase 5: Domain Expertise
- [ ] Domain skill template
- [ ] "10 books" expert pattern implementation
- [ ] Custom domain skill generator

---

## References

- [Editorial Department - Editorial Process 101](https://www.editorialdepartment.com/editorial-process/)
- [MasterClass - Line Editing vs Copy Editing](https://www.masterclass.com/articles/what-is-line-editing)
- [CrewAI Documentation](https://docs.crewai.com/en/concepts/agents)
- [Agent Skills Specification](https://agentskills.io/specification)
