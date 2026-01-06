# Provider Configuration Reference

## Provider Setup Quick Reference

| Provider | Type | Key Settings |
|----------|------|--------------|
| AWS S3 | `s3` | access_key_id, secret_access_key, region |
| Cloudflare R2 | `s3` | access_key_id, secret_access_key, endpoint (account_id.r2.cloudflarestorage.com) |
| Backblaze B2 | `b2` | account (keyID), key (applicationKey) |
| DigitalOcean Spaces | `s3` | access_key_id, secret_access_key, endpoint (region.digitaloceanspaces.com) |
| Google Drive | `drive` | OAuth flow (opens browser) |
| Dropbox | `dropbox` | OAuth flow (opens browser) |

## Configuration Examples

### Cloudflare R2

```bash
rclone config create r2 s3 \
  provider=Cloudflare \
  access_key_id=YOUR_ACCESS_KEY \
  secret_access_key=YOUR_SECRET_KEY \
  endpoint=ACCOUNT_ID.r2.cloudflarestorage.com \
  acl=private
```

### AWS S3

```bash
rclone config create aws s3 \
  provider=AWS \
  access_key_id=YOUR_ACCESS_KEY \
  secret_access_key=YOUR_SECRET_KEY \
  region=us-east-1
```

### Backblaze B2

```bash
rclone config create b2 b2 \
  account=YOUR_KEY_ID \
  key=YOUR_APPLICATION_KEY
```

### DigitalOcean Spaces

```bash
rclone config create spaces s3 \
  provider=DigitalOcean \
  access_key_id=YOUR_ACCESS_KEY \
  secret_access_key=YOUR_SECRET_KEY \
  endpoint=nyc3.digitaloceanspaces.com
```

## Interactive Configuration

For OAuth-based providers (Google Drive, Dropbox):

```bash
rclone config
```

Follow the interactive prompts to complete authentication.
