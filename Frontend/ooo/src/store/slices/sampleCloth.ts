import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { execPath } from "process";
import { RootState } from "..";

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

export interface SampleClothState {
	sampleClothes: SampleClothType[];
	selectedSampleCloth: SampleClothType | null;
}

const initialState: SampleClothState = {
	sampleClothes: [],
	selectedSampleCloth: null,
};

export const sampleClothSlice = createSlice({
	name: "sampleCloth",
	initialState,
	reducers: {},
});

export const sampleClothActions = sampleClothSlice.actions;
export const selectSampleCloth = (state: RootState) => state.sampleCloth;

export default sampleClothSlice.reducer;