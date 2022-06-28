import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import Home from './pages/Home';
import './styles/App.css';
import Navbar from './components/Navbar';
import EditProfile from './pages/EditProfile';

const App = () => {

  const navLinks = [
    {path: '/', name: 'Home', element: <Home/>, visible: true, default: true},
    {path: '/notes', name: 'Notes', element: <Notes/>, visible: true, default: false},
    {path: '/edit', name: 'Edit', element: <EditProfile/>, visible: true, default: false}
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar navLinks={navLinks}/>
        <Routes>
          {navLinks.map(page => <Route key={page.name} path={page.path} element={page.element}/>)}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;