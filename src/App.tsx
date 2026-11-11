import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { AdminLogin } from './admin/pages/AdminLogin';
import { AdminLayout } from './admin/components/AdminLayout';
import { ProtectedRoute } from './admin/components/ProtectedRoute';
import { DashboardOverview } from './admin/pages/DashboardOverview';
import { ManageReviews } from './admin/pages/ManageReviews';
import { CustomerRatings } from './admin/pages/CustomerRatings';
import { ManageServices } from './admin/pages/ManageServices';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter basename="/ProjectMate">
          <Routes>
            {/* Public Website Route */}
            <Route path="/" element={<HomePage />} />

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Protected Dashboard Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardOverview />} />
              <Route path="reviews" element={<ManageReviews />} />
              <Route path="ratings" element={<CustomerRatings />} />
              <Route path="services" element={<ManageServices />} />
            </Route>

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
