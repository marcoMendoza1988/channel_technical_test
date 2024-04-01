import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TVSchedule from './index';
import { channels } from './model';

const mockStore = configureStore([]);

describe('TVSchedule', () => {
  test('renders TV schedule correctly', () => {
    const initialState = {
        channels: {
          channels: channels()
        },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <TVSchedule />
      </Provider>
    );

    const headingElement = screen.getByText(/CANALES/) as HTMLElement;
    expect(headingElement).toBeTruthy();

    const headingElement2 = screen.getByText(/CATEGORIAS/) as HTMLElement;
    expect(headingElement2).toBeTruthy();

    const headingElement3 = screen.getByText(/FAVORITOS/) as HTMLElement;
    expect(headingElement3).toBeTruthy();
  });
});
