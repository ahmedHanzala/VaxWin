import { createSlice } from "@reduxjs/toolkit";

export const AddChildSlice = createSlice({
  name: "AddChild",
  initialState: {
    vaccinesGiven: [],
    name: "",
    DOB: "",
    image: "",
  },
  reducers: {
    setVaccinesGiven: (state, action) => {
        return {
          
          ...state,
          vaccinesGiven: [...state.vaccinesGiven, action.payload],
        };
    },
    removeVaccinesGiven: (state, action) => {
      return {
        ...state,
        vaccinesGiven: state.vaccinesGiven.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    },
    setInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetVaccinesGiven: (state,action)=>
    {
      return{...state,vaccinesGiven:state.vaccinesGiven.splice(0,A.length)}
    },
    resetAddChild: (state,action) =>
    {
      const array = []
      return { name:"",DOB:"",image:"",vaccinesGiven:array}
    }
  },
});

// Action creators are generated for each case reducer function
export const { setVaccinesGiven, setInfo, removeVaccinesGiven,resetAddChild } =
  AddChildSlice.actions;

export default AddChildSlice.reducer;
