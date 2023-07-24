import { render, screen } from '@testing-library/react';
import App from './components/App';

test('renders headline', () => {
  render(<App />);
  const headline = screen.getByText(/Appointments Manager/);
  expect(headline).toBeInTheDocument();
});
