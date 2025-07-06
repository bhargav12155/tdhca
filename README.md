# TDHCA Portal Application

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

---

## Project Structure & Navigation

```
src/app/
├── components/
│   ├── dialogs/       # Reusable modal dialogs (e.g., registration)
│   ├── layout/        # Structural components (header, footer, sidebar)
│   └── pages/         # Page-level components (home, dashboard)
├── services/          # Shared services (e.g., sidebar state management)
├── app.routes.ts      # Main application routing configuration
└── styles.scss        # Global stylesheet where variables for colors and fonts are defined.
```

## Routing Overview

- `/home` – The main landing page with the primary application form.
- `/dashboard` – The user's main dashboard (placeholder).
- `/application` – The main application view (placeholder).
- The default route (`/`) redirects to `/home`.

## Navigation & Button Behavior

- **Header and Sidebar:**
  - Both contain navigation links for Home, Dashboard, and Application.
  - The **Create Account** button in the header opens a modal dialog, not a separate page.
  - The sidebar automatically closes after any navigation link is clicked.

- **Form Buttons (`home.html`):**
  - **Save and Continue:** Submits the main application form.
  - **Cancel:** Resets the form and shows a Material Snackbar notification ("Action Cancelled").

- **Create Account Modal:**
  - Triggered from the header.
  - Appears as a dialog overlay. Clicking "Cancel" dismisses the dialog and shows a snackbar.

## Mobile Responsiveness

- The layout is fully responsive:
  - On mobile, the main navigation in the header collapses into a hamburger menu.
  - The sidebar becomes a drawer that overlays the content.
  - Form fields and buttons stack vertically for better usability on smaller screens.

## How the App Works

- Users start at the Home page, which contains the main multi-step application form.
- Navigation is available at all times via the header and the collapsible sidebar.
- The Create Account modal can be opened from anywhere in the application without interrupting the user's workflow.
- All forms include validation, descriptive tooltips, and placeholders for a professional user experience.

---

## Development server

To start a local development server, run:

```bash
npx ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

To generate a new component, run:

```bash
npx ng generate component component-name
```

## Building

To build the project for production, run:

```bash
npx ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

## Running unit tests

To execute unit tests with Karma, use the following command:

```bash
npx ng test
```
