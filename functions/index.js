const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { calculateYearCounts } = require('./aggregator');

// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();

// Calculate and save aggregations 
async function calculateAggregatedCounts() {
  const publicationsSnapshot = await db.collection('publications').get();
  const publications = publicationsSnapshot.docs.map(doc => doc.data());

  // Count of docs by year 
  const aggregatedCounts = calculateYearCounts(publications);

  // Save the aggregation(s)
  await db.collection('aggregations').doc('publicationsByYear').set({
    counts: aggregatedCounts,
  });
}

// onDocumentWritten triggers on create, update, or delete
exports.aggregatePublicationsOnWrite = onDocumentWritten(
  'publications/{docId}',
  async (event) => {
    try {
      // log before and after data
      const beforeData = event.data.before.data();
      const afterData = event.data.after.data();

      console.log(`Document written: ${event.params.docId}`);
      console.log('Before data:', beforeData);
      console.log('After data:', afterData);

      await calculateAggregatedCounts();
    } catch (error) {
      console.error('Error recalculating counts on document write:', error);
    }
  }
);
