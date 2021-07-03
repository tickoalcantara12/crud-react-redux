import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import NotFound from "./components/NotFound";
import ContactList from "./components/contact/ContactList";

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'contacts', element: <ContactList /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/contacts" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
