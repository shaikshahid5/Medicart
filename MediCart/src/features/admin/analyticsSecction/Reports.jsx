import { useState, useEffect } from "react";

export default function ReportPage() {
  const [reportData, setReportData] = useState(null);
  const [selectedReport, setSelectedReport] = useState("");
  const [generated, setGenerated] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetch("/reports.json")
      .then((res) => res.json())
      .then((data) => {
        setReportData(data);

        // preload some reports directly from the data
        const defaultReports = [
          ...data.Metrics.SalesVolume.slice(0, 5),   // first 5 sales entries
          ...data.Metrics.StockStatus.slice(0, 5),  // first 5 inventory entries
        ];

        setGenerated(defaultReports);
        setSelectedReport("Reports Preview");
      });
  }, []);

  const handleGenerate = () => {
    if (!reportData || !selectedReport) return;

    let data = null;
    if (selectedReport === "Sales") data = reportData.Metrics.SalesVolume;
    if (selectedReport === "Inventory") data = reportData.Metrics.StockStatus;
    if (selectedReport === "Prescriptions") data = reportData.Prescriptions;

    // Filter by date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      data = data.filter((row) => {
        const rowDate = new Date(row.date);
        return rowDate >= start && rowDate <= end;
      });
    }

    setGenerated(data);
  };

  const handleExportCSV = () => {
    if (!generated) return;
    const headers = Object.keys(generated[0]).join(",");
    const rows = generated.map((row) => Object.values(row).join(",")).join("\n");
    const csvContent = headers + "\n" + rows;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedReport}-report.csv`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      {reportData && (
        <div className="bg-[#16213E] rounded-xl shadow p-3 mb-6">
          <h1 className="text-2xl font-bold text-green-500">Reports</h1>
          <p className="text-sm text-white">
            Report ID: {reportData.ReportID} • Generated:{" "}
            {new Date(reportData.GeneratedDate).toLocaleString()}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-wrap gap-4">
        <select
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Report</option>
          <option value="Sales">Sales Report</option>
          <option value="Inventory">Inventory Report</option>
          <option value="Prescriptions">Prescription Trends</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleGenerate}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
        >
          Generate
        </button>
      </div>

      {/* Preview Table */}
      {generated && generated.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {selectedReport || "Reports Preview"}
          </h2>
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                {Object.keys(generated[0]).map((key) => (
                  <th key={key} className="p-3 text-left">{key}</th>
                ))}
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {generated.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="p-3 border-t border-gray-200">{val}</td>
                  ))}
                  <td className="p-3 border-t border-gray-200">
                    <button
                      onClick={() => setModalData(row)}
                      className="text-green-600 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Actions */}
      {generated && generated.length > 0 && (
        <div className="flex gap-4">
          <button
            onClick={handleExportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
          >
            Print Report
          </button>
        </div>
      )}

      {/* Modal Popup */}
      {modalData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Report Details</h2>
            <div className="space-y-2">
              {Object.entries(modalData).map(([key, val]) => (
                <p key={key} className="text-sm text-gray-700">
                  <span className="font-semibold">{key}:</span> {val}
                </p>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setModalData(null)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
