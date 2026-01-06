# Integration Workflows Reference

## Workflow Summary

| Trigger | Example Command | Result |
|---------|-----------------|--------|
| Code review findings | `/triage` | Approves pending todos from review |
| PR comments | `/resolve_pr_parallel` | Creates todos for complex fixes |
| Code TODOs | `/resolve_todo_parallel` | Processes inline TODO comments |
| Planning | Create todo manually | Documents work for later |

## Code Review Integration

1. Run `/workflows:review` to generate findings
2. Findings become pending todos
3. Run `/triage` to approve and prioritize
4. Work on ready todos

## PR Comment Integration

1. Receive PR feedback with comments
2. Run `/resolve_pr_parallel` to process
3. Simple fixes applied immediately
4. Complex issues become todos

## Code TODO Integration

1. Scan codebase for inline TODO comments
2. Run `/resolve_todo_parallel` to process
3. Simple TODOs resolved directly
4. Complex TODOs become tracked items

## Slash Command Quick Reference

| Command | Purpose |
|---------|---------|
| `/triage` | Interactive approval of pending todos |
| `/resolve_pr_parallel` | Process PR comments into fixes/todos |
| `/resolve_todo_parallel` | Process inline TODOs into fixes/todos |
| `/workflows:review` | Run code review generating findings |
