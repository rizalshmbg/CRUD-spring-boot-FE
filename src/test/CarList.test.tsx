import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { describe, expect, test } from 'vitest';
import CarList from '../components/CarList';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const wrapper = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe('Car List test', () => {
	test('component renders', () => {
		render(<CarList />, { wrapper });
		expect(screen.getByText(/Loading/i)).toBeInTheDocument();
	});

	test('Cars are fetched', async () => {
		render(<CarList />, { wrapper });
		await waitFor(() => screen.getByText(/New Car/i));
		expect(screen.getByText(/Ford/i)).toBeInTheDocument();
	});

	test('Open new car modal', async () => {
		render(<CarList />, { wrapper });
		await waitFor(() => screen.getByText(/New Car/i));
		await userEvent.click(screen.getByText(/New Car/i));
		expect(screen.getByText(/Save/i)).toBeInTheDocument();
	});
});
