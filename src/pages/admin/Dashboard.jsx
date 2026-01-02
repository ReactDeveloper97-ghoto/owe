import { useEffect, useState } from "react";
import { getAllStudents } from "../../api/admin.api";

const Dashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getAllStudents()
      .then((res) => setStudents(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#007698] mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Total Students</p>
          <h2 className="text-3xl font-bold">{students.length}</h2>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Students</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-e">Name</th>
              <th className="p-2 border-e">Class</th>
              <th className="p-2 border-e">Parent</th>
              <th className="p-2 border-e">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2 border-e">{s.name}</td>
                <td className="p-2 border-e">{s.class_name}</td>
                <td className="p-2 border-e">{s.parents?.parent_name}</td>
                <td className="p-2 border-e">{s.parents?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
