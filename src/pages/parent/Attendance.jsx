import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, CheckCircle, XCircle, BarChart3, Filter } from 'lucide-react';
import { useParentStore } from '../../store/parentStore';

const Attendance = () => {
  const { getSelectedStudent } = useParentStore();
  const selectedStudent = getSelectedStudent();
  const [filterMonth, setFilterMonth] = useState('all');

  useEffect(() => {
    if (!selectedStudent) return;
  }, [selectedStudent]);

  if (!selectedStudent) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Student</h3>
        <p className="text-gray-500">Please select a student to view attendance</p>
      </div>
    );
  }

  const attendance = selectedStudent.attendence || [];
  
  // Calculate statistics
  const totalDays = attendance.length;
  const presentDays = attendance.filter(a => a.present).length;
  const absentDays = totalDays - presentDays;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
  
  // Group by month
  const groupedByMonth = attendance.reduce((acc, record) => {
    const month = record.date.slice(0, 7); // YYYY-MM
    if (!acc[month]) {
      acc[month] = { present: 0, total: 0, records: [] };
    }
    acc[month].total++;
    if (record.present) acc[month].present++;
    acc[month].records.push(record);
    return acc;
  }, {});

  const monthlyData = Object.entries(groupedByMonth)
    .map(([month, data]) => ({
      month,
      present: data.present,
      total: data.total,
      percentage: Math.round((data.present / data.total) * 100),
      records: data.records
    }))
    .sort((a, b) => b.month.localeCompare(a.month));

  const filteredData = filterMonth === 'all' 
    ? monthlyData 
    : monthlyData.filter(item => item.month === filterMonth);

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (percentage >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Attendance Record</h1>
            <p className="text-gray-600 mt-1">For {selectedStudent.name} • Class {selectedStudent.class_name}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{attendanceRate}%</p>
              <p className="text-sm text-gray-600">Overall Rate</p>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{presentDays}</p>
              <p className="text-sm text-gray-600">Present Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">Present</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{presentDays}</p>
          <p className="text-gray-500">Days attended</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${totalDays > 0 ? (presentDays / totalDays) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">Absent</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{absentDays}</p>
          <p className="text-gray-500">Days missed</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full" 
              style={{ width: `${totalDays > 0 ? (absentDays / totalDays) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{totalDays}</p>
          <p className="text-gray-500">Recorded days</p>
          <div className="mt-2 text-sm">
            <span className={`font-semibold ${attendanceRate >= 75 ? 'text-green-600' : 'text-red-600'}`}>
              {attendanceRate}% attendance rate
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Controls */}
      <div className="bg-white p-4 rounded-xl shadow border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Filter by Month:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterMonth('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterMonth === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Months
            </button>
            {monthlyData.slice(0, 6).map((item) => (
              <button
                key={item.month}
                onClick={() => setFilterMonth(item.month)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterMonth === item.month
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Monthly Attendance Breakdown
          </h2>
          <p className="text-gray-600 mt-1">Detailed attendance records by month</p>
        </div>

        {filteredData.length > 0 ? (
          <div className="divide-y">
            {filteredData.map((item, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <p className="text-gray-600">{item.present} present out of {item.total} days</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`px-4 py-2 rounded-full font-bold ${getStatusColor(item.percentage)}`}>
                      {item.percentage}% Attendance
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Attendance Progress</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        item.percentage >= 75 ? 'bg-green-500' :
                        item.percentage >= 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Daily breakdown */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Daily Records:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
                    {item.records.sort((a, b) => new Date(b.date) - new Date(a.date)).map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`p-2 rounded-lg text-center ${
                          day.present
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <div className="text-xs text-gray-500">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-sm font-semibold mt-1">
                          {new Date(day.date).getDate()}
                        </div>
                        <div className="mt-1">
                          {day.present ? (
                            <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500 mx-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Attendance Records</h3>
            <p className="text-gray-500">No attendance records found for the selected period.</p>
          </div>
        )}
      </div>

      {/* Recent Attendance Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Recent Attendance Records</h2>
          <p className="text-gray-600 mt-1">Latest attendance entries for {selectedStudent.name}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Day</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {attendance.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map((record, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium">{record.date}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-700">
                      {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                      record.present
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.present ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Present
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-1" />
                          Absent
                        </>
                      )}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-600 text-sm">
                      {record.present ? 'Student was present in all classes' : 'Student was absent from school'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {attendance.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No attendance records available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;