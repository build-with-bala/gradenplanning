import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />

          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* Add more protected admin routes here */}
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
