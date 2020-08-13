import produce from '../util/produce';

const dummyInfo = {
  id: '0',
  title: '누상동 다목적 운동장',
  lat: '37.5795876',
  lng: '126.9636324',
  address: '서울특별시 종로구 누상동 1-3',
  time: '상시개방',
  light: 'N',
  special: ['플라스틱 인도어구장', '화장실'],
  description: '인왕산 초입에 있는 풋살 구장입니다. 골대와 바닥, 펜스가 최근에 교체하여 깔끔합니다.',
  team: '잔디FC',
  teamInfo: '1',
  teamImg: 'https://quod.lib.umich.edu/cgi/i/image/api/tile/bhl:WSOC2009:WSOC2009/0,0,2048,2048/256,/0/default.jpg',
  valid: '2020-05-05',
};

export const initialState = {
  info: null, // 스타디움 정보
  pictures: [],
  comments: [],
  isEnrolling: false, // 새 구장 등록중
  isEnrolled: false, // 새 구장 등록 성공
  enrollmentErrorReason: '', // 새 구장 등록 실패 사유
  isSelected: false, // 구장 선택 성공
  isSelecting: false, // 구장 선택중
  selectedErrorReason: '', // 구장 선택 실패 사유
  isAddingComment: false, // 구장 평점 등록중
  isAddedComment: false, // 구장 평점 등록 완료
  addedCommentErrorReason: '', // 구장 평점 등록 실패 사유
};

export const SELECT_STADIUM_REQUEST = 'SELECT_STADIUM_REQUSET';
export const SELECT_STADIUM_SUCCESS = 'SELECT_STADIUM_SUCCESS';
export const SELECT_STADIUM_FAILURE = 'SELECT_STADIUM_FAILURE';

export const ENROLL_STADIUM_REQUEST = 'ENROLL_STADIUM_REQUSET';
export const ENROLL_STADIUM_SUCCESS = 'ENROLL_STADIUM_SUCCESS';
export const ENROLL_STADIUM_FAILURE = 'ENROLL_STADIUM_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUSET';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SELECT_STADIUM_REQUEST:
      draft.isSelecting = true;
      draft.selectedErrorReason = null;
      break;
    case SELECT_STADIUM_SUCCESS:
      draft.isSelecting = false;
      draft.isSelected = true;
      draft.info = dummyInfo;
      draft.comments = action.data;
      break;
    case SELECT_STADIUM_FAILURE:
      draft.isSelecting = false;
      draft.selectedErrorReason = action.error;
      draft.info = null;
      draft.isSelected = false;
      break;
    case ENROLL_STADIUM_REQUEST:
      draft.isEnrolling = true;
      draft.isEnrolled = false;
      draft.enrollmentErrorReason = null;
      break;
    case ENROLL_STADIUM_SUCCESS:
      draft.isEnrolled = true;
      draft.isEnrolling = false;
      break;
    case ENROLL_STADIUM_FAILURE:
      draft.isEnrolling = false;
      draft.enrollmentErrorReason = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.isAddingComment = true;
      draft.isAddedComment = false;
      draft.addedCommentErrorReason = null;
      break;
    case ADD_COMMENT_SUCCESS:
      draft.isAddedComment = true;
      draft.isAddingComment = false;
      draft.comments = action.data;
      break;
    case ADD_COMMENT_FAILURE:
      draft.isAddingComment = false;
      draft.addedCommentErrorReason = action.error;
      break;
    default:
      break;
  }
});
