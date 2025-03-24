import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';

// Load environment variables at the start
dotenv.config();

// Create a function to verify all required Firebase credentials are present
function areFirebaseCredentialsComplete(): boolean {
  const requiredCredentials = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY'
  ];
  
  // Check if any required credentials are missing
  const missingCredentials = requiredCredentials.filter(cred => !process.env[cred]);
  
  if (missingCredentials.length > 0) {
    console.error(`Missing required Firebase credentials: ${missingCredentials.join(', ')}`);
    return false;
  }
  
  return true;
}

// Log Firebase environment values (without exposing private key content)
console.log("Firebase Config Check:");
console.log(`- Project ID: ${process.env.FIREBASE_PROJECT_ID ? 'Set' : 'Missing'}`);
console.log(`- Client Email: ${process.env.FIREBASE_CLIENT_EMAIL ? 'Set' : 'Missing'}`);
console.log(`- Private Key: ${process.env.FIREBASE_PRIVATE_KEY ? 'Set (length: ' + (process.env.FIREBASE_PRIVATE_KEY?.length || 0) + ')' : 'Missing'}`);

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

// Create a mock database for development or when Firebase is unavailable
class MockFirestore {
  collection() {
    return {
      doc: () => ({
        get: async () => ({ exists: false, data: () => null }),
        set: async () => ({}),
        update: async () => ({}),
        delete: async () => ({})
      }),
      where: () => ({
        limit: () => ({
          get: async () => ({ empty: true, docs: [] })
        }),
        get: async () => ({ empty: true, docs: [] })
      }),
      get: async () => ({ docs: [] })
    };
  }
}

// Initialize Firebase Admin SDK for server-side operations
let db: Firestore | MockFirestore;

if (process.env.USE_FIREBASE === 'true' && areFirebaseCredentialsComplete()) {
  try {
    // Only initialize if no apps exist
    if (getApps().length === 0) {
      console.log('Initializing Firebase Admin SDK...');
      const firebaseConfig = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL || undefined,
          privateKey: privateKey,
        })
      };
      
      initializeApp(firebaseConfig);
      console.log('Firebase Admin SDK initialized successfully');
    } else {
      console.log('Firebase app already initialized');
    }
    
    // Get Firestore instance
    db = getFirestore();
    console.log('Firestore initialized successfully');
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error);
    console.log('Using mock Firestore due to initialization error');
    db = new MockFirestore() as any;
  }
} else {
  console.log('Using mock Firestore (Firebase disabled by configuration or missing credentials)');
  db = new MockFirestore() as any;
}

export { db };