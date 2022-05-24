import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@configs/axios.js';

const initialState = {
    loading: false,
    error: null,
    isLoggedIn: false,
    username: null
};

export const login = createAsyncThunk(
    'app/login',
    async (payload, { rejectWithValue }) => {

        try {

            const { data } = await axios.post('/login', payload);

            return {
                data
            };

        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const test = createAsyncThunk(
    'app/test',
    async (_, { rejectWithValue }) => {

        try {

            const { data } = await axios.post('/test', {
                hello: "world"
            });

            return {
                data
            };
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const app = createSlice({
    name: 'app',
    initialState,
    extraReducers: builder => {

        const matchBuilder = (action, status) =>
            action.type.startsWith('app') && action.type.endsWith(status);

        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.username = payload.data.username;
        });

        builder.addCase(test.fulfilled, (state, { payload }) => {
            state.loading = false;
        });

        builder.addMatcher(
            action => matchBuilder(action, '/pending'),
            (state, action) => ({
                ...state,
                loading: true,
            }),
        );

        builder.addMatcher(
            action => matchBuilder(action, '/rejected'),
            (state, { payload }) => {
                return {
                    ...state,
                    loading: false,
                    error: payload && payload.message ? payload.message : 'Fetch Error',
                };
            },
        );
    },
});

export default app;
