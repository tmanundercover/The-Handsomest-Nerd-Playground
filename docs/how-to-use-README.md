# Project Structure Guide for Modular React/TypeScript with Firebase
## Overview
This project structure implements a modular, scalable architecture for React/TypeScript applications with Firebase integration, following the Single Responsibility Principle (SRP).

## Project Structure
### Note most files are templates and should be modified to fit your project needs. Ex. Package.json should have a descriptive name

project-root/
├── .github/workflows/
│   ├── firebase-hosting-merge.yml           # github action for deployment after merge to main
│   ├── firebase-hosting-pull-request.yml           # github action for deployment
├── docs/
│   ├── Delivery-template-README.md           # Delivery Document Template only use for reference do not copy
│   ├── Design-template-README.md           # Design Document Template only use for reference do not copy
│   ├── Requirements-template-README.md           # Requirements Document Template only use for reference do not copy
│   ├── Testing-template-README.md           # Testing Document Template only use for reference do not copy
├── frontend/
│   ├── src/
│   │   ├── assets/           # images and svg assets
│   │   │   ├── icons/           # SVG icon files exported as React components
│   │   ├── components/           # Reusable UI components
│   │   ├── config/              # Configuration files
│   │   │   └── firebase.ts      # Firebase initialization
│   │   ├── constants/           # Application constants
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── public/              # Page components
│   │   │   ├── index.html      # The html page importing google fonts/weights, the heart favicon, and the root div for React.
│   │   ├──styles/             # Global styles and themes
│   │   ├── types/             # TypeScript type definitions
│   │   └── utils/             # Utility functions
│   │   ├── index.tsx             # imports the App component and renders it to the DOM
│   │   ├── App.tsx             # Root component should be a Menu of the the components in pages giving a brief description of each.
│   ├── package.json
│   ├── tsconfig.json        # typescript config for all other environments 
├── public/                # Static assets after building
├── functions/             # Firebase functions
│   ├── src/
│   │   ├── controller/         # Request handlers and business logic
│   │   ├── services/          # External service integrations
│   │   ├── repository/         # Data access layer
│   │   ├── .gitignore           # Npm gitignore file
│   │   ├── package.json         # has all dependencies with correct versions necessary to npm install and run application without errors
│   │   ├── tsconfig.dev.json    # typescript config for the dev environment
│   │   ├── tsconfig.json        # typescript config for all other environments 
├── .firebaserc
├── .gitignore
├── firebase.json
├── firebase.rules
├── storage.rules
├── README.md                    # Readme style documentation for this repo structure and project

## Setup Instructions
### 1. Initial Setup
mkdir project-name && cd project-name


GET https://api.github.com/repos/{owner}/{repo}/zipball

# copy the template project structure directory `docs/firebase/project-structure/` into a project directory named uniquely by you in the root of the project

# Install dependencies
npm install

# Setup Firebase
firebase init

### 2. Environment Configuration
Create `.env` file:
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id

## Development Workflows
### Workflow 1: Converting Single Page Prototype to Components
1. **Initial Assessment**
    - Place your prototype code in `frontend/src/PrototypePage.tsx`
    - Identify repeating UI patterns
    - Mark sections that will become components

2. **Component Extraction**
   // 1. Create component file in appropriate directory
   // frontend/src/components/componentName/ComponentName.tsx

   // 2. Extract JSX and related logic
   // 3. Define props interface
   interface ComponentNameProps {
   // props definition
   }

   // 4. Create component
   export const ComponentName: React.FC<ComponentNameProps> = ({ props }) => {
   return (
   // extracted JSX
   );
   };

1. **State Management**
    - Move state to appropriate level or use Zustand if necessary
    - Implement context if needed
    - Create custom hooks for reusable logic

2. **Styling**
    - Extract styles to `frontend/src/styles/componentName/`
    - Use styled-components for component-specific styles

### Workflow 2: Adding New Features
1. **Feature Planning**
    - Create Component README with code in `frontend/src/components/componentName/README.md`
    - Define types in `frontend/src/types`
    - Plan data structure for Firebase

2. **Implementation**
   // 1. Implement UI components
   // frontend/src/components/componentName/

   // 2. Add to Root Component
   // frontend/src/App.tsx
3. 
## Best Practices
1. **Firebase Usage**
    - Store images in Cloud Storage
    - Store SVGs in version control in an assets folder
    - Use Firestore for document-based data
    - Implement RTDB for real-time features

2. **Component Structure**
    - Follow SRP
    - Keep components focused
    - Use TypeScript interfaces
    - Implement proper error handling

3. **State Management**
    - Use hooks for local state
    - Implement context for shared state
    - Keep Firebase operations in repositories

## Engineered Prompt for Developers
Task: Create a new feature in the modular React/TypeScript project

Given the project structure:
1. Define the feature requirements and data model
2. Create necessary TypeScript interfaces in /types
3. Implement Firebase repository layer for data operations
4. Develop UI components following the component hierarchy
5. Add error handling and loading states
6. Implement proper TypeScript types and validations
7. Add feature-specific styling using styled-components
8. Write unit tests for components and functions

Technical Constraints:
- Use functional components with hooks
- Follow SRP for all implementations
- Implement proper error boundaries
- Use TypeScript strict mode
- Follow established coding style guide
- Ensure Firebase best practices for data structure

Deliverables:
1. Feature implementation in frontend/src/components/ by componentName formed from the shortened feature name.
2. Repository layer implementation
3. Controller implementation
4. Types definition
5. Documentation updates

Please provide the implementation following these guidelines while maintaining the existing project structure and patterns.
