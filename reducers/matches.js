import produce from '../util/produce';

export const initialState = {
  matches: null, // 경기정보
  isSelecting: false, // 경기정보 가져오는중
  isSelected: false, // 경기정보 가져오기 완료
  selectedErrorReason: '', // 경기정보 가져오기 에러
  isPatchingWinner: false, // 승자등록중
  isPatchedWinner: false, // 승자등록완료
  pacthWinnerErrorReason: '', // 승자등록 에러
  isPatchingLoser: false, // 패자등록중
  isPatchedLoser: false, // 패자등록완료
  pacthLoserErrorReason: '', // 패자등록 에러
  isPatchingApproval: false, // 경기승인중
  isPatchedApproval: false, // 경기승인완료
  pacthApprovalErrorReason: '', // 경기승인 에러
  isPatchingCancel: false, // 경기거절중
  isPatchedCancel: false, // 경기거절완료
  pacthCancelErrorReason: '', // 경기거절중 에러
};

export const SELECT_MATCHES_REQUEST = 'SELECT_MATCHES_REQUSET';
export const SELECT_MATCHES_SUCCESS = 'SELECT_MATCHES_SUCCESS';
export const SELECT_MATCHES_FAILURE = 'SELECT_MATCHES_FAILURE';

export const PATCH_WINNER_REQUEST = 'PATCH_WINNER_REQUSET';
export const PATCH_WINNER_SUCCESS = 'PATCH_WINNER_SUCCESS';
export const PATCH_WINNER_FAILURE = 'PATCH_WINNER_FAILURE';

export const PATCH_LOSER_REQUEST = 'PATCH_LOSER_REQUSET';
export const PATCH_LOSER_SUCCESS = 'PATCH_LOSER_SUCCESS';
export const PATCH_LOSER_FAILURE = 'PATCH_LOSER_FAILURE';

export const PATCH_APPROVAL_REQUEST = 'PATCH_APPROVAL_REQUSET';
export const PATCH_APPROVAL_SUCCESS = 'PATCH_APPROVAL_SUCCESS';
export const PATCH_APPROVAL_FAILURE = 'PATCH_APPROVAL_FAILURE';

export const PATCH_CANCEL_REQUEST = 'PATCH_CANCEL_REQUSET';
export const PATCH_CANCEL_SUCCESS = 'PATCH_CANCEL_SUCCESS';
export const PATCH_CANCEL_FAILURE = 'PATCH_CANCEL_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SELECT_MATCHES_REQUEST:
      draft.isSelecting = true;
      draft.selectedErrorReason = null;
      break;
    case SELECT_MATCHES_SUCCESS:
      draft.isSelecting = false;
      draft.isSelected = true;
      draft.matches = action.data;
      break;
    case SELECT_MATCHES_FAILURE:
      draft.isSelecting = false;
      draft.selectedErrorReason = action.error;
      draft.matches = null;
      draft.isSelected = false;
      break;
    case PATCH_WINNER_REQUEST:
      draft.isPatchingWinner = true;
      draft.pacthWinnerErrorReason = null;
      break;
    case PATCH_WINNER_SUCCESS: {
      const match = draft.matches.find((v) => v.id === parseInt(action.data.id, 10));
      match.WinnerId = parseInt(action.data.WinnerId, 10);
      match.Winner = action.data.Winner;
      draft.isPatchingWinner = false;
      draft.isPatchedWinner = true;
      break;
    }
    case PATCH_WINNER_FAILURE:
      draft.isPatchingWinner = false;
      draft.pacthWinnerErrorReason = action.error;
      draft.isPatchedWinner = false;
      break;
    case PATCH_LOSER_REQUEST:
      draft.isPatchingLoser = true;
      draft.pacthLoserErrorReason = null;
      break;
    case PATCH_LOSER_SUCCESS: {
      const match = draft.matches.find((v) => v.id === parseInt(action.data.id, 10));
      match.WinnerId = parseInt(action.data.WinnerId, 10);
      match.Winner = action.data.Winner;
      draft.isPatchingLoser = false;
      draft.isPatchedLoser = true;
      break;
    }
    case PATCH_LOSER_FAILURE:
      draft.isPatchingLoser = false;
      draft.pacthLoserErrorReason = action.error;
      draft.isPatchedLoser = false;
      break;
    case PATCH_APPROVAL_REQUEST:
      draft.isPatchingApproval = true;
      draft.pacthApprovalErrorReason = null;
      break;
    case PATCH_APPROVAL_SUCCESS: {
      const match = draft.matches.find((v) => v.id === parseInt(action.data.id, 10));
      match.confirm = 'Y';
      draft.isPatchingApproval = false;
      draft.isPatchedApproval = true;
      break;
    }
    case PATCH_APPROVAL_FAILURE:
      draft.isPatchingApproval = false;
      draft.pacthApprovalErrorReason = action.error;
      draft.isPatchedApproval = false;
      break;
    case PATCH_CANCEL_REQUEST:
      draft.isPatchingCancel = true;
      draft.pacthCancelErrorReason = null;
      break;
    case PATCH_CANCEL_SUCCESS: {
      const match = draft.matches.find((v) => v.id === parseInt(action.data.id, 10));
      match.confirm = 'N';
      draft.isPatchingCancel = false;
      draft.isPatchedCancel = true;
      break;
    }
    case PATCH_CANCEL_FAILURE:
      draft.isPatchingCancel = false;
      draft.pacthCancelErrorReason = action.error;
      draft.isPatchedCancel = false;
      break;
    default:
      break;
  }
});

export default reducer;
