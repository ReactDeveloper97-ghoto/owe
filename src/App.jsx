
import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Home from './pages/home/Home';
import About from './pages/about/About';
import Blog from './pages/blog/Blog';
import Login from './pages/loginportal/Login';
import Programs from './pages/programs/Programs';
import { useThemeStore } from './store/themeStore';
import ContactUs from './pages/contacts/ContactUs';
import Elementary from './pages/programs/Elementary';
import LateElementary from './pages/programs/LateElementary';
import MiddleSchool from './pages/programs/MiddleSchool';
import HighSchool from './pages/programs/HighSchool';
import Competitions from './pages/programs/Competitions';
import SummarSchool from './pages/programs/SummarSchool';
import Tutoring from './pages/programs/Tutoring';
import OnlineClasses from './pages/programs/OnlineClasses';


function App() {

  const { theme } = useThemeStore()
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/blog', element: <Blog /> },
    { path: '/login', element: <Login /> },
    { path: '/programs', element: <Programs /> },
    { path: '/programs/elementary', element: <Elementary /> },
    { path: '/programs/late-elementary', element: <LateElementary /> },
    { path: '/programs/middle-school', element: <MiddleSchool /> },
    { path: '/programs/high-school', element: <HighSchool /> },
    { path: '/programs/competitions', element: <Competitions /> },
    { path: '/programs/summar-school', element: <SummarSchool /> },
    { path: '/programs/tutoring', element: <Tutoring /> },
    { path: '/programs/online', element: <OnlineClasses /> },
    { path: '/contacts', element: <ContactUs /> },
  ])

  return (
    <div className={`${theme == 'dark' ? 'dark bg-gray-800 text-white' : 'bg-white text-black'} h-full`}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
