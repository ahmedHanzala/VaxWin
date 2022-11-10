import { createSlice } from "@reduxjs/toolkit";

export const NotificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications:[]
  },
  reducers: {
    addNotification: (state, action) => {
      console.log("NOTIFICATION ADDED::"  ,action.payload)
      return { ...state, notifications:[...state.notifications,action.payload]};
    },
    resetNotifications: (state,action)=> {
        return { ...state, notifications:[]};
      },
  },
});

// Action creators are generated for each case reducer function
export const { addNotification,resetNotifications } = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
