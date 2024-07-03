import EditIcon from '@mui/icons-material/Edit';
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	Tooltip,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { editCar } from '../api/car-api';
import { Car, CarEntry, CarResponse } from '../types';
import CarDialogContent from './CarDialogContent';

type FormProps = {
	carData: CarResponse;
};

const EditCar = ({ carData }: FormProps) => {
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

	const { mutate } = useMutation(editCar, {
		onSuccess: () => {
			queryClient.invalidateQueries(['cars']);
		},
		onError: (err) => {
			console.error(err);
		},
	});

	const handleOpenModal = () => {
		setCar({
			brand: carData.brand,
			model: carData.model,
			color: carData.color,
			registrationNumber: carData.registrationNumber,
			modelYear: carData.modelYear,
			price: carData.price,
		});
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleChangeInputCar = (e: ChangeEvent<HTMLInputElement>) => {
		setCar({ ...car, [e.target.name]: e.target.value });
	};

	const handleSaveCar = () => {
		const url = carData._links.car.href;
		const carEntry: CarEntry = { car, url };
		mutate(carEntry);
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
			<Tooltip title='Edit Car'>
				<IconButton aria-label='edit' size='small' onClick={handleOpenModal}>
					<EditIcon fontSize='small' />
				</IconButton>
			</Tooltip>
			<Dialog open={openModal} onClose={handleCloseModal}>
				<DialogTitle>Edit Car</DialogTitle>
				<CarDialogContent
					car={car}
					handleChangeInputCar={handleChangeInputCar}
				/>
				<DialogActions>
					<Button onClick={handleCloseModal}>Cancel</Button>
					<Button onClick={handleSaveCar}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default EditCar;
