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
import SearchUser from './pages/SearchUser';
import api from './api';

import { usernameConst } from './constants';
import { useState } from 'react';
import ProfilePage from './pages/ProfilePage';

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
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Navbar username={username}></Navbar>
                <ProfilePage />
              </ProtectedRoute>
            }
            />
          <Route
            path="/searchUsers"
            element={
              <ProtectedRoute>
                <Navbar username={username}></Navbar>
                <SearchUser />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} setUser={getUserName} />
          <Route path='/logout' element={<Logout />} />
          
          <Route path='/register' element={<Register />} />
          <Route path='/createTweet' element={<CreateTweet />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
