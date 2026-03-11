import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Chart } from 'react-chartjs-2';
import { getAggregation } from '../utils/firebase.ts';

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const bar_color = '#00c398';
const bar_hover_color = '#ffc72c';

const buildData = (data) => {
  const labels = data.map((d) => d.label);
  const counts = data.map((d) => d.count);
  const cumulative = counts.reduce((acc, cur) => {
    acc.push((acc[acc.length - 1] || 0) + cur);
    return acc;
  }, []);
  return { labels, counts, cumulative };
};

const getAriaLabel = (type) => {
  switch (type) {
    case 'bar':
      return 'Bar chart of Publications by Year where the chart shows annual publication counts.';
    case 'cumu-line':
      return 'Line chart of Publications by Year where the chart shows cumulative publication totals over time.';
    case 'bar-cumu-line':
      return 'Combined bar and line chart of Publications by Year where the chart compares annual counts to cumulative totals.';
    default:
      return 'Chart of Publications by Year where the chart summarizes publication data.';
  }
};

export const CountsByYearPlot = ({ type }) => {
  const xLabel = 'Year';
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAggregation({ documentName: 'publicationsByYear' });

        if (!data || !Array.isArray(data) || data.length === 0) {
          setError('No data available');
          setChartData(null);
          return;
        }

        setChartData(buildData(data));
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError('Failed to load chart data');
        setChartData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  if (loading) return <div className="text-center p-4">Loading…</div>;
  if (error) return <div className="alert alert-warning">{error}</div>;
  if (!chartData) return <div className="alert alert-info">No data available</div>;

  const ariaLabel = getAriaLabel(type);
  const descId = `chart-desc-${type}`;

  const { labels, counts, cumulative } = chartData;

  // Base options
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: xLabel, font: { size: 18, weight: 500 } },
        ticks: { maxRotation: 50, minRotation: 50 },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Publications', font: { size: 18, weight: 500 } },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  // 1) BAR
  if (type === 'bar') {
    return (
      <div className="container-fluid">
        <div className="position-relative" style={{ minHeight: 'clamp(20rem, 50vh, 40rem)' }}>
          <Bar
            data={{
              labels,
              datasets: [
                {
                  data: counts,
                  backgroundColor: bar_color,
                  hoverBackgroundColor: bar_hover_color,
                },
              ],
            }}
            options={baseOptions}
            role="img"
            aria-label={ariaLabel}
            aria-describedby={descId}
          />
        </div>
      </div>
    );
  }

  // 2) CUMULATIVE LINE
  if (type === 'cumu-line') {
    return (
      <div className="container-fluid">
        <div className="position-relative" style={{ minHeight: 'clamp(20rem, 50vh, 40rem)' }}>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: 'Cumulative',
                  data: cumulative,
                  borderColor: 'steelblue',
                  backgroundColor: 'steelblue',
                  pointRadius: 4,
                  pointHoverRadius: 7,
                  tension: 0.2,
                },
              ],
            }}
            options={{
              ...baseOptions,
              scales: {
                ...baseOptions.scales,
                y: {
                  title: {
                    display: true,
                    text: 'Cumulative Publications',
                    font: { size: 18, weight: 500 },
                  },
                },
              },
            }}
            role="img"
            aria-label={ariaLabel}
            aria-describedby={descId}
          />
        </div>
      </div>
    );
  }

  // 3) BAR + CUMULATIVE LINE
  if (type === 'bar-cumu-line') {
    return (
      <div className="container-fluid">
        <div className="position-relative" style={{ minHeight: 'clamp(20rem, 50vh, 40rem)' }}>
          <Chart
            type="bar"
            data={{
              labels,
              datasets: [
                {
                  type: 'bar',
                  data: counts,
                  backgroundColor: bar_color,
                  hoverBackgroundColor: bar_hover_color,
                  yAxisID: 'y',
                },
                {
                  type: 'line',
                  data: cumulative,
                  borderColor: 'steelblue',
                  backgroundColor: 'steelblue',
                  pointRadius: 4,
                  pointHoverRadius: 6,
                  tension: 0.2,
                  yAxisID: 'y1',
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: { display: true, text: xLabel, font: { size: 18, weight: 500 } },
                  ticks: {
                    maxRotation: 50,
                    minRotation: 50,
                    showLabelBackdrop: false,
                    backdropColor: 'transparent',
                  },
                },
                y: {
                  beginAtZero: true,
                  position: 'left',
                  title: { display: true, text: 'Publications', font: { size: 18, weight: 500 } },
                },
                y1: {
                  beginAtZero: true,
                  position: 'right',
                  grid: { drawOnChartArea: false },
                  title: { display: true, text: 'Cumulative', font: { size: 18, weight: 500 } },
                },
              },
              plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
              },
            }}
            role="img"
            aria-label={ariaLabel}
            aria-describedby={descId}
          />
        </div>
      </div>
    );
  }

  return <div>Invalid type</div>;
};
