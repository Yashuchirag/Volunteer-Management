import { render, screen } from '@testing-library/react';
import Homepage from './homepage.js';

describe('Homepage Component', () => {
  const mockEvents = [
    {
      name: 'Pilot Event',
      description: 'Getting the event started for Volunteers Management platform',
      date: '04/10/2024',
      time: '9:00 pm',
      volunteersNeeded: 4
    },
    {
      name: 'Second Event',
      description: 'Second big event',
      date: '05/10/2024',
      time: '10:00 am',
      volunteersNeeded: 2
    }
  ];

  test('renders Homepage with user and events', () => {
    render(<Homepage user="JohnDoe" events={mockEvents} />);

    // Check for welcome message
    const welcomeMessage = screen.getByText(/Welcome, JohnDoe!/);
    expect(welcomeMessage).toBeInTheDocument();

    // Check for table headers
    expect(screen.getByText('Event Name')).toBeInTheDocument();
    expect(screen.getByText('Event Description')).toBeInTheDocument();
    expect(screen.getByText('Event Date')).toBeInTheDocument();
    expect(screen.getByText('Event Time')).toBeInTheDocument();
    expect(screen.getByText('Volunteers needed')).toBeInTheDocument();

    // Check for correct number of events
    const rows = screen.getAllByRole('row');
    // Including header row, so should be mockEvents.length + 1
    expect(rows).toHaveLength(mockEvents.length + 1);
  });

  test('event details are correct', () => {
    render(<Homepage user="JohnDoe" events={mockEvents} />);

    // Check for first event's details
    const eventName = screen.getByText('Pilot Event');
    const eventDescription = screen.getByText('Getting the event started for Volunteers Management platform');
    const eventDate = screen.getByText('04/10/2024');
    const eventTime = screen.getByText('9:00 pm');
    const volunteersNeeded = screen.getByText('4');

    expect(eventName).toBeInTheDocument();
    expect(eventDescription).toBeInTheDocument();
    expect(eventDate).toBeInTheDocument();
    expect(eventTime).toBeInTheDocument();
    expect(volunteersNeeded).toBeInTheDocument();
  });
});
