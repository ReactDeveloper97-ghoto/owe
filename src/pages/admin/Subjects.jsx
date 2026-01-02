import { useState } from "react";
import { createSubject } from "../../api/admin.api";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Subjects = () => {
  const [form, setForm] = useState({
    name: "",
    class_name: "",
    class_group: "",
    teacher_name: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name) return alert("Subject name required");

    try {
      await createSubject(form);
      alert("Subject added successfully");

      setForm({
        name: "",
        class_name: "",
        class_group: "",
        teacher_name: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add subject");
    }
  };

  return (
    <Card title="Add Subject">
      <Input
        label="Subject Name"
        name="name"
        placeholder="Mathematics"
        value={form.name}
        onChange={handleChange}
      />

      <Input
        label="Class Name"
        name="class_name"
        placeholder="9, 10, O-Level"
        value={form.class_name}
        onChange={handleChange}
      />

      <Input
        label="Class Group"
        name="class_group"
        placeholder="Matric / FSC / O-Level"
        value={form.class_group}
        onChange={handleChange}
      />

      <Input
        label="Teacher Name"
        name="teacher_name"
        placeholder="Teacher Name"
        value={form.teacher_name}
        onChange={handleChange}
      />

      <div className="mt-4">
        <Button onClick={submit}>Add Subject</Button>
      </div>
    </Card>
  );
};

export default Subjects;
