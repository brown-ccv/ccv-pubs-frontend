import { existsSync } from 'fs';

import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
// import { Timestamp } from 'firebase-admin/firestore';

import { createPublicationTokens } from '../src/utils/firebase';

const SERVICE_ACCOUNT_PATH = './scripts/serviceAccount.json';

type DB = ReturnType<(typeof admin)['firestore']>;
type Pubs = Awaited<ReturnType<typeof getPubs>>;

function setup() {
  if (existsSync(SERVICE_ACCOUNT_PATH)) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = SERVICE_ACCOUNT_PATH;
    console.log('Using Service Account Json');
  } else {
    console.log('Unable to find Service Account Json. Aborting...');
    process.exit(-1);
  }

  admin.initializeApp({ credential: applicationDefault(), projectId: 'ccv-pubs' });
  const db = admin.firestore();
  return { admin, db };
}

async function getPubs(db: DB) {
  const moduleDocs = await db.collection('publications').get();
  if (moduleDocs.empty) {
    console.error('No publications found.');
    return [];
  }
  return moduleDocs.docs;
}

async function updatePubsWithTokens(db: DB, pubs: Pubs) {
  await Promise.all(
    pubs.map((pub) => {
      const pubData = pub.data() as { title: string; author: string; updatedAt: number };
      const newData = {
        ...pubData,
        //updatedAt: Timestamp.fromDate(new Date(pubData.updatedAt)),
        tokens: createPublicationTokens(pubData),
      };
      return db.doc(`publications/${pub.id}`).set(newData);
    })
  );
}

async function main() {
  const { db } = setup();
  const pubs = await getPubs(db);
  console.log('fetched', pubs.length, 'publications');
  await updatePubsWithTokens(db, pubs);
  console.log('Done.');
}

main();
