import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    datas: [],
    appState: false
};
export const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppState: (state, { payload }) => {
            state.appState = payload
        },
    },
});

export const { setAppState } = app.actions;

export default app;
