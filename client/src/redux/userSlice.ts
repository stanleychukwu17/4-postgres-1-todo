import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
type userDetailsType = {
    name: string;
    userId:number;
    session_fid:number
}
const initialState: userDetailsType = { name: '', userId:0, session_fid:0};

// Create a slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Reducer to set the count to a specific value
        updateUser: (state, action: PayloadAction<userDetailsType>) => {
            return state = {...state, ...action.payload};
        },
    },
});

// Export the actions and reducer
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
