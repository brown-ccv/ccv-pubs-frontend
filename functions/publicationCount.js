const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();

// Recalculate publication counts by year
async function calculateAggregatedCounts() {
  const publicationsSnapshot = await db.collection('publications').get();
  const yearCounts = {};

  publicationsSnapshot.forEach((doc) => {
    const year = doc.data().year;
    if (year) {
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    }
  });

  // Convert to required format
  const aggregatedCounts = Object.entries(yearCounts).map(([label, count]) => ({
    label,
    count,
  }));

  // Save the aggregation
  await db.collection('aggregations').doc('publicationCounts').set({
    counts: aggregatedCounts,
  });
}

// onDocumentWritten triggers on create, update, or delete
exports.aggregatePublicationsByYearOnWrite = onDocumentWritten(
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
