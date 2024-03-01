import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectPublications, selectUser } from '../store/slice/appState';
import { PublicationsTable } from './PublicationsTable.tsx';
import Spinner from './Spinner';
import { AddPublicationModal } from './AddPublicationModal.tsx';
import { YearChart } from './YearChart.tsx';

export function ContentPage() {
  const publications = useSelector(selectPublications);
  const user = useSelector(selectUser);

  return (
    <div className="main-content">
      {user ? (
        <div align="right">
          <AddPublicationModal />
        </div>
      ) : null}
      <div className="d-flex flex-row justify-content-center align-items-center">
        <FontAwesomeIcon icon={faBook} color="dark" size="2xl" />
        <h1 className="mx-2">Publications</h1>
      </div>

      <Spinner loading={publications.length === 0} className="spinner" size={100} />

      {publications.length !== 0 && (
        <>
          <PublicationsTable />

          {/* TODO: Word Cloud */}
          <h3 className="word-cloud-title pt-4 mt-4">What are these publications all about? </h3>
          {/*<div className="viz d-flex justify-content-center pt-5">*/}
          {/*  <WordCloud />*/}
          <YearChart />
          {/*</div>*/}
        </>
      )}
    </div>
  );
}
