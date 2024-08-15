// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    skills: string[];
    aboutMe: string;
  } | null;
}

const initialState: UserState = {
  formData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<UserState['formData']>) => {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = userSlice.actions;
export default userSlice.reducer;
