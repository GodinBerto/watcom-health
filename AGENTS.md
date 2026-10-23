# Project architecture

- This app is a Next.js project using the App Router.
- Course catalogue and lesson metadata live in `src/lib/courses.ts`.
- Certificate and quiz pass logic live in `src/lib/quiz.ts`.
- Student-facing pages live under `src/app/`.
- Authentication uses a local demo account stored in browser localStorage in `src/lib/auth.ts`.
- Keep all runtime logic self-contained and avoid reintroducing unused legacy framework files.
