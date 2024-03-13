import {combineReducers, configureStore} from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import userSlice from "../features/common/userSlice";
// import sessionStorage from 'redux-persist/lib/storage/session';
// import {persistReducer} from "redux-persist";
// import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
//
// const persistConfig = {
//     key: "root", // localStorage key
//     storage: sessionStorage, // localStorage
//     whitelist: ["user"], // target (reducer name)
// }
const rootReducer = combineReducers({
    header: headerSlice,
    rightDrawer: rightDrawerSlice,
    modal: modalSlice,
    user: userSlice
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// })

export default configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //         },
    //     }),
})
