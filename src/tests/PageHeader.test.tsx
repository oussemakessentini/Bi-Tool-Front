import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for additional matchers
import PageHeader from '../components/PageHeader';

test('renders PageHeader component', () => {
  
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  
  render(
    <PageHeader
          title="Page Title"
          button={<button>Submit</button>} noBoreder={undefined}    />
  );

  
  const pageTitle = screen.getByText('Page Title');
  const submitButton = screen.getByText('Submit');
  
  expect(pageTitle).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
