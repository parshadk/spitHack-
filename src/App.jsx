import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import  ItemPage from './pages/ItemPage';
import Support from './pages/Support';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/items',element:<ItemPage/>},
  { path: '/support', element: <Support /> },
  { path: '/dashboard', element: <Dashboard /> },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}


export default App
