import { render, screen } from '@testing-library/react';
import Question from '../../components/Question';

const mockQuestion = {
  "type": "range",
  "measure": [1,10],
  "question": "On a scale of 1-10, would you recommend Dr ${Doctor Last Name} to a friend or family member?",
  "help": "1 = Would not recommend, 10 = Would strongly recommend"
}

test('renders question', () => {
  render(<Question question={mockQuestion} />);
  const questionElement = screen.getByText(/would you recommend/i);
  expect(questionElement).toBeInTheDocument();
});
