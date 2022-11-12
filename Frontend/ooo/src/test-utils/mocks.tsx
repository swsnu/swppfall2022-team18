import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from 'react';
import { Provider } from "react-redux";
import { AppStore, RootState } from "../store";
import userClothReducer from '../store/slices/userCloth';
import outfitReducer from '../store/slices/outfit';

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
  }
  
  export const getMockStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
      reducer: { userCloth: userClothReducer,
		outfit: outfitReducer, },
      preloadedState,
    });
  };
  
  export function renderWithProviders(
    ui: React.ReactElement,
    {
      preloadedState,
      // Automatically create a store instance if no store was passed in
      store = getMockStore(preloadedState),
      ...renderOptions
    }: ExtendedRenderOptions = {}
  ) {
    function Wrapper({ children }: PropsWithChildren): JSX.Element {
      return <Provider store={store}>{children}</Provider>;
    }
  
    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
  }