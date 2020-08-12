import produce from '../util/produce';

export const initialState = {
  list: [], // 대화한 유저 리스트
  talkData: [], // 특정 유저와 대화한 대화 내용
  originalId: null,
  isGettingList: false, // 대화한 유저 리스트 가져오는중
  isGettedList: false, // 대화한 유저 리스트 가져옴
  getListErrorResason: '', // 대화한 유저 리스트 에러
  isDeletingList: false, // 대화한 유저 리스트 선택 삭제중
  isDeletedList: false, // 대화한 유저 리스트 선택 삭제 완료
  deleteListErrorReason: '', // 대화한 유저 리스트 선택삭제 에러
};
export const SET_USER_ID = 'SET_USER_ID';

export const GET_LIST_REQUEST = 'GET_LIST_REQUEST';
export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
export const GET_LIST_FAILURE = 'GET_LIST_FAILURE';

export const DELETE_LIST_REQUEST = 'DELETE_LIST_REQUEST';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const DELETE_LIST_FAILURE = 'DELETE_LIST_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_USER_ID:
      draft.originalId = action.data;
      break;
    case GET_LIST_REQUEST:
      draft.isGettingList = true;
      draft.isGettedList = false;
      draft.getListErrorResason = null;
      break;
    case GET_LIST_SUCCESS:
      draft.list = action.data;
      draft.isGettingList = false;
      draft.isGettedList = true;
      break;
    case GET_LIST_FAILURE:
      draft.isGettingList = false;
      draft.getListErrorResason = action.error;
      break;
    case DELETE_LIST_REQUEST:
      draft.isDeletingList = true;
      draft.isDeletedList = false;
      draft.deleteListErrorReason = null;
      break;
    case DELETE_LIST_SUCCESS:
      draft.list = action.data;
      draft.isDeletingList = false;
      draft.isDeletedList = true;
      break;
    case DELETE_LIST_FAILURE:
      draft.isDeletingList = false;
      draft.deleteListErrorReason = action.error;
      break;
    default:
      break;
  }
});
