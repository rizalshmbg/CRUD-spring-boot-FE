import { DialogContent } from '@mui/material';
import { ChangeEvent } from 'react';
import { Car } from '../types';

type DialogFormProps = {
	car: Car;
	handleChangeInputCar: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CarDialogContent = ({ car, handleChangeInputCar }: DialogFormProps) => {
	return (
		<DialogContent>
			{/* BRAND */}
			<input
				type='text'
				placeholder='Brand'
				name='brand'
				value={car.brand}
				onChange={handleChangeInputCar}
			/>
			<br />

			{/* MODEL */}
			<input
				type='text'
				placeholder='Model'
				name='model'
				value={car.model}
				onChange={handleChangeInputCar}
			/>
			<br />

			{/* COLOR */}
			<input
				type='text'
				placeholder='Color'
				name='color'
				value={car.color}
				onChange={handleChangeInputCar}
			/>
			<br />

			{/* YEAR */}
			<input
				type='number'
				placeholder='Year'
				name='modelYear'
				value={car.modelYear}
				onChange={handleChangeInputCar}
			/>
			<br />

			{/* REGISTRATION NUMBER */}
			<input
				type='text'
				placeholder='Registration Number'
				name='registrationNumber'
				value={car.registrationNumber}
				onChange={handleChangeInputCar}
			/>
			<br />

			{/* PRICE */}
			<input
				type='number'
				placeholder='Price'
				name='price'
				value={car.price}
				onChange={handleChangeInputCar}
			/>
		</DialogContent>
	);
};

export default CarDialogContent;
