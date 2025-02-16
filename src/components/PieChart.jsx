import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ selectedState }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!selectedState)
    return (
      <div className="text-center text-gray-500">
        Select a state to view data.
      </div>
    );

  const values = [
    selectedState["SalerTray"],
    selectedState["WIP_CPA"],
    selectedState["Pending_for_allocation"],
    selectedState["CreditPending"],
  ];

  const total = values.reduce((sum, value) => sum + value, 0);

  const baseColors = [
    "rgba(82, 76, 133, 1)",
    "rgba(49, 51, 112, 1)",
    "rgba(25, 3, 153, 1)",
    "rgba(92, 113, 205, 1)",
  ];

  const blurredColors = baseColors.map((color) => color.replace("1)", "0.2)"));

  const data = {
    labels: ["WIP_1", "WIP-CPA", "Pending for allocation", "Credit Pending"],
    datasets: [
      {
        data: values,
        backgroundColor: values.map((_, index) =>
          hoverIndex === null
            ? baseColors[index]
            : hoverIndex === index
            ? baseColors[index]
            : blurredColors[index]
        ),
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        display: true,
      },
    },
    onHover: (event, elements) => {
      if (elements.length > 0) {
        setHoverIndex(elements[0].index);
      } else {
        setHoverIndex(null);
      }
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">
        {selectedState["State Name"]} Data
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
