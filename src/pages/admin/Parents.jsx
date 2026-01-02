import { useEffect, useState } from "react";
import { useThemeStore } from "../../store/themeStore";
import client from "../../api/client";
import { 
  FiUsers, 
  FiMail, 
  FiPhone, 
  FiCalendar, 
  FiUser, 
  FiSearch,
  FiPlus,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { 
  MdOutlineFamilyRestroom,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlinePerson,
  MdOutlineDateRange
} from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import ParentModal from "./../../components/ui/ParentModal"; // Import the modal component

const Parents = () => {
  const [parents, setParents] = useState([]);
  const [filteredParents, setFilteredParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });
  
  // Modal state only
  const [showAddModal, setShowAddModal] = useState(false);
  
  const { theme } = useThemeStore();

  useEffect(() => {
    loadParents();
  }, []);

  useEffect(() => {
    filterParents();
  }, [parents, searchTerm, sortConfig]);

  const loadParents = async () => {
    try {
      setLoading(true);
      const res = await client.get("/admin/parents");
      setParents(res.data?.data || []);
    } catch (error) {
      console.error("Error loading parents:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterParents = () => {
    let filtered = [...parents];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(parent =>
        parent.parent_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.phone_number?.includes(searchTerm)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortConfig.key === 'created_at') {
        return sortConfig.direction === 'asc'
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      }
      
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredParents(filtered);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getPaginationData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredParents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredParents.length / itemsPerPage);

    return { currentItems, totalPages };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Simple modal open/close handlers
  const handleModalOpen = () => setShowAddModal(true);
  const handleModalClose = () => setShowAddModal(false);
  const handleModalSuccess = () => {
    loadParents(); // Refresh the list after successful addition
  };

  const { currentItems, totalPages } = getPaginationData();

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className={`mt-4 text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Loading parents...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Modal Component */}
      <ParentModal 
        isOpen={showAddModal}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
      />

      {/* Main Content */}
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                    <HiOutlineUserGroup className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Parents Management</h1>
                    <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Manage and view all parent information
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                }`}>
                  <FiFilter className="w-4 h-4" />
                  Filter
                </button>
                <button className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                }`}>
                  <FiDownload className="w-4 h-4" />
                  Export
                </button>
                <button 
                  onClick={handleModalOpen}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                    theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <FiPlus className="w-4 h-4" />
                  Add Parent
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className={`rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
              theme === 'dark' 
                ? 'bg-gray-800 border border-gray-700 hover:border-blue-500/50' 
                : 'bg-white border border-gray-200 shadow-sm hover:border-blue-300'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Parents
                  </p>
                  <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {parents.length}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Active Contacts
                  </p>
                  <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {parents.filter(p => p.phone_number).length}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                  <FiPhone className="w-6 h-6 text-green-600 dark:text-green-400" />
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
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Verified Emails
                  </p>
                  <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {parents.filter(p => p.email).length}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                  <FiMail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className={`rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
              theme === 'dark' 
                ? 'bg-gray-800 border border-gray-700 hover:border-teal-500/50' 
                : 'bg-white border border-gray-200 shadow-sm hover:border-teal-300'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Recent Additions
                  </p>
                  <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {parents.filter(p => {
                      const created = new Date(p.created_at);
                      const monthAgo = new Date();
                      monthAgo.setMonth(monthAgo.getMonth() - 1);
                      return created > monthAgo;
                    }).length}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-teal-900/30' : 'bg-teal-100'}`}>
                  <FiCalendar className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className={`mb-6 p-4 rounded-xl ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  placeholder="Search parents by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  }`}
                />
              </div>
              <div className="text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Showing {currentItems.length} of {filteredParents.length} parents
                </span>
              </div>
            </div>
          </div>

          {/* Parents Table */}
          <div className={`rounded-xl overflow-hidden ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className={theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}>
                  <tr>
                    <th 
                      onClick={() => handleSort('parent_name')}
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors ${
                        theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MdOutlinePerson className="w-4 h-4" />
                        Parent Name
                        {sortConfig.key === 'parent_name' && (
                          <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('email')}
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors ${
                        theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MdOutlineEmail className="w-4 h-4" />
                        Email Address
                        {sortConfig.key === 'email' && (
                          <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('phone_number')}
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors ${
                        theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MdOutlinePhone className="w-4 h-4" />
                        Phone Number
                        {sortConfig.key === 'phone_number' && (
                          <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('created_at')}
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors ${
                        theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MdOutlineDateRange className="w-4 h-4" />
                        Joined Date
                        {sortConfig.key === 'created_at' && (
                          <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <MdOutlineFamilyRestroom className={`w-16 h-16 mb-4 ${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}`} />
                          <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            No parents found
                          </h3>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            {searchTerm ? 'Try adjusting your search terms' : 'Add your first parent to get started'}
                          </p>
                          {!searchTerm && (
                            <button
                              onClick={handleModalOpen}
                              className={`mt-4 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                                theme === 'dark'
                                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              <FiPlus className="w-4 h-4" />
                              Add First Parent
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((parent) => (
                      <tr key={parent.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                              theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
                            }`}>
                              <FiUser className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                            </div>
                            <div>
                              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {parent.parent_name}
                              </div>
                              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                ID: {parent.id.substring(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FiMail className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            <a 
                              href={`mailto:${parent.email}`}
                              className={`transition-colors hover:text-blue-600 ${
                                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                              }`}
                            >
                              {parent.email}
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FiPhone className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            {parent.phone_number ? (
                              <a 
                                href={`tel:${parent.phone_number}`}
                                className={`transition-colors hover:text-green-600 ${
                                  theme === 'dark' ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'
                                }`}
                              >
                                {parent.phone_number}
                              </a>
                            ) : (
                              <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>Not provided</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FiCalendar className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                              {formatDate(parent.created_at)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                theme === 'dark'
                                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                              }`}
                              title="View Details"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                theme === 'dark'
                                  ? 'bg-blue-900/30 hover:bg-blue-800/50 text-blue-400 hover:text-blue-300'
                                  : 'bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800'
                              }`}
                              title="Edit Parent"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                              className={`p-2 rounded-lg transition-colors ${
                                theme === 'dark'
                                  ? 'bg-red-900/30 hover:bg-red-800/50 text-red-400 hover:text-red-300'
                                  : 'bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800'
                              }`}
                              title="Delete Parent"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={`px-6 py-4 border-t ${
                theme === 'dark' ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg transition-colors ${
                        currentPage === 1
                          ? 'opacity-50 cursor-not-allowed'
                          : theme === 'dark'
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === pageNum
                              ? theme === 'dark'
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-600 text-white'
                              : theme === 'dark'
                                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg transition-colors ${
                        currentPage === totalPages
                          ? 'opacity-50 cursor-not-allowed'
                          : theme === 'dark'
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className={`mt-6 p-6 rounded-xl ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Quick Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {parents.length}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Parents
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 text-green-600 dark:text-green-400`}>
                  {parents.filter(p => p.email).length}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  With Email
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 text-blue-600 dark:text-blue-400`}>
                  {parents.filter(p => p.phone_number).length}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  With Phone
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 text-purple-600 dark:text-purple-400`}>
                  {Math.round(parents.filter(p => p.email && p.phone_number).length / parents.length * 100) || 0}%
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Complete Profiles
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Parents;