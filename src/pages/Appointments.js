import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { useNavigate } from 'react-router-dom';
import { getAppointments } from '../dal/api';

function Appointments() {
	const [appointments, setAppointments] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const loadAppointments = async () => setAppointments(await getAppointments());
		loadAppointments();
	}, []);
	const handleFeedbackClick = ev => {
		navigate(`${ev.target.dataset.id}/surveys`);
	};
	return (
		<div>
      <div className="subtitle">Appointments</div>
			<div>
				{appointments.map(entry => {
					const appt = entry.resource;
					return (
						<div key={appt.id}>
							Type: {appt.type[0].text}<br />
							Status: {appt.status}<br />
							When: {dateFormat(new Date(appt.period.start), 'mmmm d, yyyy H:MM')}-{dateFormat(appt.period.end, 'H:MM')}<br />
							<button onClick={handleFeedbackClick} data-id={appt.id}>Provide Feedback</button>
						</div>
					)
				})}
			</div>
		</div>
	);
}

export default Appointments;