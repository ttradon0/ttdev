git init

git add package.json pnpm-lock.yaml next.config.mjs tailwind.config.ts tsconfig.json postcss.config.mjs .gitignore README.md app/layout.tsx app/globals.css 
git commit -m "chore(core): initialize Next.js environment with Tailwind CSS and global typography"

git add app/components/Navbar.tsx app/components/Footer.tsx app/components/CTA.tsx
git commit -m "feat(ui): implement foundational navigation and call-to-action components"

git add app/components/TypewriterHero.tsx app/components/CodeEditorAnimation.tsx app/components/LoginCodeAnimation.tsx
git commit -m "feat(ui): develop dynamic typewriter and code visualization animations"

git add app/lib/data.ts
git commit -m "feat(data): define static data schemas for courses, features, and testimonials"

git add app/components/Hero.tsx app/components/Features.tsx app/components/Courses.tsx app/components/Testimonials.tsx
git commit -m "feat(ui): construct modular landing page sections"

git add app/page.tsx
git commit -m "feat(pages): assemble optimized landing page integrating animated hero and core modules"

git add app/login/page.tsx app/register/page.tsx
git commit -m "feat(auth): engineer login and registration workflows with refined UI patterns"

git add .
git commit -m "chore(repo): resolve residual configuration and untracked asset files"

git remote add origin https://github.com/ttradon0/ttdev.git
git branch -M main
git push -u origin main
