import { Button, Snackbar, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import CarList from './CarList';

type User = {
	username: string;
	password: string;
};

const Login = () => {
	const [user, setUser] = useState<User>({
		username: '',
		password: '',
	});
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [openSnackBar, setOpenSnackBar] = useState(false);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleBtnLogin = async () => {
		try {
			const res = axios.post(`${import.meta.env.VITE_API_URL}/login`, user, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const jwtToken = (await res).headers.authorization;
			if (jwtToken !== null) {
				sessionStorage.setItem('jwt', jwtToken);
				setIsAuthenticated(true);
			}
		} catch (error) {
			console.error(error);
			setOpenSnackBar(true);
		}
	};

	if (isAuthenticated) {
		return <CarList />;
	} else {
		return (
			<Stack spacing={2} alignItems='center' mt={2}>
				<TextField
					name='username'
					label='Username'
					onChange={handleInputChange}
				/>
				<TextField
					type='password'
					name='password'
					label='Password'
					onChange={handleInputChange}
				/>
				<Button variant='outlined' color='primary' onClick={handleBtnLogin}>
					Login
				</Button>
				<Snackbar
					open={openSnackBar}
					autoHideDuration={3000}
					onClose={() => setOpenSnackBar(false)}
					message='Login failed: Please check your username and password!'
				/>
			</Stack>
		);
	}
};

export default Login;
