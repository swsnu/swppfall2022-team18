import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
export interface UserClothType {
	id: number;
	name: string;
	image_link: string;
	user: number;
	color: string;
	type: string;
	pattern: string;
	dates: string;
}
export interface TodayOutfitType {
	id: number;
	outfit_info: string;
	outfit_name: string
	popularity: number;
	image_link: string;
	userClothes: UserClothType[]
}

export interface UserClothState {
	userClothes: UserClothType[];
	selectedUserCloth: UserClothType | null;
	recommendOutfit: TodayOutfitType | null;
}

const initialState: UserClothState = {
	userClothes: [],
	selectedUserCloth: null,
	recommendOutfit: null
};

const headers = {
	username: localStorage.getItem("username"),
};

export const fetchUserClothes = createAsyncThunk(
	"closet/fetchUserClothes",
	async () => {
		const response = await axios.get<UserClothType[]>("/api/ooo/closet/");
		return response.data;
	}
);

export const fetchUserCloth = createAsyncThunk(
	"closet/fetchUserCloth",
	async (id: UserClothType["id"]) => {
		const response = await axios.get(`/api/ooo/closet/${id}/`);
		return response.data ?? null;
	}
);

export const fetchRecommendOutfit = createAsyncThunk(
	"outfit/today",
	async () => {
		const response = await axios.get('/api/ooo/outfit/today/')
		if(response.status === 200){
			return response.data
		}
		else return null
	}
)

export const createUserCloth = createAsyncThunk(
	"closet/createUserCloth",
	async (
		data: Pick<UserClothType, "name" | "image_link" | "color" | "type" | "pattern">,
		{ dispatch }
	) => {
		const response = await axios.post(
			"/api/ooo/closet/",
			{
				headers,
				body: data
			}
		);
		dispatch(userClothActions.createUserCloth(response.data));
		// console.log(response.data);
		// return response.data;
	}
);

export const editUserCloth = createAsyncThunk(
	"closet/editUserCloth",
    async (
		data: Pick<UserClothType, "id" | "color" | "type" | "pattern">,
		{ dispatch }
	) => {
        const response = await axios.put(
			`/api/ooo/closet/${data.id}/`,
			{
				headers,
				body: data
			}
		);
        dispatch(userClothActions.editUserCloth(response.data));
    }
);

export const addWearDate = createAsyncThunk(
	"closet/addWearDate",
    async (
		data: Pick<UserClothType, "id" | "dates">,
		{ dispatch }
	) => {
        const response = await axios.post(
			`/api/ooo/closet/${data.id}/`,
			{
				headers,
				body: data
			}
		);
        dispatch(userClothActions.addWearDate(response.data));
    }
);

export const deleteUserCloth = createAsyncThunk(
	"closet/deleteUserCloth",
	async (id: UserClothType["id"], { dispatch }) => {
		await axios.delete(`/api/ooo/closet/${id}/`);
		dispatch(userClothActions.deleteUserCloth({ targetId: id }));
	}
);

export const userClothSlice = createSlice({
	name: "userClothes",
	initialState,
	reducers: {
		// getAll: (state, action: PayloadAction<{ userClothes: UserClothType[] }>) => {},
		// getUserCloth: (state, action: PayloadAction<{ targetId: number }>) => {
		// 	const target = state.userClothes.find(
		// 		(td) => td.id === action.payload.targetId
		// 	);
		// 	state.selectedUserCloth = target ?? null;
		// },
		createUserCloth: (
			state,
			action: PayloadAction<{
				id: number;
				name: string;
				image_link: string;
				user: number;
				color: string;
				type: string;
				pattern: string;
				dates: string;
			}>
		) => {
			const newUserCloth = {
				id: state.userClothes[state.userClothes.length - 1].id + 1, // temporary
				name: action.payload.name,
				image_link: action.payload.image_link,
				user: action.payload.user,
				color: action.payload.color,
				type: action.payload.type,
				pattern: action.payload.pattern,
				dates: ""
			};
			state.userClothes.push(newUserCloth);
		},
		editUserCloth: (
			state,
			action: PayloadAction<{
				targetId: number
				name: string;
				image_link: string;
				user: number;
				color: string;
				type: string;
				pattern: string;
			}>
		) => {
			const fetchTargetItem = state.userClothes.filter((userCloth) => {
				console.log(userCloth)
				// return userCloth.id == action.payload.targetId;
			});
			state.userClothes = fetchTargetItem;
			// const editedUserCloth = {
			// 	id: state.userClothes[state.userClothes.length - 1].id + 1, // temporary
			// 	name: action.payload.name,
			// 	image_link: action.payload.image_link,
			// 	user: action.payload.user,
			// 	color: action.payload.color,
			// 	type: action.payload.type,
			// 	pattern: action.payload.pattern,
			// };
			// state.userClothes.
		},
		deleteUserCloth: (state, action: PayloadAction<{ targetId: number }>) => {
			const deleted = state.userClothes.filter((userCloth) => {
				return userCloth.id !== action.payload.targetId;
			});
			state.userClothes = deleted;
		},
		addWearDate: (
			state,
			action: PayloadAction<{
				targetId: number;
				weardate: string;
			}>
		) => {
			// const newWearDate = {
			// 	// id: state.userClothes[state.userClothes.length - 1].id + 1, // temporary
			// 	date: action.payload.weardate,
			// };
			// const targetItem = state.userClothes.filter((userCloth) => {
			// 	return userCloth.id === action.payload.targetId;
			// }
			// state.userClothes.push(action.payload.weardate);
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchUserClothes.fulfilled, (state, action) => {
			// Add user to the state array
			state.userClothes = action.payload;
		});
		builder.addCase(fetchUserCloth.fulfilled, (state, action) => {
			state.selectedUserCloth = action.payload;
		});
		builder.addCase(createUserCloth.rejected, (_state, action) => {
			console.error(action.error);
		});
		builder.addCase(fetchRecommendOutfit.fulfilled, (state, action) => {
			state.recommendOutfit = action.payload;
		})
	},
});

export const userClothActions = userClothSlice.actions;
export const selectUserCloth = (state: RootState) => state.userCloth;

export default userClothSlice.reducer;
