import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Navbar component', () => {
  render(<App />);

  const navbarElement = screen.getByRole('navigation');
  expect(navbarElement).toBeInTheDocument();
});

test('renders routes', () => {
  render(<App />);

  const dashboardLink = screen.getByText('Home');
  

  expect(dashboardLink).toBeInTheDocument();
 
});