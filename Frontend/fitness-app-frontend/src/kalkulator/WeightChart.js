import React, { useEffect } from 'react';
import axios from 'axios';
import "../styles/WeightChartInterface.css";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const WeightChart = ({ setShowChart }) => {
  const [data, setData] = React.useState([]);

  const onCancel = () => {
    setShowChart(false);
  };

  useEffect(() => {
    const fetchWeightRecords = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5063/api/UserProfile/weightrecords',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        const formattedData = response.data.map(record => ({
          date: new Date(record.date).toLocaleDateString('sr-RS'),
          weight: record.weight
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching weight records:', error);
      }
    };

    fetchWeightRecords();
  }, []);

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div style={{ width: '100%', height: 400 }}>
          <h2 className="text-xl font-semibold mb-4">Praćenje kilaže</h2>
          <button className="close-button" onClick={onCancel}>X</button>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid stroke="#000"  />
              <XAxis dataKey="date" stroke="#000" />
              <YAxis
                stroke="#000"
                label={{
                  value: 'kg',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#000'
                }}
              />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#530018" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WeightChart;
