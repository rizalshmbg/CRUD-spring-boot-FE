import { CarResponse } from '../types';
import axios from 'axios';

export const getCars = async (): Promise<CarResponse[]> => {
	const resp = await axios(`${import.meta.env.VITE_API_URL}/api/cars`);

	return resp.data._embedded.cars;
};
