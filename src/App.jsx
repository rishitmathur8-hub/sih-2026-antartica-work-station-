import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HQOverviewPage from './pages/HQOverviewPage.jsx';
import StationsPage from './pages/StationsPage.jsx';
import StationDashboardPage from './pages/StationDashboardPage.jsx';
import StationDetailPage from './pages/StationDetailPage.jsx';
import AlertsPage from './pages/AlertsPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Command Center Application Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/overview" element={<HQOverviewPage />} />
                    <Route path="/dashboard" element={<StationDashboardPage />} />
                    <Route path="/stations" element={<StationsPage />} />
                    <Route path="/station/:id" element={<StationDetailPage />} />
                    <Route path="/alerts" element={<AlertsPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="*" element={<Navigate to="/overview" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
