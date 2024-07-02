import {
	AppBar,
	Container,
	CssBaseline,
	Toolbar,
	Typography,
} from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CarList from './components/CarList';

const queryClient = new QueryClient();

function App() {
	return (
		<Container>
			<CssBaseline />
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6'>Car Shop</Typography>
				</Toolbar>
			</AppBar>
			<QueryClientProvider client={queryClient}>
				<CarList />
			</QueryClientProvider>
		</Container>
	);
}

export default App;
