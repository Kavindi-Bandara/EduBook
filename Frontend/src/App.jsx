import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './assets/Signup.jsx';
import LogIn from './assets/LogIn.jsx';
import DashBoard from './assets/DashBoard.jsx';
import Layout from './assets/Layout.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/DashBoard" element={
          <Layout>
            <DashBoard/>
          </Layout>
        }/>
      </Routes>
    </Router>
  )
}