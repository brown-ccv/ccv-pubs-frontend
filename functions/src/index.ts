/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onDocumentUpdated} from "firebase-functions/v2/firestore";

import {nGramsPipeline} from "./ngrams.ts";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// TODO: Change to onDocumentCreated
exports.generateKeywords = onDocumentUpdated(
  "publications/{publicationId}",
  (event) => {
  // Get object representing the document
    const data = event.data?.after.data();
    const previousData = event.data?.before.data();

    const {abstract, keywords} = data;

    // Don't update if the abstract is the same
    if ((abstract == "" && keywords?.length() == 0) ||
      abstract == previousData?.abstract) {
      return null;
    }

    return data?.after.ref.set({
      keywords: nGramsPipeline(abstract),
    });
  });
