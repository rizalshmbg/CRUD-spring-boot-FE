import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { addCar } from '../api/car-api';
import { Car } from '../types';
import CarDialogContent from './CarDialogContent';

const AddCar = () => {
	const queryClient = useQueryClient();

	const [openModal, setOpenModal] = useState(false);
	const [car, setCar] = useState<Car>({
		brand: '',
		model: '',
		color: '',
		registrationNumber: '',
		modelYear: 0,
		price: 0,
	});

	const { mutate } = useMutation(addCar, {
		onSuccess: () => {
			queryClient.invalidateQueries(['cars']);
		},
		onError: (err) => {
			console.error(err);
		},
	});

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleChangeInputCar = (e: ChangeEvent<HTMLInputElement>) => {
		setCar({ ...car, [e.target.name]: e.target.value });
	};

	const handleSaveCar = () => {
		mutate(car);
		setCar({
			brand: '',
			model: '',
			color: '',
			registrationNumber: '',
			modelYear: 0,
			price: 0,
		});
		handleCloseModal();
	};

	return (
		<>
			<button onClick={handleOpenModal}>New Car</button>
			<Dialog open={openModal} onClose={handleCloseModal}>
				<DialogTitle>New Car</DialogTitle>
				<CarDialogContent
					car={car}
					handleChangeInputCar={handleChangeInputCar}
				/>
				<DialogActions>
					<button onClick={handleCloseModal}>Cancel</button>
					<button onClick={handleSaveCar}>Save</button>
				</DialogActions>
			</Dialog>
		</>
	);
};
export default AddCar;
