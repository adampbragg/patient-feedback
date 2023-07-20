import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSurvey, setSurveyAnswers, getAppointment, getPatient, getDoctor, getDiagnosis } from '../dal/api';
import { useInterpolate } from '../hooks/useInterpolate';
import { interpolationKeyMappings } from '../consts/interpolationKeyMappings';
import Question from '../components/Question';
import Review from '../components/Review'

function Survey() {
	const [survey, setSurvey] = useState({Questions:[]});
	const [currentQuestion, setCurrentQuestion] = useState({});
	const [answers, setAnswers] = useState([]);
	const [appointment, setAppointment] = useState({});
	const [patient, setPatient] = useState();
	const [doctor, setDoctor] = useState();
	const [diagnosis, setDiagnosis] = useState();
	const { appointmentId } = useParams();
	const navigate = useNavigate();

	const loadNextQuestion = index => {
		let nextQuestion = survey.Questions[index];
		setCurrentQuestion(nextQuestion);
	}

	const interpolate = useInterpolate(interpolationKeyMappings);

	useEffect(() => {
		const loadSurvey = async () => setSurvey(await getSurvey());
		loadSurvey();
		const loadAppointment = async id => setAppointment(await getAppointment(id));
		loadAppointment(appointmentId);
	}, []);

	useEffect(() => {
		if(appointment.id) {
			const loadPatient = async patientId => setPatient(await getPatient(patientId));
			loadPatient(appointment.subject.reference.split('/')[1]);
			const loadDoctor = async doctorId => setDoctor(await getDoctor(doctorId));
			loadDoctor(appointment.actor.reference.split('/')[1]);
			const loadDiagnosis = async appointmentId => setDiagnosis(await getDiagnosis(appointmentId));
			loadDiagnosis(appointment.id)
		}
	}, [appointment]);

	useEffect(() => (loadNextQuestion(0)), [survey]);

	useEffect(() => {
		if(survey?.Questions && patient?.id && doctor?.id && diagnosis?.id) {
			const interpolationValues = {
				doctor,
				patient,
				diagnosis
			}
			const newSurvey = { ...survey };
			newSurvey.Questions.map(question => {
				question.question = interpolate(question.question, interpolationValues);
				return question;
			});
		}
	}, [survey, patient, doctor, diagnosis]);



	const handleAnswer = answer => {
		const newAnswers = answers.slice();
		const nextAnswerIndex = answers.length;
		newAnswers.push(answer);
		setAnswers(newAnswers);
		loadNextQuestion(newAnswers.length);
	}

	const handleConfirmation = () => {
		setSurveyAnswers(answers, survey.id, appointment.id);
		navigate('success')
	}

	return (
		<div>
      <div className="subtitle">Hi {patient && patient.name[0].given[0]}, please tell us about your appointment.</div>
			<div>
				{currentQuestion && <Question question={currentQuestion} answerHandle={handleAnswer} />}
				{!currentQuestion && answers.length && <Review questions={survey.Questions} answers={answers} confirmationHandler={handleConfirmation} />}
			</div>
		</div>
	);
}

export default Survey;