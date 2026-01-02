// src/pages/parent/Dashboard.jsx
import { useEffect, useState } from 'react';
import { getParentDashboard } from '../../api/parent.api';
import { useParentStore } from '../../store/parentStore';
import { 
  Calendar, 
  BookOpen, 
  DollarSign, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Award,
  Bookmark,
  Users,
  FileText,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { students, setStudents, selectedStudentId, setSelectedStudent, getSelectedStudent } = useParentStore();
  
  const selectedStudent = getSelectedStudent();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getParentDashboard();
        const studentsData = response.data.data.students || [];
        setStudents(studentsData);
        
        // If no student is selected yet, select first one
        if (!selectedStudentId && studentsData.length > 0) {
          setSelectedStudent(studentsData[0].id);
        }
      } catch (err) {
        console.error('Failed to load dashboard:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
console.log(students)
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#007698] border-t-transparent"></div>
        <p className="text-gray-600">Loading student data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Activity className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Data</h3>
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

  if (!selectedStudent || students.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Student Found</h3>
        <p className="text-gray-500">No student data available. Please contact support.</p>
      </div>
    );
  }

  // Calculations for selected student
  const attendance = selectedStudent.attendence || [];
  const totalPresent = attendance.filter(a => a.present).length;
  const attendancePercentage = attendance.length > 0 ? Math.round((totalPresent / attendance.length) * 100) : 0;
  
  const fees = selectedStudent.fees || [];
  const totalPaid = fees.reduce((sum, fee) => sum + fee.amount_paid, 0);
  const monthlyFee = selectedStudent.monthly_fee || 0;
  const feePercentage = monthlyFee > 0 ? Math.round((totalPaid / monthlyFee) * 100) : 0;
  
  const subjects = selectedStudent.student_subjects?.map(ss => ss.subjects) || [];
  const remarks = selectedStudent.teacher_remarks || [];

  return (
    <div className="space-y-6 p-2 md:p-6">
      {/* Student Info Header */}
      <div className="p-6 rounded-xl shadow-sm border bg-linear-to-r from-blue-50 to-indigo-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back!
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {selectedStudent.name}
              </div>
              <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                Class {selectedStudent.class_name} {selectedStudent.section}
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm text-gray-600">Monthly Fee</p>
              <p className="text-xl font-bold text-gray-800">
                PKR {monthlyFee.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          title="Attendance"
          value={`${totalPresent}/${attendance.length}`}
          percentage={attendancePercentage}
          color="blue"
        />
        
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          title="Fee Status"
          value={`PKR ${totalPaid.toLocaleString()}`}
          percentage={feePercentage}
          color="green"
        />
        
        <StatCard
          icon={<BookOpen className="w-5 h-5" />}
          title="Subjects"
          value={subjects.length}
          subtitle="Enrolled"
          color="purple"
        />
        
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          title="Remarks"
          value={remarks.length}
          subtitle="Feedback"
          color="amber"
        />
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Attendance */}
        <div className="bg-white rounded-lg shadow border p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Recent Attendance
            </h3>
            <span className="text-sm font-medium text-blue-600">
              {attendancePercentage}% present
            </span>
          </div>
          
          {attendance.length > 0 ? (
            <div className="space-y-2">
              {attendance.slice(-5).reverse().map((record, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${record.present ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="font-medium">{record.date}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${record.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {record.present ? 'Present' : 'Absent'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No attendance records</p>
            </div>
          )}
        </div>

        {/* Fee Status */}
        <div className="bg-white rounded-lg shadow border p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Fee Payments
            </h3>
            <span className={`text-sm font-medium ${feePercentage >= 100 ? 'text-green-600' : 'text-yellow-600'}`}>
              {feePercentage}% paid
            </span>
          </div>
          
          {fees.length > 0 ? (
            <div className="space-y-2">
              {fees.slice(-3).reverse().map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded border">
                  <div>
                    <p className="font-medium">{payment.month}</p>
                    <p className="text-xs text-gray-500">Monthly payment</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">PKR {payment.amount_paid.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Payment Progress</span>
                  <span>{feePercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${feePercentage >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(feePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <DollarSign className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No payment records</p>
            </div>
          )}
        </div>
      </div>

      {/* Subjects and Remarks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subjects */}
        <div className="bg-white rounded-lg shadow border p-4 md:p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            Enrolled Subjects
          </h3>
          
          {subjects.length > 0 ? (
            <div className="space-y-3">
              {subjects.map((subject) => (
                <div key={subject.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">{subject.name}</h4>
                      <p className="text-sm text-gray-600">Teacher: {subject.teacher_name}</p>
                    </div>
                    <Bookmark className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No subjects enrolled</p>
            </div>
          )}
        </div>

        {/* Teacher Remarks */}
        <div className="bg-white rounded-lg shadow border p-4 md:p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            Teacher Remarks
          </h3>
          
          {remarks.length > 0 ? (
            <div className="space-y-3">
              {remarks.slice(-2).reverse().map((remark, index) => (
                <div key={index} className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-amber-800">Feedback</span>
                    <span className="text-xs text-gray-500">{remark.remark_date}</span>
                  </div>
                  <p className="text-gray-700">{remark.remark}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <Award className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No teacher remarks</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, percentage, subtitle, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    amber: 'bg-amber-50 border-amber-200'
  };

  const iconClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    amber: 'text-amber-600 bg-amber-100'
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color] || 'bg-gray-50'}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${iconClasses[color]}`}>
          {icon}
        </div>
        {percentage !== undefined && (
          <div className="ml-auto text-xl font-bold">
            {percentage}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      {subtitle && (
        <p className="text-xs text-gray-500">{subtitle}</p>
      )}
    </div>
  );
};

export default Dashboard;