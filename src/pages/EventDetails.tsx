import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TableData, fetchTableData } from '../lib/googleSheets';

export default function EventDetails() {
  const { performerName, date } = useParams();
  const [tables, setTables] = React.useState<TableData[]>([]);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    async function loadTables() {
      try {
        const data = await fetchTableData();
        setTables(data);
      } catch (err) {
        setError('Failed to load tables');
        console.error(err);
      }
    }

    loadTables();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black py-12">
      <div className="container mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-black mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </Link>

        <h1 className="text-4xl font-bold mb-2">{performerName}</h1>
        <p className="text-xl text-gray-600 mb-8">{date}</p>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-6 text-left">Table Number</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left">Reserved By</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 font-medium">{table.tableNumber}</td>
                  <td className="py-4 px-6">{table.status}</td>
                  <td className="py-4 px-6">{table.reservedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}