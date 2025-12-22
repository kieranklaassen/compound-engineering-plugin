---
name: workflows:work
description: Execute work plans efficiently while maintaining quality and finishing features
argument-hint: "[plan file, specification, or todo file path]"
---

# Work Plan Execution Command

Execute a work plan efficiently while maintaining quality and finishing features.

## Introduction

This command takes a work document (plan, specification, or todo file) and executes it systematically. The focus is on **shipping complete features** by understanding requirements quickly, following existing patterns, and maintaining quality throughout.

## Input Document

<input_document> #$ARGUMENTS </input_document>

## Extract Linear Issue ID

<thinking>
Check if the input includes a Linear issue ID (format: XXX-NNN where XXX is team prefix like ENG, TEAM, etc.).
Also check if there's a current Linear context from a previous /workflows:plan command.
</thinking>

**Issue ID Detection:**
1. Check if argument matches Linear ID pattern (e.g., `ENG-123`, `TEAM-456`)
2. If plan file provided, check for issue reference in frontmatter or content
3. If no issue ID found, ask user:
   - "Is this work related to a Linear issue? Enter issue ID (e.g., ENG-123) or 'no'"
   - If ID provided, verify with `mcp__linear__get_issue` tool

Store as: `$LINEAR_ISSUE_ID` (e.g., "ENG-123") or empty if none

## Execution Workflow

### Phase 1: Quick Start

1. **Read Plan and Clarify**

   - Read the work document completely
   - Review any references or links provided in the plan
   - If anything is unclear or ambiguous, ask clarifying questions now
   - Get user approval to proceed
   - **Do not skip this** - better to ask questions now than build the wrong thing

2. **Setup Environment**

   Choose your work style:

   **Option A: Live work on current branch**
   ```bash
   git checkout main && git pull origin main

   # Branch naming with Linear issue ID (triggers Linear auto-detection)
   # Linear auto-detects issue IDs in branch names and creates links
   # Format: type/ISSUE-ID-description
   # If LINEAR_ISSUE_ID exists: feat/ENG-123-feature-description
   # If no issue: feature-description
   # Examples:
   #   feat/ENG-123-add-user-authentication  (Linear auto-links to ENG-123)
   #   fix/ENG-456-fix-login-error           (Linear auto-links to ENG-456)
   #   refactor/ENG-789-extract-service      (Linear auto-links to ENG-789)
   git checkout -b feat/${LINEAR_ISSUE_ID:+$LINEAR_ISSUE_ID-}feature-description
   ```

   **Option B: Parallel work with worktree (recommended for parallel development)**
   ```bash
   # Ask user first: "Work in parallel with worktree or on current branch?"
   # If worktree:
   skill: git-worktree
   # Pass branch name with Linear ID: feat/ENG-123-feature-description
   # The skill will create a new branch from main in an isolated worktree
   ```

   **Recommendation**: Use worktree if:
   - You want to work on multiple features simultaneously
   - You want to keep main clean while experimenting
   - You plan to switch between branches frequently

   Use live branch if:
   - You're working on a single feature
   - You prefer staying in the main repository

3. **Create Todo List**
   - Use TodoWrite to break plan into actionable tasks
   - Include dependencies between tasks
   - Prioritize based on what needs to be done first
   - Include testing and quality check tasks
   - Keep tasks specific and completable

### Phase 2: Execute

1. **Task Execution Loop**

   For each task in priority order:

   ```
   while (tasks remain):
     - Mark task as in_progress in TodoWrite
     - Read any referenced files from the plan
     - Look for similar patterns in codebase
     - Implement following existing conventions
     - Write tests for new functionality
     - Run tests after changes
     - Mark task as completed
   ```

2. **Follow Existing Patterns**

   - The plan should reference similar code - read those files first
   - Match naming conventions exactly
   - Reuse existing components where possible
   - Follow project coding standards (see CLAUDE.md)
   - When in doubt, grep for similar implementations

3. **Test Continuously**

   - Run relevant tests after each significant change
   - Don't wait until the end to test
   - Fix failures immediately
   - Add new tests for new functionality

4. **Figma Design Sync** (if applicable)

   For UI work with Figma designs:

   - Implement components following design specs
   - Use figma-design-sync agent iteratively to compare
   - Fix visual differences identified
   - Repeat until implementation matches design

5. **Track Progress**
   - Keep TodoWrite updated as you complete tasks
   - Note any blockers or unexpected discoveries
   - Create new tasks if scope expands
   - Keep user informed of major milestones

### Phase 3: Quality Check

1. **Run Core Quality Checks**

   Always run before submitting:

   ```bash
   # Run full test suite
   bin/rails test

   # Run linting (per CLAUDE.md)
   # Use linting-agent before pushing to origin
   ```

2. **Consider Reviewer Agents** (Optional)

   Use for complex, risky, or large changes:

   - **code-simplicity-reviewer**: Check for unnecessary complexity
   - **kieran-rails-reviewer**: Verify Rails conventions (Rails projects)
   - **performance-oracle**: Check for performance issues
   - **security-sentinel**: Scan for security vulnerabilities
   - **cora-test-reviewer**: Review test quality (CORA projects)

   Run reviewers in parallel with Task tool:

   ```
   Task(code-simplicity-reviewer): "Review changes for simplicity"
   Task(kieran-rails-reviewer): "Check Rails conventions"
   ```

   Present findings to user and address critical issues.

3. **Final Validation**
   - All TodoWrite tasks marked completed
   - All tests pass
   - Linting passes
   - Code follows existing patterns
   - Figma designs match (if applicable)
   - No console errors or warnings

### Phase 4: Ship It

1. **Create Commit**

   ```bash
   git add .
   git status  # Review what's being committed
   git diff --staged  # Check the changes

   # Commit with conventional format and Linear issue ID
   # Format: type(LINEAR-ID): description
   # If LINEAR_ISSUE_ID is set, use it in the scope
   # Examples:
   #   feat(ENG-123): add user authentication flow
   #   fix(ENG-456): resolve login timeout issue
   git commit -m "$(cat <<'EOF'
   feat(ENG-123): description of what and why

   - Bullet points of changes
   - Key decisions made

   Closes ENG-123

   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude <noreply@anthropic.com>
   EOF
   )"
   ```

   **Commit Message Format (Linear Magic Links):**
   - With Linear issue: `feat(ENG-123): description`
   - Footer **MUST** include: `Closes ENG-123` or `Fixes ENG-123`
   - Linear auto-detects and creates bidirectional link (commit ↔ issue)
   - Type prefix: feat, fix, refactor, docs, test, chore

   **Linear Auto-Linking Keywords:**
   - `Closes ENG-123` - Marks issue as done when merged
   - `Fixes ENG-123` - Alternative to Closes
   - `Resolves ENG-123` - Alternative to Closes
   - Can reference multiple: `Closes ENG-123, ENG-456`

2. **Capture and Upload Screenshots for UI Changes** (REQUIRED for any UI work)

   For **any** design changes, new views, or UI modifications, you MUST capture and upload screenshots:

   **Step 1: Start dev server** (if not running)
   ```bash
   bin/dev  # Run in background
   ```

   **Step 2: Capture screenshots with Playwright MCP tools**
   - `browser_navigate` to go to affected pages
   - `browser_resize` to set viewport (desktop or mobile as needed)
   - `browser_snapshot` to verify page state
   - `browser_take_screenshot` to capture images

   **Step 3: Upload using imgup skill**
   ```bash
   skill: imgup
   # Then upload each screenshot:
   imgup -h pixhost screenshot.png  # pixhost works without API key
   # Alternative hosts: catbox, imagebin, beeimg
   ```

   **What to capture:**
   - **New screens**: Screenshot of the new UI
   - **Modified screens**: Before AND after screenshots
   - **Design implementation**: Screenshot showing Figma design match

   **IMPORTANT**: Always include uploaded image URLs in PR description. This provides visual context for reviewers and documents the change.

3. **Create Pull Request**

   ```bash
   # Push with Linear-issue-formatted branch name
   git push -u origin feat/ENG-123-feature-description

   # Create PR with Linear issue reference (triggers Linear magic links)
   gh pr create --title "feat(ENG-123): [Description]" --body "$(cat <<'EOF'
   ## Summary
   - What was built
   - Why it was needed
   - Key decisions made

   ## Linear Issue
   Closes ENG-123

   <!-- Linear Magic Links: Auto-creates bidirectional link (PR ↔ Issue) -->
   <!-- When PR is merged, Linear automatically marks issue as Done -->
   <!-- Linear detects: Closes, Fixes, Resolves keywords -->

   ## Testing
   - Tests added/modified
   - Manual testing performed

   ## Before / After Screenshots
   | Before | After |
   |--------|-------|
   | ![before](URL) | ![after](URL) |

   ## Figma Design
   [Link if applicable]

   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   EOF
   )"
   ```

   **After PR Creation (Optional):**

   Update Linear issue status and add PR link:
   ```bash
   # Use mcp__linear__update_issue to set state to "In Review"
   # Use mcp__linear__create_comment to add PR URL to the issue
   ```

4. **Notify User**
   - Summarize what was completed
   - Link to PR
   - Note any follow-up work needed
   - Suggest next steps if applicable

---

## Key Principles

### Start Fast, Execute Faster

- Get clarification once at the start, then execute
- Don't wait for perfect understanding - ask questions and move
- The goal is to **finish the feature**, not create perfect process

### The Plan is Your Guide

- Work documents should reference similar code and patterns
- Load those references and follow them
- Don't reinvent - match what exists

### Test As You Go

- Run tests after each change, not at the end
- Fix failures immediately
- Continuous testing prevents big surprises

### Quality is Built In

- Follow existing patterns
- Write tests for new code
- Run linting before pushing
- Use reviewer agents for complex/risky changes only

### Ship Complete Features

- Mark all tasks completed before moving on
- Don't leave features 80% done
- A finished feature that ships beats a perfect feature that doesn't

## Quality Checklist

Before creating PR, verify:

- [ ] All clarifying questions asked and answered
- [ ] All TodoWrite tasks marked completed
- [ ] Tests pass (run `bin/rails test`)
- [ ] Linting passes (use linting-agent)
- [ ] Code follows existing patterns
- [ ] Figma designs match implementation (if applicable)
- [ ] Before/after screenshots captured and uploaded (for UI changes)
- [ ] Commit messages follow conventional format
- [ ] PR description includes summary, testing notes, and screenshots

## When to Use Reviewer Agents

**Don't use by default.** Use reviewer agents only when:

- Large refactor affecting many files (10+)
- Security-sensitive changes (authentication, permissions, data access)
- Performance-critical code paths
- Complex algorithms or business logic
- User explicitly requests thorough review

For most features: tests + linting + following patterns is sufficient.

## Common Pitfalls to Avoid

- **Analysis paralysis** - Don't overthink, read the plan and execute
- **Skipping clarifying questions** - Ask now, not after building wrong thing
- **Ignoring plan references** - The plan has links for a reason
- **Testing at the end** - Test continuously or suffer later
- **Forgetting TodoWrite** - Track progress or lose track of what's done
- **80% done syndrome** - Finish the feature, don't move on early
- **Over-reviewing simple changes** - Save reviewer agents for complex work
