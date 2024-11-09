/* eslint-disable no-unused-vars */

import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import Itempage from './pages/Itempage';
import Support from './pages/Support';
import Dashboard from './pages/Dashboard';
import Help from './pages/Help';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/items', element: <Itempage /> },
  { path: '/help', element: <Help /> },
  { path: '/dashboard', element: <Dashboard /> },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}


export default App
