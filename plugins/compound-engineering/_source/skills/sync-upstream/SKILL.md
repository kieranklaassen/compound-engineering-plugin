---
name: sync-upstream
description: This skill should be used when the user wants to sync changes from the upstream EveryInc/compound-engineering-plugin repository while preserving local structural changes like the _source directory and build system.
---

# Sync Upstream Changes

Synchronize content updates from the upstream Every Inc plugin repository while preserving your fork's configurable component loading system.

## When to Use

- After upstream releases new versions
- When you notice upstream has new agents, commands, or skills
- Periodically (weekly/monthly) to stay current with improvements
- Before starting new work to ensure you have latest patterns

## Quick Start

```bash
./plugins/compound-engineering/bin/sync-upstream
```

The script will:
1. Fetch upstream changes
2. Show each change interactively (added, modified, deleted files)
3. Let you approve or skip each change
4. Run `bin/build` to regenerate output directories

## What Gets Synced

| Component | Upstream Path | Local Path |
|-----------|---------------|------------|
| Agents | `agents/**/*.md` | `_source/agents/**/*.md` |
| Commands | `commands/**/*.md` | `_source/commands/**/*.md` |
| Skills | `skills/*/` | `_source/skills/*/` |

## Change Types

- **NEW** (green): File exists upstream but not locally. Adds to `_source/`.
- **MODIFIED** (yellow): File changed upstream. Shows diff, updates `_source/`.
- **DELETED** (red): File removed upstream. Prompts to remove from `_source/`.

## Preserving Local Changes

The sync script preserves files that only exist in your fork:

- `bin/build` - Your build system
- `bin/sync-upstream` - This sync tool
- `compound.config.json` - Your component configuration
- `commands/configure.md` - Your custom configure command
- Any local-only agents, commands, or skills

## After Syncing

1. Review changes: `git diff`
2. Test the plugin loads correctly
3. Run `bin/build` to verify regeneration works
4. Commit with descriptive message:

```bash
git add -A
git commit -m "Sync upstream changes from EveryInc/compound-engineering-plugin

Updated: [list key changes]
"
```

## Checking Upstream Status

To see what's changed without applying:

```bash
# Ensure upstream is fetched
git fetch upstream

# See all file changes
git diff main upstream/main --stat -- plugins/compound-engineering/

# See specific component changes
git diff main upstream/main --name-status -- plugins/compound-engineering/agents/
git diff main upstream/main --name-status -- plugins/compound-engineering/commands/
git diff main upstream/main --name-status -- plugins/compound-engineering/skills/
```

## Troubleshooting

**"upstream" remote not found:**
The script adds it automatically, but you can add manually:
```bash
git remote add upstream https://github.com/EveryInc/compound-engineering-plugin.git
```

**Merge conflicts in local changes:**
The script doesn't merge; it overwrites from upstream. If you've modified an upstream file locally, either:
- Skip that file during sync
- Backup your changes, apply upstream, then reapply your modifications

**Build fails after sync:**
New skills may have dependencies. Check the skill's SKILL.md for requirements.
