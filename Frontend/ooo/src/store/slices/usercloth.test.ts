import {
    AnyAction,
    configureStore,
    EnhancedStore
} from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { UserClothState } from "./userCloth"
import { fetchUserClothes, fetchUserCloth, createUserCloth, deleteUserCloth } from "./userCloth";

describe("outfit reducer", () => {
    let store: EnhancedStore<
        {userCloth: UserClothState},
        AnyAction,
        [ThunkMiddleware<{userCloth: UserClothState}, AnyAction, undefined>]
        >;
    
    const fakeUserCloth = {
        id: 1,
        name: "name",
        image_id: 1,
        user: 1,
        color: "test",
        type: "test",
        pattern: "test"
    }

    beforeAll(() => {
        store = configureStore(
            { reducer: { userCloth: reducer}}
        )
    })

    it("should handle initial state", () => {
        expect(reducer(undefined, {type: "unknown"})).toEqual({
            userClothes: [],
            selectedUserCloth: null,
        })
    })
    it("should handle fetchUserClothes", async() => {
        axios.get = jest.fn().mockResolvedValue({ data: [fakeUserCloth]});
        await store.dispatch(fetchUserClothes());
        expect(store.getState().userCloth.userClothes).toEqual([fakeUserCloth])
    })

    it("should handle fetchUserCloth", async() => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeUserCloth});
        await store.dispatch(fetchUserCloth(1));
        expect(store.getState().userCloth.selectedUserCloth).toEqual(fakeUserCloth)
    })

    it("should handle fetchUserCloth is failed", async() => {
        axios.get = jest.fn().mockResolvedValue({ data: null});
        await store.dispatch(fetchUserCloth(1));
        expect(store.getState().userCloth.selectedUserCloth).toEqual(null)
    })

    it("should handle createUserCloth", async() => {
        jest.spyOn(axios, "post").mockResolvedValue({data: fakeUserCloth})
        await store.dispatch(createUserCloth({name:"test", image_id: "", color:"black", type:"shirt", pattern:"stripe"}))
        // expect(store.getState().userCloth.userClothes).toEqual([fakeUserCloth])
    })

    it("should handle deleteUserCloth", async() => {
        axios.delete = jest.fn().mockResolvedValue({data: null})
        await store.dispatch(deleteUserCloth(1))
        // expect(store.getState().userCloth.userClothes).toEqual([])
    })

    it("should handle createUserCloth error", async() => {
        const mockConsoleError = jest.fn()
        console.error = mockConsoleError;
        jest.spyOn(axios, "post").mockResolvedValue({response: {data: { title: ["error"]}}})
        await store.dispatch(createUserCloth({name:"test", image_id: "", color:"black", type:"shirt", pattern:"stripe"}))
        expect(mockConsoleError).toBeCalled()
    })



})