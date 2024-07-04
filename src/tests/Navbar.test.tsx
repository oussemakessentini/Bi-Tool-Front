import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, } from 'react-router-dom';
import Navbar from '../components/Navbar';


const routerWrapper = ({ children }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );


test('renders navbar link dashboard', () => {
  render(
    
      <Navbar />,
      { wrapper: routerWrapper }
  );

  const dashboardLink = screen.getByText('Home');
  
  expect(dashboardLink).toBeInTheDocument();
  fireEvent.click(dashboardLink);

  expect(window.location.pathname).toBe('/home');
});
