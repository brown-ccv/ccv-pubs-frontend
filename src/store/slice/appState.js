import { createSlice } from '@reduxjs/toolkit';

export const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    publications: [],
  },
  reducers: {
    setPublications: (state, action) => {
      state.publications = action.payload;
    },
  },
});

export const { setPublications } = appStateSlice.actions;
export const selectPublications = (state) => state.publications;

export default appStateSlice.reducer;
