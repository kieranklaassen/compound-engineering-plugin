---
name: plan_review
description: Have multiple specialized agents review a plan in parallel
argument-hint: "[plan file path or plan content]"
---

## Linear Context (Optional)

Before reviewing, check if the plan references a Linear issue:

1. Search plan content for Linear issue ID pattern (e.g., `ENG-123`, `TEAM-456`)
2. If found, use `mcp__linear__get_issue` to fetch issue details for additional context
3. Include issue priority, project, and description in review context

## Review Execution

Have @agent-dhh-rails-reviewer @agent-kieran-rails-reviewer @agent-code-simplicity-reviewer review this plan in parallel.

If Linear issue context was found, provide it to reviewers for alignment validation.
