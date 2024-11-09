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
import Help from './pages/Help';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/items', element: <Itempage /> },
  { path: '/support', element: <Support /> },
  { path: '/help', element: <Help /> },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}


export default App
