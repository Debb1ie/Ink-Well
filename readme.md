# Inkwell — Content Platform

A Medium-like platform for adult writers and readers. Features:
-  Dark/Light mode (auto-detects system preference)
-  Age verification gate (18+)
   Rich writing editor with Markdown-like formatting
   Clean reading experience
   - I writing assistant (Claude-powered)
   -  Shared articles — published by anyone, visible to all.

---

## Deploy to Vercel (5 minutes)!

### Option 1: Use the `.jsx` directly in Claude.ai (Artifacts)
Paste the `.jsx` file contents directly into a Claude artifact. Works immediately.

### Option 2: Full Vercel Deploy

1. **Create a new React project:**
```bash
npx create-react-app inkwell --template typescript
cd inkwell
```

2. **Replace `src/App.tsx`** with the contents of `inkwell-platform.jsx`

3. **Install dependencies:** (all standard React — no extra installs needed)

4. **Deploy to Vercel:**
```bash
npm install -g vercel
vercel
```

### Option 3: Vite + React (recommended for performance)
```bash
npm create vite@latest inkwell -- --template react
cd inkwell
npm install
# Replace src/App.jsx with inkwell-platform.jsx contents
npm run dev
```

Then deploy:
```bash
npm run build
vercel --prod
```

---

## Shared Articles (Persistent Storage)

Articles are stored using Claude's `window.storage` API with `shared: true`, which means:
- Anyone who publishes sees their article on all visitors' feeds
- No backend needed — it's handled by Anthropic's infrastructure
- Works out of the box in Claude.ai artifacts.

**Note:** If deploying outside Claude.ai, replace the `window.storage` calls with a backend (Supabase, Firebase, etc.):

```js
// Replace window.storage.get / window.storage.set with:
// Supabase example:
const { data } = await supabase.from('articles').select('*');
```

---

## Features

| Feature | Status |
|---|---|
| Dark / Light mode | ✅ |
| Age verification gate | ✅ |
| Write & publish stories | ✅ |
| Read all published stories | ✅ |
| AI writing assistant | ✅ |
| Shared storage (all visitors see same articles) | ✅ |
| Tags & categories | ✅ |
| Like / view counts | ✅ |
| Mobile responsive | ✅ |

---

## Content Guidelines Built In
- Age gate prevents under-18 access
- Writing guidelines displayed in sidebar
- No real-person fiction policy shown
- No minor-involving content policy shown
