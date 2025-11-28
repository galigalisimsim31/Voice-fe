// store/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';
const CACHE_KEY = 'app.settings.v1';


const settingsSlice = createSlice({
  name: 'settings',
  initialState: { data: null, status: 'idle', error: null },
  reducers: {
    setSettings(state, action) {
      state.data = action.payload;
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data: state.data, ts: Date.now() })
      );
    },
    clearSettings(state) {
      state.data = null;
      localStorage.removeItem(CACHE_KEY);
    },
  },
});

export const { setSettings, clearSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
