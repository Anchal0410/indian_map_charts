import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ selectedStateBranches }) => {
  if (!selectedStateBranches || selectedStateBranches.length === 0)
    return (
      <div className="text-center text-gray-500">
        Select a state to view branch data.
      </div>
    );

  const branchNames = selectedStateBranches.map(
    (branch) => branch["Branch Name"]
  );
  const applicationLogin = selectedStateBranches.map(
    (branch) => branch["Application Login"]
  );
  const sanctionCount = selectedStateBranches.map(
    (branch) => branch["Sanction Count"]
  );
  const disbursementCount = selectedStateBranches.map(
    (branch) => branch["Fresh Disbursment count"]
  );

  const data = {
    labels: branchNames,
    datasets: [
      {
        label: "Application Login",
        data: applicationLogin,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: "Sanction Count",
        data: sanctionCount,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: "Fresh Disbursement",
        data: disbursementCount,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: false,
        ticks: { autoSkip: false },
      },
      y: {
        stacked: false,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Branch-wise Data</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
