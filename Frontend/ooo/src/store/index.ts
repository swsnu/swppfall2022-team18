import { configureStore } from "@reduxjs/toolkit";
import outfitReducer from "./slices/outfit";

export const store = configureStore({
	reducer: {
		outfit: outfitReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
