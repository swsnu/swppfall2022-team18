import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { execPath } from "process";
import { RootState } from "..";

export interface UserClothType {}

export interface UserClothState {}

const initialState: UserClothState = {
	userClothes: [],
	selsectedUserCloth: null,
};

export const userClothSlice = createSlice({
	name: "userCloth",
	initialState,
	reducers: {},
});

export const userClothActions = userClothSlice.actions;
export const selectUserCloth = (state: RootState) => state.userCloth;

export default userClothSlice.reducer;
