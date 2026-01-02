import { useEffect, useState } from "react";
import {
  assignSubjectToStudent,
  getAllStudents,
  getSubjects
} from "../../api/admin.api";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const AssignStudentSubject = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    student_id: "",
    subject_id: "",
  });

  useEffect(() => {
    getAllStudents().then(res => setStudents(res.data));
    getSubjects().then(res => setSubjects(res.data));
   
  }, []);
 console.log(subjects)
  const submit = async () => {
    if (!form.student_id || !form.subject_id)
      return alert("Select student & subject");

    await assignSubjectToStudent(form);
    alert("Subject assigned successfully");

    setForm({ student_id: "", subject_id: "" });
  };

  return (
    <Card title="Assign Subject to Student">
      <div className="space-y-4">

        {/* Student dropdown */}
        <div>
          <label className="text-sm font-medium">Student</label>
          <select
            className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800"
            value={form.student_id}
            onChange={(e) =>
              setForm({ ...form, student_id: e.target.value })
            }
          >
            <option value="">-- Select Student --</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.class_name} {s.section}
              </option>
            ))}
          </select>
        </div>

        {/* Subject dropdown */}
        <div>
          <label className="text-sm font-medium">Subject</label>
          <select
            className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800"
            value={form.subject_id}
            onChange={(e) =>
              setForm({ ...form, subject_id: e.target.value })
            }
          >
            <option value="">-- Select Subject --</option>
            {subjects.map(sub => (
              <option key={sub.id} value={sub.id}>
                {sub.name}-{sub.class_name}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={submit}>Assign Subject</Button>
      </div>
    </Card>
  );
};

export default AssignStudentSubject;
