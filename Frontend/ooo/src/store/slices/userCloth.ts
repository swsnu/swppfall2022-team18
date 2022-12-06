import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
export interface UserClothType {
	id: number;
	name: string;
	image_link: string;
	color: string;
	type: string;
	pattern: string;
	// user: number;
	dates: string;
}
export interface TempUserClothType {
	id: number;
	name: string;
	image: File;
	user: number;
	color: string;
	type: string;
	pattern: string;
	dates: string;
}
export interface TodayOutfitType {
	id: number;
	outfit_info: string;
	popularity: number;
	image_link: string;
	userclothes: UserClothType[];
}

export interface UserClothState {
	userClothes: UserClothType[];
	selectedUserCloth: UserClothType | null;
	recommendOutfit: TodayOutfitType | null;
}

const initialState: UserClothState = {
	userClothes: [],
	selectedUserCloth: null,
	recommendOutfit: null,
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
		const response = await axios.get("/api/ooo/outfit/today/");
		if (response.status === 200) {
			return response.data;
		} else return null;
	}
);

export const createUserCloth = createAsyncThunk(
	"closet/createUserCloth",
	async (
		data: Pick<
			TempUserClothType,
			"name" | "image" | "color" | "type" | "pattern"
		>,
		{ dispatch }
	) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("image", data.image);
		formData.append("color", data.color);
		formData.append("type", data.type);
		formData.append("pattern", data.pattern);
		formData.append("enctype", "multipart/form-data");
		const response = await axios.post("/api/ooo/closet/", formData, {
			// headers:headers
			// headers:{
			// 	'Context-Type':'multipare/form-data',
			// 	username: localStorage.getItem("username"),
			// },
		});
		dispatch(userClothActions.createUserCloth(response.data));
		// return response.data;
	}
);

export const classifyColor = createAsyncThunk(
	"closet/classifyColor",
	async (
		data: Pick<TempUserClothType, "image">
		// { dispatch }
	) => {
		const formData = new FormData();
		formData.append("image", data.image);
		formData.append("enctype", "multipart/form-data");
		const response = await axios.post(`/api/ooo/model/`, formData, {
			// headers,
			// body: data
		});
		if (response.status === 200) {
			return response.data;
		}
	}
);

export const editUserCloth = createAsyncThunk(
	"closet/editUserCloth",
	async (
		data: Pick<UserClothType, "id" | "type" | "color" | "pattern">,
		{ dispatch }
	) => {
		const response = await axios.put(`/api/ooo/closet/${data.id}/`, {
			headers,
			body: data,
		});
		dispatch(userClothActions.editUserCloth(response.data));
	}
);

export const deleteUserCloth = createAsyncThunk(
	"closet/deleteUserCloth",
	async (id: UserClothType["id"], { dispatch }) => {
		await axios.delete(`/api/ooo/closet/${id}/`);
		dispatch(userClothActions.deleteUserCloth({ targetId: id }));
	}
);

export const addWearDate = createAsyncThunk(
	"closet/addWearDate",
	async (data: Pick<UserClothType, "id" | "dates">, { dispatch }) => {
		const response = await axios.post(`/api/ooo/closet/${data.id}/`, {
			headers,
			body: data,
		});
		if (response.status === 200) {
			return response.data;
		}
		dispatch(userClothActions.addWearDate(response.data));
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
				image: string;
				user: number;
				color: string;
				type: string;
				pattern: string;
				label_set_id: number;
				dates: string;
			}>
		) => {
			const newUserCloth = {
				id: state.userClothes[state.userClothes.length - 1].id + 1,
				name: action.payload.name,
				image_link: action.payload.image_link,
				image: action.payload.image,
				user: action.payload.user,
				color: action.payload.color,
				type: action.payload.type,
				pattern: action.payload.pattern,
				label_set_id: action.payload.label_set_id,
				dates: "",
			};
			state.userClothes.push(newUserCloth);
		},
		editUserCloth: (
			state,
			action: PayloadAction<{
				targetId: number;
				type: string;
				color: string;
				pattern: string;
			}>
		) => {
			const fetchTargetItem = state.userClothes.find((targetCloth) => {
				console.log(targetCloth);
				if (targetCloth.id == action.payload.targetId) {
					targetCloth.type = action.payload.type;
					targetCloth.color = action.payload.color;
					targetCloth.pattern = action.payload.pattern;
				}
			});
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
			//
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
		});
	},
});

export const userClothActions = userClothSlice.actions;
export const selectUserCloth = (state: RootState) => state.userCloth;

export default userClothSlice.reducer;
