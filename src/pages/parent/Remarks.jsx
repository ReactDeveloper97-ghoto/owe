import { useState, useEffect } from 'react';
import { MessageSquare, User, Calendar, Clock, BookOpen, TrendingUp, Award } from 'lucide-react';
import { useParentStore } from '../../store/parentStore';

const Remarks = () => {
  const { getSelectedStudent } = useParentStore();
  const selectedStudent = getSelectedStudent();
  const [remarks, setRemarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedStudent) {
      const studentRemarks = selectedStudent.teacher_remarks || [];
      
      // Sort by date (newest first)
      const sortedRemarks = studentRemarks.sort((a, b) => 
        new Date(b.remark_date) - new Date(a.remark_date)
      );
      
      setRemarks(sortedRemarks);
      setLoading(false);
    }
  }, [selectedStudent]);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format date without year for summary
  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!selectedStudent) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Student</h3>
        <p className="text-gray-500">Please select a student to view tutor feedback</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#007698] border-t-transparent"></div>
        <p className="text-gray-600">Loading feedback...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 md:p-6 border border-amber-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tutor Feedback</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Daily performance feedback for {selectedStudent.name}
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center gap-3 md:gap-6">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-gray-800">{remarks.length}</p>
              <p className="text-xs md:text-sm text-gray-600">Total Feedback</p>
            </div>
            <div className="h-6 md:h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-gray-800">
                {remarks.length > 0 ? formatShortDate(remarks[0].remark_date) : 'N/A'}
              </p>
              <p className="text-xs md:text-sm text-gray-600">Most Recent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
            </div>
            <span className="text-xs md:text-sm font-medium text-blue-600">Total</span>
          </div>
          <p className="text-xl md:text-3xl font-bold text-gray-800">{remarks.length}</p>
          <p className="text-gray-500 text-xs md:text-sm">Feedback entries</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
            </div>
            <span className="text-xs md:text-sm font-medium text-green-600">This Month</span>
          </div>
          <p className="text-xl md:text-3xl font-bold text-gray-800">
            {remarks.filter(remark => {
              const remarkDate = new Date(remark.remark_date);
              const now = new Date();
              return remarkDate.getMonth() === now.getMonth() && 
                     remarkDate.getFullYear() === now.getFullYear();
            }).length}
          </p>
          <p className="text-gray-500 text-xs md:text-sm">Current month</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-purple-100 rounded-lg">
              <Award className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
            </div>
            <span className="text-xs md:text-sm font-medium text-purple-600">Last 7 Days</span>
          </div>
          <p className="text-xl md:text-3xl font-bold text-gray-800">
            {remarks.filter(remark => {
              const remarkDate = new Date(remark.remark_date);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return remarkDate >= weekAgo;
            }).length}
          </p>
          <p className="text-gray-500 text-xs md:text-sm">Recent feedback</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-amber-100 rounded-lg">
              <Calendar className="w-4 h-4 md:w-6 md:h-6 text-amber-600" />
            </div>
            <span className="text-xs md:text-sm font-medium text-amber-600">First Entry</span>
          </div>
          <p className="text-xl md:text-3xl font-bold text-gray-800">
            {remarks.length > 0 ? formatShortDate(remarks[remarks.length - 1].remark_date) : 'N/A'}
          </p>
          <p className="text-gray-500 text-xs md:text-sm">Earliest feedback</p>
        </div>
      </div>

      {/* Recent Feedback Preview */}
      {remarks.length > 0 && (
        <div className="bg-white rounded-xl shadow border">
          <div className="p-4 md:p-6 border-b">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <span>Recent Feedback</span>
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Latest tutor comments</p>
          </div>
          <div className="divide-y">
            {remarks.slice(0, 3).map((remark, index) => (
              <div key={index} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4 mb-3">
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm md:text-base mb-3">{remark.remark}</p>
                    <div className="flex items-center gap-3 text-xs md:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{formatDate(remark.remark_date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Daily Session</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="text-xs md:text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded">
                      Class {selectedStudent.class_name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Feedback */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">All Tutor Feedback</h2>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Complete feedback history for {selectedStudent.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{remarks.length} entries</span>
            </div>
          </div>
        </div>

        {remarks.length > 0 ? (
          <div className="divide-y">
            {remarks.map((remark, index) => (
              <div key={index} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 md:gap-4">
                  <div className="flex-1">
                    {/* Feedback Content */}
                    <div className="mb-3 md:mb-4">
                      <p className="text-gray-700 text-sm md:text-base">{remark.remark}</p>
                    </div>
                    
                    {/* Meta Information */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{formatDate(remark.remark_date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Tuition Session</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Tutor Feedback</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-xs md:text-sm text-gray-600 bg-gray-100 px-2 md:px-3 py-1 rounded">
                          {selectedStudent.class_name} {selectedStudent.section}
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded">
                          {selectedStudent.class_group}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 md:p-12 text-center">
            <MessageSquare className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Feedback Yet</h3>
            <p className="text-gray-500">
              No tutor feedback available for {selectedStudent.name}. Feedback will appear here once tutors add comments.
            </p>
          </div>
        )}
      </div>

      {/* Empty State for No Feedback */}
      {remarks.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <div className="max-w-md mx-auto">
            <div className="p-4 md:p-6 bg-gray-50 rounded-xl border">
              <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-medium text-gray-600 mb-2">Waiting for Feedback</h3>
              <p className="text-gray-500 text-sm md:text-base mb-4">
                Tutors will provide daily feedback after each session. You'll see performance comments here regularly.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-sm font-medium text-gray-700">Subjects Enrolled</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {selectedStudent.student_subjects?.length || 0}
                  </p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-sm font-medium text-gray-700">Attendance</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {selectedStudent.attendence?.filter(a => a.present).length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Statistics */}
      {remarks.length > 0 && (
        <div className="bg-white rounded-xl shadow border p-4 md:p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Feedback Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-blue-600">
                {new Set(remarks.map(r => r.remark_date.split('-').slice(0, 2).join('-'))).size}
              </p>
              <p className="text-sm text-gray-600">Months with feedback</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-green-600">
                {remarks.filter(r => {
                  const date = new Date(r.remark_date);
                  const today = new Date();
                  const lastMonth = new Date();
                  lastMonth.setMonth(today.getMonth() - 1);
                  return date >= lastMonth;
                }).length}
              </p>
              <p className="text-sm text-gray-600">Last 30 days</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-amber-600">
                {remarks.length > 0 ? Math.round(remarks.length / Math.max(1, 
                  (new Date(remarks[0].remark_date) - new Date(remarks[remarks.length - 1].remark_date)) 
                  / (1000 * 60 * 60 * 24 * 30)
                )) : 0}
              </p>
              <p className="text-sm text-gray-600">Avg per month</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Remarks;