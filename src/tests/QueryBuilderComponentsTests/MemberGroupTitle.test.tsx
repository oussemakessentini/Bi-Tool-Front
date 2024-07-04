import React from 'react';
import { render, screen } from '@testing-library/react';
import MemberGroupTitle from '../../components/QueryBuilder/MemberGroupTitle';

describe('MemberGroupTitle', () => {
  it('renders the title correctly', () => {
    const title = 'Test Title';
    render(<MemberGroupTitle title={title} />);
    const titleLabel = screen.getByText(title);
    expect(titleLabel).toBeInTheDocument();
  });
});
