import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	CssBaseline,
} from '@mui/material';

function App() {
	return (
		<Container>
			<CssBaseline />
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6'>Car Shop</Typography>
				</Toolbar>
			</AppBar>
		</Container>
	);
}

export default App;
