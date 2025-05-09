# 📦 CI/CD Pipeline Documentation for THN Project
**Version:** 1.0
**Environment:** GitHub Actions + Firebase
**Project Type:** React/TypeScript with Firebase Backend
## 🔄 Workflow Overview
### Pipeline Stages
1. **Build & Test (Preview)**
2. **Deploy to Preview**
3. **Build & Test (Production)**
4. **Deploy to Production**

## 📋 GitHub Actions Workflow Configuration
### Preview Deployment
name: Deploy to Preview
on:
pull_request:
branches:
- develop
- feature/*

jobs:
build_and_preview:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '19'
          cache: 'npm'
          
      - name: Install Dependencies
        run: |
          cd frontend
          npm ci
          cd ../functions
          npm ci
          
      - name: Build Frontend
        run: |
          cd frontend
          npm run build:firebase
        env:
          REACT_APP_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          REACT_APP_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          
      - name: Build Functions
        run: |
          cd functions
          npm run build
          
      - name: Deploy to Firebase Preview
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId: ${{ secrets.FIREBASE_PROJECT_ID }}
          channelId: preview

### Production Deployment
name: Deploy to Production
on:
push:
branches:
- main

jobs:
deploy_production:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '19'
          cache: 'npm'
          
      - name: Install Dependencies
        run: |
          cd frontend
          npm ci
          cd ../functions
          npm ci
          
      - name: Build Frontend
        run: |
          cd frontend
          npm run build:firebase
        env:
          REACT_APP_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          REACT_APP_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          
      - name: Build Functions
        run: |
          cd functions
          npm run build
          
      - name: Deploy to Firebase Production
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId: ${{ secrets.FIREBASE_PROJECT_ID }}
          channelId: live
## 🔐 Required Secrets
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_SERVICE_ACCOUNT=your-service-account-json
GITHUB_TOKEN=github-token

## 📝 Environment Configuration
### Development (.env.development)
REACT_APP_USE_MOCK_RESPONSES=true
REACT_APP_API_URL=https://preview-api.domain.com

### Production (.env.production)
REACT_APP_USE_MOCK_RESPONSES=false
REACT_APP_API_URL=https://api.domain.com

## 🔄 Workflow Steps
### 1. Pull Request (Preview)
1. Create feature branch from develop
2. Push changes
3. Create PR to develop
4. Automated preview deployment
5. Review preview deployment
6. Merge if approved

### 2. Production Deployment
1. Merge develop to main
2. Automated production deployment
3. Verify production deployment

## 🏗️ Build Process
### Frontend Build
# Production build
npm run build:firebase

# Preview build
REACT_APP_ENVIRONMENT=preview npm run build:firebase

### Functions Build
# Build TypeScript functions
npm run build

## 🧪 Testing Strategy
### Automated Tests
- Unit tests during PR
- Integration tests during PR
- E2E tests before production

### Manual Testing
- Preview environment testing
- Production environment verification

## 🔍 Quality Gates
### PR Requirements
- All tests passing
- No TypeScript errors
- No ESLint warnings
- Bundle size within limits
- Preview deployment successful

### Production Requirements
- All PR requirements met
- Develop branch tests passing
- Security scan passed
- Performance benchmarks met

## 📊 Monitoring
### Firebase Monitoring
- Error reporting enabled
- Performance monitoring
- Usage analytics
- Security alerts

### Application Monitoring
- Custom error tracking
- Performance metrics
- User analytics
- API health checks

## 🔄 Rollback Procedure
### Immediate Rollback
firebase hosting:clone live preview
firebase hosting:clone preview live

### Manual Rollback
1. Revert commit in main
2. Push revert commit
3. Wait for deployment
4. Verify rollback

## 📝 Deployment Checklist
### Pre-deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Security rules updated
- [ ] Database migrations ready
- [ ] API versions compatible

### Post-deployment
- [ ] Verify application loading
- [ ] Check critical paths
- [ ] Monitor error rates
- [ ] Verify analytics
- [ ] Test user flows

## 🚨 Emergency Procedures
### Production Issues
1. Assess severity
2. Execute rollback if needed
3. Notify stakeholders
4. Debug in preview
5. Deploy fix
6. Post-mortem

### Contact List
- DevOps Lead: @Man-Man
- Tech Lead: @James&Terrell
- Product Manager: @Brian
- CEO: @Nat & The Handsomest Nerd himself hello@thehandsomestnerd.com
