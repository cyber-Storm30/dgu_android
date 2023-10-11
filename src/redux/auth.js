import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    doctor: {},
  },
  reducers: {
    setUser: (state, action) => {
      //   console.log('user', action.payload);
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    setDoctor: (state, action) => {
      //   console.log('user', action.payload);
      state.doctor = action.payload;
    },
    updateDoctor: (state, action) => {
      state.doctor = action.payload;
    },
    logout: (state, action) => {
      state.user = {};
      state.doctor = {};
    },
  },
});

export const {setUser, updateUser, logout, setDoctor, updateDoctor} =
  authSlice.actions;

export default authSlice.reducer;
