import { createSlice } from "@reduxjs/toolkit";

export const BlogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs:[]
  },
  reducers: {
    initializeBlogs:(state,action) =>
    {
        return {...state,blogs:action.payload}
    },
    addBlogs: (state, action) => {
      return { ...state, blogs:[...state.blogs,action.payload]};
    },
    resetBlogs: (state,action)=> {
        return { ...state, blogs:[]};
      },
  },
});

// Action creators are generated for each case reducer function
export const { addBlogs,resetBlogs,initializeBlogs } = BlogsSlice.actions;

export default BlogsSlice.reducer;
