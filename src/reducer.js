import dayjs from "dayjs";
import {
	HANDLE_ADD_EXPENSE,
	HANDLE_CLOSE_ADD,
	HANDLE_CLOSE_DELETE,
	HANDLE_CLOSE_EDIT,
	HANDLE_DELETE_EXPENSE,
	HANDLE_EDIT_EXPENSE,
	HANDLE_OPEN_ADD,
	HANDLE_OPEN_DELETE,
	HANDLE_OPEN_EDIT,
	HANDLE_REQUEST_SORT,
} from "./actions";

function reducer(state, action) {
	if (action.type === HANDLE_OPEN_ADD) {
		return {
			...state,
			modalAdd: true,
		};
	}
	if (action.type === HANDLE_CLOSE_ADD) {
		return {
			...state,
			modalAdd: false,
		};
	}
	if (action.type === HANDLE_OPEN_EDIT) {
		return {
			...state,
			modalEdit: true,
		};
	}
	if (action.type === HANDLE_CLOSE_EDIT) {
		return {
			...state,
			modalEdit: false,
		};
	}

	if (action.type === HANDLE_OPEN_DELETE) {
		return {
			...state,
			modalDelete: true,
		};
	}
	if (action.type === HANDLE_CLOSE_DELETE) {
		return {
			...state,
			modalDelete: false,
		};
	}

	if (action.type === HANDLE_ADD_EXPENSE) {
		let now = dayjs();

		return {
			...state,
			tableData: [
				...state.tableData,
				{
					type: action.payload.type,
					name: action.payload.name,
					amount: +action.payload.amount,
					date: now.format("MMMM-DD-YYYY / HH:mm:ss"),
					timestamp: now.unix(),
				},
			],
			modalAdd: false,
		};
	}

	if (action.type === HANDLE_EDIT_EXPENSE) {
		return {
			...state,
			tableData: state.tableData.map((item) => {
				if (item.timestamp === action.payload.timestamp) {
					return {
						...item,
						type: action.payload.type,
						name: action.payload.name,
						amount: +action.payload.amount,
					};
				}
				return item;
			}),
			modalEdit: false,
		};
	}
	if (action.type === HANDLE_DELETE_EXPENSE) {
		return {
			...state,
			tableData: state.tableData.filter(
				(expense) => expense.timestamp !== action.payload.timestamp
			),
			modalDelete: false,
		};
	}

	if (action.type === HANDLE_REQUEST_SORT) {
		const isAsc =
			state.orderBy === action.payload.property && state.order === "asc";

		return {
			...state,
			order: isAsc ? "desc" : "asc",
			orderBy: action.payload.property,
		};
	}

	return state;
}

export default reducer;
