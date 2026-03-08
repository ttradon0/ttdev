# Infisical Setup Guide

## 1. Create Infisical Account

1. Go to https://app.infisical.com
2. Click **"Sign Up"** (free forever plan)
3. Create your account

## 2. Create a Project

1. After login, click **"Create Project"**
2. Name: `ttdev`
3. Choose region (select closest to you)
4. Click **"Create"**

## 3. Add Secrets

In your Infisical project dashboard:

1. Make sure you're in the **`dev`** environment (top left dropdown)
2. Click **"+ Add Secret"**
3. Add these secrets one by one:

| Secret Key | Secret Value |
|------------|--------------|
| `DATABASE_URL` | `postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres` |
| `SUPABASE_URL` | `https://YOUR_PROJECT_REF.supabase.co` |
| `SUPABASE_ANON_KEY` | `your-supabase-anon-key` |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | `your-nextauth-secret` |
| `GOOGLE_CLIENT_ID` | `your-google-client-id` |
| `GOOGLE_CLIENT_SECRET` | `your-google-client-secret` |
| `GITHUB_CLIENT_ID` | `your-github-client-id` |
| `GITHUB_CLIENT_SECRET` | `your-github-client-secret` |

4. Click **"Save Changes"** after each secret

## 4. Create Service Token

1. In your Infisical project, go to **Settings** (left sidebar)
2. Click **"Service Tokens"** tab
3. Click **"Create Service Token"**
4. Fill in:
   - **Name:** `ttdev-local`
   - **Environment:** `dev`
   - **Permissions:** `Read` (we only need to read secrets)
5. Click **"Create"**
6. **Copy the token immediately** - you won't see it again!

## 5. Get Project ID

1. Still in **Settings**, look at the top
2. **Project ID** is shown (it's a UUID like `abc12345-...`)
3. Copy it

## 6. Configure Local Development

### Option A: Using `.env` file (Recommended for local dev)

Create a `.env` file in your project root:

```env
INFISICAL_TOKEN=your-service-token-from-step-4
INFISICAL_PROJECT_ID=your-project-id-from-step-5
INFISICAL_ENVIRONMENT=dev
```

Then run:
```bash
pnpm dev
```

### Option B: Using Infisical CLI

```bash
# Login to Infisical
infisical login

# Link your project (run in project folder)
infisical link

# Run your app
infisical run -- pnpm dev
```

## 7. Verify Setup

After running `pnpm dev`, check the console:
- If you see **"Ready in Xms"** - ✅ Success!
- If you see **"Failed to fetch secrets"** - Check your token and project ID

---

## Troubleshooting

### "DATABASE_URL not found"
- Check that `INFISICAL_TOKEN` and `INFISICAL_PROJECT_ID` are set correctly
- Make sure you added `DATABASE_URL` secret in Infisical dashboard
- Ensure you're in the `dev` environment

### "Invalid token"
- Service token might be expired - create a new one
- Make sure you copied the entire token (no spaces)

### "Project not found"
- Double-check the Project ID (it's a UUID)
- Make sure you have access to the project

---

## Quick Reference

| What | Where |
|------|-------|
| Infisical Dashboard | https://app.infisical.com |
| Service Tokens | Project Settings → Service Tokens |
| Project ID | Project Settings (top of page) |
| Add Secrets | Project Dashboard → + Add Secret |

---

## Need Help?

- 📚 Docs: https://infisical.com/docs
- 💬 Discord: https://discord.gg/infisical
- 📧 Support: support@infisical.com
