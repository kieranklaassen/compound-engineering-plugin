---
name: plan_review
description: Have multiple specialized agents review a plan in parallel
argument-hint: "[plan file path or plan content]"
---

# Plan Review

Review a plan using configured agents from `.claude/compound-engineering.json`.

## Load Configuration (Auto-Setup if Missing)

<config_loading>

**Step 1: Check for configuration file:**

```bash
test -f .claude/compound-engineering.json && echo "project" || \
test -f ~/.claude/compound-engineering.json && echo "global" || echo "none"
```

**Step 2: If config exists** → Read `planReviewAgents` array and proceed.

**Step 3: If NO config exists** → Run inline quick setup:

```
AskUserQuestion:
  questions:
    - question: "No agent configuration found. How would you like to configure plan review agents?"
      header: "Quick Setup"
      options:
        - label: "Quick Setup - Use smart defaults (Recommended)"
          description: "Auto-detect project type and use appropriate agents."
        - label: "Full Setup - Customize everything"
          description: "Run /compound-engineering-setup for detailed configuration."
        - label: "Skip - Use defaults just this once"
          description: "Use general defaults for this review only."
```

**If "Quick Setup":**
1. Detect project type
2. Create `.claude/compound-engineering.json` with smart defaults
3. Continue with plan review using new config

**If "Full Setup":**
1. Run `/compound-engineering-setup`
2. After setup, continue with plan review

**If "Skip":**
1. Use defaults: `code-simplicity-reviewer`, `architecture-strategist`

</config_loading>

## Execute Review

For each agent in `planReviewAgents`:

```
Task {agent-name}("Review this plan: {plan content}")
```

Run all agents in parallel using multiple Task tool calls in a single message.

## Example Config

```json
{
  "planReviewAgents": [
    "kieran-rails-reviewer",
    "code-simplicity-reviewer"
  ]
}
```

## Fallback Defaults

If no config and user wants defaults:
- **Rails projects**: `kieran-rails-reviewer`, `code-simplicity-reviewer`
- **Python projects**: `kieran-python-reviewer`, `code-simplicity-reviewer`
- **TypeScript projects**: `kieran-typescript-reviewer`, `code-simplicity-reviewer`
- **General**: `code-simplicity-reviewer`, `architecture-strategist`
