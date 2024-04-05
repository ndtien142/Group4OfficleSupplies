import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  appVersion: string;
  codePushVersion: string | undefined;
  onBoarding: boolean;
  isRegisterFirstDownload: boolean;
  isLoginAfterLogout: boolean;
  deviceTokens: string[];
}

const initialState: IInitialState = {
  // use this to control ask permission on first time
  appVersion: '',
  codePushVersion: '',
  onBoarding: true,
  isRegisterFirstDownload: false,
  isLoginAfterLogout: false,
  deviceTokens: [],
};

const rootConfigSlice = createSlice({
  name: 'root-config',
  initialState,
  reducers: {
    setAppVersion: (state, action: PayloadAction<string>) => {
      state.appVersion = action.payload;
    },
    setCodePushVersion: (state, action: PayloadAction<string | undefined>) => {
      state.codePushVersion = action.payload;
    },
    setOnBoarding: (state, action: PayloadAction<boolean>) => {
      state.onBoarding = action.payload;
    },
    setIsRegisterFirstDownload: (state, action: PayloadAction<boolean>) => {
      state.isRegisterFirstDownload = action.payload;
    },
    setIsLoginAfterLogout: (state, action: PayloadAction<boolean>) => {
      state.isLoginAfterLogout = action.payload;
    },
    resetDeviceTokens: state => {
      state.deviceTokens = [];
    },
  },
});
export const {
  actions: {
    setAppVersion,
    setCodePushVersion,
    setOnBoarding,
    setIsRegisterFirstDownload,
    setIsLoginAfterLogout,
    resetDeviceTokens,
  },
  reducer,
} = rootConfigSlice;
