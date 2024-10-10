import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    login: false,
    user: {},
    error: "",
};

export const login = createAsyncThunk(
    "loginSlice/login",
    async (data, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });
            let res = await response.json();
            if (res.ok) {
                return res;
            } else {
                return rejectWithValue(res);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(Login.fulfilled, (state, action) => {
                state.login = true;
                state.user = action.payload;
            })
            .addCase(Login.rejected, (state, action) => {
                state.error = action.payload.message;
            });
    },
});

// export const { logout } = loginSlice.actions;
export default loginSlice.reducer;