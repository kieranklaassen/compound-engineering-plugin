---
name: resolve_pr_parallel
description: Resolve all PR comments using parallel processing
argument-hint: "[optional: PR number or current PR]"
---

Resolve all PR comments using parallel processing.

Claude Code automatically detects and understands your git context:

- Current branch detection
- Associated PR context
- All PR comments and review threads
- Can work with any PR by specifying the PR number, or ask it.

## Workflow

### 1. Analyze

Get all unresolved comments for PR and detect Linear issue context:

```bash
gh pr status
bin/get-pr-comments PR_NUMBER

# Get PR details including title, body, and branch name
gh pr view PR_NUMBER --json title,body,headRefName
```

**Linear Issue Detection:**
- Check PR title for Linear ID pattern: `feat(ENG-123): description`
- Check PR body for `Closes ENG-123` or `Fixes ENG-123`
- Check branch name for pattern: `feat/ENG-123-description`

If Linear issue ID found, optionally fetch issue context using `mcp__linear__get_issue` for additional context.

### 2. Plan

Create a TodoWrite list of all unresolved items grouped by type.

### 3. Implement (PARALLEL)

Spawn a pr-comment-resolver agent for each unresolved item in parallel.

So if there are 3 comments, it will spawn 3 pr-comment-resolver agents in parallel. liek this

1. Task pr-comment-resolver(comment1)
2. Task pr-comment-resolver(comment2)
3. Task pr-comment-resolver(comment3)

Always run all in parallel subagents/Tasks for each Todo item.

### 4. Commit & Resolve

- Commit changes
- Run bin/resolve-pr-thread THREAD_ID_1
- Push to remote

Last, check bin/get-pr-comments PR_NUMBER again to see if all comments are resolved. They should be, if not, repeat the process from 1.

### 5. Update Linear Issue (Optional)

If Linear issue ID was detected in step 1, optionally update the Linear issue:

```bash
# Add comment to Linear issue with PR link (triggers Linear magic link to GitHub)
# Linear auto-detects GitHub PR URLs and creates clickable links
mcp__linear__create_comment({
  issueId: "detected-issue-id",
  body: "✅ Resolved all PR comments in https://github.com/owner/repo/pull/PR_NUMBER

Ready for re-review."
})

# Linear Magic Links: Automatically converts GitHub URLs to rich PR previews
# Format: Full GitHub PR URL (not #PR_NUMBER shorthand)
```
