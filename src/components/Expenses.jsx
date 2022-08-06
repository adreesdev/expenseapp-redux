import React from "react";
import { TableRow, TableCell, Button, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditExpense from "./EditExpense";
import DeleteExpense from "./DeleteExpense";
import { connect } from "react-redux";
import {
	HANDLE_CLOSE_DELETE,
	HANDLE_CLOSE_EDIT,
	HANDLE_OPEN_DELETE,
	HANDLE_OPEN_EDIT,
} from "../actions";

let timestamp;
let name, amount, type;

const Expenses = ({
	row,
	handleOpenDelete,
	handleOpenEdit,
	handleCloseEdit,
	handleCloseDelete,
	modalEdit,
	modalDelete,
}) => {
	let deleteEx = () => {
		handleOpenDelete();
		timestamp = row.timestamp;
	};
	let EditEx = () => {
		handleOpenEdit();
		name = row.name;
		amount = row.amount;
		type = row.type;
		timestamp = row.timestamp;
	};
	return (
		<>
			<TableRow hover tabIndex={-1}>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="left">{row.type}</TableCell>
				<TableCell align="left">{row.amount}</TableCell>
				<TableCell align="left">{row.date}</TableCell>
				<TableCell>
					<Button variant="contained" color="success" onClick={EditEx}>
						<EditIcon />
					</Button>
					<Modal
						open={modalEdit}
						onClose={() => handleCloseEdit()}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<EditExpense
							name={name}
							amount={amount}
							type={type}
							timestamp={timestamp}
						/>
					</Modal>
					&nbsp;
					<Button variant="contained" color="error" onClick={deleteEx}>
						<DeleteIcon />
					</Button>
					<Modal
						open={modalDelete}
						onClose={() => handleCloseDelete()}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<DeleteExpense timestamp={timestamp} />
					</Modal>
				</TableCell>
			</TableRow>
		</>
	);
};

const mapStateToProps = (store) => {
	return {
		modalEdit: store.modalEdit,
		modalDelete: store.modalDelete,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleOpenDelete: () => dispatch({ type: HANDLE_OPEN_DELETE }),
		handleCloseDelete: () => dispatch({ type: HANDLE_CLOSE_DELETE }),
		handleOpenEdit: () => dispatch({ type: HANDLE_OPEN_EDIT }),
		handleCloseEdit: () => dispatch({ type: HANDLE_CLOSE_EDIT }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
