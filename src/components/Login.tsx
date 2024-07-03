import { Button, Stack, TextField } from '@mui/material';
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

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleBtnLogin = () => {
		axios
			.post(`${import.meta.env.VITE_API_URL}/login`, user, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				const jwtToken = res.headers.authorization;
				if (jwtToken !== null) {
					sessionStorage.setItem('jwt', jwtToken);
					setIsAuthenticated(true);
				}
			})
			.catch((err) => console.error(err));
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
			</Stack>
		);
	}
};

export default Login;
