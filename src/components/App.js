import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppointmentsPage from '../pages/Appointments';
import SurveyPage from '../pages/Survey';
import SuccessPage from '../pages/Success';

function App() {
  
  return (
    <div className="container tall root-container">
      <div className="section">
        <div className="title application-name">Appointments Manager</div>
        <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/appointments" />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/appointments/:appointmentId/surveys" element={<SurveyPage />} />
          <Route path="/appointments/:appointmentId/surveys/success" element={<SuccessPage />} />
        </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
