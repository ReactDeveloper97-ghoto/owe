import { useEffect, useState } from "react";
import { getAllStudents, submitAttendance } from "../../api/admin.api";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res.data || []);
    } catch (error) {
      console.error("Error loading students:", error);
      alert("Failed to load students");
    }
  };

  const toggle = (id, value) => {
    setAttendance((prev) => ({ ...prev, [id]: value }));
  };

  const submit = async () => {
    try {
      setLoading(true);
      
      // Collect all records in array
      const records = Object.entries(attendance).map(([student_id, status]) => ({
        student_id: student_id,
        present: status === "present" // Convert string to boolean
      }));

      console.log('Sending attendance records:', records);

      // Send all records at once
      await submitAttendance(records);
      
      alert("Attendance saved successfully!");
      setAttendance({});
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert(error.response?.data?.error || "Failed to save attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Mark Attendance
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Student
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Class
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Parent
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="p-3">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{s.name}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-gray-900 dark:text-gray-100">
                        Class {s.class_name}
                        {s.section && ` (${s.section})`}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {s.class_group}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-gray-900 dark:text-gray-100">
                        {s.parents?.parent_name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {s.parents?.email || ''}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`attendance-${s.id}`}
                            checked={attendance[s.id] === "present"}
                            onChange={() => toggle(s.id, "present")}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="text-sm text-gray-900 dark:text-gray-100">Present</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`attendance-${s.id}`}
                            checked={attendance[s.id] === "absent"}
                            onChange={() => toggle(s.id, "absent")}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="text-sm text-gray-900 dark:text-gray-100">Absent</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {Object.keys(attendance).length} out of {students.length} students marked
        </div>
        <button
          onClick={submit}
          disabled={loading || Object.keys(attendance).length === 0}
          className={`px-6 py-2 rounded font-medium ${
            loading || Object.keys(attendance).length === 0
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Attendance'}
        </button>
      </div>
    </div>
  );
};

export default Attendance;