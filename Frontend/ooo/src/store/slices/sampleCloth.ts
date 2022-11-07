import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { execPath } from "process";
import { RootState } from "..";

export interface SampleClothType {}

export interface SampleClothState {}

const initialState: SampleClothState = {
	sampleClothes: [],
	selsectedSampleCloth: null,
};

export const sampleClothSlice = createSlice({
	name: "sampleCloth",
	initialState,
	reducers: {},
});

export const sampleClothActions = sampleClothSlice.actions;
export const selectSampleCloth = (state: RootState) => state.sampleCloth;

export default sampleClothSlice.reducer;
