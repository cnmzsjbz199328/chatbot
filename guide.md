# Vercel Deployment Guide for Chatbot Project

This guide provides step-by-step instructions to deploy the Chatbot project (a Next.js application with Supabase for authentication/database and Pinecone for vector embeddings) to Vercel. The project is already configured with `vercel.json` for optimal Vercel support.

## Prerequisites

Before starting, ensure you have:
- A GitHub account with the repository forked or cloned (current repo: https://github.com/cnmzsjbz199328/chatbot.git).
- A Vercel account (sign up at [vercel.com](https://vercel.com) if needed; free tier is sufficient for development).
- Node.js (v18+) installed locally to test the project.
- A Supabase project set up (create one at [supabase.com](https://supabase.com) if not already done):
  - Enable authentication.
  - Create necessary tables using the provided Drizzle migrations (`drizzle/` folder) or Supabase dashboard.
- A Pinecone account and index (sign up at [pinecone.io](https://pinecone.io); create an index for embeddings).
- Access to environment variables for Supabase and Pinecone.

## Step 1: Prepare the Project Locally

1. Clone the repository if not already done:
   ```
   git clone https://github.com/cnmzsjbz199328/chatbot.git
   cd chatbot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables locally in a `.env.local` file (do not commit this):
   ```
   # Supabase
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Pinecone
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX_NAME=your_pinecone_index_name
   PINECONE_ENVIRONMENT=your_pinecone_environment (e.g., us-west1-gcp-free)

   # Next.js / Other (if using auth or other services)
   NEXTAUTH_SECRET=your_nextauth_secret (generate with `openssl rand -base64 32`)
   NEXTAUTH_URL=https://your-vercel-app-url.vercel.app (update after deployment)

   # Database (if needed for seeding)
   DATABASE_URL=your_supabase_postgres_url
   ```

4. Run database migrations (using Drizzle):
   ```
   npx drizzle-kit push:pg
   ```
   Or apply SQL migrations manually in Supabase dashboard using files in `drizzle/` or `sample-data.sql`.

5. (Optional) Seed sample data:
   - Update `scripts/insert-sample-data.ts` with your DB connection.
   - Run: `npx tsx scripts/insert-sample-data.ts`

6. Test locally:
   ```
   npm run dev
   ```
   Visit `http://localhost:3000` to ensure everything works (login, chat, file upload, etc.).

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended for Beginners)

1. Log in to [vercel.com](https://vercel.com) and click "New Project".

2. Import the repository from GitHub (authorize Vercel if prompted).

3. Configure the project:
   - **Framework Preset**: Next.js (auto-detected).
   - **Root Directory**: Leave as `./` (default).
   - **Build Command**: `npm run build` (default).
   - **Output Directory**: `.next` (default).
   - **Install Command**: `npm install` (default).

4. Add Environment Variables:
   - In the Vercel dashboard, go to Settings > Environment Variables.
   - Add the variables from Step 1 (mark them as System Environment Variables).
   - Scope: All (Production, Preview, Development).

5. Deploy:
   - Click "Deploy". Vercel will build and deploy automatically.
   - Note the deployment URL (e.g., `https://chatbot-app.vercel.app`).

6. (Optional) Set up Custom Domain:
   - In Settings > Domains, add your domain and configure DNS.

### Option B: Using Vercel CLI

1. Install Vercel CLI:
   ```
   npm i -g vercel
   ```

2. Log in:
   ```
   vercel login
   ```

3. Deploy from project root:
   ```
   vercel
   ```
   - Follow prompts: Link to existing project or create new.
   - Set up env vars when prompted (or use `vercel env add` later).

4. For production:
   ```
   vercel --prod
   ```

## Step 3: Post-Deployment Configuration

1. Update NEXTAUTH_URL in Vercel env vars to match your deployed URL.

2. Re-run migrations if needed (Supabase handles this externally; use Supabase dashboard or CLI).

3. Seed data on Supabase (run inserts via dashboard or a one-time script).

4. Test the deployment:
   - Visit the Vercel URL.
   - Test key features: Registration/login, profile editing, chat functionality, file upload, project management.
   - Check console/logs in Vercel dashboard for errors.

5. Enable Vercel Analytics/Monitoring (optional, in dashboard).

## Troubleshooting

- **Build Errors**: Ensure all dependencies are in `package.json`. Check Vercel build logs.
- **Auth Issues**: Verify Supabase keys and enable providers in Supabase dashboard. Update allowed origins to include your Vercel URL.
- **Pinecone Errors**: Confirm API key and index name; ensure index dimension matches embeddings (from `src/lib/custom-embedding.ts`).
- **Database Connection**: Use Supabase's connection pooling for serverless.
- **File Upload**: Supabase Storage is used; ensure bucket permissions are public if needed.
- **CORS/Redirects**: `vercel.json` handles rewrites; adjust if custom routes fail.

### Build Failures Due to Linting and TypeScript Errors

If the build fails due to ESLint or TypeScript errors (common in strict configurations), address them before deploying. Run `npm run lint` locally to check issues. Here's how to fix common ones seen in this project:

1. **TypeScript 'any' Usage (e.g., in `src/app/api/storage/check-bucket/route.ts` line 41, `src/lib/supabaseStorage.ts` lines 77 and 132)**:
   - Replace `any` with specific types (e.g., `unknown` or defined interfaces).
   - Example fix in `check-bucket/route.ts`:
     - Change `res.json({ success: true, bucketName: bucketName as any })` to `res.json({ success: true, bucketName })` (infer type) or define `interface BucketResponse { success: boolean; bucketName: string; }`.
   - In `supabaseStorage.ts`, type parameters (e.g., `file: File` instead of `any` for uploads).

2. **React Unescaped Entities (e.g., in `src/app/test-image/page.tsx` line 97)**:
   - Escape apostrophes in JSX text: Change `'s` to `&rsquo;s` or use curly braces `{`'s}`.
   - Example: `<p>It's a test</p>` → `<p>It&rsquo;s a test</p>`.

3. **Prefer Const Over Let (e.g., in `src/hooks/useSmoothScroll.ts` line 18)**:
   - Change `let start = ...` to `const start = ...` if not reassigned.

4. **Unused Imports/Variables (Warnings in `projectManagement/page.tsx`, `projects/page.tsx`)**:
   - Remove unused imports like `useParams` or `Link`.

5. **Warnings (Non-Blocking but Recommended to Fix)**:
   - **Deprecated Packages**: Update Supabase auth helpers to `@supabase/ssr`. Run `npm update @supabase/supabase-js`.
   - **Font Issues in `layout.tsx`**: Add `&display=swap` to Google Fonts URL.
   - **<img> Elements**: Replace with `next/image` in `test-image/page.tsx` and `ImageUploadField.tsx` for optimization.
   - **SWC Dependencies**: Run `npm run build` locally once to patch.
   - **NPM Vulnerabilities**: Run `npm audit fix` (avoid `--force` unless necessary).

After fixes, commit changes, push to GitHub, and redeploy. To ignore ESLint in builds temporarily (not recommended), add to `next.config.ts`: `{ eslint: { ignoreDuringBuilds: true } }`. For full fixes, refer to ESLint/TS docs.

### NPM Install Warnings and Vulnerabilities

- Deprecations (e.g., auth-helpers): Migrate to recommended packages as noted.
- Vulnerabilities: Run `npm audit fix` locally. If persistent, update affected packages (e.g., bcryptjs types).

Re-run `npm run build` locally to verify before pushing.

## Additional Notes

- This project uses serverless functions (API routes), which Vercel handles natively.
- For CI/CD: Commits to main branch auto-deploy.
- Costs: Vercel hobby tier is free; monitor Supabase/Pinecone usage.
- Updates: After local changes, push to GitHub for auto-redeploy.

If issues arise, check Vercel/Supabase docs or the project's `logs.md` for local debugging insights.
