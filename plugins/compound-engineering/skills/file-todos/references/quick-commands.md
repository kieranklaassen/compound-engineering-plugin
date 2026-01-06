# Quick Reference Commands

## Finding Work

```bash
# List highest priority unblocked work
grep -l 'dependencies: \[\]' todos/*-ready-p1-*.md

# List all pending items needing triage
ls todos/*-pending-*.md

# Find next issue ID
ls todos/ | grep -o '^[0-9]\+' | sort -n | tail -1 | awk '{printf "%03d", $1+1}'

# Count by status
for status in pending ready complete; do
  echo "$status: $(ls -1 todos/*-$status-*.md 2>/dev/null | wc -l)"
done
```

## Searching

```bash
# Search by tag
grep -l "tags:.*rails" todos/*.md

# Search by priority
ls todos/*-p1-*.md

# Full-text search
grep -r "payment" todos/
```

## Status Management

```bash
# Promote pending to ready
mv todos/003-pending-p1-fix-bug.md todos/003-ready-p1-fix-bug.md

# Complete a todo
mv todos/003-ready-p1-fix-bug.md todos/003-complete-p1-fix-bug.md
```

## Frontmatter Updates

After renaming, update the YAML frontmatter to match:
- `status: pending` → `status: ready` → `status: complete`
