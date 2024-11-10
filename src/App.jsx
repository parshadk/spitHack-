/* eslint-disable no-unused-vars */

import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import  ItemPage from './pages/Itempage';
import Dashboard from './pages/Dashboard';
import Achievements from './pages/Achievements';
import Ngodonations from './pages/Ngodonations';
import Crowdfunding from './pages/Crowdfunding';
import Chatbot from './pages/Chatbot';
import Documentation from './pages/Documentation';
import About from './pages/About';
import Account from './pages/Account';
import Help from './pages/Help';
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/items', element: <ItemPage /> },
  { path: '/help', element: <Help /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/achievements', element: <Achievements /> },
  { path: '/donations', element: <Ngodonations /> },
  { path: '/crowdfunding', element: <Crowdfunding /> },
  { path: '/chatbot', element: <Chatbot /> },
  { path: '/docs', element: <Documentation /> },
  { path: '/about', element: <About /> },
  { path: '/account', element: <Account /> },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}


export default App
