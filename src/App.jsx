import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HQOverviewPage from './pages/HQOverviewPage.jsx';
import StationsPage from './pages/StationsPage.jsx';
import StationDashboardPage from './pages/StationDashboardPage.jsx';
import StationDetailPage from './pages/StationDetailPage.jsx';
import AlertsPage from './pages/AlertsPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main Application Routes Wrapped inside Layout Shell */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<HQOverviewPage />} />
                <Route path="/stations" element={<StationsPage />} />
                <Route path="/dashboard" element={<StationDashboardPage />} />
                <Route path="/station/:id" element={<StationDetailPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
