import { render, fireEvent, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe(HomePage, () => {
  it('should set the first button as active by default', () => {
    render(<HomePage />);
    //Use screen.getByText to select the button element by its text content
    const activeButton = screen.getByText('Active Tasks');
    expect(activeButton).toHaveClass('currentBtn');
  });

  it('should set the clicked button as active', () => {
    render(<HomePage />);
    //use screen.getByTestId to select the button element by its data-testid attribute
    const completedButton = screen.getByTestId('2');
    //simulate click event
    fireEvent.click(completedButton);
    //expect(...).toHaveClass to assert that the button now has the 'currentBtn' class
    expect(completedButton).toHaveClass('currentBtn');
  });
});
