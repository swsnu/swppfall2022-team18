import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export interface OutfitType {
	id: number;
	outfit_info: string;
	popularity: number;
	image_id: number;
	purchase_link: string;
}

export interface FilterType {
	color: string | null;
	type: string | null;
	pattern: string | null;
	userHave: boolean;
	recommend: boolean;
}

export interface SampleClothType {
	id: number;
	name: string;
	image_id: number;
	outfit: number;
	color: string;
	type: string;
	pattern: string;
	purchase_link: string;
}

export interface UserClothType {
	id: number;
	name: string;
	image_id: number;
	user: number;
	color: string;
	type: string;
	pattern: string;
}

export interface OutfitState {
	outfits: OutfitType[];
	selectedOutfit: OutfitType | null;
	filter: FilterType;
	sampleClothes: SampleClothType[];
	userCloth: UserClothType | null;
}

const initialState: OutfitState = {
	outfits: [],
	selectedOutfit: null,
	filter: {
		color: null,
		type: null,
		pattern: null,
		userHave: false,
		recommend: false,
	},
	sampleClothes: [],
	userCloth: null,
};

const headers = {
	username: localStorage.getItem("username"),
};

export const fetchOutfits = createAsyncThunk(
	"outfit/fetchOutfits",
	async () => {
		const response = await axios.get<OutfitType[]>("/api/ooo/outfit/", {
			headers,
		});
		return response.data;
	}
);

export const fetchFilteredOutfits = createAsyncThunk(
	"outfit/fetchFilteredOutfits",
	async () => {
		const response = await axios.post<OutfitType[]>("/api/ooo/outfit/", {
			headers,
		});
		return response.data;
	}
);

export const fetchOutfit = createAsyncThunk(
	"outfit/fetchOutfit",
	async (id: OutfitType["id"]) => {
		console.log("fetchOutfit");
		const response = await axios.get(`/api/ooo/outfit/${id}/`, {
			headers,
		});
		console.log("fetchOutfit", response.data);
		return response.data ?? null;
	}
);

export const fetchSampleCloth = createAsyncThunk(
	"outfit/fetchSampleCloth",
	async (id: OutfitType["id"]) => {
		const response = await axios.get(`/api/ooo/samplecloth/${id}/`, {
			headers,
		});
		return response.data ?? null;
	}
);

export const outfitSlice = createSlice({
	name: "outfit",
	initialState,
	reducers: {
		// editFilter: (
		// 	state,
		// 	action: PayloadAction<{
		// 		color: string | null;
		// 		type: string | null;
		// 		pattern: string | null;
		// 		userHave: boolean;
		// 		recommend: boolean;
		// 	}>
		// ) => {
		// 	state.filter = action.payload;
		// },
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchOutfits.fulfilled, (state, action) => {
			// Add user to the state array
			state.outfits = action.payload;
		});
		builder.addCase(fetchFilteredOutfits.fulfilled, (state, action) => {
			// Add user to the state array
			state.outfits = action.payload;
		});
		builder.addCase(fetchOutfit.fulfilled, (state, action) => {
			console.log(action.payload)
			state.selectedOutfit = action.payload.outfit;
			state.sampleClothes = action.payload.sampleclothes;
		});
		builder.addCase(fetchSampleCloth.fulfilled, (state, action) => {
			state.userCloth = action.payload;
		});
	},
});

export const outfitActions = outfitSlice.actions;
export const selectOutfit = (state: RootState) => state.outfit;

export default outfitSlice.reducer;