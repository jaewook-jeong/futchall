import produce from '../util/produce';

export const initialState = {
  me: null, // 내 정보
  token: null, // 토큰정보
  userList: null, // 유저 리스트
  isSelecting: false, // 유저 리스트 가져오는중
  isSelected: false, // 유저 리스트 가여옴
  selectErrorReason: null, // 유저 리스트 가져오기 오류
  isManaging: false, // 유저 가입 처리중
  isManaged: false, // 유저 가입 처리완료
  manageErrorReason: null, // 유저 가입 처리 오류 발생
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
  isSettingPwd: false, // 비밀번호 수정중
  isSettedPwd: false, // 비밀번호 수정완료
  setPwdErrorReason: null, // 비밀번호 수정 실패 사유
  isJoinnigIn: false, // 팀 가입 신청중
  isJoinedIn: false, // 팀 가입 신청완료
  joininErrorReason: null, // 팀 가입 신청 실패 사유
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SELECT_LIST_REQUEST = 'SELECT_LIST_REQUEST';
export const SELECT_LIST_SUCCESS = 'SELECT_LIST_SUCCESS';
export const SELECT_LIST_FAILURE = 'SELECT_LIST_FAILURE';

export const JOIN_MANAGE_REQUEST = 'JOIN_MANAGE_REQUEST';
export const JOIN_MANAGE_SUCCESS = 'JOIN_MANAGE_SUCCESS';
export const JOIN_MANAGE_FAILURE = 'JOIN_MANAGE_FAILURE';

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

export const SET_PWD_REQUEST = 'SET_PWD_REQUEST';
export const SET_PWD_SUCCESS = 'SET_PWD_SUCCESS';
export const SET_PWD_FAILURE = 'SET_PWD_FAILURE';

export const JOIN_IN_REQUEST = 'JOIN_IN_REQUEST';
export const JOIN_IN_SUCCESS = 'JOIN_IN_SUCCESS';
export const JOIN_IN_FAILURE = 'JOIN_IN_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

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
      draft.isLoggedIn = true;
      draft.me = action.data.me;
      draft.token = action.data.token;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = action.error;
      break;
    case LOG_IN_REQUEST:
      draft.isLoggingIn = true;
      draft.logInErrorReason = null;
      break;
    case LOG_IN_SUCCESS:
      draft.isLoggingIn = false;
      draft.isLoggedIn = true;
      draft.isLoggedOut = false;
      draft.me = action.data.me;
      draft.token = action.data.token;
      draft.logInErrorReason = null;
      break;
    case LOG_IN_FAILURE:
      draft.isLoggingIn = false;
      draft.isLoggedIn = false;
      draft.logInErrorReason = action.error;
      draft.me = null;
      draft.token = null;
      break;
    case SELECT_LIST_REQUEST:
      draft.isSelecting = true;
      draft.selectErrorReason = null;
      break;
    case SELECT_LIST_SUCCESS:
      draft.isSelecting = false;
      draft.isSelected = true;
      draft.userList = action.data;
      break;
    case SELECT_LIST_FAILURE:
      draft.isSelecting = false;
      draft.isSelected = false;
      draft.selectErrorReason = action.error;
      draft.userList = null;
      break;
    case JOIN_MANAGE_REQUEST:
      draft.isManaging = true;
      draft.manageErrorReason = null;
      break;
    case JOIN_MANAGE_SUCCESS: {
      draft.isManaging = false;
      draft.isManaged = true;
      draft.userList = draft.userList.filter((v) => v.id !== action.data.id);
      break;
    }
    case JOIN_MANAGE_FAILURE:
      draft.isManaging = false;
      draft.isManaged = false;
      draft.manageErrorReason = action.error;
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
      draft.token = null;
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
      draft.me = action.data;
      break;
    case CHANGE_TO_FAILURE:
      draft.isChangingTo = false;
      draft.changedToErrorReason = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts.filter((v) => v.id !== action.data);
      break;
    case JOIN_IN_REQUEST:
      draft.isJoinnigIn = true;
      draft.isJoinedIn = false;
      draft.joininErrorReason = null;
      break;
    case JOIN_IN_SUCCESS:
      draft.isJoinnigIn = false;
      draft.isJoinedIn = true;
      draft.me.JoinInId = action.data;
      break;
    case JOIN_IN_FAILURE:
      draft.isJoinnigIn = false;
      draft.joininErrorReason = action.error;
      break;
    case SET_PWD_REQUEST:
      draft.isSettingPwd = true;
      draft.isSettedPwd = false;
      draft.setPwdErrorReason = null;
      break;
    case SET_PWD_SUCCESS:
      draft.isSettingPwd = false;
      draft.isSettedPwd = true;
      break;
    case SET_PWD_FAILURE:
      draft.isSettingPwd = false;
      draft.setPwdErrorReason = action.error;
      break;
    default:
      break;
  }
});
