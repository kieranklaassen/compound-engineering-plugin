# Troubleshooting Reference

## Connection Testing

```bash
# Test connection
rclone lsd remote:

# Debug connection issues
rclone lsd remote: -vv

# Check config
rclone config show remote
```

## Common Issues

### "Remote not found"
- Verify remote name: `rclone listremotes`
- Check spelling (remotes are case-sensitive)

### "Access denied" / "Permission denied"
- Verify credentials: `rclone config show remote`
- Check bucket/path permissions in provider console
- For S3-compatible: verify endpoint URL

### "Checksum mismatch"
- File may have been modified during transfer
- Use `--checksum` flag to force checksum comparison
- Re-upload with `--ignore-checksum` if source changed

### "Connection timeout"
- Check network connectivity
- Try with `--timeout=30m` for slow connections
- Use `--retries=5` for unreliable networks

### "Out of memory" (large transfers)
- Reduce parallel transfers: `--transfers=1`
- Use `--buffer-size=16M` to limit memory
- Split large directories into smaller batches

## Debug Commands

```bash
# Full debug output
rclone copy /path remote:bucket/ -vv --log-file=rclone.log

# Check what would be transferred
rclone copy /path remote:bucket/ --dry-run

# Compare local vs remote
rclone check /path remote:bucket/
```
