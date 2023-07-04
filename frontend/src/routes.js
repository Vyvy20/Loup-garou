import { Navigate } from 'react-router-dom';
import Lobby from "./Pages/Lobby";
import Interface from './Pages/Interface';
import Game from './Pages/Game';

const MAP_ROUTES = [
  { path: '/', element: <Navigate to="/app" /> },
  {
    path: '/app',
    element: <Interface />,
    children: [
      { index: true, element: <Navigate to="/app/lobby" /> },
      { path: 'lobby', element: <Lobby /> },
      { path: 'game', element: <Game /> },
    ],
  },
];

export default MAP_ROUTES;