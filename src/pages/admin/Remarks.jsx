import { useEffect, useState } from 'react';
import { getAllStudents, submitRemark } from '../../api/admin.api';

const Remarks = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student_id: '',
    remark: '',
  });

  useEffect(() => {
    getAllStudents()
      .then((res) => setStudents(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = async () => {
    if (!form.student_id || !form.remark) {
      alert('Please select student and write remark');
      return;
    }

    await submitRemark({
      student_id: form.student_id,
      remark: form.remark,
    });

    alert('Remark submitted successfully');
    setForm({ student_id: '', remark: '' });
  };
console.log(students)
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-[#007698]">
        Add Student Remark
      </h1>

      <div className="bg-white shadow rounded p-6 space-y-4">
        {/* Student Select */}
        <div>
          <label className="block font-medium mb-1">Select Student</label>
          <select
            className="border w-full p-2 rounded"
            value={form.student_id}
            onChange={(e) =>
              setForm({ ...form, student_id: e.target.value })
            }
          >
            <option value="">-- Select Student --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.class_name}) — {s.parents?.parent_name}
              </option>
            ))}
          </select>
        </div>

        {/* Remark */}
        <div>
          <label className="block font-medium mb-1">Remark</label>
          <textarea
            rows="4"
            className="border w-full p-2 rounded"
            placeholder="Write teacher remark..."
            value={form.remark}
            onChange={(e) =>
              setForm({ ...form, remark: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Remark
        </button>
      </div>
    </div>
  );
};

export default Remarks;
