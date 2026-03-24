import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserForm {
  id: number;
  name: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  address: string;
  pincode: string;
  skills1: string[];
  skills2: string[];
  skills3: string;
  gender: string;
  receiveNotifications: boolean;
  agree: boolean;
  description: string;
  dob: string | null;
  dobPicker:  {
  startDate: Date ;
  endDate: Date ;
};
}

interface UserState {
  users: UserForm[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserForm>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<UserForm>) => {
      // Fixed: was comparing user.email === action.payload.id (bug in original)
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
