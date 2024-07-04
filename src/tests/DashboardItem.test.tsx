import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import DashboardItem from '../components/DashboardItem';
import { deleteDashboardItem } from '../Api/Api';
import { BrowserRouter, Link } from 'react-router-dom';

jest.mock('../Api/Api', () => ({
  deleteDashboardItem: jest.fn(() => Promise.resolve()).mockResolvedValue(undefined),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

const routerWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);


test('renders dashboard item with dropdown menu and test delete function', async () => {
  const fetchData = jest.fn();
  const setItems = jest.fn();

  
  render(
    <DashboardItem
      title="Test Item"
      itemId={1014}
      dashboardId={11}
      fetchData={fetchData}
      setItems={setItems}
    >
      <div>Content</div>
    </DashboardItem>
  );

  const dropdownButton = screen.getByRole('img', { name: /menu/i });
  fireEvent.click(dropdownButton);

  const editMenuItem = screen.getByText('Edit');
  const deleteMenuItem = screen.getByText('Delete');

  expect(editMenuItem).toBeInTheDocument();
  expect(deleteMenuItem).toBeInTheDocument();

  fireEvent.click(deleteMenuItem);
  await waitFor(() => {
    const confirmButton = screen.getByText('Yes');
    fireEvent.click(confirmButton);
  });
  await waitFor(() => {
    expect(deleteDashboardItem).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(setItems).toHaveBeenCalledTimes(1);
  });
});


test('renders dashboard item with dropdown menu and tests update link', async () => {
  const fetchData = jest.fn();
  const setItems = jest.fn();

  render(
    <DashboardItem
      title="Test Item"
      itemId={123}
      dashboardId={11}
      fetchData={fetchData}
      setItems={setItems}
    >
      <div>Content</div>
    </DashboardItem>,
    { wrapper: routerWrapper }
  );

  const dropdownButton = screen.getByRole('img', { name: /menu/i });
  fireEvent.click(dropdownButton);
  const editMenuItem = await screen.findByText('Edit');
  const deleteMenuItem = await screen.findByText('Delete');

  expect(editMenuItem).toBeInTheDocument();
  expect(deleteMenuItem).toBeInTheDocument();

  fireEvent.click(editMenuItem);

  expect(Link).toHaveBeenCalledWith(
    expect.objectContaining({
      to: '/exploreTwo/11/123',
    }),
    {}
  );

});