# Project Structure Guide for Modular React/TypeScript with Firebase
## Overview
This project structure implements a modular, scalable architecture for React/TypeScript applications with Firebase integration, following the Single Responsibility Principle (SRP).
## Project Structure
project-root/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Shared components across features
│   │   └── features/        # Feature-specific components
│   ├── config/              # Configuration files
│   │   └── firebase.ts      # Firebase initialization
│   ├── constants/           # Application constants
│   ├── controllers/         # Request handlers and business logic
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── repository/         # Data access layer
│   ├── services/          # External service integrations
│   ├── styles/            # Global styles and themes
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── public/                # Static assets
└── firebase/             # Firebase configuration and functions

## Setup Instructions
### 1. Initial Setup
# Clone the template
git clone [repository-url]

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
    - Place your prototype code in `src/pages/PrototypePage.tsx`
    - Identify repeating UI patterns
    - Mark sections that will become components

2. **Component Extraction**
   // 1. Create component file in appropriate directory
   // src/components/features/FeatureName/ComponentName.tsx

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
    - Extract styles to `src/styles`
    - Use styled-components for component-specific styles

### Workflow 2: Adding New Features
1. **Feature Planning**
    - Create feature folder in `src/components/features`
    - Define types in `src/types`
    - Plan data structure for Firebase

2. **Implementation**
   // 1. Create repository
   // src/repository/FeatureRepository.ts

   // 2. Create controller
   // src/controllers/FeatureController.ts

   // 3. Implement UI components
   // src/components/features/FeatureName/

   // 4. Add to pages
   // src/pages/
3. 
## Best Practices
1. **Firebase Usage**
    - Store images in Cloud Storage
    - Store SVGs in version control
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
4. Create controller for business logic
5. Develop UI components following the component hierarchy
6. Add error handling and loading states
7. Implement proper TypeScript types and validations
8. Add feature-specific styling using styled-components
9. Write unit tests for components and functions

Technical Constraints:
- Use functional components with hooks
- Follow SRP for all implementations
- Implement proper error boundaries
- Use TypeScript strict mode
- Follow established coding style guide
- Ensure Firebase best practices for data structure

Deliverables:
1. Feature implementation in src/components/features
2. Repository layer implementation
3. Controller implementation
4. Types definition
5. Unit tests
6. Documentation updates

Please provide the implementation following these guidelines while maintaining the existing project structure and patterns.
