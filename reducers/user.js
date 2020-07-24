import produce from '../util/produce';

export const initialState = {
  me: null, // 내 정보
  isLoggedIn: false, // 로그인 여부
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: '', // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: '', // 회원가입 실패 사유
  isPreempting: false, // 회원가입시 아이디 중복체크중
  isPreempted: false, // 회원가입시 아이디 중복체크 완료
  preemptErrorReason: '', // 회원가입시 아이디 중복체크 실패 사유
  isChangingTo: false, // 회원정보 수정중
  isChangedTo: false, // 회원정보 수정완료
  changedToErrorReason: '', // 회원정보 수정 실패 사유
};

const dummyUser = {
  nickname: '우기재',
  userId: 'everest88',
  positions: ['PIVO', 'ALA', 'FIXO'],
  age: '20',
  locations: ['서울', '경기'],
  Team: {
    club: '1',
    clubname: '잔디FC',
  },
};

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

export const PREEMPT_REQUEST = 'PREEMPT_REQUEST';
export const PREEMPT_SUCCESS = 'PREEMPT_SUCCESS';
export const PREEMPT_FAILURE = 'PREEMPT_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.isLoggingIn = true;
      draft.logInErrorReason = null;
      break;
    case LOG_IN_SUCCESS:
      draft.isLoggingIn = false;
      draft.isLoggedIn = true;
      draft.me = dummyUser;
      break;
    case LOG_IN_FAILURE:
      draft.isLoggingIn = false;
      draft.isLoggedIn = false;
      draft.logInErrorReason = action.error;
      draft.me = null;
      break;
    case LOG_OUT_REQUEST:
      draft.isLoggedIn = false;
      draft.me = null;
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
    case PREEMPT_REQUEST:
      draft.isPreempting = true;
      draft.isPreempted = false;
      draft.preemptErrorReason = null;
      break;
    case PREEMPT_SUCCESS:
      draft.isPreempting = false;
      draft.isPreempted = true;
      break;
    case PREEMPT_FAILURE:
      draft.isPreempted = false;
      draft.isPreempting = false;
      draft.preemptErrorReason = action.error;
      break;
    default:
      break;
  }
});
