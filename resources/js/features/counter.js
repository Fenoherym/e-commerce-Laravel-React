import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Créez un thunk pour récupérer le compte du panier
export const getCartCount = createAsyncThunk('cart/getCartCount', async () => {
    const response = await axios.get('/api/cart/count');
    return response.data.cart_count; // Retourne le compte du panier
});

const initialState = {
    value: 0,
    loading: false,
    error: null,
};

export const counter = createSlice({
    name: "counter",
    initialState,
    reducers: {
        changeCountValue: (state, action) => {
            state.value = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartCount.pending, (state) => {
                state.loading = true; // Indique que la requête est en cours
            })
            .addCase(getCartCount.fulfilled, (state, action) => {
                state.loading = false; // Indique que la requête est terminée
                state.value = action.payload; // Met à jour la valeur avec le compte récupéré
            })
            .addCase(getCartCount.rejected, (state, action) => {
                state.loading = false; // Indique que la requête est terminée
                state.error = action.error.message; // Gère les erreurs
            });
    },
});

export const { changeCountValue } = counter.actions;
export default counter.reducer;
