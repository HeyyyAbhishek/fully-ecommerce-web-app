import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    listAllSeller: [],
    listAllUser: [],
    error: "",
    loading: false,
};


export const loadAllSeller = createAsyncThunk(
    "admin/loadAllSeller",async (_, {rejectedWithValue}) => {
        try {
            const response = await fetch("http://localhost:4000/admin/seller", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.ok) {
                const seller = await response.json();
                return seller;
            }
        } catch {
            return rejectedWithValue("Failed to fetch seller profile");
        }
    }
)


export const loadAllUser = createAsyncThunk(
    "admin/loadAllUser",async (_, {rejectedWithValue}) => {
        try {
            const response = await fetch("http://localhost:4000/admin/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.ok) {
                const user = await response.json();
                return user;
            }
        } catch {
            return rejectedWithValue("Failed to fetch user profile");
        }
    }
)

export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, {rejectedWithValue}) => {
    try {
        const response = await fetch(`http://localhost:4000/admin/user`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({userId}),
        });
        if (response.ok) {
            return userId;
        }
    } catch {
        return rejectedWithValue("Failed to delete user");
    }
});

const adminReducer = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: {
        [loadAllSeller.pending]: (state) => {
            state.loading = true;
        },
        [loadAllSeller.fulfilled]: (state, action) => {
            state.loading = false;
            state.listAllSeller = action.payload;
        },
        [loadAllSeller.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [loadAllUser.pending]: (state) => {
            state.loading = true;
        },
        [loadAllUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.listAllUser = action.payload;
            console.log("All User", state.listAllUser);
        },
        [loadAllUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
