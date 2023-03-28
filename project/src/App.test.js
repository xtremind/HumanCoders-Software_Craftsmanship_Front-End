import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('has ivysaur in it', async () => {
    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("ivysaur")).toBeInTheDocument();
  });
});
