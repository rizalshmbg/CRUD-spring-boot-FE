import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCars, deleteCar } from '../api/car-api';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { Snackbar } from '@mui/material';
import { useState } from 'react';

const CarList = () => {
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const queryClient = useQueryClient();

	const { data, error, isSuccess } = useQuery({
		queryKey: ['cars'],
		queryFn: getCars,
	});

	const { mutate } = useMutation(deleteCar, {
		onSuccess: () => {
			setOpenSnackbar(true);
			queryClient.invalidateQueries({ queryKey: ['cars'] });
		},
		onError: (err) => {
			console.error(err);
		},
	});

	const columns: GridColDef[] = [
		{ field: 'brand', headerName: 'Brand', width: 170 },
		{ field: 'model', headerName: 'Model', width: 170 },
		{ field: 'color', headerName: 'Color', width: 170 },
		{
			field: 'registrationNumber',
			headerName: 'Registration Number',
			width: 170,
		},
		{ field: 'modelYear', headerName: 'Model Year', width: 150 },
		{ field: 'price', headerName: 'Price', width: 150 },
		{
			field: 'delete',
			headerName: '',
			width: 90,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: (params: GridCellParams) => (
				<button
					onClick={() => {
						if (
							window.confirm(
								`Are you sure you want delete the car ${params.row.brand} ${params.row.model}`
							)
						) {
							mutate(params.row._links.car.href);
						}
					}}
				>
					Delete
				</button>
			),
		},
	];

	if (!isSuccess) {
		return <span>Loading...</span>;
	} else if (error) {
		return <span>Error when fetching cars...</span>;
	} else {
		return (
			<>
				<DataGrid
					rows={data}
					columns={columns}
					getRowId={(row) => row._links.self.href}
					disableRowSelectionOnClick={true}
				/>
				<Snackbar
					open={openSnackbar}
					autoHideDuration={2000}
					onClose={() => setOpenSnackbar(false)}
					message='Car deleted'
				/>
			</>
		);
	}
};

export default CarList;
