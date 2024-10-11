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
            console.log("under login func",data);
            let response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });
            let res = await response.json();
            console.log(res);
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
    name: "loginSlice",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.login = true;
                console.log("login", action.payload);
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload.message;
            });
    },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;