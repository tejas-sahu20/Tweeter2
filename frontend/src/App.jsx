import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from './pages/Home';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreateTweet from './components/CreateTweet';
import {CssBaseline} from '@mui/material'
import Navbar from './components/Navbar';
import api from './api';
import { useState } from 'react';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function ReturnAndLogout() {
  localStorage.clear();
  return <Register />;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  const[username,setUsername]=useState('')  
  const getUserName=async()=>{
    try{
      console.log('ran')
      const resp=await api.get('/api/user/username')
      console.log(resp.data)
      setUsername(resp.data.username);
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getUserName()
  },[])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Navbar username={username}></Navbar>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} setUser={getUserName} />
          <Route path='/register' element={<Register />} />
          <Route path='/createTweet' element={<CreateTweet />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
