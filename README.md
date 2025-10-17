# Smart Recipe Generator — Pro

- Next.js + Tailwind polished UI (glassmorphism)
- Ingredient input + optional photo recognition (Hugging Face)
- Recipe matching (exact/partial/substitutions), filters (diet/time/difficulty)
- Serving size adjustment
- Ratings & Favorites (localStorage)
- Nutrition (simple heuristic)
- Deploy-ready for Vercel

## Run
```bash
npm install
npm run dev
# production
npm run build && npm start
```

## Deploy (Vercel)
1) Push to GitHub
2) Import in Vercel (Framework: Next.js)
3) (Optional) Add `HUGGINGFACE_TOKEN` env var for photo recognition
4) Deploy

## API
- `GET /api/recipes` with query `q`, `diet`, `maxTime`, `difficulty`
- `POST /api/recognize` { imageBase64 } → { labels: [] } (uses Hugging Face if token present)
