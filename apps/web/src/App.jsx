import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AllEventsPage from './pages/AllEventsPage';
import SchedulePage from './pages/SchedulePage';
import EventDetailPage from './pages/EventDetailPage';
import SubmissionReviewPage from './pages/SubmissionReviewPage';
import ApprovedEventsPage from './pages/ApprovedEventsPage';
import RejectedEventsPage from './pages/RejectedEventsPage';
import HomeBannerPage from './pages/HomeBannerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/approved-events" element={<ApprovedEventsPage />} />
        <Route path="/admin/rejected-events" element={<RejectedEventsPage />} />
        <Route path="/admin/home-banner" element={<HomeBannerPage />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/jadwal" element={<SchedulePage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/admin/submission/:id" element={<SubmissionReviewPage />} />
      </Routes>
    </Router>
  )
}

export default App
