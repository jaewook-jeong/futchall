import produce from '../util/produce';

export const initialState = {
  me: null, // 내 정보
  loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,
  isLoggingOut: false, // 로그아웃 시도중
  isLoggedOut: false, // 로그아웃 여부
  logOutErrorReason: null, // 로그아웃 실패 사유
  isLoggingIn: false, // 로그인 시도중
  isLoggedIn: false, // 로그인 여부
  logInErrorReason: null, // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: null, // 회원가입 실패 사유
  isChangingTo: false, // 회원정보 수정중
  isChangedTo: false, // 회원정보 수정완료
  changedToErrorReason: null, // 회원정보 수정 실패 사유
};
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const CHANGE_TO_REQUEST = 'CHANGE_TO_REQUEST';
export const CHANGE_TO_SUCCESS = 'CHANGE_TO_SUCCESS';
export const CHANGE_TO_FAILURE = 'CHANGE_TO_FAILURE';

export const ENROLL_TEAM_INFO = 'ENROLL_TEAM_INFO';

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true;
      draft.loadMyInfoError = null;
      draft.loadMyInfoDone = false;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoDone = true;
      if (action.data) {
        draft.isLoggedIn = true;
      }
      draft.me = action.data;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = action.error;
      break;
    case LOG_IN_REQUEST:
      draft.isLoggingIn = true;
      draft.logInErrorReason = null;
      draft.isLoggedOut = false;
      break;
    case LOG_IN_SUCCESS:
      draft.isLoggingIn = false;
      draft.isLoggedIn = true;
      draft.me = action.data;
      draft.logInErrorReason = null;
      break;
    case LOG_IN_FAILURE:
      draft.isLoggingIn = false;
      draft.isLoggedIn = false;
      draft.logInErrorReason = action.error;
      draft.me = null;
      break;
    case LOG_OUT_REQUEST:
      draft.isLoggingOut = true;
      draft.logOutErrorReason = null;
      draft.isLoggedOut = false;
      break;
    case LOG_OUT_SUCCESS:
      draft.isLoggedOut = true;
      draft.isLoggingOut = false;
      draft.isLoggedIn = false;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.isLoggingOut = false;
      draft.logOutErrorReason = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.isSigningUp = true;
      draft.isSignedUp = false;
      draft.signUpErrorReason = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.isSigningUp = false;
      draft.isSignedUp = true;
      break;
    case SIGN_UP_FAILURE:
      draft.isSigningUp = false;
      draft.signUpErrorReason = action.error;
      break;
    case CHANGE_TO_REQUEST:
      draft.isChangingTo = true;
      draft.isChangedTo = false;
      draft.changedToErrorReason = null;
      break;
    case CHANGE_TO_SUCCESS:
      draft.isChangingTo = false;
      draft.isChangedTo = true;
      break;
    case CHANGE_TO_FAILURE:
      draft.isChangingTo = false;
      draft.changedToErrorReason = action.error;
      break;
    case ENROLL_TEAM_INFO:
      draft.me.LeaderId = action.data.id;
      draft.me.TeamId = action.data.id;
      draft.me.Team = action.data;
      break;
    default:
      break;
  }
});
