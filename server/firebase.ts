import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Log Firebase environment values (without exposing private key content)
console.log("Firebase Config Check:");
console.log(`- Project ID: ${process.env.FIREBASE_PROJECT_ID ? 'Set' : 'Missing'}`);
console.log(`- Client Email: ${process.env.FIREBASE_CLIENT_EMAIL ? 'Set' : 'Missing'}`);
console.log(`- Private Key: ${process.env.FIREBASE_PRIVATE_KEY ? 'Set (length: ' + process.env.FIREBASE_PRIVATE_KEY.length + ')' : 'Missing'}`);

// Fix for private key format, ensuring it has the proper newlines
// Some environments store the key with escaped newlines, others with actual newlines
// This handles both cases
let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';

// First, check if we have JSON-escaped newlines (\n)
if (privateKey.includes('\\n')) {
  privateKey = privateKey.replace(/\\n/g, '\n');
}

// Handle the case where the key might be wrapped in quotes by the environment
if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
  privateKey = privateKey.slice(1, -1);
}

// Additional cleanup
privateKey = privateKey.trim();

// Test if the private key starts with the expected prefix
if (privateKey) {
  console.log(`- Private Key format check: ${privateKey.startsWith('-----BEGIN PRIVATE KEY-----') ? 'Valid' : 'Invalid'}`);
} else {
  console.log('- Private Key is undefined');
}

// Initialize Firebase Admin SDK for server-side operations
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || undefined,
    privateKey: privateKey,
  })
};

// Initialize the app if it hasn't been already
let firebaseApp;
try {
  console.log('Initializing Firebase Admin SDK...');
  firebaseApp = initializeApp(firebaseConfig);
  console.log('Firebase Admin SDK initialized successfully');
} catch (error: any) {
  if (!error.message || error.message.indexOf('already exists') === -1) {
    console.error('Firebase admin initialization error', error.stack);
    throw error;
  } else {
    console.log('Firebase app already initialized');
  }
}

// Get Firestore instance
export const db = getFirestore();