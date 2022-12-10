import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { OutfitState } from "./outfit";
import {
	fetchOutfits,
	fetchOutfit,
	fetchFilteredOutfits,
	fetchSampleCloth,
} from "./outfit";

describe("outfit reducer", () => {
	let store: EnhancedStore<
		{ outfit: OutfitState },
		AnyAction,
		[ThunkMiddleware<{ outfit: OutfitState }, AnyAction, undefined>]
	>;

	const fakeOutfit = {
		id: 1,
		name: "test",
		info: "test",
		outfit_info: "test",
		popularity: 2,
		image_id: 1,
		purchase_link: "www.naver.com",
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

	const fakeUserCloth = {
		id: 1,
		name: "name",
		image_id: 1,
		user: 1,
		color: "test",
		type: "test",
		pattern: "test",
	};

	beforeAll(() => {
		store = configureStore({ reducer: { outfit: reducer } });
	});

	it("should handle initial state", () => {
		expect(reducer(undefined, { type: "unknown" })).toEqual({
			outfits: [],
			selectedOutfit: null,
			filter: {
				color: null,
				type: null,
				pattern: null,
				userHave: false,
				recommend: false,
			},
			cursor: 0,
			isLast: false,
			sampleClothes: [],
			sampleCloth: null,
			userCloth: null,
		});
	});

	it("should handle fetchOutfits", async () => {
		axios.get = jest.fn().mockResolvedValue({ data: [fakeOutfit] });
		await store.dispatch(fetchOutfits());
		//expect(store.getState().outfit.outfits).toEqual([fakeOutfit]);
	});

	it("should handle fetchFilteredOutfit", async () => {
		axios.post = jest.fn().mockResolvedValue({ data: [fakeOutfit] });
		await store.dispatch(
			fetchFilteredOutfits({
				color: null,
				type: null,
				pattern: null,
				userHave: false,
				recommend: false,
				cursor: 0,
				pageSize: 9,
			})
		);
		// expect(store.getState().outfit.outfits).toEqual([fakeOutfit]);
	});

	it("should handle fetchOutfit", async () => {
		axios.get = jest.fn().mockResolvedValue({
			data: { outfit: fakeOutfit, sampleclothes: [fakeCloth] },
		});
		await store.dispatch(fetchOutfit(1));
		expect(store.getState().outfit.selectedOutfit).toEqual(fakeOutfit);
		expect(store.getState().outfit.sampleClothes).toEqual([fakeCloth]);
	});

	it("should handle fetchOutfit is failed", async () => {
		axios.get = jest
			.fn()
			.mockResolvedValue({ data: { outfit: null, sampleclothes: [] } });
		await store.dispatch(fetchOutfit(1));
	});

	it("should handle fetchSampleCloth", async () => {
		axios.get = jest.fn().mockResolvedValue({
			status: 200,
			data: { usercloth: fakeUserCloth, samplecloth: fakeCloth },
		});
		await store.dispatch(fetchSampleCloth(1));
		// expect(store.getState().outfit.userCloth).toEqual(fakeUserCloth)
	});

	// it("should handle fetchSampleCloth error", async () => {
	// 	axios.get = jest.fn().mockResolvedValue({
	// 		status: 400,
	// 		data: { usercloth: fakeUserCloth, samplecloth: fakeCloth },
	// 	});
	// 	await store.dispatch(fetchSampleCloth(1));
	// 	// expect(store.getState().outfit.userCloth).toEqual(fakeUserCloth)
	// });

	// it("should handle fetchSampleCloth is failed", async () => {
	// 	axios.get = jest.fn().mockResolvedValue({ data: null });
	// 	await store.dispatch(fetchSampleCloth(1));
	// });
});
