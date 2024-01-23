import { configureStore } from '@reduxjs/toolkit'
import appStateReducer from './slice/appState'

export default configureStore({
  reducer: appStateReducer,
})
