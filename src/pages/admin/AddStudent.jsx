import { useEffect, useState } from "react";
import { createStudent, getParents } from "../../api/admin.api";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const AddStudents = () => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    parent_id: "",
    class_name: "",
    class_group: "",
    section: "",
    monthly_fee: "",
    admission_date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
  });

  useEffect(() => {
    loadParents();
  }, []);

  const loadParents = async () => {
    try {
      const res = await getParents();
      setParents(res.data || []);
    } catch (error) {
      console.error("Error loading parents:", error);
      alert("Failed to load parents. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Handle number inputs
    if (type === 'number') {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submit = async () => {
    // Validation
    if (!form.name.trim()) {
      return alert("Student name is required");
    }
    
    if (!form.parent_id) {
      return alert("Please select a parent");
    }
    
    if (!form.monthly_fee || form.monthly_fee <= 0) {
      return alert("Please enter a valid monthly fee (greater than 0)");
    }
    
    if (!form.admission_date) {
      return alert("Admission date is required");
    }

    try {
      setLoading(true);
      console.log("Submitting form:", form);
      
      // Format the data to send
      const studentData = {
        ...form,
        monthly_fee: Number(form.monthly_fee),
        // Ensure admission_date is in correct format
        admission_date: form.admission_date || new Date().toISOString().split('T')[0]
      };
      
      await createStudent(studentData);
      alert("Student added successfully");

      // Reset form
      setForm({
        name: "",
        parent_id: "",
        class_name: "",
        class_group: "",
        section: "",
        monthly_fee: "",
        admission_date: new Date().toISOString().split('T')[0], // Reset to current date
      });
    } catch (error) {
      console.error("Error creating student:", error);
      
      if (error.response?.data?.error) {
        alert("Error: " + error.response.data.error);
      } else {
        alert("Failed to add student. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Add New Student">
      <div className="space-y-4">
        <Input 
          label="Student Full Name" 
          name="name" 
          value={form.name} 
          onChange={handleChange}
          placeholder="Enter student's full name"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Parent <span className="text-red-500">*</span>
          </label>
          <select
            name="parent_id"
            value={form.parent_id}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800 
                     text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">-- Select Parent --</option>
            {parents.map((p) => (
              <option key={p.id} value={p.id}>
                {p.parent_name} ({p.email || p.phone_number || p.id.substring(0, 8)})
              </option>
            ))}
          </select>
          {parents.length === 0 && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
              No parents found. Please add parents first.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Class Name" 
            name="class_name" 
            value={form.class_name} 
            onChange={handleChange}
            placeholder="e.g., 10, 11, 12"
          />
          
          <Input 
            label="Class Group" 
            name="class_group" 
            value={form.class_group} 
            onChange={handleChange}
            placeholder="e.g., Matric, FSc, O-Level"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Section" 
            name="section" 
            value={form.section} 
            onChange={handleChange}
            placeholder="e.g., A, B, C"
          />
          
          <Input 
            label="Admission Date" 
            name="admission_date" 
            type="date"
            value={form.admission_date} 
            onChange={handleChange}
            required
          />
        </div>

        <Input
          label="Monthly Fee (PKR)"
          name="monthly_fee"
          type="number"
          value={form.monthly_fee}
          onChange={handleChange}
          placeholder="Enter monthly fee amount"
          min="0"
          step="100"
          required
        />

        <div className="pt-4">
          <Button 
            onClick={submit}
            disabled={loading || !form.name || !form.parent_id || !form.monthly_fee}
            className="w-full"
          >
            {loading ? "Creating Student..." : "Create Student"}
          </Button>
        </div>

        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Student Information:</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            • Student will be automatically enrolled from admission date<br/>
            • Monthly fee will be calculated based on admission date<br/>
            • Parent will receive notifications about fee payments
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AddStudents;