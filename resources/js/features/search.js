import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const searchInput = createSlice({
    name: "searchInput",
    initialState,
    reducers: {
        makeSearch: () => {
            
        }
    }
})