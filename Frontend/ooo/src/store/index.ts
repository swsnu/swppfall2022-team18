import { configureStore } from "@reduxjs/toolkit";
import userClothReducer from "./slices/userCloth";
import sampleClothReducer from "./slices/sampleCloth";
import outfitReducer from "./slices/outfit";

export const store = configureStore({
	reducer: {
		userCloth: userClothReducer,
		sampleCloth: sampleClothReducer,
		outfit: outfitReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;