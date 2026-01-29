import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import requestBuilderReducer from '@/reducers/request-builder.slice'
import requestBuilderMiddleware from '@/reducers/request-builder.middleware'
import requestEditorReducer from '@/reducers/request-editor.slice'
import responsePreviewReducer from '@/reducers/response-preview.slice'

export const reducer = combineReducers({
  requestBuilder: requestBuilderReducer,
  requestEditor: requestEditorReducer,
  responsePreview: responsePreviewReducer,
})

export type RootState = ReturnType<typeof reducer>

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(requestBuilderMiddleware),
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
