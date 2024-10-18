
# BookCircle - Campus Book Lending Platform

**BookCircle** is a platform for students to connect within the campus and sell or lend their books to peers. The application is built using **React** for the front-end and **Firebase** for backend services such as authentication, database, and storage.

## Features
- User authentication (Firebase Auth)
- Book listing and management
- Real-time database for listing available books
- Peer-to-peer connections for book lending and selling

## Tech Stack
- **React**: Frontend framework for building user interfaces.
- **Firebase**: Backend service for authentication, database, and storage.
- **react-router-dom**: For routing between different pages.
- **react-bootstrap**: To style the UI components easily.

## Prerequisites
- Node.js installed 
- Firebase account and project setup

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/bookcircle.git
cd bookcircle
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. In your project settings, navigate to the **Web** section and create a new web app. 
3. Copy your Firebase config keys.

### 4. Set Up Environment Variables
Create a `.env` file in the root of your project with the following variables (replace the placeholders with your Firebase config values):

```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 5. Start the Development Server
```bash
npm start
```

This will launch the application at `http://localhost:3000`.

## Usage
- Once the app is running, users can sign up, log in, and start listing their books for lending or selling.
- The app allows for easy connections between peers within the same campus.

## Deployment
To deploy the project, you can use Firebase Hosting or any other hosting service that supports React.

```bash
npm run build
```
This will create an optimized production build in the `build/` directory, which can be deployed to your hosting provider.


## Page

### Home page
![Home page](/public/Home.png)

### Listing Page

![List Page](/public/ListBooks.png)

### Listed books

![Listed Books](/public/ListedBooks.png)

### Book section

![Book Section](/public/bookSection.png)

---

This readme guides users through the project setup, dependencies, environment variables, and how to get the app running.