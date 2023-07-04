import { Navigate } from 'react-router-dom';
import Lobby from "./Pages/Lobby";
import Interface from './Pages/Interface';

const MAP_ROUTES = [
  { path: '/', element: <Navigate to="/app" /> },
  {
    path: '/app',
    element: <Interface />,
    children: [
      { index: true, element: <Navigate to="/app/home" /> },
      { path: 'home', element: <Lobby /> },
    ],
  },
];

export default MAP_ROUTES;