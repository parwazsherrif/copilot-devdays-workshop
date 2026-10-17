# Copilot instructions for this repository

## Commands

- Run the quiz locally: `npm start`
  - Serves `src/` on `http://localhost:8080` using a simple static HTTP server.
- Run the full test suite: `npm test`
  - This project uses Node's built-in test runner, not Jest or Vitest.
- Run a single test file:
  - `node --test tests/quiz.test.js`
  - `node --test tests/questions.test.js`
- There is no lint script or build step configured in `package.json`; keep this repository dependency-free and framework-free.

## Architecture

- This is a small static web app: no bundler, framework, or package dependencies.
- `index.html` at the repo root is a GitHub Pages redirect to `src/index.html`.
- `src/index.html` is the browser entry point. It loads scripts in this order:
  1. `questions.js`
  2. `quiz.js`
  3. `app.js`
- `src/questions.js` stores the quiz data in `QUESTIONS`, where each item has:
  - `question`
  - `options` (multiple choice strings)
  - `answer` (0-based index of the correct option)
- `src/quiz.js` contains pure logic with no DOM code. It is intended to be testable under Node and exports functions via `module.exports` when run in Node.
- `src/app.js` owns the browser behavior: it reads elements from the DOM, renders questions, tracks score and state, and handles screen transitions.
- `src/style.css` uses CSS variables in `:root` and keeps the UI accessible with visible focus states and `[hidden] { display: none !important; }`.
- `tests/quiz.test.js` exercises the logic in `src/quiz.js`; `tests/questions.test.js` validates the shape and correctness of the quiz data.

## Conventions

- Keep browser-only code in `src/app.js` and markup in `src/index.html`; keep logic that can be tested in Node in `src/quiz.js`.
- Preserve the no-dependency approach: prefer vanilla JavaScript and plain HTML/CSS.
- Use 0-based indexes for answers in `QUESTIONS` and treat them as positions in the corresponding `options` array.
- Keep `:root` variables as the source of color values in `src/style.css` instead of hard-coded colors.
- When adding or changing app behavior, update the relevant tests in `tests/*.test.js` if the behavior is logic-driven and directly testable.
- Use `module.exports` patterns only in files that are meant to be loaded by Node tests; browser scripts should not depend on the Node test environment.
# how i like code written
-keep code simple and readable
-use clear varaible and function names
-prefer small functions
-use const/let instead of var
-add comment only when the logic is not obvious
