import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
// import YearChart from "./YearChart";
// import WordCloud from "./WordCloud";
import { useSelector } from 'react-redux';
import { usePublicationsCollection } from '../utils/firebase.ts';
import { selectPublications } from '../store/slice/appState';
import { PubsTable } from './PubsTable';
import Spinner from './Spinner';
import { AddPublicationModal } from './AddPublicationModal.tsx';

export function ContentPage() {
  const publications = useSelector(selectPublications);

  usePublicationsCollection();

  return (
    <div className="ContentPage main-content">
      <div align="right">
        <AddPublicationModal />
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div className="pub-title pt-2 bg-primary text-white rounded-circle">
          <FontAwesomeIcon icon={faBook} />
        </div>
        <h1 className="pl-2">Publications</h1>
      </div>

      <Spinner loading={publications.length === 0} className="spinner" size={100} />

      {publications.length !== 0 && (
        <div id="main-content">
          <div className="PubsTable-CP">
            <PubsTable />
          </div>

          {/* TODO: Word Cloud */}
          {/* TODO: Year Chart */}
          {/*<h3 className="word-cloud-title pt-4 mt-4">*/}
          {/*  {" "}*/}
          {/*  What are these publications all about?{" "}*/}
          {/*</h3>*/}
          {/*<div className="viz d-flex justify-content-center pt-5">*/}
          {/*  <WordCloud />*/}
          {/*  <YearChart />*/}
          {/*</div>*/}
        </div>
      )}
    </div>
  );
}
