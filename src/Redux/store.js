import { configureStore, createReducer } from '@reduxjs/toolkit'

import ProfileReducer from './Slices/ProfileSlice'
import AddChildReducer from './Slices/AddChildSlice'
import ChildrenReducer from './Slices/ChildrenSlice'
import NotificationReducer from './Slices/NotificationsSlice'
import BlogsReducer from './Slices/BlogsSlice'
import CurrentDueReducer from './Slices/CurrentDueVaccine'


export default configureStore({
  reducer: {
    profile: ProfileReducer,
    AddChild: AddChildReducer,
    children:ChildrenReducer,
    notifications: NotificationReducer,
    blogs: BlogsReducer,
    currentDueVaccine : CurrentDueReducer,
  },
})