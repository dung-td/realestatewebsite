import { combineReducers, configureStore } from "@reduxjs/toolkit"
import usersReducer from "./reducers/userSlice"

const rootReducer = combineReducers({
  users: usersReducer,
})

const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
})

store.subscribe(() => console.log(store.getState().reducer.users.data))

export default store
