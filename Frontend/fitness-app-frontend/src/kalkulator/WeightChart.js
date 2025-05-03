import React, { useEffect } from 'react';
import axios from 'axios';
import "../styles/WeightChartInterface.css";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

// This component receives setShowChart from its parent
const WeightChart = ({ setShowChart }) => {
  const [data, setData] = React.useState([]);


  const onCancel = () => {
    setShowChart(false); // Zatvara chart kada se pritisne X
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
        <button className="close-button" onClick={onCancel}>X</button>
        <div style={{ width: '100%', height: 400 }}>
          <h2 className="text-xl font-semibold mb-4">Praćenje kilaže</h2>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'kg', angle: -90, position: 'insideLeft' }} />
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

// Example parent component:
// import React, { useState } from 'react';
// import WeightChart from './WeightChart';
//
// const ProfilePage = () => {
//   const [showChart, setShowChart] = useState(false);
//
//   return (
//     <div>
//       <button onClick={() => setShowChart(true)}>Prikaži grafikon</button>
//       {showChart && <WeightChart setShowChart={setShowChart} />}
//     </div>
//   );
// };
//
// export default ProfilePage;
