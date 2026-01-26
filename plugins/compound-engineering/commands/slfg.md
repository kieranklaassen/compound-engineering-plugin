---
name: slfg
description: Swarm-based autonomous engineering workflow with parallel agents
argument-hint: "[feature description]"
---

# Swarm LFG - Full Autonomous Engineering with Parallel Agents

Transform a feature description into a shipped PR using a coordinated swarm of specialized agents working in parallel.

## Feature Description

<feature_description> #$ARGUMENTS </feature_description>

**If the feature description above is empty, ask the user:** "What feature would you like to build? Please describe it clearly."

Do not proceed until you have a clear feature description.

## Swarm Architecture

```
                    ┌─────────────────┐
                    │   TEAM LEAD     │
                    │ (You - Orchestrator) │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
   ┌──────────┐        ┌──────────┐        ┌──────────┐
   │ Planner  │        │Researcher│        │  Worker  │
   └──────────┘        └──────────┘        └──────────┘
         │                   │                   │
         ▼                   ▼                   ▼
   ┌──────────┐        ┌──────────┐        ┌──────────┐
   │ Reviewer │        │  Tester  │        │Resolver(s)│
   └──────────┘        └──────────┘        └──────────┘
                             │
                             ▼
                       ┌──────────┐
                       │  Video   │
                       └──────────┘
```

## Step 1: Create Swarm Team

Create a new team for this engineering swarm:

```
TeammateTool:
  operation: spawnTeam
  team_name: "slfg-{YYYYMMDD-HHMMSS}"
  description: "Swarm for: {feature_description}"
```

Store the team name for use throughout this workflow.

## Step 2: Create Task List with Dependencies

Create all tasks upfront with their dependency relationships:

### Task 1: Create Implementation Plan
```
TaskCreate:
  subject: "Create implementation plan"
  description: |
    Run /workflows:plan for: {feature_description}
    Write plan to docs/plans/ following naming convention.
    Use ExitPlanMode when ready for approval.
  activeForm: "Planning feature"
```

### Task 2: Research Best Practices (Parallel with Task 1)
```
TaskCreate:
  subject: "Research best practices and patterns"
  description: |
    Research using:
    - Context7 for framework documentation
    - WebSearch for current best practices
    - Codebase patterns via repo-research-analyst
    Write findings to enhance the plan.
  activeForm: "Researching patterns"
```

### Task 3: Implement Feature (Blocked by 1 & 2)
```
TaskCreate:
  subject: "Implement the approved plan"
  description: |
    Run /workflows:work on the approved plan.
    Create incremental commits.
    Push to feature branch.
  activeForm: "Implementing feature"
```
Then: `TaskUpdate taskId: 3, addBlockedBy: ["1", "2"]`

### Task 4: Review Implementation (Blocked by 3)
```
TaskCreate:
  subject: "Review code changes"
  description: |
    Run parallel review agents:
    - kieran-rails-reviewer
    - dhh-rails-reviewer
    - code-simplicity-reviewer
    - security-sentinel
    - performance-oracle
    Create todos for findings in todos/ directory.
  activeForm: "Reviewing implementation"
```
Then: `TaskUpdate taskId: 4, addBlockedBy: ["3"]`

### Task 5: Run Browser Tests (Blocked by 3, Parallel with 4)
```
TaskCreate:
  subject: "Run browser tests"
  description: |
    Run /test-browser on affected pages.
    Create P1 todos for any failures.
  activeForm: "Running browser tests"
```
Then: `TaskUpdate taskId: 5, addBlockedBy: ["3"]`

### Task 6: Resolve Findings (Blocked by 4 & 5)
```
TaskCreate:
  subject: "Fix review findings and test failures"
  description: |
    Run /resolve_todo_parallel on all pending todos.
    Re-run tests after fixes.
  activeForm: "Resolving findings"
```
Then: `TaskUpdate taskId: 6, addBlockedBy: ["4", "5"]`

### Task 7: Record Feature Video (Blocked by 6)
```
TaskCreate:
  subject: "Record feature demo video"
  description: |
    Run /feature-video for the PR.
    Upload and embed in PR description.
  activeForm: "Recording demo video"
```
Then: `TaskUpdate taskId: 7, addBlockedBy: ["6"]`

### Task 8: Create Pull Request (Blocked by 7)
```
TaskCreate:
  subject: "Create pull request"
  description: |
    Push all changes.
    Create PR with summary, screenshots, video.
    Include Compound Engineered badge.
  activeForm: "Creating pull request"
```
Then: `TaskUpdate taskId: 8, addBlockedBy: ["7"]`

## Step 3: Spawn Phase 1 Agents (Parallel)

Spawn Planner and Researcher agents to work simultaneously:

### Spawn Planner Agent
```
Task:
  subagent_type: general-purpose
  team_name: "{team_name}"
  name: "planner"
  mode: "plan"
  prompt: |
    # Planner Agent

    You are the **Planner** for the slfg engineering swarm.

    ## Your Task
    TaskGet taskId: "1" to read your full assignment.

    ## Instructions
    1. Claim your task: TaskUpdate taskId: "1", status: "in_progress", owner: "planner"
    2. Run /workflows:plan for: {feature_description}
    3. Create a comprehensive plan in docs/plans/
    4. When plan is ready, use ExitPlanMode to request team lead approval
    5. After approval, mark complete: TaskUpdate taskId: "1", status: "completed"

    ## Communication
    - You are part of team: {team_name}
    - Your name is: planner
    - Send messages to team-lead if you have questions or are blocked

    Work autonomously. Your plan will be reviewed before implementation begins.
```

### Spawn Researcher Agent
```
Task:
  subagent_type: general-purpose
  team_name: "{team_name}"
  name: "researcher"
  prompt: |
    # Researcher Agent

    You are the **Researcher** for the slfg engineering swarm.

    ## Your Task
    TaskGet taskId: "2" to read your full assignment.

    ## Instructions
    1. Claim your task: TaskUpdate taskId: "2", status: "in_progress", owner: "researcher"
    2. Research best practices for: {feature_description}
    3. Use these tools:
       - mcp__plugin_compound-engineering_context7__resolve-library-id
       - mcp__plugin_compound-engineering_context7__query-docs
       - WebSearch for current (2026) best practices
       - Grep/Glob to find similar patterns in codebase
    4. Write findings to docs/research/ or add to the plan file
    5. Mark complete: TaskUpdate taskId: "2", status: "completed"

    ## Communication
    - You are part of team: {team_name}
    - Your name is: researcher
    - Send findings to planner if they should inform the plan
    - Send messages to team-lead if blocked

    Work autonomously and thoroughly.
```

**Launch both agents in parallel** (single message with multiple Task tool calls).

## Step 4: Handle Plan Approval

As team lead, you will receive a `plan_approval_request` message from the Planner agent.

### When you receive the plan approval request:

1. **Read the plan file** to review what's proposed
2. **Evaluate the plan:**
   - Is it complete and actionable?
   - Does it follow project conventions?
   - Are dependencies identified?
   - Is the scope appropriate?

3. **Approve or Reject:**

   **To Approve:**
   ```
   TeammateTool:
     operation: approvePlan
     target_agent_id: "planner"
     request_id: "{requestId from message}"
   ```

   **To Reject with Feedback:**
   ```
   TeammateTool:
     operation: rejectPlan
     target_agent_id: "planner"
     request_id: "{requestId from message}"
     feedback: "Please add more detail about error handling..."
   ```

4. **Wait for both Phase 1 tasks to complete** before proceeding.

## Step 5: Spawn Worker Agent

Once Tasks 1 and 2 are complete:

```
Task:
  subagent_type: general-purpose
  team_name: "{team_name}"
  name: "worker"
  prompt: |
    # Worker Agent

    You are the **Worker** for the slfg engineering swarm.

    ## Your Task
    TaskGet taskId: "3" to read your full assignment.

    ## Instructions
    1. Claim your task: TaskUpdate taskId: "3", status: "in_progress", owner: "worker"
    2. Read the approved plan at docs/plans/{plan_file}
    3. Run /workflows:work following the plan exactly
    4. Create incremental commits with conventional messages
    5. Push to feature branch (never main)
    6. Mark complete: TaskUpdate taskId: "3", status: "completed"

    ## Communication
    - You are part of team: {team_name}
    - Your name is: worker
    - Send progress updates to team-lead for significant milestones
    - Send messages to team-lead if blocked

    Work autonomously. Focus on completing the implementation.
```

## Step 6: Spawn Reviewer and Tester (Parallel)

Once Task 3 (implementation) is complete, spawn both:

### Spawn Reviewer Agent
```
Task:
  subagent_type: general-purpose
  team_name: "{team_name}"
  name: "reviewer"
  prompt: |
    # Reviewer Agent

    You are the **Reviewer** for the slfg engineering swarm.

    ## Your Task
    TaskGet taskId: "4" to read your full assignment.

    ## Instructions
    1. Claim your task: TaskUpdate taskId: "4", status: "in_progress", owner: "reviewer"
    2. Get the changed files: git diff main...HEAD --name-only
    3. Spawn parallel review agents:
       - Task kieran-rails-reviewer("Review the changes")
       - Task code-simplicity-reviewer("Review for simplicity")
       - Task security-sentinel("Check for security issues")
       - Task performance-oracle("Check for performance issues")
    4. Create todos for ALL findings in todos/ directory
    5. Mark complete: TaskUpdate taskId: "4", status: "completed"

    ## Communication
    - You are part of team: {team_name}
    - Your name is: reviewer
    - Send summary to team-lead when complete

    Document findings but do NOT fix them. Resolvers handle fixes.
```

### Spawn Tester Agent
```
Task:
  subagent_type: general-purpose
  team_name: "{team_name}"
  name: "tester"
  prompt: |
    # Tester Agent

    You are the **Tester** for the slfg engineering swarm.

    ## Your Task
    TaskGet taskId: "5" to read your full assignment.

    ## Instructions
    1. Claim your task: TaskUpdate taskId: "5", status: "in_progress", owner: "tester"
    2. Identify affected pages from git diff
    3. Run /test-browser on each affected page
    4. Create P1 todos for any test failures in todos/
    5. Mark complete: TaskUpdate taskId: "5", status: "completed"

    ## Communication
    - You are part of team: {team_name}
    - Your name is: tester
    - Send results summary to team-lead

    Document failures as todos but do NOT fix them.
```

**Launch both in parallel.**

## Step 7: Spawn Resolver Agents

Once Tasks 4 and 5 are complete:

```
Task:
  subagent_type: general-purpose
  team_name: "{team_name}"
  name: "resolver"
  prompt: |
    # Resolver Agent

    You are the **Resolver** for the slfg engineering swarm.

    ## Your Task
    TaskGet taskId: "6" to read your full assignment.

    ## Instructions
    1. Claim your task: TaskUpdate taskId: "6", status: "in_progress", owner: "resolver"
    2. List all pending todos: ls todos/*-pending-*.md
    3. For each todo, spawn a parallel resolver:
       - Task pr-comment-resolver("Fix: {todo_description}")
    4. Re-run tests after fixes if needed
    5. Mark complete: TaskUpdate taskId: "6", status: "completed"

    ## Communication
    - You are part of team: {team_name}
    - Your name is: resolver

    Fix all findings. Commit after each fix.
```

## Step 8: Spawn Video Agent

Once Task 6 is complete:

```
Task:
  subagent_type: general-purpose
  team_name: "{team_name}"
  name: "video"
  prompt: |
    # Video Agent

    You are the **Video** agent for the slfg engineering swarm.

    ## Your Task
    TaskGet taskId: "7" to read your full assignment.

    ## Instructions
    1. Claim your task: TaskUpdate taskId: "7", status: "in_progress", owner: "video"
    2. Run /feature-video for the current PR
    3. Ensure video is uploaded and embedded in PR
    4. Mark complete: TaskUpdate taskId: "7", status: "completed"

    ## Communication
    - You are part of team: {team_name}
    - Your name is: video
```

## Step 9: Create Pull Request

Once Task 7 is complete, handle Task 8 yourself (Team Lead):

1. Claim the task: `TaskUpdate taskId: "8", status: "in_progress", owner: "team-lead"`

2. Push all changes:
   ```bash
   git push -u origin {branch_name}
   ```

3. Create PR:
   ```bash
   gh pr create --title "feat: {feature_description}" --body "$(cat <<'EOF'
   ## Summary
   - {what was built}
   - {key decisions}

   ## Demo
   {video embed from /feature-video}

   ## Testing
   - Browser tests: {pass/fail}
   - Review agents: {findings resolved}

   ## Swarm Stats
   - Agents spawned: {count}
   - Tasks completed: 8/8
   - Team: {team_name}

   ---
   [![Compound Engineered](https://img.shields.io/badge/Compound-Engineered-6366f1)](https://github.com/EveryInc/compound-engineering-plugin)
   Autonomous swarm with [Claude Code](https://claude.com/claude-code)
   EOF
   )"
   ```

4. Mark complete: `TaskUpdate taskId: "8", status: "completed"`

## Step 10: Cleanup and Report

### Shutdown Teammates

Send shutdown requests to all remaining teammates:

```
For each active teammate:
  TeammateTool:
    operation: requestShutdown
    target_agent_id: "{teammate_name}"
    reason: "Swarm complete - PR created"
```

### Cleanup Team Resources

```
TeammateTool:
  operation: cleanup
```

### Final Report

Present the completion summary:

```markdown
## Swarm Complete!

**Feature:** {feature_description}
**PR:** {pr_url}
**Branch:** {branch_name}
**Team:** {team_name}

### Task Summary
| Task | Agent | Status |
|------|-------|--------|
| Create plan | planner | Complete |
| Research | researcher | Complete |
| Implement | worker | Complete |
| Review | reviewer | Complete |
| Test | tester | Complete |
| Resolve | resolver | Complete |
| Video | video | Complete |
| Create PR | team-lead | Complete |

### Artifacts
- Plan: docs/plans/{plan_file}
- PR: {pr_url}
- Video: {video_url}

### Swarm Stats
- Total agents spawned: {count}
- Messages exchanged: {count}
- Time elapsed: {duration}
```

## Error Handling

### If an agent fails:
1. Check the error message
2. Option to respawn the agent with the same task
3. Or handle manually and mark task complete

### If plan is rejected:
1. Planner receives feedback and revises
2. Planner resubmits with ExitPlanMode
3. Repeat until approved

### If tests fail:
1. Tester creates P1 todos
2. Resolver fixes issues
3. Tester re-runs tests
4. Continue when all pass

### If user interrupts:
1. Cleanup team resources
2. Preserve work on branch
3. Can resume later with new swarm

## Key Principles

1. **Parallelism** - Run independent phases simultaneously
2. **Specialization** - Each agent focuses on one role
3. **Autonomy** - Agents work independently, coordinate through tasks
4. **Visibility** - Team lead maintains oversight of all progress
5. **Resilience** - Failures are isolated, recoverable

## When to Use /slfg vs /lfg

| Use /slfg when... | Use /lfg when... |
|-------------------|------------------|
| Feature is complex (multiple phases) | Simple, linear workflow |
| Want maximum parallelism | Prefer sequential execution |
| Multiple independent workstreams | Single focused task |
| Want to see swarm coordination | Want simpler mental model |
