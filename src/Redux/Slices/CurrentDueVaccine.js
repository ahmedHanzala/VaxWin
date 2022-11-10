import { createSlice } from "@reduxjs/toolkit";

export const currentDueVaccineSlice = createSlice({
  name: "currentDueVaccine",
  initialState: {
    vaccineName: "",
    image: "",
    date: "",
    imageURI:"",
  },
  reducers: {
    updateCurrentDueVaccine: (state, action) => {
      return {
        ...state,
        vaccineName: action.payload.vaccineName,
        image: action.payload.image,
        date: action.payload.date,
        imageURI: action.payload.imageURI,
      };
    },
    resetCurrentDueVaccine: (state, action) => {
      return { ...state, vaccineName: "", date: "", image: "" };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentDueVaccine, resetCurrentDueVaccine } =
currentDueVaccineSlice.actions;

export default currentDueVaccineSlice.reducer;
