# Socially

A modern, full-featured social profile management platform. Socially empowers users to create and manage professional profiles, social links, analytics, resumes, and bento grids with an intuitive and responsive interface.

## 🚀 Features

### 🔗 Social Links Management

- Create and customize a professional social profile page
- Add, edit, and organize all your important links in one place
- Shareable profile URL for easy access

### 📄 Resume Builder & Viewer

- Create professional resumes with customizable templates
- Share resumes via unique URLs
- View resumes created by other users

### 🎨 Bento Grid Creator

- Design visually appealing bento-style profile grids
- Showcase your work, skills, and interests in a creative layout
- Shareable bento grid pages

## 🛠️ Technologies Stack

### Core Technologies

- Angular 20
- Python for backend
- Firebase
- Gemini for AI

## 📁 Project Structure

```
src/
├── app/
│   ├── screens/             # Main application screens
│   │   ├── register-screen/ # User registration
│   │   ├── login-screen/    # User login
│   │   ├── home-screen/     # Dashboard
│   │   ├── social-links-screen/ # Social links management
│   │   ├── analytics-screen/ # Analytics dashboard
│   │   ├── resume-screen/   # Resume builder
│   │   └── bento-screen/    # Bento grid creator
│   ├── viewers/             # Public view components
│   │   ├── social-link-viewer/ # View social profiles
│   │   ├── analytics-viewer/ # View analytics
│   │   ├── resume-viewer/   # View resumes
│   │   └── bento-viewer/    # View bento grids
│   ├── common/              # Reusable components
│   ├── guards/              # Route guards
│   ├── services/            # Angular services
│   ├── interfaces/          # TypeScript interfaces
│   ├── enums/               # Enumerations
│   └── cache/               # Caching utilities
├── assets/                  # Static assets
├── global-style/            # Global styles
├── index.html               # Main HTML file
├── main.ts                  # Application entry point
└── styles.scss              # Global SCSS styles
```

## 🚦 Getting Started

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd socially
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up Firebase configuration
   Create a `src/environments/environment.ts` file with your Firebase credentials:
   ```typescript
   export const environment = {
     production: false,
     firebase: {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     },
   };
   ```

### Development Server

Start the development server:

```bash
npm start
# or
ng serve
```

Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to the source files.

### Build

Build the project for production:

```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/socially/` directory. The production build is optimized for performance.

### Deployment

The project is configured for deployment to GitHub Pages using `angular-cli-ghpages`:

```bash
ng deploy
```

For Firebase deployment, make sure you have the Firebase CLI installed and run:

```bash
firebase login
firebase deploy
```

## 🧪 Testing

### Unit Tests

Run unit tests with Karma:

```bash
npm test
# or
ng test
```

### End-to-End Tests

For end-to-end testing, you can set up a framework like Cypress or Protractor.

## 🎨 Theming

Socially supports light and dark mode theming. The theme can be toggled using the theme switcher in the top-right corner of the application.

## 🔒 Security

- Authentication is handled securely via Firebase Authentication
- Route guards protect sensitive areas of the application
- User data is stored securely in Firebase

## 📚 Documentation

- **Angular Documentation**: <mcurl name="Angular Docs" url="https://angular.io/docs"></mcurl>
- **Firebase Documentation**: <mcurl name="Firebase Docs" url="https://firebase.google.com/docs"></mcurl>
- **Tailwind CSS Documentation**: <mcurl name="Tailwind CSS Docs" url="https://tailwindcss.com/docs"></mcurl>

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

Made with ❤️ by Smil Raj Thakue

**Socially** - Elevate Your Digital Presence
