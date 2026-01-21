# Compound Writing Plugin - Development Guide

## Philosophy

**Each piece of writing should make the next piece easier to write.**

This plugin applies compound engineering principles to content creation:
- Capture what works (patterns, voice, structure)
- Build reusable knowledge (scratchpad → patterns → voice profiles)
- Iterate faster each time

## Architecture Reference

See `docs/WRITING-ARCHITECTURE.md` for the complete framework mapping:
- 8 phases of professional writing
- 18 specialized agent roles
- 5 skill types (core, voice, style guide, domain, format)
- Implementation roadmap

## Current Components

### Commands (8)
| Command | Phase | Purpose |
|---------|-------|---------|
| `/writing:init` | Setup | Interactive project setup wizard |
| `/writing:plan` | Discovery/Architecture | Research and outline |
| `/writing:draft` | Creation | Generate prose |
| `/writing:review` | Editing | Multi-agent review |
| `/writing:feedback` | Any | Capture preferences to scratchpad |
| `/writing:knowledge` | Any | Manage voice/patterns/references |
| `/writing:compound` | Post-publish | Extract patterns |
| `/writing:skill` | Setup | Create new skills (voice, domain, format) |

### Agents (8)
| Agent | Phase | Role |
|-------|-------|------|
| `source-researcher` | Discovery | Gather sources, analyze audience |
| `structure-architect` | Architecture | Create outlines, analyze flow |
| `voice-guardian` | Creation/Editing | Maintain voice consistency |
| `clarity-editor` | Editing | Improve clarity, cut jargon |
| `fact-checker` | Editing | Verify claims and sources |
| `every-style-editor` | Editing | Every's style guide |
| `ai-pattern-detector` | Editing | Detect AI slop (delve, tapestry, etc.) |
| `publishing-optimizer` | Optimization | SEO, social, newsletters |

### Skills (9)
| Skill | Type | Purpose |
|-------|------|---------|
| `writing-orchestration` | Core | Two-agent architecture, strategies |
| `scratchpad` | Core | Session preference memory |
| `context-notes` | Core | Structured command handoffs |
| `voice-capture` | Core | Extract voice from samples |
| `pragmatic-writing` | Voice | Hunt/Thomas, Spolsky style |
| `dhh-writing` | Voice | Direct, opinionated style |
| `every-essay-guide` | Voice | Every essay craft (worldview, best practices, hed/dek) |
| `source-code-guide` | Voice | Source Code series (AI-era building, coining language) |
| `every-style-editor` | Editing | Mechanical review (grammar, punctuation, compliance) |

## Key Concepts

### Two-Agent Architecture
- **Orchestrator**: Classifies, researches, assesses readiness
- **Writer**: Creates drafts using strategies

### Two-Gate Assessment
Before drafting, verify:
1. **Material Sufficiency**: Can write without inventing facts?
2. **Message Clarity**: Know exactly what message to convey?

### Writing Strategies
- **10 Baseline** (always apply): Short sentences, active voice, concrete examples
- **20+ Situational** (select 3-4): Hook patterns, structure templates, style techniques

### Scratchpad → Knowledge Flow
```
Session feedback → Scratchpad → Compound → Pattern library
                                         → Voice profile
                                         → Knowledge base
```

## Adding New Components

### New Agent
1. Create `agents/[name].md` with frontmatter:
   ```yaml
   ---
   name: agent-name
   description: What this agent does
   ---
   ```
2. Define the agent's role, inputs, outputs
3. Update `plugin.json` count
4. Update `README.md` agent list

### New Skill
1. Create `skills/[name]/SKILL.md` with frontmatter:
   ```yaml
   ---
   name: skill-name
   description: When to use this skill
   ---
   ```
2. Add triggers, patterns, examples
3. Update `plugin.json` count
4. Update `README.md` skill list

### New Voice Skill
Follow the pattern in `pragmatic-writing` or `dhh-writing`:
- Define voice traits
- Provide writing rules
- Include example transformations

### New Domain Skill ("10 Books Expert")
See `docs/WRITING-ARCHITECTURE.md` for the pattern:
1. Core texts (5 foundational works)
2. Secondary texts (5 supporting works)
3. Key frameworks
4. Reasoning patterns

## File Structure

```
plugins/compound-writing/
├── .claude-plugin/plugin.json
├── CLAUDE.md              # This file
├── README.md              # User documentation
├── agents/                # 7 agents
├── commands/              # 7 commands
├── skills/                # 9 skills (organized by type)
│   ├── core/              # Orchestration, assessment, memory
│   │   ├── writing-orchestration/
│   │   ├── scratchpad/
│   │   ├── context-notes/
│   │   └── voice-capture/
│   ├── voice/             # Voices (can layer multiple)
│   │   ├── pragmatic-writing/
│   │   ├── dhh-writing/
│   │   ├── every-essay-guide/
│   │   └── source-code-guide/
│   ├── editing/           # Review tools (for post-draft)
│   │   └── every-style-editor/
│   ├── domain/            # "10 Books Expert" (future)
│   └── format/            # Channel-specific (future)
└── docs/
    └── WRITING-ARCHITECTURE.md  # Full framework reference
```

## Quality Checklist

When adding/modifying components:
- [ ] Frontmatter is valid YAML
- [ ] Description is clear and specific
- [ ] Integrates with scratchpad (reads/writes preferences)
- [ ] Outputs context notes for handoffs
- [ ] Follows existing patterns
- [ ] Counts updated in plugin.json
- [ ] README updated
