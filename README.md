# README.md Frontend

### AbiPulli Frontend

This codebase comprises the Frontend of the "AbiPulli.com", a graduation merchandise Web Application where users can bring their own ideas onto Pullovers using generative AI and in-house Design tools.

The repository includes the React Frontend, built on Typescript using TailwindCSS, Tanstack Router and JWT.

→ Try out the application at [https://etter.app](https://etter.app)

---

### Tech Stack

| Layer              | Tech            |
| ------------------ | --------------- |
| Language           | Typescript      |
| Framework          | React           |
| Routing            | Tanstack Router |
| State Management   | React Context   |
| Auth               | JWT             |
| Forms & Validation | Zod             |
| Build Tool         | Vite            |
| Animation          | Framer Motion   |
| Canvas             | Konva           |

---

### Features/Pages

- Onboarding: Collection of user information
- Image Generation: Gathering of Motive and Style Information and subsequent generation of image
- Image Preview: Previewing of generated image with possibility to select images to improve
- Design Tool: Placement and Scaling of generated and uploaded images on pullovers
- Polling Tool (WIP): Tool to poll fellow students to decide best design

---

### Project Structure

```bash
src/
├── components/        # Reusable UI components (Buttons, Sidebar, Designer, etc.)
├── hooks/             # Custom React hooks
├── routes/            # Tanstack Page Routes
├── providers/         # Context providers (auth, snackbar, onboarding, etc.)
├── api/               # API logic and endpoint wrappers
├── assets/            # Images, fonts, and icons
├── types/             # Global and canvas-specific type definitions
├── utilities/         # Utility functions (file size, date handling, etc.)
├── index.css          # Tailwind and custom styles
├── main.tsx           # App entry point
vitest/
├── hooks/             # Tests of hooks using jest-dom
├── mocks/             # Mocking of Api calls and factories for generating data
├── unit/              # Unit tests
public/                # Folder with results from vite build
```

---

### Getting Started

1. Clone Repo

```bash
git clone [https://github.com/LeifEtter/abipulli-frontend](https://github.com/LeifEtter/abipulli-frontend)
cd abipulli-frontend
```

2. Create `.env` with following Keys

```bash
VITE_BASE_IMAGE_URL=https://nbg1.your-objectstorage.com/
VITE_API_URL=https://api.etter.app
```

3. Install dependencies

```bash
npm i
```

4. Run in dev mode

```bash
npm run dev
```

---

### Authentication

Auth is managed with JWT. Users can login with email and password, and JWT token is attached to httpOnly token.

State of auth is managed with useAuth.

---

### Custom Hooks

| Hook              | Use                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| useAuth           | Manage auth state (stores user and methods to login/logout/check Token)                                 |
| useDesignImages   | Fetch and Manage all images for a single design                                                         |
| useDesigns        | Fetch and Manage all of users designs                                                                   |
| useGenerateInfo   | Manage Info of Image Generation flow and call api to generate/comment on description and generate image |
| useOnboardingInfo | Manage Info for onboarding user and methods to create user account                                      |
| usePopup          | Summon Overlay with Confirm/Cancel request                                                              |
| useSnackbar       | Summon Snackbar Popup with information for a couple of seconds                                          |
| useRouterContext  | Provides auth info through use of router context                                                        |
| useUserImages     | Fetch and Manage all Images the current user has created                                                |

---

### Testing

To run all tests use following command:

```bash
npx vitest
```

---

### Hosting

The Web is hosted on VPS.
A Pull request triggers a test build, and upon merging into main, the code will be built using Docker and automatically pushed to the VPS.

Live version is hosted at:

→ [https://etter.app](https://etter.app)

---

### Known Issues

- Latency after requesting improved description/commenting on description and generating image (slow api calls to chatgpt/ideogram)
- Konva images can bug when they are flipped by dragging the bottom right dragger to the top left and over
- Designer can clog on Mobile UI
- Logging out doesn't remove httpOnly token, and token is not invalidated in backend. So sessions might persist unwantedly
