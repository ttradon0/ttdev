# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to https://app.supabase.com
2. Click **"New Project"**
3. Fill in:
   - **Name:** `ttdev` (or your choice)
   - **Database Password:** Choose a strong password (save it!)
   - **Region:** Choose closest to you
4. Click **"Create new project"** (takes ~2 minutes)

## 2. Get Your Credentials

### Database Connection String
1. Go to **Project Settings** (gear icon)
2. Click **"Database"**
3. Under **"Connection string"**, select **"URI"** tab
4. Select **"Transaction"** mode (pooler)
5. Copy the connection string
6. Update your `.env` file:
   ```env
   DATABASE_URL=postgresql://postgres.your-project-ref:your-password@...
   ```

### Supabase URL and Key
1. Go to **Project Settings** → **"API"**
2. Copy these values to `.env`:
   ```env
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_ANON_KEY=eyJhbGc...your-key-here
   ```

## 3. Run Migrations

```bash
# Push schema to Supabase
pnpm db:push
```

## 4. Start Development

```bash
pnpm dev
```

## 5. (Optional) Use Supabase Dashboard

- Browse data at https://app.supabase.com/project/your-project/editor
- Use SQL Editor for custom queries
- Set up Storage buckets for product images
- Configure Realtime for live updates

---

## Your Current `.env` Setup

✅ **OAuth credentials** - Already configured
✅ **NextAuth Secret** - Already generated
⏳ **Supabase URL** - Waiting for your project
⏳ **Database URL** - Waiting for your project

---

## Need Help?

- Supabase Docs: https://supabase.com/docs
- NextAuth Docs: https://next-auth.js.org
- Drizzle Docs: https://orm.drizzle.team
