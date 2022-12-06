import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export interface OutfitType {
	id: number;
	outfit_info: string;
	outfit_name: string;
	popularity: number;
	image_link: string;
	purchase_link: string;
}

export interface FilterType {
	color: string | null;
	type: string | null;
	pattern: string | null;
	userHave: boolean;
	recommend: boolean;
}

export interface FilterPostInputType {
	color: string | null;
	type: string | null;
	pattern: string | null;
	userHave: boolean;
	recommend: boolean;
	cursor: number;
	pageSize: number;
}

export interface SampleClothType {
	id: number;
	name: string;
	image_link: string;
	outfit: number;
	color: string;
	type: string;
	pattern: string;
	purchase_link: string;
}

export interface UserClothType {
	id: number;
	name: string;
	image_link: string;
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
	sampleCloth: SampleClothType | null;
	userCloth: UserClothType | null;
	cursor: number;
	isLast: boolean;
}

export interface fetchOutputState {
	isLast: boolean;
	cursor: number;
	outfits: OutfitType[];
}

export interface fetchFilteredOutputState {
	color: string | null;
	type: string | null;
	pattern: string | null;
	userHave: boolean;
	recommend: boolean;
	isLast: boolean;
	cursor: number;
	outfits: OutfitType[];
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
	sampleCloth: null,
	userCloth: null,
	cursor: 0,
	isLast: false,
};

const headers = {
	username: localStorage.getItem("username"),
};

export const fetchOutfits = createAsyncThunk(
	"outfit/fetchOutfits",
	async (cursor, pageSize) => {
		const response = await axios.get<fetchOutputState>("/api/ooo/outfit/", {
			// headers,
			params: {
				cursor: cursor,
				pageSize: pageSize,
			},
		});
		console.log(response.data);
		return response.data;
	}
);

export const fetchFilteredOutfits = createAsyncThunk(
	"outfit/fetchFilteredOutfits",
	async (data: FilterPostInputType) => {
		const response = await axios.post<fetchFilteredOutputState>(
			"/api/ooo/outfit/",
			{
				headers,
				body: data,
			}
		);
		console.log(response.data);
		return response.data;
	}
);

export const fetchOutfit = createAsyncThunk(
	"outfit/fetchOutfit",
	async (id: OutfitType["id"]) => {
		console.log("fetchOutfit");
		const response = await axios.get(`/api/ooo/outfit/${id}/`, {
			// headers,
		});
		// console.log("fetchOutfit", response.data);
		return response.data ?? null;
	}
);

export const fetchSampleCloth = createAsyncThunk(
	"outfit/fetchSampleCloth",
	async (id: OutfitType["id"]) => {
		const response = await axios.get(`/api/ooo/outfit/samplecloth/${id}/`, {
			// headers,
		});
		if (response.status === 200) {
			return response.data;
		} else {
			return null;
		}
		// return response.data;
	}
);

export const outfitSlice = createSlice({
	name: "outfit",
	initialState,
	reducers: {
		editFilter: (
			state,
			action: PayloadAction<{
				color: string | null;
				type: string | null;
				pattern: string | null;
				userHave: boolean;
				recommend: boolean;
			}>
		) => {
			state.filter = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchOutfits.fulfilled, (state, action) => {
			// Add user to the state array
			state.outfits = action.payload.outfits;
			state.isLast = action.payload.isLast;
			state.cursor = action.payload.cursor;
		});
		builder.addCase(fetchFilteredOutfits.fulfilled, (state, action) => {
			// Add user to the state array
			state.outfits = action.payload.outfits;
			state.isLast = action.payload.isLast;
			state.cursor = action.payload.cursor;
		});
		builder.addCase(fetchOutfit.fulfilled, (state, action) => {
			console.log(action.payload);
			state.selectedOutfit = action.payload.outfit;
			state.sampleClothes = action.payload.sampleclothes;
		});
		builder.addCase(fetchSampleCloth.fulfilled, (state, action) => {
			if (action.payload.usercloth.id !== -1) {
				state.userCloth = action.payload.usercloth;
			}
			state.sampleCloth = action.payload.samplecloth;
		});
	},
});

export const outfitActions = outfitSlice.actions;
export const selectOutfit = (state: RootState) => state.outfit;

export default outfitSlice.reducer;
