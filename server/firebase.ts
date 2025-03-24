import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK for server-side operations
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || undefined,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || undefined,
  })
};

// Initialize the app if it hasn't been already
let firebaseApp;
try {
  firebaseApp = initializeApp(firebaseConfig);
} catch (error: any) {
  if (!error.message || error.message.indexOf('already exists') === -1) {
    console.error('Firebase admin initialization error', error.stack);
    throw error;
  }
}

// Get Firestore instance
export const db = getFirestore();