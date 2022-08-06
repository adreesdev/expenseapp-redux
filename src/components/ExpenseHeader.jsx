import {
	Box,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from "@mui/material";
import React from "react";
import { visuallyHidden } from "@mui/utils";
import { HANDLE_REQUEST_SORT } from "../actions";
import { connect } from "react-redux";

const headCells = [
	{
		id: "name",
		numeric: false,
		label: "Name",
	},
	{
		id: "type",
		numeric: false,
		label: "Type",
	},
	{
		id: "amount",
		numeric: false,
		label: "Amount",
	},
	{
		id: "timestamp",
		numeric: false,
		label: "Date",
	},
];

const ExpenseHeader = ({ order, orderBy, handleRequestSort }) => {
	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={() => handleRequestSort(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell>Actions</TableCell>
			</TableRow>
		</TableHead>
	);
};

const mapStateToProps = (store) => {
	return {
		order: store.order,
		orderBy: store.orderBy,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleRequestSort: (property) =>
			dispatch({ type: HANDLE_REQUEST_SORT, payload: { property } }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseHeader);
