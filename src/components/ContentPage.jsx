import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChartBar, faChartLine, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slice/appState';
import { PublicationsTable } from './PublicationsTable.tsx';
import { AddPublicationModal } from './AddPublicationModal.tsx';
import { CountsByYearPlot } from './BarChart.js';

export function ContentPage() {
  const user = useSelector(selectUser);
  const [plotType, setPlotType] = useState('bar');

  return (
    <div className="container-fluid px-4 py-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col">
          <h2 className="h2 mb-3">Publications</h2>
          <p className="lead">
            The Center for Computation and Visualization (CCV) has been a cornerstone of Brown
            University's research infrastructure. We provide essential computational resources and
            expertise that enable groundbreaking research across disciplines. Our collaborations and
            support have contributed to significant publications, advancing scientific discovery and
            innovation in the Brown community.
          </p>
        </div>
        {user?.ccv && (
          <div className="col-auto d-flex align-items-start">
            <AddPublicationModal />
          </div>
        )}
      </div>

      {/* Visualization Section */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <h3 className="h4 mb-0">Publication Metrics</h3>
          <div className="btn-group">
            <button
              className={`btn ${plotType === 'bar' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setPlotType('bar')}
            >
              <FontAwesomeIcon icon={faChartBar} className="me-2" />
              Annual Counts
            </button>
            <button
              className={`btn ${plotType === 'cumu-line' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setPlotType('cumu-line')}
            >
              <FontAwesomeIcon icon={faChartLine} className="me-2" />
              Cumulative Growth
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center py-2 rounded">
          {plotType === 'bar' ? (
            <CountsByYearPlot type="bar" />
          ) : (
            <CountsByYearPlot type="cumu-line" />
          )}
        </div>
        <div className="mt-2 text-muted small text-center">
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
          Publication counts for recent years may be incomplete.
        </div>
      </div>

      {/* Publications Table Section */}
      <div className="mb-4">
        <div className="d-flex align-items-center mb-3">
          <FontAwesomeIcon icon={faBook} className="me-2 fs-4" />
          <h3 className="h3 mb-0">Publications Database</h3>
        </div>
        <PublicationsTable />
      </div>
    </div>
  );
}

export default ContentPage;
