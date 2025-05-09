/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as admin from 'firebase-admin';
import './config'
import FirstController from "./controller/FirstController";

const cors = require('cors')({
    origin: [
        //
        "https://{firebase-project-name-from-.firebaserc}.cloudfunctions.net", // Firebase hosting address
        // THIS IS MY LOCAL N8N Instance THIS IS ONLY FOR THN projects
        "http://localhost:5678",
        // THESE ARE THE FIREBASE HOSTING SO THE FRONTEND can access the API
        "http://localhost:5003",
        // ONLY FOR SPECIFIED WIX PROJECTS
        // "https://static.parastorage.com",
        // 'https://editor.wix.com',
        // 'https://www.wix.com'

    ],
    credentials: true,
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
});

// Initialize admin SDK only once
if (!admin.apps.length) {

    admin.initializeApp();
}


export const handleOneRequest = onRequest((request, response) => {
    return cors(request, response, async () => FirstController.handleRequest(request, response));
});
