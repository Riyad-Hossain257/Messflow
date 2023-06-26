import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import reloadReducer from './slices/reload';
import messReducer from './slices/messSlice';
import userReducer from './slices/userSlice';
import pollReducer from './slices/pollSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    reload: reloadReducer,
    mess: messReducer,
    userInfo: userReducer,
    poll: pollReducer,
  },
});
