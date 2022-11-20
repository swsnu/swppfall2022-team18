import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export interface UserClothType {
	id: number;
	name: string;
	image_id: string;
	user: number;
	color: string;
	type: string;
	pattern: string;
}
export interface TodayOutfitType {
	id: number;
	outfit_info: string;
	outfit_name: string
	popularity: number;
	image_id: string;
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
		const response = await axios.get('/api/ooo/outift/today/')
		if(response.status === 200){
			return response.data
		}
		else return null

		
	}
)

export const createUserCloth = createAsyncThunk(
	"closet/createUserCloth",
	async (
		td: Pick<UserClothType, "name" | "image_id" | "color" | "type" | "pattern">,
		{ dispatch }
	) => {
		const response = await axios.post("/api/ooo/closet/", td);
		dispatch(userClothActions.createUserCloth(response.data));
	}
);

// export const editUserCloth = createAsyncThunk(
// 	"closet/editUserCloth",
//     async (td: Pick<UserClothType, "title" | "content">, { dispatch }) => {
//         const response = await axios.put(`/api/ooo/closet/${id}/`, td);
//         dispatch(userClothActions.editUserCloth(response.data));
//     }
// );

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
		deleteUserCloth: (state, action: PayloadAction<{ targetId: number }>) => {
			const deleted = state.userClothes.filter((userCloth) => {
				return userCloth.id !== action.payload.targetId;
			});
			state.userClothes = deleted;
		},
		createUserCloth: (
			state,
			action: PayloadAction<{
				id: number;
				name: string;
				image_id: string;
				user: number;
				color: string;
				type: string;
				pattern: string;
			}>
		) => {
			const newUserCloth = {
				id: state.userClothes[state.userClothes.length - 1].id + 1, // temporary
				name: action.payload.name,
				image_id: action.payload.image_id,
				user: action.payload.user,
				color: action.payload.color,
				type: action.payload.type,
				pattern: action.payload.pattern,
			};
			state.userClothes.push(newUserCloth);
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
