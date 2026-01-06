# Common Operations Reference

## Basic Operations

### Upload single file
```bash
rclone copy /path/to/file.mp4 remote:bucket/path/ --progress
```

### Upload directory
```bash
rclone copy /path/to/folder remote:bucket/folder/ --progress
```

### Sync directory (mirror, deletes removed files)
```bash
rclone sync /local/path remote:bucket/path/ --progress
```

### List remote contents
```bash
rclone ls remote:bucket/
rclone lsd remote:bucket/  # directories only
```

### Dry run (preview without transferring)
```bash
rclone copy /path remote:bucket/ --dry-run
```

## Useful Flags

| Flag | Purpose |
|------|---------|
| `--progress` | Show transfer progress |
| `--dry-run` | Preview without transferring |
| `-v` | Verbose output |
| `--transfers=N` | Parallel transfers (default 4) |
| `--bwlimit=RATE` | Bandwidth limit (e.g., `10M`) |
| `--checksum` | Compare by checksum, not size/time |
| `--exclude="*.tmp"` | Exclude patterns |
| `--include="*.mp4"` | Include only matching |
| `--min-size=SIZE` | Skip files smaller than SIZE |
| `--max-size=SIZE` | Skip files larger than SIZE |

## Large File Uploads

For videos and large files, use chunked uploads:

```bash
# S3 multipart upload (automatic for >200MB)
rclone copy large_video.mp4 remote:bucket/ --s3-chunk-size=64M --progress

# Resume interrupted transfers
rclone copy /path remote:bucket/ --progress --retries=5
```

## Verification

```bash
# Check file exists and matches
rclone check /local/file remote:bucket/file

# Get file info
rclone lsl remote:bucket/path/to/file
```
