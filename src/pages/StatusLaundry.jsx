import React, { useState } from "react";

const initialStatus = [
  {
    id: 1,
    customerName: "Budi Santoso",
    service: "Dry Clean",
    status: "Dijemput",
  },
  {
    id: 2,
    customerName: "Siti Aminah",
    service: "Green Clean",
    status: "Diproses",
  },
  {
    id: 3,
    customerName: "Andi Wijaya",
    service: "Wet Clean",
    status: "Dikirim",
  },
];

const StatusLaundry = () => {
  const [statusList, setStatusList] = useState(initialStatus);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Dijemput":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
            Dijemput
          </span>
        );
      case "Diproses":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            Diproses
          </span>
        );
      case "Dikirim":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
            Dikirim
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
            Tidak Diketahui
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Status Laundry</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Pelanggan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jenis Layanan
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {statusList.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{entry.customerName}</td>
                <td className="px-6 py-4">{entry.service}</td>
                <td className="px-6 py-4 text-center">
                  {getStatusBadge(entry.status)}
                </td>
              </tr>
            ))}
            {statusList.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  Tidak ada data status laundry
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatusLaundry;
