import { useEffect, useState } from "react";
import { getAllStudents, removeStudentSubject } from "../../api/admin.api";
import { NavLink } from "react-router-dom";

const ShowStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingSubject, setRemovingSubject] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const studentsResponse = await getAllStudents();
      console.log("API Response:", studentsResponse);
      
      if (studentsResponse.data) {
        setStudents(studentsResponse.data);
        console.log("First student data:", studentsResponse.data[0]);
      } else {
        setStudents([]);
      }
      
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err.response?.data?.error || err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const getStudentSubjects = (student) => {
    if (!student.student_subjects || !Array.isArray(student.student_subjects)) {
      return [];
    }
    return student.student_subjects;
  };

  const handleRemoveSubject = async (studentId, subjectAssignmentId, subjectName) => {
    if (!window.confirm(`Are you sure you want to remove "${subjectName}" from this student?`)) {
      return;
    }

    try {
      setRemovingSubject(subjectAssignmentId);
      
      // Call the actual API to remove from database
      await removeStudentSubject(subjectAssignmentId);
      
      // Update local state
      setStudents(prevStudents => 
        prevStudents.map(student => {
          if (student.id === studentId) {
            return {
              ...student,
              student_subjects: student.student_subjects.filter(
                sub => sub.id !== subjectAssignmentId
              )
            };
          }
          return student;
        })
      );
      
      alert("Subject removed successfully!");
      
    } catch (err) {
      console.error("Error removing subject:", err);
      alert(err.response?.data?.error || err.message || "Failed to remove subject");
    } finally {
      setRemovingSubject(null);
    }
  };

  const renderSubjects = (student) => {
    const subjects = getStudentSubjects(student);
    
    if (subjects.length === 0) {
      return (
        <div className="text-sm text-gray-500 dark:text-gray-400 italic">
          No subjects assigned
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {subjects.map((item, index) => (
          <div key={item.id || index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.subjects?.name || 'Unknown Subject'}
              </span>
              {item.subjects?.teacher_name && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  ({item.subjects.teacher_name})
                </span>
              )}
            </div>
            
            <button
              onClick={() => handleRemoveSubject(
                student.id, 
                item.id, 
                item.subjects?.name || 'Subject'
              )}
              disabled={removingSubject === item.id}
              className={`ml-2 px-2 py-1 text-xs ${
                removingSubject === item.id 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              } rounded transition-colors`}
            >
              {removingSubject === item.id ? 'Removing...' : 'Remove'}
            </button>
          </div>
        ))}
      </div>
    );
  };

  const totalStudents = students.length;
  const studentsWithSubjects = students.filter(s => 
    s.student_subjects && s.student_subjects.length > 0
  ).length;
  const totalSubjectAssignments = students.reduce((total, student) => {
    return total + (student.student_subjects?.length || 0);
  }, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-300">Error</h3>
          <p className="text-red-700 dark:text-red-400 mt-2">{error}</p>
          <button
            onClick={loadStudents}
            className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Students Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Admin Dashboard - View and manage all students
          </p>
        </div>
        
        <div className="flex space-x-3">
          <NavLink 
            to="/admin/student-subjects"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Add Subject
          </NavLink>
          <NavLink 
            to="/admin/add-student" 
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            Add Student
          </NavLink>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Students</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalStudents}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="text-sm text-gray-500 dark:text-gray-400">With Subjects</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{studentsWithSubjects}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="text-sm text-gray-500 dark:text-gray-400">Subject Assignments</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalSubjectAssignments}</div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Parent
                </th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Subjects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {student.id.substring(0, 8)}...
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-gray-900 dark:text-gray-100">
                        Class {student.class_name}
                        {student.section && ` (${student.section})`}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {student.class_group}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-gray-900 dark:text-gray-100">
                        {student.parents?.parent_name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {student.parents?.email || ''}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      {renderSubjects(student)}
                      {getStudentSubjects(student).length > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {getStudentSubjects(student).length} subject(s)
                        </div>
                      )}
                    </td>
                    
                    <td className="px-6 py-4">
                      <NavLink
                        to="/admin/student-subjects"
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md inline-block"
                      >
                        Add Subject
                      </NavLink>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowStudents;