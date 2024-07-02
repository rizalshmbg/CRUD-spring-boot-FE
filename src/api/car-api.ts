import axios from 'axios';
import { Car, CarResponse } from '../types';

// GET ALL CARS FUNC
export const getCars = async (): Promise<CarResponse[]> => {
	const resp = await axios(`${import.meta.env.VITE_API_URL}/api/cars`);

	return resp.data._embedded.cars;
};

// DELETE CAR FUNC
export const deleteCar = async (link: string): Promise<CarResponse> => {
	const resp = await axios.delete(link);
	return resp.data;
};

// ADD NEW CAR FUNC
export const addCar = async (car: Car): Promise<CarResponse> => {
	const resp = await axios.post(
		`${import.meta.env.VITE_API_URL}/api/cars`,
		car,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	return resp.data;
};
