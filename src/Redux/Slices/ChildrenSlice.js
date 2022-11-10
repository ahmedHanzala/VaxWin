import { createSlice } from "@reduxjs/toolkit";

export const ChildrenSlice = createSlice({
  name: "children",
  initialState: {
    children: [],
    loaded: false,
    lengthCloud:false,
    refresh:false,
    // name:"", array will have objects of the following attributes
    // DOB:"",
    //id:""
    // image:"",
    // vaccinesTaken:[],
    //vaccinesNotTaken:
    //bookings:
  },
  reducers: {
    addChild: (state, action) => {
      if (state.children.includes(action.payload)) {
        return { ...state, loaded: true };
      }
      return {
        ...state,
        loaded: true,
        children: [...state.children, action.payload],
      };
    },
    resetChildren: (state, action) => {
      return { ...state, children: [],lengthCloud:false };
    },
    completeBookingState: (state, action) => {
      const childIndex = state.children.findIndex(
        (obj) => obj.id === action.payload.childID
      );
      const bookingIndex = state.children[childIndex].bookings.findIndex(
        (obj) => obj.id === action.payload.bookingID
      );
     
      state.children[childIndex].bookings[bookingIndex].status = "Completed";
      console.log("UPDATED OBJ:", state.children[childIndex].bookings[bookingIndex])
      //update vaccinesTaken
      state.children[childIndex].vaccinesTaken.unshift(action.payload.vaccineTaken)
    

    },
    setRefresh: (state, action) => {
      return { ...state, refresh: action.payload };
    },
    setLengthCloud: (state, action) => {
      return { ...state, lengthCloud: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addChild, resetChildren, completeBookingState,setRefresh,setLengthCloud } =
  ChildrenSlice.actions;

export default ChildrenSlice.reducer;
