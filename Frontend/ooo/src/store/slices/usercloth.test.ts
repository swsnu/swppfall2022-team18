import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { fetchRecommendOutfit, UserClothState } from "./userCloth";
import {
	fetchUserClothes,
	fetchUserCloth,
	createUserCloth,
	deleteUserCloth,
} from "./userCloth";

describe("outfit reducer", () => {
	let store: EnhancedStore<
		{ userCloth: UserClothState },
		AnyAction,
		[ThunkMiddleware<{ userCloth: UserClothState }, AnyAction, undefined>]
	>;

	const fakeUserCloth = {
		id: 1,
		name: "name",
		image_link: 1,
		user: 1,
		color: "test",
		type: "test",
		pattern: "test",
	};

	const fakeOutfit = {
		id: 1,
		outfit_info: "test",
		popularity: 2,
		image_link: "",
		userclothes: [],
	};

	const fakeCloth = {
		id: 1,
		name: "shirt",
		image_id: 1,
		outfit: 1,
		color: "black",
		type: "shirt",
		pattern: "stripe",
		purchase_link: "www.naver.com",
	};

	beforeAll(() => {
		store = configureStore({ reducer: { userCloth: reducer } });
	});

	it("should handle initial state", () => {
		expect(reducer(undefined, { type: "unknown" })).toEqual({
			userClothes: [],
			selectedUserCloth: null,
			recommendOutfit: null,
		});
	});

	it("should handle fetchUserClothes", async () => {
		axios.get = jest.fn().mockResolvedValue({ data: [fakeUserCloth] });
		await store.dispatch(fetchUserClothes());
		expect(store.getState().userCloth.userClothes).toEqual([fakeUserCloth]);
	});

	it("should handle fetchUserCloth", async () => {
		axios.get = jest.fn().mockResolvedValue({ data: fakeUserCloth });
		await store.dispatch(fetchUserCloth(1));
		expect(store.getState().userCloth.selectedUserCloth).toEqual(fakeUserCloth);
	});

	it("should handle fetchUserCloth is failed", async () => {
		axios.get = jest.fn().mockResolvedValue({ data: null });
		await store.dispatch(fetchUserCloth(1));
		expect(store.getState().userCloth.selectedUserCloth).toEqual(null);
	});

	it("should handle fetchRecommendOutfit", async () => {
		axios.get = jest.fn().mockResolvedValue({ data: fakeOutfit });
		await store.dispatch(fetchRecommendOutfit());
		expect(store.getState().userCloth.recommendOutfit).toEqual(fakeOutfit);
	});

	it("should handle createUserCloth", async () => {
		//
	});

	it("should handle classifyColor", async () => {
		//
	});

	it("should handle editUserCloth", async () => {
		//
	});

	// it("should handle createUserCloth", async() => {
	//     jest.spyOn(axios, "post").mockResolvedValue({data: fakeUserCloth})
	//     await store.dispatch(createUserCloth({name:"test", image_link: "", color:"black", type:"shirt", pattern:"stripe"}))
	//     // expect(store.getState().userCloth.userClothes).toEqual([fakeUserCloth])
	// })

	it("should handle deleteUserCloth", async () => {
		axios.delete = jest.fn().mockResolvedValue({ data: null });
		await store.dispatch(deleteUserCloth(1));
		// expect(store.getState().userCloth.userClothes).toEqual([])
	});

	it("should handle addWearDate", async () => {
		//
	});

	// it("should handle createUserCloth error", async() => {
	//     const mockConsoleError = jest.fn()
	//     console.error = mockConsoleError;
	//     jest.spyOn(axios, "post").mockResolvedValue({response: {data: { title: ["error"]}}})
	//     await store.dispatch(createUserCloth({name:"test", image:File(), color:"black", type:"shirt", pattern:"stripe"}))
	//     expect(mockConsoleError).toBeCalled()
	// })
});
