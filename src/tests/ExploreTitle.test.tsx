import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExploreTitle from '../components/ExploreTitle';
import { createMemoryHistory } from 'history';

test('renders ExploreTitle component', () => {
    const history = createMemoryHistory();
  render(
    <MemoryRouter>
      <ExploreTitle itemTitle="Example Item" />
    </MemoryRouter>
  );

  
  const exploreTitleElements = screen.queryAllByText((content, element) => {
    const hasDashboardText = element.textContent.includes('Dashboard');
    const hasItemText = element.textContent.includes('Example Item');
    return hasDashboardText && hasItemText;
  });
  const exploreTitle = screen.getByText('Example Item');
  const dashboard = screen.getByText('Dashboard');
  expect(dashboard).toBeInTheDocument();
  expect(exploreTitle).toBeInTheDocument();
  
  expect(exploreTitleElements.length).toBeGreaterThan(0);
  fireEvent.click(dashboard);
  expect(history.location.pathname).toBe("/");
});
