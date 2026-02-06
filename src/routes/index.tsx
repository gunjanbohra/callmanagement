import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Layout } from '@/components/Layout';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Login } from '@/pages/Auth/Login';
import { SignUp } from '@/pages/Auth/SignUp';
import { ForgotPin } from '@/pages/Auth/ForgotPin';
import { Home } from '@/pages/Home';
import { CallManagement } from '@/pages/CallManagement';
import { PaymentDetails } from '@/pages/CallManagement/PaymentDetails';
import { CostBreakdown } from '@/pages/CallManagement/CostBreakdown';
import { PaymentPreview } from '@/pages/CallManagement/PaymentPreview';
import { PaymentConfirmation } from '@/pages/CallManagement/PaymentConfirmation';
import { PaymentSuccess } from '@/pages/CallManagement/PaymentSuccess';
import { EngineerReport } from '@/pages/Reports/EngineerReport';
import { OwnerDashboard } from '@/pages/OwnerDashboard';
import { UserSetup } from '@/pages/Setup/UserSetup';
import { CallImport } from '@/pages/Setup/CallImport';
import { CompanySetup } from '@/pages/Setup/CompanySetup';
import { authState } from '@/store/auth';

export function AppRouter() {
  const { isAuthenticated } = useRecoilValue(authState);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        } />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />
        } />
        <Route path="/forgot-pin" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <ForgotPin />
        } />

        {/* Root route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/owner-dashboard" element={<PrivateRoute><OwnerDashboard /></PrivateRoute>} />
          <Route path="/calls" element={<PrivateRoute><CallManagement /></PrivateRoute>} />
          <Route path="/payment-details" element={<PrivateRoute><PaymentDetails /></PrivateRoute>} />
          <Route path="/payment-amount" element={<PrivateRoute><CostBreakdown /></PrivateRoute>} />
          <Route path="/payment-preview" element={<PrivateRoute><PaymentPreview /></PrivateRoute>} />
          <Route path="/payment-confirmation" element={<PrivateRoute><PaymentConfirmation /></PrivateRoute>} />
          <Route path="/payment-success" element={<PrivateRoute><PaymentSuccess /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><EngineerReport /></PrivateRoute>} />
          
          {/* Setup routes */}
          <Route path="/setup/company" element={<PrivateRoute><CompanySetup /></PrivateRoute>} />
          <Route path="/setup/users" element={<PrivateRoute><UserSetup /></PrivateRoute>} />
          <Route path="/setup/calls" element={<PrivateRoute><CallImport /></PrivateRoute>} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}