---
name: report-bug
description: Report a bug in the compound-engineering plugin
argument-hint: "[optional: brief description of the bug]"
---

# Report a Compounding Engineering Plugin Bug

Report bugs encountered while using the compound-engineering plugin. This command gathers structured information and creates a GitHub issue for the maintainer.

## Step 1: Gather Bug Information

Use the AskUserQuestion tool to collect the following information:

**Question 1: Bug Category**
- What type of issue are you experiencing?
- Options: Agent not working, Command not working, Skill not working, MCP server issue, Installation problem, Other

**Question 2: Specific Component**
- Which specific component is affected?
- Ask for the name of the agent, command, skill, or MCP server

**Question 3: What Happened (Actual Behavior)**
- Ask: "What happened when you used this component?"
- Get a clear description of the actual behavior

**Question 4: What Should Have Happened (Expected Behavior)**
- Ask: "What did you expect to happen instead?"
- Get a clear description of expected behavior

**Question 5: Steps to Reproduce**
- Ask: "What steps did you take before the bug occurred?"
- Get reproduction steps

**Question 6: Error Messages**
- Ask: "Did you see any error messages? If so, please share them."
- Capture any error output

## Step 2: Collect Environment Information

Automatically gather:
```bash
# Get plugin version
cat ~/.claude/plugins/installed_plugins.json 2>/dev/null | grep -A5 "compound-engineering" | head -10 || echo "Plugin info not found"

# Get Claude Code version
claude --version 2>/dev/null || echo "Claude CLI version unknown"

# Get OS info
uname -a
```

## Step 3: Format the Bug Report

Create a well-structured bug report with:

```markdown
## Bug Description

**Component:** [Type] - [Name]
**Summary:** [Brief description from argument or collected info]

## Environment

- **Plugin Version:** [from installed_plugins.json]
- **Claude Code Version:** [from claude --version]
- **OS:** [from uname]

## What Happened

[Actual behavior description]

## Expected Behavior

[Expected behavior description]

## Steps to Reproduce

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Error Messages

```
[Any error output]
```

## Additional Context

[Any other relevant information]

---
*Reported via `/report-bug` command*
```

## Step 4: Detect Project Tracker

Check the user's CLAUDE.md for project tracker preference:
- Look for `project_tracker: github` or `project_tracker: linear`
- Default to GitHub for compound-engineering plugin bugs
- For user's own projects, use their configured tracker

## Step 5: Create Issue

### If GitHub (default for plugin bugs):

```bash
gh issue create \
  --repo EveryInc/every-marketplace \
  --title "[compound-engineering] Bug: [Brief description]" \
  --body "[Formatted bug report from Step 3]" \
  --label "bug,compound-engineering"
```

**Note:** If labels don't exist, create without labels:
```bash
gh issue create \
  --repo EveryInc/every-marketplace \
  --title "[compound-engineering] Bug: [Brief description]" \
  --body "[Formatted bug report]"
```

### If Linear (for user's projects):

**Step 1: Get team and project context**
- Use `mcp__linear__get_teams` to list available teams
- Ask user to select team
- Use `mcp__linear__get_projects` for selected team
- Ask user to select project

**Step 2: Create the issue**
Use `mcp__linear__create_issue` with:
- `title`: "[Brief description]"
- `description`: Formatted bug report from Step 3 (Linear auto-links URLs, commits, other issues)
- `teamId`: Selected team ID
- `projectId`: Selected project ID (optional)
- `priority`: 1 (High priority for bugs)

**Linear Magic Links in Bug Report:**
- Any GitHub PR/commit URLs in description become clickable with rich previews
- Stack trace SHAs auto-link to commits if they exist
- References to other Linear issues (e.g., `ENG-456`) auto-link
- All URLs automatically become clickable links

**Step 3: Capture issue ID**
Display the Linear issue identifier (e.g., `ENG-123`) and URL

## Step 6: Confirm Submission

After the issue is created:
1. Display the issue URL to the user
2. Thank them for reporting the bug
3. For plugin bugs: Let them know the maintainer (Kieran Klaassen) will be notified
4. For Linear issues: Confirm the issue was created in their team's tracker

## Output Format

**For GitHub:**
```
✅ Bug report submitted successfully!

Issue: https://github.com/EveryInc/every-marketplace/issues/[NUMBER]
Title: [compound-engineering] Bug: [description]

Thank you for helping improve the compound-engineering plugin!
The maintainer will review your report and respond as soon as possible.
```

**For Linear:**
```
✅ Bug report submitted successfully!

Issue: ENG-123
URL: https://linear.app/team/issue/ENG-123
Title: [Brief description]

The issue has been created in your Linear workspace.
```

## Error Handling

- **GitHub:** If `gh` CLI is not authenticated: Prompt user to run `gh auth login` first
- **Linear:** If Linear MCP is not authenticated: Prompt user to run `/mcp` command to authenticate
- If issue creation fails: Display the formatted report so user can manually create the issue
- If required information is missing: Re-prompt for that specific field

## Privacy Notice

This command does NOT collect:
- Personal information
- API keys or credentials
- Private code from your projects
- File paths beyond basic OS info

Only technical information about the bug is included in the report.
