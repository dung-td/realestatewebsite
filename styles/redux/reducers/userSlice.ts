import { createSlice } from "@reduxjs/toolkit"
import STATE_INIT from "../initialState"
export const usersSlice = createSlice({
  name: "user",
  initialState: {
    data: STATE_INIT.user,
  },
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        data: action.payload,
      }
    },
    setAge: (state, action) => {
      return {
        ...state,
        data: action.payload,
      }
    },
  },
})

export const { setUser, setAge } = usersSlice.actions

export default usersSlice.reducer
