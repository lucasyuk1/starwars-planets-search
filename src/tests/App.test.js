import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ContextProvider from '../context/ContextProvider';
import mockPlanets from './mock/data';

test('Filtra por nome', () => {
  render(
    <ContextProvider>
      <App />
    </ContextProvider>,
  );

  const input = screen.getByTestId('name-filter');
  userEvent.type(input, 'aa');
});

test('Filtra por coluna ', () => {
  render(
    <ContextProvider>
      <App />
    </ContextProvider>,
  );
  const input = screen.getByTestId('column-filter');
  userEvent.selectOptions(input, 'population');
  const filterBtn = screen.getByTestId('button-filter');
  userEvent.click(filterBtn);
});

test('Testa multiplos filtros', () => {
  render(
    <ContextProvider>
      <App />
    </ContextProvider>,
  );

  const columnFilter = screen.getByTestId('column-filter');
  userEvent.selectOptions(columnFilter, 'diameter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(comparisonFilter, 'menor que');
  const valueFilter = screen.getByTestId('value-filter');
  userEvent.type(valueFilter, '2000');
  const filterBtn = screen.getByTestId('button-filter');
  userEvent.click(filterBtn);

  const columnFilter2 = screen.getByTestId('column-filter');
  userEvent.selectOptions(columnFilter2, 'population');
  const comparisonFilter2 = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(comparisonFilter2, 'maior que');
  const valueFilter2 = screen.getByTestId('value-filter');
  userEvent.type(valueFilter2, '5000');
  const filterBtn2 = screen.getByTestId('button-filter');
  userEvent.click(filterBtn2);

  const removeBtn = screen.getAllByTestId('filter');
  userEvent.click(removeBtn[0]);

  const removeAllBtn = screen.getByTestId('button-remove-filters');
  userEvent.click(removeAllBtn);
});

test('Testa as opcoes > e igual a', () => {
  render(
    <ContextProvider>
      <App />
    </ContextProvider>,
  );

  const columnFilter = screen.getByTestId('column-filter');
  userEvent.selectOptions(columnFilter, 'diameter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  const valueFilter = screen.getByTestId('value-filter');
  userEvent.type(valueFilter, '3000');
  const filterBtn = screen.getByTestId('button-filter');
  userEvent.click(filterBtn);

  const columnFilter2 = screen.getByTestId('column-filter');
  userEvent.selectOptions(columnFilter2, 'population');
  const comparisonFilter2 = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(comparisonFilter2, 'igual a');
  const valueFilter2 = screen.getByTestId('value-filter');
  userEvent.type(valueFilter2, '60000');
  const filterBtn2 = screen.getByTestId('button-filter');
  userEvent.click(filterBtn2);
});

test('Testa a opção >', () => {
  render(
    <ContextProvider>
      <App />
    </ContextProvider>,
  );
  const columnFilter = screen.getByTestId('column-filter');
  userEvent.selectOptions(columnFilter, 'diameter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  const valueFilter = screen.getByTestId('value-filter');
  userEvent.type(valueFilter, '5000');
  const filterBtn = screen.getByTestId('button-filter');
  userEvent.click(filterBtn);

  const columnFilter2 = screen.getByTestId('column-filter');
  userEvent.selectOptions(columnFilter2, 'population');
  const comparisonFilter2 = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(comparisonFilter2, 'maior que');
  const valueFilter2 = screen.getByTestId('value-filter');
  userEvent.type(valueFilter2, '100000');
  const filterBtn2 = screen.getByTestId('button-filter');
  userEvent.click(filterBtn2);
});

test('Testa ordenação', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockPlanets),
  });

  render(
    <ContextProvider>
      <App />
    </ContextProvider>,
  );

  await screen.findByRole('cell', {
    name: /tatooine/i,
  });

  const sortDescInput = screen.getByRole('radio', {
    name: /sortDesc/i,
  });

  const sortAscInput = screen.getByRole('radio', {
    name: /sortAsc/i,
  });
  const sortBtn = screen.getByRole('button', {
    name: /sort/i,
  });

  userEvent.click(sortDescInput);
  userEvent.click(sortBtn);

  screen.getAllByRole('row');
  screen.getAllByRole('cell');

  userEvent.click(sortAscInput);
  userEvent.click(sortBtn);

  screen.getAllByRole('row');
  screen.getAllByRole('cell');
});
