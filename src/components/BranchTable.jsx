import React from "react";

const BranchTable = ({ selectedStateBranches }) => {
  if (!selectedStateBranches || selectedStateBranches.length === 0)
    return (
      <div className="text-center text-gray-500">
        Select a state to view branch data.
      </div>
    );

  // ✅ Calculate summary values
  const totalLogins = selectedStateBranches.reduce(
    (sum, branch) => sum + branch["Application Login"],
    0
  );
  const totalSanctionAmt = selectedStateBranches.reduce(
    (sum, branch) => sum + branch["Sanction Amt (in Cr)"],
    0
  );
  const totalFreshDisb = selectedStateBranches.reduce(
    (sum, branch) => sum + branch["Fresh Disbursment count"],
    0
  );
  const avgFTR = (
    selectedStateBranches.reduce((sum, branch) => sum + branch["FTR"], 0) /
    selectedStateBranches.length
  ).toFixed(1);

  return (
    <div className="mt-6">
      {/* ✅ Summary Cards */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="bg-blue-500 text-white px-6 py-2 rounded-lg">
          LOGINS: {totalLogins}
        </div>
        <div className="bg-blue-500 text-white px-6 py-2 rounded-lg">
          SANCTION AMT: {totalSanctionAmt} CR
        </div>
        <div className="bg-blue-500 text-white px-6 py-2 rounded-lg">
          FRESH DISB: {totalFreshDisb}
        </div>
        <div className="bg-blue-500 text-white px-6 py-2 rounded-lg">
          FTR: {avgFTR}%
        </div>
      </div>

      {/* ✅ Branch Data Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3">Branch</th>
            <th className="p-3">FTR%</th>
            <th className="p-3">WIP</th>
            <th className="p-3">App. Login</th>
            <th className="p-3">Sanction</th>
          </tr>
        </thead>
        <tbody>
          {selectedStateBranches.map((branch, index) => (
            <tr key={index} className="text-center bg-gray-100 border">
              <td className="p-3 bg-blue-300 text-white">
                {branch["Branch Name"]}
              </td>
              <td className="p-3 text-black">{branch["FTR"]}</td>
              <td className="p-3 text-black">{branch["WIP_CPA"]}</td>
              <td className="p-3 text-black">{branch["Application Login"]}</td>
              <td className="p-3 text-black">{branch["Sanction Count"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchTable;
