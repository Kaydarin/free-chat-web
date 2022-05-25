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
    reducers: {
        setLogOut: () => {
            return {
                ...initialState,
            };
        },
        resetError: (state, { payload }) => {
            state.error = null;
        },
    },
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

                let errorMessage = 'Fetch Error';

                console.log(payload.response.hasOwnProperty('message'))
                if (payload) {
                    if (payload.hasOwnProperty('response') && payload.response.hasOwnProperty('data') && payload.response.data.hasOwnProperty('message')) {
                        errorMessage = payload.response.data.message;
                    } else if (payload.hasOwnProperty('message')) {
                        errorMessage = payload.message;
                    }
                }

                return {
                    ...state,
                    loading: false,
                    error: errorMessage,
                };
            },
        );
    },
});

export const { setLogOut, resetError } = app.actions;

export default app;
