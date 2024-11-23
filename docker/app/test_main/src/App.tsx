import { useState } from 'react'
import User_Data from './api/User_Data.tsx'
import Sidebar from './content/Sidebar.tsx'
import './assets/css/Main.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <User_Data />
    </div>
  );
}

export default App;
