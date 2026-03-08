# Infisical Setup Guide

## 1. Create Infisical Account

1. Go to https://infisical.com
2. Click **"Get Started"** or **"Sign Up"**
3. Create your account (free tier available)

## 2. Create a Project

1. Log in to https://app.infisical.com
2. Click **"Create Project"**
3. Name: `ttdev`
4. Choose your region
5. Click **"Create"**

## 3. Add Secrets

In your Infisical project dashboard:

1. Click **"Add Secret"**
2. Add these secrets:

| Secret Key | Value |
|------------|-------|
| `DATABASE_URL` | `postgresql://postgres.usgzpcvapikcyunazjkj:9o5sE19aODXJhndR@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres` |
| `SUPABASE_URL` | `https://usgzpcvapikcyunazjkj.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your key) |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | `dqRNfkACFiCNN1UM+wSgO3rzCQ/OPuSkHOiG9lR5Hgw=` |
| `GOOGLE_CLIENT_ID` | `660539795758-9qhkuqg1fr82dat76q3jnp46gj1u3oti...` |
| `GOOGLE_CLIENT_SECRET` | `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` |
| `GITHUB_CLIENT_ID` | `Ov23lihkw9TcRkqi9Kes` |
| `GITHUB_CLIENT_SECRET` | `e65225d2c256e0f873b09ff53f04feb1d77fa450` |

3. Click **"Save"**

## 4. Get Your Infisical Token

### Option A: Machine Identity (Recommended for Production)

1. Go to **Settings** → **Machine Identities**
2. Click **"Create Machine Identity"**
3. Name: `ttdev-app`
4. Assign to your project
5. Copy the **Service Token**

### Option B: Service Token (Quick Setup)

1. Go to your project
2. Click **"Service Tokens"** in left sidebar
3. Click **"Create Service Token"**
4. Select:
   - Environment: `dev` (or create one)
   - Permissions: `Read`
5. Copy the token

## 5. Update Configuration

### Update `infisical.config.json`:

```json
{
  "workspaceId": "your-workspace-id",
  "projectId": "your-project-id",
  "environment": "dev",
  "token": "your-service-token-here"
}
```

**Or use environment variables:**

```env
INFISICAL_TOKEN=your-service-token-here
INFISICAL_PROJECT_ID=your-project-id
INFISICAL_ENVIRONMENT=dev
```

## 6. Install Infisical CLI (Optional - for Local Development)

```bash
# Install globally
npm install -g @infisical/cli

# Login
infisical login

# Run your app with Infisical
infisical run -- pnpm dev
```

## 7. Update package.json Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "infisical run -- next dev",
    "build": "infisical run -- next build",
    "start": "infisical run -- next start"
  }
}
```

## 8. Run Your App

```bash
# With CLI
infisical run -- pnpm dev

# Or with token in .env
pnpm dev
```

---

## Your Current Setup

✅ **Infisical SDK installed**
✅ **Database client updated to support Infisical**
⏳ **Need to create Infisical account and project**
⏳ **Need to add secrets to Infisical**
⏳ **Need to configure token**

---

## Need Help?

- Infisical Docs: https://infisical.com/docs
- Infisical Dashboard: https://app.infisical.com
