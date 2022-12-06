import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, {
	addWearDate,
	classifyColor,
	editUserCloth,
	fetchRecommendOutfit,
	UserClothState,
} from "./userCloth";
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
		const file = new File(["(⌐□_□)"], "testClothImage.png", {
			type: "image/png",
		});
		jest.spyOn(axios, "post").mockResolvedValue({ data: fakeUserCloth });
		await store.dispatch(
			createUserCloth({
				name: "test",
				image: file,
				color: "black",
				type: "shirt",
				pattern: "stripe",
			})
		);
	});

	it("should handle createUserCloth is failed", async () => {
		const file = new File(["(⌐□_□)"], "testClothImage.png", {
			type: "image/png",
		});
		jest.spyOn(axios, "post").mockResolvedValue({ status: 400, data: null });
		await store.dispatch(
			createUserCloth({
				name: "test",
				image: file,
				color: "black",
				type: "shirt",
				pattern: "stripe",
			})
		);
	});

	it("should handle classifyColor", async () => {
		const file = new File(["(⌐□_□)"], "testClothImage.png", {
			type: "image/png",
		});
		jest.spyOn(axios, "post").mockResolvedValue({ status: 200, data: null });
		await store.dispatch(classifyColor({ image: file }));
	});

	it("should handle editUserCloth", async () => {
		jest.spyOn(axios, "put").mockResolvedValue({ data: fakeUserCloth });
		await store.dispatch(
			editUserCloth({ id: 1, type: "", pattern: "", color: "" })
		);
	});

	it("should handle deleteUserCloth", async () => {
		axios.delete = jest.fn().mockResolvedValue({ data: null });
		await store.dispatch(deleteUserCloth(1));
		// expect(store.getState().userCloth.userClothes).toEqual([])
	});

	it("should handle addWearDate", async () => {
		jest.spyOn(axios, "post").mockResolvedValue({
			status: 200,
			data: { targetId: 1, weardate: "2022/12/30" },
		});
		await store.dispatch(addWearDate({ id: 1, dates: "2022/12/30" }));
	});
});
