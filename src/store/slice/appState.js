import { createSlice } from '@reduxjs/toolkit';

export const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    publications: [],
    user: {},
  },
  reducers: {
    setPublications: (state, action) => {
      state.publications = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setPublications, setUser } = appStateSlice.actions;
export const selectPublications = (state) => state.publications;
export const selectUser = (state) => state.user;

export default appStateSlice.reducer;
