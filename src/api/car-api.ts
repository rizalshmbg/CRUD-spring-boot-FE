import axios from 'axios';
import { Car, CarResponse } from '../types';
import { CarEntry } from './../types';

// GET ALL CARS FUNC
export const getCars = async (): Promise<CarResponse[]> => {
	const token = sessionStorage.getItem('jwt');

	const resp = await axios(`${import.meta.env.VITE_API_URL}/api/cars`, {
		headers: { Authorization: token },
	});

	return resp.data._embedded.cars;
};

// DELETE CAR FUNC
export const deleteCar = async (link: string): Promise<CarResponse> => {
	const token = sessionStorage.getItem('jwt');

	const resp = await axios.delete(link, {
		headers: { Authorization: token },
	});

	return resp.data;
};

// ADD NEW CAR FUNC
export const addCar = async (car: Car): Promise<CarResponse> => {
	const token = sessionStorage.getItem('jwt');

	const resp = await axios.post(
		`${import.meta.env.VITE_API_URL}/api/cars`,
		car,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		}
	);

	return resp.data;
};

// EDIT CAR FUNC
export const editCar = async (carEntry: CarEntry): Promise<CarResponse> => {
	const token = sessionStorage.getItem('jwt');

	const resp = await axios.patch(carEntry.url, carEntry.car, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

	return resp.data;
};
