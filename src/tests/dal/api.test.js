import { getSurvey } from '../../dal/api';
import axios from 'axios';
import db from '../../../server/db.json';

jest.mock('axios');

test('gets the survey', async () => {
	axios.get.mockResolvedValue({data:db.resources});
	const survey = await getSurvey();
	expect(survey.Questions.length).toEqual(3);
})