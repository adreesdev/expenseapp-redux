import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { HANDLE_DELETE_EXPENSE } from "../actions";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
};
const DeleteExpense = ({ timestamp, deleteExpense }) => {
	return (
		<>
			<Box sx={style}>
				<Typography variant="h4">Delete Expense</Typography>

				<Box sx={{ mt: 3 }}>
					<Typography variant="h6">
						Are you sure you want to delete this expense?
					</Typography>
				</Box>
				<Box sx={{ mt: 3 }}>
					<Button
						variant="contained"
						color="error"
						onClick={() => deleteExpense(timestamp)}
					>
						Confirm
					</Button>
				</Box>
			</Box>
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteExpense: (timestamp) =>
			dispatch({ type: HANDLE_DELETE_EXPENSE, payload: { timestamp } }),
	};
};

export default connect(null, mapDispatchToProps)(DeleteExpense);
