---
name: agent-native-architecture
description: This skill should be used when building AI agents using prompt-native architecture where features are defined in prompts, not code. Use it when creating autonomous agents, designing MCP servers, implementing self-modifying systems, or adopting the "trust the agent's intelligence" philosophy.
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - WebFetch
metadata:
  version: "1.1.0"
  category: architecture
  tags: [agents, mcp, prompt-native, ai-architecture, self-modification]
---

# Agent-Native Architecture

## Contents

- [The Prompt-Native Philosophy](#the-prompt-native-philosophy)
- [Intake Menu](#intake-menu)
- [Architecture Review Checklist](#architecture-review-checklist)
- [Quick Start](#quick-start)
- [References](#references)
- [What NOT to Do](#what-not-to-do)
- [Success Criteria](#success-criteria)

<essential_principles>
## The Prompt-Native Philosophy

Agent native engineering inverts traditional software architecture. Instead of writing code that the agent executes, you define outcomes in prompts and let the agent figure out HOW to achieve them.

### The Foundational Principle

**Whatever the user can do, the agent can do. Many things the developer can do, the agent can do.**

Don't artificially limit the agent. If a user could read files, write code, browse the web, deploy an app—the agent should be able to do those things too. The agent figures out HOW to achieve an outcome; it doesn't just call your pre-written functions.

### Features Are Prompts

Each feature is a prompt that defines an outcome and gives the agent the tools it needs. The agent then figures out how to accomplish it.

**Traditional:** Feature = function in codebase that agent calls
**Prompt-native:** Feature = prompt defining desired outcome + primitive tools

The agent doesn't execute your code. It uses primitives to achieve outcomes you describe.

### Tools Provide Capability, Not Behavior

Tools should be primitives that enable capability. The prompt defines what to do with that capability.

**Wrong:** `generate_dashboard(data, layout, filters)` — agent executes your workflow
**Right:** `read_file`, `write_file`, `list_files` — agent figures out how to build a dashboard

Pure primitives are better, but domain primitives (like `store_feedback`) are OK if they don't encode logic—just storage/retrieval.

### The Development Lifecycle

1. **Start in the prompt** - New features begin as natural language defining outcomes
2. **Iterate rapidly** - Change behavior by editing prose, not refactoring code
3. **Graduate when stable** - Harden to code when requirements stabilize AND speed/reliability matter
4. **Many features stay as prompts** - Not everything needs to become code

### Self-Modification (Advanced)

The advanced tier: agents that can evolve their own code, prompts, and behavior. Not required for every app, but a big part of the future.

When implementing:
- Approval gates for code changes
- Auto-commit before modifications (rollback capability)
- Health checks after changes
- Build verification before restart

### When NOT to Use This Approach

- **High-frequency operations** - thousands of calls per second
- **Deterministic requirements** - exact same output every time
- **Cost-sensitive scenarios** - when API costs would be prohibitive
- **High security** - though this is overblown for most apps
</essential_principles>

<intake>
What aspect of agent native architecture do you need help with?

1. **Design architecture** - Plan a new prompt-native agent system
2. **Create MCP tools** - Build primitive tools following the philosophy
3. **Write system prompts** - Define agent behavior in prompts
4. **Self-modification** - Enable agents to safely evolve themselves
5. **Review/refactor** - Make existing code more prompt-native
6. **Context injection** - Inject runtime app state into agent prompts
7. **Action parity** - Ensure agents can do everything users can do
8. **Shared workspace** - Set up agents and users in the same data space
9. **Testing** - Test agent-native apps for capability and parity
10. **Mobile patterns** - Handle background execution, permissions, cost
11. **API integration** - Connect to external APIs (HealthKit, HomeKit, GraphQL)

**Wait for response before proceeding.**
</intake>

<routing>
| Response | Action |
|----------|--------|
| 1, "design", "architecture", "plan" | Read [architecture-patterns.md](./references/architecture-patterns.md), then apply Architecture Checklist below |
| 2, "tool", "mcp", "primitive" | Read [mcp-tool-design.md](./references/mcp-tool-design.md) |
| 3, "prompt", "system prompt", "behavior" | Read [system-prompt-design.md](./references/system-prompt-design.md) |
| 4, "self-modify", "evolve", "git" | Read [self-modification.md](./references/self-modification.md) |
| 5, "review", "refactor", "existing" | Read [refactoring-to-prompt-native.md](./references/refactoring-to-prompt-native.md) |
| 6, "context", "inject", "runtime", "dynamic" | Read [dynamic-context-injection.md](./references/dynamic-context-injection.md) |
| 7, "parity", "ui action", "capability map" | Read [action-parity-discipline.md](./references/action-parity-discipline.md) |
| 8, "workspace", "shared", "files", "filesystem" | Read [shared-workspace-architecture.md](./references/shared-workspace-architecture.md) |
| 9, "test", "testing", "verify", "validate" | Read [agent-native-testing.md](./references/agent-native-testing.md) |
| 10, "mobile", "ios", "android", "background" | Read [mobile-patterns.md](./references/mobile-patterns.md) |
| 11, "api", "healthkit", "homekit", "graphql", "external" | Read [mcp-tool-design.md](./references/mcp-tool-design.md) (Dynamic Capability Discovery section) |

**After reading the reference, apply those patterns to the user's specific context.**
</routing>

<architecture_checklist>
## Architecture Review Checklist (Apply During Design)

When designing an agent-native system, verify these **before implementation**:

### Tool Design
- [ ] **Dynamic vs Static:** For external APIs where agent should have full user-level access (HealthKit, HomeKit, GraphQL), use Dynamic Capability Discovery. Only use static mapping if intentionally limiting agent scope.
- [ ] **CRUD Completeness:** Every entity has create, read, update, AND delete tools
- [ ] **Primitives not Workflows:** Tools enable capability, they don't encode business logic
- [ ] **API as Validator:** Use `z.string()` inputs when the API validates, not `z.enum()`

### Action Parity
- [ ] **Capability Map:** Every UI action has a corresponding agent tool
- [ ] **Edit/Delete:** If UI can edit or delete, agent must be able to too
- [ ] **The Write Test:** "Write something to [app location]" must work for all locations

### UI Integration
- [ ] **Agent → UI:** Define how agent changes reflect in UI (shared service, file watching, or event bus)
- [ ] **No Silent Actions:** Agent writes should trigger UI updates immediately
- [ ] **Capability Discovery:** Users can learn what agent can do (onboarding, hints)

### Context Injection
- [ ] **Available Resources:** System prompt includes what exists (files, data, types)
- [ ] **Available Capabilities:** System prompt documents what agent can do with user vocabulary
- [ ] **Dynamic Context:** Context refreshes for long sessions (or provide `refresh_context` tool)

### Mobile (if applicable)
- [ ] **Background Execution:** Checkpoint/resume pattern for iOS app suspension
- [ ] **Permissions:** Just-in-time permission requests in tools
- [ ] **Cost Awareness:** Model tier selection (Haiku/Sonnet/Opus)

**When designing architecture, explicitly address each checkbox in your plan.**
</architecture_checklist>

<quick_start>
Build a prompt-native agent in three steps:

**Step 1: Define primitive tools**
```typescript
const tools = [
  tool("read_file", "Read any file", { path: z.string() }, ...),
  tool("write_file", "Write any file", { path: z.string(), content: z.string() }, ...),
  tool("list_files", "List directory", { path: z.string() }, ...),
];
```

**Step 2: Write behavior in the system prompt**
```markdown
## Your Responsibilities
When asked to organize content, you should:
1. Read existing files to understand the structure
2. Analyze what organization makes sense
3. Create appropriate pages using write_file
4. Use your judgment about layout and formatting

You decide the structure. Make it good.
```

**Step 3: Let the agent work**
```typescript
query({
  prompt: userMessage,
  options: {
    systemPrompt,
    mcpServers: { files: fileServer },
    permissionMode: "acceptEdits",
  }
});
```
</quick_start>

<reference_index>
## Domain Knowledge

All references in `references/`:

**Core Patterns:**
- **Architecture:** [architecture-patterns.md](./references/architecture-patterns.md)
- **Tool Design:** [mcp-tool-design.md](./references/mcp-tool-design.md) - includes Dynamic Capability Discovery, CRUD Completeness
- **Prompts:** [system-prompt-design.md](./references/system-prompt-design.md)
- **Self-Modification:** [self-modification.md](./references/self-modification.md)
- **Refactoring:** [refactoring-to-prompt-native.md](./references/refactoring-to-prompt-native.md)

**Agent-Native Disciplines:**
- **Context Injection:** [dynamic-context-injection.md](./references/dynamic-context-injection.md)
- **Action Parity:** [action-parity-discipline.md](./references/action-parity-discipline.md)
- **Shared Workspace:** [shared-workspace-architecture.md](./references/shared-workspace-architecture.md)
- **Testing:** [agent-native-testing.md](./references/agent-native-testing.md)
- **Mobile Patterns:** [mobile-patterns.md](./references/mobile-patterns.md)
</reference_index>

<anti_patterns>
## What NOT to Do

**THE CARDINAL SIN: Agent executes your code instead of figuring things out**

This is the most common mistake. The pattern is falling back into writing workflow code and having the agent call it, instead of defining outcomes and letting the agent figure out HOW.

```typescript
// WRONG - You wrote the workflow, agent just executes it
tool("process_feedback", async ({ message }) => {
  const category = categorize(message);      // Your code
  const priority = calculatePriority(message); // Your code
  await store(message, category, priority);   // Your code
  if (priority > 3) await notify();           // Your code
});

// RIGHT - Agent figures out how to process feedback
tool("store_item", { key, value }, ...);  // Primitive
tool("send_message", { channel, content }, ...);  // Primitive
// Prompt says: "Rate importance 1-5 based on actionability, store feedback, notify if >= 4"
```

**Don't artificially limit what the agent can do**

If a user could do it, the agent should be able to do it.

```typescript
// WRONG - limiting agent capabilities
tool("read_approved_files", { path }, async ({ path }) => {
  if (!ALLOWED_PATHS.includes(path)) throw new Error("Not allowed");
  return readFile(path);
});

// RIGHT - give full capability, use guardrails appropriately
tool("read_file", { path }, ...);  // Agent can read anything
// Use approval gates for writes, not artificial limits on reads
```

**Don't encode decisions in tools**
```typescript
// Wrong - tool decides format
tool("format_report", { format: z.enum(["markdown", "html", "pdf"]) }, ...)

// Right - agent decides format via prompt
tool("write_file", ...) // Agent chooses what to write
```

**Don't over-specify in prompts**
```markdown
// Wrong - micromanaging the HOW
When creating a summary, use exactly 3 bullet points,
each under 20 words, formatted with em-dashes...

// Right - define outcome, trust intelligence
Create clear, useful summaries. Use your judgment.
```

### Agent-Native Anti-Patterns

**Context Starvation**
Agent doesn't know what resources exist in the app.
```
User: "Write something about Catherine the Great in my feed"
Agent: "What feed? I don't understand what system you're referring to."
```
Fix: Inject available resources, capabilities, and vocabulary into the system prompt at runtime.

**Orphan Features**
UI action with no agent equivalent.
```swift
// UI has a "Publish to Feed" button
Button("Publish") { publishToFeed(insight) }
// But no agent tool exists to do the same thing
```
Fix: Add corresponding tool and document in system prompt for every UI action.

**Sandbox Isolation**
Agent works in separate data space from user.
```
Documents/
├── user_files/        ← User's space
└── agent_output/      ← Agent's space (isolated)
```
Fix: Use shared workspace where both agent and user operate on the same files.

**Silent Actions**
Agent changes state but UI doesn't update.
```typescript
// Agent writes to database
await db.insert("feed", content);
// But UI doesn't observe this table - user sees nothing
```
Fix: Use shared data stores with reactive binding, or file system observation.

**Capability Hiding**
Users can't discover what agents can do.
```
User: "Help me with my reading"
Agent: "What would you like help with?"
// Agent doesn't mention it can publish to feed, research books, etc.
```
Fix: Include capability hints in agent responses or provide onboarding.

**Static Tool Mapping (for agent-native apps)**
Building individual tools for each API endpoint when you want the agent to have full access.
```typescript
// You built 50 tools for 50 HealthKit types
tool("read_steps", ...)
tool("read_heart_rate", ...)
tool("read_sleep", ...)
// When glucose tracking is added... code change required
// Agent can only access what you anticipated
```
Fix: Use Dynamic Capability Discovery - one `list_*` tool to discover what's available, one generic tool to access any type. See [mcp-tool-design.md](./references/mcp-tool-design.md). (Note: Static mapping is fine for constrained agents with intentionally limited scope.)

**Incomplete CRUD**
Agent can create but not update or delete.
```typescript
// ❌ User: "Delete that journal entry"
// Agent: "I don't have a tool for that"
tool("create_journal_entry", ...)
// Missing: update_journal_entry, delete_journal_entry
```
Fix: Every entity needs full CRUD (Create, Read, Update, Delete). The CRUD Audit: for each entity, verify all four operations exist.
</anti_patterns>

<success_criteria>
You've built a prompt-native agent when:

**Core Prompt-Native Criteria:**
- [ ] The agent figures out HOW to achieve outcomes, not just calls your functions
- [ ] Whatever a user could do, the agent can do (no artificial limits)
- [ ] Features are prompts that define outcomes, not code that defines workflows
- [ ] Tools are primitives (read, write, store, call API) that enable capability
- [ ] Changing behavior means editing prose, not refactoring code
- [ ] The agent can surprise you with clever approaches you didn't anticipate
- [ ] You could add a new feature by writing a new prompt section, not new code

**Tool Design Criteria:**
- [ ] External APIs (where agent should have full access) use Dynamic Capability Discovery
- [ ] Every entity has full CRUD (Create, Read, Update, Delete)
- [ ] API validates inputs, not your enum definitions
- [ ] Discovery tools exist for each API surface (`list_*`, `discover_*`)

**Agent-Native Criteria:**
- [ ] System prompt includes dynamic context about app state (available resources, recent activity)
- [ ] Every UI action has a corresponding agent tool (action parity)
- [ ] Agent tools are documented in the system prompt with user vocabulary
- [ ] Agent and user work in the same data space (shared workspace)
- [ ] Agent actions are immediately reflected in the UI (shared service, file watching, or event bus)
- [ ] The "write something to [app location]" test passes for all locations
- [ ] Users can discover what the agent can do (capability hints, onboarding)
- [ ] Context refreshes for long sessions (or `refresh_context` tool exists)

**Mobile-Specific Criteria (if applicable):**
- [ ] Background execution handling implemented (checkpoint/resume)
- [ ] Permission requests handled gracefully in tools
- [ ] Cost-aware design (appropriate model tiers, batching)
</success_criteria>
