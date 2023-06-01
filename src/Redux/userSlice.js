import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

const userSlice = createSlice({
  name: "user",
  initialState: {
    fetchCurrentUserLoading: false,
    loading: false,
    error: null,
    loggedIn: false,
    id: null,
    email: null,
    role: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //Fetch current user
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.fetchCurrentUserLoading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      const user = action.payload;

      state.loggedIn = true;
      state.id = user.id;
      state.email = user.email;
      state.role = user.role;

      state.fetchCurrentUserLoading = false;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.fetchCurrentUserLoading = false;
    });

    // Signin
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state) => {
      state.loading = false;
      window.location.href = "/";
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.error = action.payload; // Error message
      state.loading = false;
    });

    // Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
      window.location.href = "/";
    });
    builder.addCase(signup.rejected, (state) => {
      state.loading = false;
    });

    // Signout
    builder.addCase(signout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signout.fulfilled, (state) => {
      state.loading = false;
      window.location.href = "/";
    });
    builder.addCase(signout.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_endpoint}/auth/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async ({ email, password }) => {
    const response = await axios.post(
      `${api_endpoint}/auth/register`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    return response.data;
  }
);

export const signout = createAsyncThunk("user/signout", async () => {
  await axios.delete(`${api_endpoint}/auth/logout`, { withCredentials: true });
  return;
});

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    const response = await axios.get(`${api_endpoint}/auth`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
