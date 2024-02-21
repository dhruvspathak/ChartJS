import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ dataX, dataY }) => {
  const chartData = {
    labels: Array.from({ length: 50 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'X',
        data: dataX.map(item => item.RandomNumber),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Y',
        data: dataY.map(item => item.RandomNumber),
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

const YourComponent = () => {
  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);

  useEffect(() => {
    const fetchDataX = async () => {
      try {
        const response = await axios.get('https://retoolapi.dev/gDa8uC/data');
        setDataX(response.data.slice(0, 50));
      } catch (error) {
        console.error('Error fetching X data:', error);
      }
    };

    const fetchDataY = async () => {
      try {
        const response = await axios.get('https://retoolapi.dev/o5zMs5/data');
        setDataY(response.data.slice(0, 50));
      } catch (error) {
        console.error('Error fetching Y data:', error);
      }
    };

    fetchDataX();
    fetchDataY();
  }, []);

  return (
    <div>
      <Chart dataX={dataX} dataY={dataY} />
    </div>
  );
};

export default YourComponent;
