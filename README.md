# Echo

**Echo** is a short interactive fiction game about a synthetic being on the run in a near-future city. Across six chapters, every choice you make quietly shifts your alignment along two axes — lawful/chaotic and good/evil — and shapes the ending you get. There are no "correct" answers, only consequences.

Built with **React** and **Framer Motion**, with hand-rolled canvas backgrounds for each chapter's mood and a typewriter-style text reveal.

## Features

- 6-chapter branching narrative with an alignment system inspired by the classic D&D 3×3 grid
- Animated, chapter-specific canvas backgrounds (fire, rain, circuit, etc.)
- Typewriter text reveal — click anywhere to fast-forward
- Choices can be changed before you confirm them
- A final "ending" screen that reflects the alignment you landed on

## Tech stack

- [React](https://react.dev/) — UI
- [Framer Motion](https://www.framer.com/motion/) — animation and transitions
- [Vite](https://vitejs.dev/) — dev server & bundler
- Plain `<canvas>` for the procedural backgrounds

## Customizing

Most changes don't require touching any component:

| To change...                        | Edit...                                   |
|--------------------------------------|--------------------------------------------|
| Story chapters, choices, or endings  | `src/data/storyData.js`                    |
| Colors and fonts                     | `src/index.css`                            |
| A background animation               | `src/components/backgrounds/`              |
| Typing speed                         | `src/hooks/useTypewriter.js`               |
| Screen layout or styling             | `src/screens/`                             |

