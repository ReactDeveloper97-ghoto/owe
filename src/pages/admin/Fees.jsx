import { useEffect, useState } from "react";
import { getStudentsWithFeeSummary, submitFees } from "../../api/admin.api";
import { useThemeStore } from "../../store/themeStore";
import { FiCalendar, FiRefreshCw, FiDollarSign, FiCheckCircle, FiAlertCircle, FiBarChart2, FiUser, FiUsers, FiHome, FiMail, FiPhone } from "react-icons/fi";
import { LuCalendarDays, LuGraduationCap, LuCreditCard, LuTrendingUp, LuCalendar, LuBookOpen, LuFileText } from "react-icons/lu";
import { MdAttachMoney, MdDateRange, MdSchool, MdPayments, MdAccountBalance } from "react-icons/md";

const Fees = () => {
  const [students, setStudents] = useState([]);
  const { theme } = useThemeStore();
  const [amount, setAmount] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState({});
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFee: 0,
    totalPaid: 0,
    totalRemaining: 0
  });

  useEffect(() => {
    loadStudents();
    // Set current month as default (YYYY-MM format)
    const currentMonth = new Date().toISOString().slice(0, 7);
    setSelectedMonth(currentMonth);
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      calculateStats();
    }
  }, [students]);

  const calculateStats = () => {
    const stats = students.reduce((acc, student) => {
      acc.totalStudents += 1;
      acc.totalFee += Number(student.total_fee) || 0;
      acc.totalPaid += Number(student.fee_paid) || 0;
      acc.totalRemaining += Number(student.fee_remaining) || 0;
      return acc;
    }, {
      totalStudents: 0,
      totalFee: 0,
      totalPaid: 0,
      totalRemaining: 0
    });
    
    setStats(stats);
  };

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await getStudentsWithFeeSummary();
      setStudents(res);
    } catch (error) {
      console.error("Error loading students:", error);
      alert("Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submit = async (student) => {
    const payAmount = Number(amount[student.id]);

    if (!payAmount || payAmount <= 0) {
      return alert("Enter a valid amount");
    }

    if (payAmount > student.fee_remaining) {
      return alert("Amount exceeds remaining fee");
    }

    if (!selectedMonth) {
      return alert("Please select a month");
    }

    setSubmitting(prev => ({ ...prev, [student.id]: true }));

    try {
      await submitFees({
        student_id: student.id,
        amount_paid: payAmount,
        month: selectedMonth,
      });

      alert("Fee saved successfully");
      setAmount(prev => ({ ...prev, [student.id]: "" }));
      loadStudents();
    } catch (error) {
      console.error("Fee submission error:", error);
      
      if (error.response?.data?.error?.includes("duplicate key")) {
        alert(`Fee for ${selectedMonth} is already submitted for this student!`);
      } else if (error.response?.data?.error) {
        alert("Error: " + error.response.data.error);
      } else {
        alert("Failed to save fee. Please try again.");
      }
    } finally {
      setSubmitting(prev => ({ ...prev, [student.id]: false }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading && students.length === 0) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">Loading fee data...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Please wait while we fetch student records</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Fee Management
              </h1>
              <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Manage student fees, track payments, and monitor outstanding balances
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-full sm:w-auto">
                <label htmlFor="month-select" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    Select Month
                  </div>
                </label>
                <input
                  id="month-select"
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className={`w-full sm:w-48 px-4 py-3 rounded-lg border transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  }`}
                />
              </div>
              
              <button
                onClick={loadStudents}
                className={`mt-6 sm:mt-0 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <FiRefreshCw className="w-5 h-5" />
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {/* Selected Month Banner */}
        {selectedMonth && (
          <div className={`mb-8 p-6 rounded-xl ${theme === 'dark' 
              ? 'bg-linear-to-r from-blue-900/30 to-teal-900/30 border border-blue-800/30' 
              : 'bg-linear-to-r from-blue-50 to-teal-50 border border-blue-200'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-800/50' : 'bg-blue-100'}`}>
                  <FiCalendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Selected Month
                  </p>
                  <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedMonth}
                  </p>
                </div>
              </div>
              <div className={`text-right ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <p className="text-sm font-medium">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStudents}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700 hover:border-blue-500/50' 
              : 'bg-white border border-gray-200 shadow-sm hover:border-blue-300'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Total Fee
                </p>
                <p className={`text-2xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(stats.totalFee)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                <MdAttachMoney className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700 hover:border-green-500/50' 
              : 'bg-white border border-gray-200 shadow-sm hover:border-green-300'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Total Paid
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {formatCurrency(stats.totalPaid)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700 hover:border-red-500/50' 
              : 'bg-white border border-gray-200 shadow-sm hover:border-red-300'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Total Remaining
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">
                  {formatCurrency(stats.totalRemaining)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'}`}>
                <FiAlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700 hover:border-purple-500/50' 
              : 'bg-white border border-gray-200 shadow-sm hover:border-purple-300'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                  {stats.totalFee > 0 ? `${Math.round((stats.totalPaid / stats.totalFee) * 100)}%` : '0%'}
                </p>
              </div>
              <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                <LuTrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Students List */}
        {students.length === 0 ? (
          <div className={`rounded-xl p-12 text-center ${theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <FiUsers className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              No Students Found
            </h3>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              There are no students to display fee information for.
            </p>
            <button
              onClick={loadStudents}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Refresh List
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {students.map((student) => {
              const paymentProgress = student.total_fee > 0 
                ? (student.fee_paid / student.total_fee) * 100 
                : 0;
              
              return (
                <div
                  key={student.id}
                  className={`rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border border-gray-700 hover:border-blue-500/30' 
                      : 'bg-white border border-gray-200 shadow-sm hover:border-blue-300'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Student Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
                        }`}>
                          <FiUser className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {student.name}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                              theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}>
                              <MdSchool className="w-3 h-3" />
                              Class {student.class_name}
                              {student.section && ` (${student.section})`}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                              theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}>
                              <FiUsers className="w-3 h-3" />
                              {student.parent_name}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                              theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}>
                              <LuGraduationCap className="w-3 h-3" />
                              {student.class_group}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fee Summary */}
                    <div className="lg:w-2/5">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className={`text-xs font-medium px-2 py-1 rounded-lg mb-2 ${
                            theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'
                          }`}>
                            Total
                          </div>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {formatCurrency(student.total_fee || 0)}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className={`text-xs font-medium px-2 py-1 rounded-lg mb-2 ${
                            theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                          }`}>
                            Paid
                          </div>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">
                            {formatCurrency(student.fee_paid || 0)}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className={`text-xs font-medium px-2 py-1 rounded-lg mb-2 ${
                            theme === 'dark' ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'
                          }`}>
                            Due
                          </div>
                          <p className="text-lg font-bold text-red-600 dark:text-red-400">
                            {formatCurrency(student.fee_remaining || 0)}
                          </p>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Payment Progress</span>
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{Math.round(paymentProgress)}%</span>
                        </div>
                        <div className={`h-2 rounded-full overflow-hidden ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <div 
                            className="h-full bg-linear-to-r from-green-500 to-teal-500 rounded-full transition-all duration-500"
                            style={{ width: `${paymentProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Form */}
                    <div className="lg:w-1/4">
                      <div className="space-y-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Payment Amount
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Rs</span>
                            </div>
                            <input
                              type="number"
                              placeholder="Enter amount"
                              value={amount[student.id] || ""}
                              onChange={(e) =>
                                setAmount({ ...amount, [student.id]: e.target.value })
                              }
                              min="0"
                              max={student.fee_remaining}
                              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                                theme === 'dark' 
                                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent' 
                                  : 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                              }`}
                            />
                          </div>
                          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Max: {formatCurrency(student.fee_remaining)}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => submit(student)}
                          disabled={!amount[student.id] || amount[student.id] <= 0 || submitting[student.id]}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                            !amount[student.id] || amount[student.id] <= 0 || submitting[student.id]
                              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                              : theme === 'dark'
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                        >
                          {submitting[student.id] ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <MdPayments className="w-4 h-4" />
                              Submit Payment
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {student.monthly_fee && (
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                            <FiDollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Monthly Fee</p>
                            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {formatCurrency(student.monthly_fee)}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {student.total_months && (
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                            <LuCalendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Duration</p>
                            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {student.total_months} months
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {student.admission_date && (
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded ${theme === 'dark' ? 'bg-teal-900/20' : 'bg-teal-50'}`}>
                            <MdDateRange className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          </div>
                          <div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Admission Date</p>
                            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {new Date(student.admission_date).toLocaleDateString('en-PK')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Stats */}
        {students.length > 0 && (
          <div className={`mt-8 p-6 rounded-xl ${theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Students</p>
                <p className={`text-2xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stats.totalStudents}
                </p>
              </div>
              <div className="text-center">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Collected</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {formatCurrency(stats.totalPaid)}
                </p>
              </div>
              <div className="text-center">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Pending Amount</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                  {formatCurrency(stats.totalRemaining)}
                </p>
              </div>
              <div className="text-center">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Collection Rate</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                  {stats.totalFee > 0 ? `${Math.round((stats.totalPaid / stats.totalFee) * 100)}%` : '0%'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fees;