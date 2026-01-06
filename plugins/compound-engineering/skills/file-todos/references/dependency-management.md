# Dependency Management Reference

## Tracking Dependencies

```yaml
dependencies: ["002", "005"]  # Blocked by issues 002 and 005
dependencies: []               # No blockers - can work immediately
```

## Dependency Commands

### Check what blocks a todo

```bash
grep "^dependencies:" todos/003-*.md
```

### Find what a todo blocks

```bash
grep -l 'dependencies:.*"002"' todos/*.md
```

### Verify blockers complete before starting

```bash
for dep in 001 002 003; do
  [ -f "todos/${dep}-complete-*.md" ] || echo "Issue $dep not complete"
done
```

### Find unblocked work after completion

```bash
grep -l 'dependencies:.*"002"' todos/*-ready-*.md
```

## Dependency Best Practices

- Add dependencies during todo creation
- Remove dependencies when blockers complete
- Check for newly unblocked work after completing any todo
- Use empty array `[]` explicitly when no dependencies
