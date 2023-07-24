import axios from 'axios';

const baseUrl = 'http://localhost:3001';
const resourcesUrl = `${baseUrl}/resources`

const getResourcetype = (type, response) => {
	return response.entry.filter(entry => entry.resource.resourceType === type);
}
const getAppointments = async patientId => {
	const response = await axios.get(resourcesUrl);
	return getResourcetype('Appointment', response.data);
}
const getAppointment = async id => {
	const response = await axios.get(resourcesUrl);
	return getResourcetype('Appointment', response.data).find(appointment => appointment.resource.id === id).resource;
}
const getSurvey = async () => {
	const response = await axios.get(resourcesUrl);
	return getResourcetype('Survey', response.data)[0].resource;
}
const getPatient = async id => {
	const response = await axios.get(resourcesUrl);
	return getResourcetype('Patient', response.data).find(patient => patient.resource.id === id).resource;
}
const getDoctor = async id => {
	const response = await axios.get(resourcesUrl);
	return getResourcetype('Doctor', response.data).find(doctor => doctor.resource.id === id).resource;
}
const getDiagnosis = async appointmentId => {
	const response = await axios.get(resourcesUrl);
	return getResourcetype('Diagnosis', response.data)
					.find(diagnosis => diagnosis.resource.appointment.reference.split('/')[1] === appointmentId).resource;
}
const setSurveyAnswers = async (answers, surveyId, appointmentId) => {
	/*const surveyAnswers = {
		resource: {
			id: crypto.randomUUID(),
			resourceType: 'Answers',
			surveyId,
			appointmentId,
			answers
		}
	}*/
	//const response = await axios.post(`${baseUrl}/resources`, surveyAnswers);
}
export { getAppointments, getSurvey, getAppointment, setSurveyAnswers, getPatient, getDoctor, getDiagnosis };
