import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState ={
    isAuthenticated: false,
    login: false,
    user: {},
    error: "",
}

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
        logout: (state) => {
            state.isAuthenticated = false;
            state.login = false;
            state.user = {};
        },
        getInfoFromCookie: (state) => {
            let user = Cookies.get("userFrontend");
            user = JSON.parse(user);
            console.log(user) 
            if(user){
                console.log("getInfoFromCookie condtion called ")
                state.isAuthenticated = user.isAuthenticated;
                state.login = user.login;
                state.user = user.user;
            }else{
                state.isAuthenticated = false;
                state.login = false;
                state.user = {};
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.login = true;
                console.log("login", action.payload);
                state.user = action.payload;
                state.isAuthenticated = true;
                state.login = true
                Cookies.set("userFrontend", JSON.stringify(state));
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload.message;
            });
    },
});

export const { logout ,getInfoFromCookie} = loginSlice.actions;
export default loginSlice.reducer;