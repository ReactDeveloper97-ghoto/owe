import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, FileText, ChevronRight, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useParentStore } from '../../store/parentStore';
import { getParentAssignments } from '../../api/parent.api';

const Assignments = () => {
  const { getSelectedStudent } = useParentStore();
  const selectedStudent = getSelectedStudent();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadAssignments = async () => {
      if (!selectedStudent) {
        setAssignments([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await getParentAssignments();
        const allAssignments = response.data || [];

        // Filter assignments for selected student's class and group
        const filteredAssignments = allAssignments.filter(assignment =>
          assignment.class_name.toLocaleLowerCase() === selectedStudent.class_name.toLocaleLowerCase() &&
          assignment.class_group.toLocaleLowerCase() === selectedStudent.class_group.toLocaleLowerCase()
        );

        setAssignments(filteredAssignments);
      } catch (err) {
        console.error('Error loading assignments:', err);
        setError('Failed to load assignments. Please try again.');
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, [selectedStudent]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format date for display (simpler)
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if assignment is overdue (due date has passed)
  const isOverdue = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  // Check if assignment is due soon (within 3 days)
  const isDueSoon = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);
    threeDaysFromNow.setHours(0, 0, 0, 0);

    return due <= threeDaysFromNow && due >= today;
  };

  // Get assignment status based on due date
  const getAssignmentStatus = (dueDate) => {
    if (isOverdue(dueDate)) return 'overdue';
    if (isDueSoon(dueDate)) return 'due_soon';
    return 'upcoming';
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'due_soon': return 'bg-yellow-100 text-yellow-800';
      case 'upcoming': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'due_soon': return <Clock className="w-4 h-4" />;
      case 'upcoming': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'overdue': return 'Overdue';
      case 'due_soon': return 'Due Soon';
      case 'upcoming': return 'Upcoming';
      default: return 'Pending';
    }
  };

  // Filter assignments based on selected filter
  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    const status = getAssignmentStatus(assignment.due_date);
    return status === filter;
  });

  // Sort assignments: overdue first, then due soon, then upcoming
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    const statusA = getAssignmentStatus(a.due_date);
    const statusB = getAssignmentStatus(b.due_date);

    const statusOrder = { overdue: 0, due_soon: 1, upcoming: 2 };

    if (statusOrder[statusA] !== statusOrder[statusB]) {
      return statusOrder[statusA] - statusOrder[statusB];
    }

    // Same status, sort by due date
    return new Date(a.due_date) - new Date(b.due_date);
  });

  // Calculate stats
  const stats = {
    total: assignments.length,
    overdue: assignments.filter(a => getAssignmentStatus(a.due_date) === 'overdue').length,
    dueSoon: assignments.filter(a => getAssignmentStatus(a.due_date) === 'due_soon').length,
    upcoming: assignments.filter(a => getAssignmentStatus(a.due_date) === 'upcoming').length,
  };

  if (!selectedStudent) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Student</h3>
        <p className="text-gray-500">Please select a student to view homework assignments</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#007698] border-t-transparent"></div>
        <p className="text-gray-600">Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Assignments</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-3 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 md:p-6 border border-purple-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Daily Homework</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              For {selectedStudent.name} • Class {selectedStudent.class_name} • Section {selectedStudent.section}
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center gap-3 md:gap-6">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-xs md:text-sm text-gray-600">Total</p>
            </div>
            <div className="h-6 md:h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-gray-800">{stats.overdue}</p>
              <p className="text-xs md:text-sm text-gray-600">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow border p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 text-sm md:text-base">Filter by Status:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'overdue', 'due_soon', 'upcoming'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 md:px-4 py-2 rounded-lg capitalize transition-colors text-xs md:text-sm ${filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {filterType.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assignments Grid */}
      {sortedAssignments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {sortedAssignments.map((assignment) => {
            const status = getAssignmentStatus(assignment.due_date);

            return (
              <div key={assignment.id} className="bg-white rounded-xl shadow border hover:shadow-lg transition-shadow">
                <div className="p-4 md:p-6">
                  {/* Assignment Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                        {assignment.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 md:px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs md:text-sm font-medium">
                          {assignment.subject}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getStatusColor(status)}`}>
                          {getStatusIcon(status)}
                          {getStatusText(status)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg md:text-xl font-bold text-gray-800">
                        {formatDisplayDate(assignment.due_date)}
                      </p>
                      <p className="text-xs text-gray-500">Due Date</p>
                    </div>
                  </div>

                  {/* Assignment Description */}
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{assignment.description}</p>

                  {/* Assignment Details */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                    <div>
                      <p className="text-xs md:text-sm text-gray-500">Class</p>
                      <p className="font-medium text-sm md:text-base">
                       {assignment.class_name==assignment.class_group?<> {assignment.class_name} </> :
                       <> {assignment.class_name} {assignment.class_group} </>}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-gray-500">Assigned On</p>
                      <p className="font-medium text-sm md:text-base">
                        {formatDisplayDate(assignment.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Complete at Academy</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm"
                        onClick={() => {
                          // Create a simple text file with assignment details
                          const content = `
Assignment: ${assignment.title}
Subject: ${assignment.subject}
Class: ${assignment.class_name} ${assignment.class_group}
Due Date: ${formatDate(assignment.due_date)}
Description: ${assignment.description}
Assigned On: ${formatDate(assignment.created_at)}

Instructions: Please complete this homework at the academy.
                          `;

                          const blob = new Blob([content], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `Homework-${assignment.title.replace(/\s+/g, '-')}.txt`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <Download className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                      <button
                        className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm"
                        onClick={() => {
                          // Mark as completed action
                          alert(`Homework "${assignment.title}" will be completed at the academy.`);
                        }}
                      >
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Mark Complete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow border p-8 md:p-12 text-center">
          <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg md:text-xl font-medium text-gray-600 mb-2">No Homework Assigned</h3>
          <p className="text-gray-500 mb-4">
            No homework assignments found for {selectedStudent.name} in {selectedStudent.class_name} {selectedStudent.class_group}.
          </p>
          <div className="inline-flex items-center gap-2 text-blue-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Homework will appear here when assigned</span>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {assignments.length > 0 && (
        <div className="bg-white rounded-xl shadow border p-4 md:p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Homework Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="text-center p-3 md:p-4 bg-blue-50 rounded-lg">
              <p className="text-xl md:text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-xs md:text-sm text-gray-600">Total Assigned</p>
            </div>
            <div className="text-center p-3 md:p-4 bg-red-50 rounded-lg">
              <p className="text-xl md:text-2xl font-bold text-red-600">{stats.overdue}</p>
              <p className="text-xs md:text-sm text-gray-600">Overdue</p>
            </div>
            <div className="text-center p-3 md:p-4 bg-yellow-50 rounded-lg">
              <p className="text-xl md:text-2xl font-bold text-yellow-600">{stats.dueSoon}</p>
              <p className="text-xs md:text-sm text-gray-600">Due Soon</p>
            </div>
            <div className="text-center p-3 md:p-4 bg-green-50 rounded-lg">
              <p className="text-xl md:text-2xl font-bold text-green-600">{stats.upcoming}</p>
              <p className="text-xs md:text-sm text-gray-600">Upcoming</p>
            </div>
          </div>

          {/* Timeline Summary */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-700">Upcoming Deadlines</h4>
              <span className="text-sm text-gray-500">
                Next: {assignments.length > 0 ? formatDisplayDate(assignments[0]?.due_date) : 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                {stats.overdue > 0 ? `${stats.overdue} overdue, ` : ''}
                {stats.dueSoon > 0 ? `${stats.dueSoon} due soon, ` : ''}
                {stats.upcoming} upcoming assignments
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;