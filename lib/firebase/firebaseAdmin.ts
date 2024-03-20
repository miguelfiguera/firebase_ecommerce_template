import * as admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";


const adminApp= admin.apps.length>0 ?admin.apps[0]: admin.initializeApp({
  credential: applicationDefault()
});


const adminDb = getFirestore();
export { adminApp, adminDb }