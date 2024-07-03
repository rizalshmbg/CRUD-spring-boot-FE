import axios, { AxiosRequestConfig } from 'axios';
import { Car, CarResponse } from '../types';
import { CarEntry } from './../types';

// CONFIG FOR AXIOS
const getAxiosConfig = (): AxiosRequestConfig => {
	const token = sessionStorage.getItem('jwt');

	return {
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	};
};

// GET ALL CARS FUNC
export const getCars = async (): Promise<CarResponse[]> => {
	const resp = await axios(
		`${import.meta.env.VITE_API_URL}/api/cars`,
		getAxiosConfig()
	);

	return resp.data._embedded.cars;
};

// DELETE CAR FUNC
export const deleteCar = async (link: string): Promise<CarResponse> => {
	const resp = await axios.delete(link, getAxiosConfig());

	return resp.data;
};

// ADD NEW CAR FUNC
export const addCar = async (car: Car): Promise<CarResponse> => {
	const resp = await axios.post(
		`${import.meta.env.VITE_API_URL}/api/cars`,
		car,
		getAxiosConfig()
	);

	return resp.data;
};

// EDIT CAR FUNC
export const editCar = async (carEntry: CarEntry): Promise<CarResponse> => {
	const resp = await axios.patch(carEntry.url, carEntry.car, getAxiosConfig());

	return resp.data;
};
