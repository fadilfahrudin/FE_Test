import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';

export const addGerbang = createAsyncThunk(
    'gerbangs/addGerbang',
    async (
        gerbangData: { id: number; IdCabang: number; NamaGerbang: string; NamaCabang: string },
        { rejectWithValue }
    ) => {
        try {
            await axios.post(`${config.BASE_URL}/gerbangs`, gerbangData);
            window.location.reload()
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error occurred');
        }
    }
);
export const editGerbang = createAsyncThunk(
    'gerbangs/editGerbang',
    async (
        gerbangData: { id: number; IdCabang: number; NamaGerbang: string; NamaCabang: string },
        { rejectWithValue }
    ) => {
        try {
            await axios.patch(`${config.BASE_URL}/gerbangs`, gerbangData);
            window.location.reload()
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error occurred');
        }
    }
);
export const deleteGerbang = createAsyncThunk(
    'gerbangs/deleteGerbang',
    async ({ id, idCabang }: { id: number; idCabang: number }, { rejectWithValue }) => {
        try {
            await axios.delete(`${config.BASE_URL}/gerbangs`, {
                data: { id, IdCabang: idCabang },
            });
            window.location.reload()
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error occurred');
        }
    }
);

const gerbangSlice = createSlice({
    name: 'gerbangsSlice',
    initialState: { list: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteGerbang.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteGerbang.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteGerbang.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default gerbangSlice.reducer;
