import { useEffect, useState } from "react";
import { sendAssignment, getSubjects, getAllStudents } from "../../api/admin.api";

const Assignments = () => {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    class_name: "",
    class_group: "",
    subject: "",
    title: "",
    description: "",
    due_date: "",
  });

  useEffect(() => {
    getSubjects().then(res => setSubjects(res.data));
    getAllStudents().then(res => setStudents(res.data));
  }, []);

  // derive class list from students
  const classNames = [...new Set(students.map(s => s.class_name))];
  const classGroups = [...new Set(students.map(s => s.class_group))];

  const submit = async () => {
    if (!form.class_name || !form.subject || !form.due_date)
      return alert("Class, subject & due date required");

    await sendAssignment(form);
    alert("Assignment created");

    setForm({
      class_name: "",
      class_group: "",
      subject: "",
      title: "",
      description: "",
      due_date: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Create Assignment</h1>

      <div className="space-y-4">

        {/* Class */}
        <select
          value={form.class_name}
          onChange={(e) => setForm({ ...form, class_name: e.target.value })}
          className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800"
        >
          <option value="">Select Class</option>
          {classNames.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        {/* Group */}
        <select
          value={form.class_group}
          onChange={(e) => setForm({ ...form, class_group: e.target.value })}
          className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800"
        >
          <option value="">Select Group</option>
          {classGroups.map((g, i) => (
            <option key={i} value={g}>{g}</option>
          ))}
        </select>

        {/* Subject */}
        <select
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800"
        >
          <option value="">Select Subject</option>
          {subjects.map(s => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
        <label>Due Date</label>
        <input
          type="date"
          value={form.due_date}
          onChange={(e) => setForm({ ...form, due_date: e.target.value })}
          className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800"
        />

        <input
          placeholder="Assignment Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800"
        />

        <textarea
          rows={4}
          placeholder="Assignment description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800"
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Create Assignment
        </button>
      </div>
    </div>
  );
};

export default Assignments;
