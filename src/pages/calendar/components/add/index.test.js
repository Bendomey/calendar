import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EventContext } from '../../index';
import { AddEvent } from './index';

function MockAddEvent() {
  return (
    <EventContext.Provider value={{ setEvents: jest.fn(), events: {} }}>
      <AddEvent isOpen={true} setIsOpen={jest.fn()} />
    </EventContext.Provider>
  );
}

describe('Add Event Component', () => {
  it("title input can't accept string more than 30 characters", () => {
    render(<MockAddEvent />);

    const titleInput = screen.getByPlaceholderText(/enter title/i);
    expect(titleInput).toBeVisible();
    const data =
      'Hello world. Testing if more than 30 characters can be entered here';
    userEvent.type(titleInput, data);
    expect(titleInput).not.toHaveValue(data);
  });
});
