import { CarResponse } from '../types';
import axios from 'axios';

// GET ALL CARS FUNC
export const getCars = async (): Promise<CarResponse[]> => {
	const resp = await axios(`${import.meta.env.VITE_API_URL}/api/cars`);

	return resp.data._embedded.cars;
};

export const deleteCar = async (link: string): Promise<CarResponse> => {
	const resp = await axios.delete(link);
	return resp.data;
};
