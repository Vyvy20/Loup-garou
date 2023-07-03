import { Navigate } from 'react-router-dom';
import Home from "./helpers/Pages/Home";

const MAP_ROUTES = [
  { path: '/', element: <Navigate to="/app" /> },
  {
    path: '/app',

    children: [
      { index: true, element: <Navigate to="/app/home" /> },
      { path: 'home', element: <Home /> },
    ],
  },
];
export default MAP_ROUTES;