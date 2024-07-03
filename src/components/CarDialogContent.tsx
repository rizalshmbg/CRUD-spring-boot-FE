import { DialogContent, Stack, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { Car } from '../types';

type DialogFormProps = {
	car: Car;
	handleChangeInputCar: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CarDialogContent = ({ car, handleChangeInputCar }: DialogFormProps) => {
	return (
		<DialogContent>
			<Stack spacing={2} mt={1}>
				{/* BRAND */}
				<TextField
					label='Brand'
					name='brand'
					value={car.brand}
					onChange={handleChangeInputCar}
				/>

				{/* MODEL */}
				<TextField
					label='Model'
					name='model'
					value={car.model}
					onChange={handleChangeInputCar}
				/>

				{/* COLOR */}
				<TextField
					label='Color'
					name='color'
					value={car.color}
					onChange={handleChangeInputCar}
				/>

				{/* YEAR */}
				<TextField
					label='Year'
					name='modelYear'
					value={car.modelYear}
					onChange={handleChangeInputCar}
				/>

				{/* REGISTRATION NUMBER */}
				<TextField
					label='Registration Number'
					name='registrationNumber'
					value={car.registrationNumber}
					onChange={handleChangeInputCar}
				/>

				{/* PRICE */}
				<TextField
					label='Price'
					name='price'
					value={car.price}
					onChange={handleChangeInputCar}
				/>
			</Stack>
		</DialogContent>
	);
};

export default CarDialogContent;
