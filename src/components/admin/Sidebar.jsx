import { NavLink } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';

const Sidebar = () => {
  const { theme } = useThemeStore();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition font-medium
     ${isActive
      ? 'bg-[#007698] text-white'
      : theme === 'light'
        ? 'hover:bg-gray-200 text-gray-700'
        : 'hover:bg-gray-700 text-gray-300'
    }`;

  return (
    <aside
      className={`w-64 p-4 shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}
    >
      <h2 className="text-xl font-bold mb-6 text-[#007698]">
        Admin Panel
      </h2>

      <nav className="space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/attendance" className={linkClass}>
          Attendance
        </NavLink>

        <NavLink to="/admin/all-students" className={linkClass}>
          All Students
        </NavLink>

        <NavLink to="/admin/assignments" className={linkClass}>
          Assignments
        </NavLink>

        <NavLink to="/admin/fees" className={linkClass}>
          Fees
        </NavLink>

        <NavLink to="/admin/remarks" className={linkClass}>
          Remarks
        </NavLink>
        <NavLink to="/admin/parents" className={linkClass}>
          Parents
        </NavLink>
        <NavLink to="/admin/subjects" className={linkClass}>
          Add subject
        </NavLink>
        <NavLink to="/admin/student-subjects" className={linkClass}>
          Assign subjects to Students
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
