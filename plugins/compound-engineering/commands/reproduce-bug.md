---
name: reproduce-bug
description: Reproduce and investigate a bug using logs and console inspection
argument-hint: "[GitHub issue number or Linear issue ID (e.g., ENG-123)]"
---

## Step 1: Fetch Issue Details

Detect whether the argument is a GitHub issue number or Linear issue ID:

**If GitHub issue (numeric):**
```bash
gh issue view #$ARGUMENTS
```

**If Linear issue (format: XXX-NNN):**
Use `mcp__linear__get_issue` to fetch:
- Issue title and description
- Comments and discussion
- Priority and status
- Related attachments or links

Read the issue description and all comments to understand the bug.

Then, run the following agents in parallel to reproduce the bug:

1. Task rails-console-explorer(issue_description)
2. Task appsignal-log-investigator (issue_description)

Then think about the places it could go wrong looking at the codebase. Look for loggin output we can look for.

Then, run the following agents in parallel again to find any logs that could help us reproduce the bug.

1. Task rails-console-explorer(issue_description)
2. Task appsignal-log-investigator (issue_description)

Keep running these agents until you have a good idea of what is going on.

**Reference Collection:**

- [ ] Document all research findings with specific file paths (e.g., `app/services/example_service.rb:42`)

## Step 2: Add Comment with Findings

**If GitHub issue:**
```bash
gh issue comment #$ARGUMENTS --body "[Findings and reproduction steps]"
```

**If Linear issue:**
Use `mcp__linear__create_comment` to add a comment with:
- Summary of investigation
- Reproduction steps discovered
- Relevant code paths and file references
- Suggested next steps or fixes
