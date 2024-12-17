import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slice/appState';
import { PublicationsTable } from './PublicationsTable.tsx';
import { AddPublicationModal } from './AddPublicationModal.tsx';
import { YearBarPlot, YearBarPlotCumu, YearLinePlotCumu } from './BarChart.js';

export function ContentPage() {
  const user = useSelector(selectUser);

  return (
    <div className="main-content d-flex flex-column align-items-center">
      {user?.ccv ? (
        <div className="align-self-end">
          <AddPublicationModal />
        </div>
      ) : null}

      <div className="d-flex flex-row align-items-center justify-content-center">
        <FontAwesomeIcon icon={faBook} color="dark" size="2xl" />
        <h1 className="mx-2">Publications</h1>
      </div>

      <PublicationsTable />

      {/* TODO: Word Cloud #58 */}
      {/*<h2 className="title pt-4 m-4 is-2 text-center">What are these publications all about?</h2>*/}
      {/*<div className="viz d-flex justify-content-center pt-5">*/}
      {/*  <WordCloud />*/}
      {/*<YearChart />*/}
      <YearBarPlot />
      {/* <YearLinePlotCumu /> */}
      {/* <YearBarPlotCumu /> */}
      {/*</div>*/}
    </div>
  );
}
