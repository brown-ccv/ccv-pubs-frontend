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
    <div className="main-content d-flex flex-column align-items-center">
      {user ? (
        <div className="align-self-end">
          <AddPublicationModal />
        </div>
      ) : null}

      <div className="d-flex flex-row align-items-center justify-content-center">
        <FontAwesomeIcon icon={faBook} color="dark" size="2xl" />
        <h1 className="mx-2">Publications</h1>
      </div>

      <Spinner loading={publications.length === 0} className="spinner" size={100} />

      {publications.length !== 0 && (
        <>
          <PublicationsTable />

          {/* TODO: Word Cloud */}
          <h2 className="title pt-4 m-4 is-2 text-center">
            What are these publications all about?{' '}
          </h2>
          {/*<div className="viz d-flex justify-content-center pt-5">*/}
          {/*  <WordCloud />*/}
          <YearChart />
          {/*</div>*/}
        </>
      )}
    </div>
  );
}
