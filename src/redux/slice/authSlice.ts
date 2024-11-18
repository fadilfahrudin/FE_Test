import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "../../utils/axiosSetup";

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    user: Record<string, any> | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}


const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    user: null,
    status: "idle",
    error: null,
};

export const login = createAsyncThunk(
    "auth/login",
    async (credentials: { username: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post("/auth/login", credentials);
            if (response.data.status) {
                return response.data;
            } else {
                return thunkAPI.rejectWithValue(response.data.message);
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
                state.status = "succeeded";
                state.isLoggedIn = true;
                state.token = action.payload.token;

                const decoded = JSON.parse(atob(action.payload.token.split(".")[1]));
                state.user = decoded;

                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(decoded));
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;