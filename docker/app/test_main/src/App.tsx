import { useState } from 'react'
import User_Data from './api/User_Data.tsx'
import User_Details from './api/User_Details.tsx'
import Regit_User from './api/Regit_User.tsx'
import Regit_Cose from './api/Regit_Cose.tsx'

import Sidebar from './content/Sidebar.tsx'
import './assets/css/Main.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<User_Data />} />
            <Route path="/regit_user" element={<Regit_User />} />
            <Route path="/regit_cose" element={<Regit_Cose />} />
            <Route path="/userDetails/:id" element={<User_Details />} />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
