import produce from '../util/produce';

const dummyInfo = {
  id: '1',
  title: '잔디FC',
  location: '서울특별시 종로구',
  time: '매주 일요일 아침8시',
  recruit: 'Y',
  description: '20대로 이루어진 풋살팀입니다.',
  picture: [],
  record: [
    {
      id: 1,
      homeTeamReq: 1,
      homeTeamName: '잔디FC',
      awayTeamName: 'FC벌',
      awayTeamReq: 2,
      homeTeamScore: 3,
      awayTeamScore: 1,
      date: '2020-06-07',
      stadiumName: '누상동 다목적 운동장',

    },
  ],
  captures: [
    {
      id: 1, // 시퀀스
      lat: '37.5795876',
      lng: '126.9636324',
    },
    {
      id: 2, // 시퀀스
      lat: '37.602835',
      lng: '126.945915',
    },
    {
      id: 3, // 시퀀스
      lat: '37.584397',
      lng: '126.968567',
    },
  ],
};
const dummyRanking = [
  {
    key: 1,
    name: '잔디FC',
    rank: 1,
    location: '서울',
    occupation: 3,
    recruit: 'Y',
    leader: 'everest88',
  },
  {
    key: 2,
    name: 'FC벌',
    rank: 2,
    location: '서울',
    occupation: 1,
    recruit: 'N',
    leader: 'leese',
  },
];
const dummyList = [
  {
    id: 1,
    name: '잔디FC',
    location: '서울',
    occupation: 3,
    recruit: 'Y',
    leader: 'everest88',
    description: '20대로 이루어진 풋살팀입니다.',
  },
  {
    id: 2,
    name: 'FC벌',
    location: '서울',
    occupation: 1,
    recruit: 'N',
    leader: 'leese',
    description: '축구팀도 하고 있습니다.',
  },
];

const dummyMember = [
  {
    nickname: '우기재',
    id: 'everest88',
    positions: ['ALA', 'FIXO', 'PIVO'],
    score: 15,
    reader: true,
  },
  {
    nickname: '뚜오니',
    id: 'suyeon94',
    positions: ['GOLEIRO'],
    score: 0,
    reader: false,
  },
  {
    nickname: '인슈',
    id: 'bsoooo',
    positions: ['ALA'],
    score: 5,
    reader: false,
  },
  {
    nickname: '스오',
    id: 'seung94',
    positions: ['PIVO'],
    score: 6,
    reader: false,
  },
  {
    nickname: '미누',
    id: 'minwoo',
    positions: ['FIXO'],
    score: 2,
    reader: false,
  },
];

export const initialState = {
  info: null, // 팀 정보
  memberList: null, // 선택한 팀 멤버 리스트
  teamList: null, // 검색했을 때
  rankingList: null, // 순위 리스트
  query: '', // 검색 내용
  isEnrolling: false, // 새 팀 등록중
  isEnrolled: false, // 새 팀 등록 성공
  enrollmentErrorReason: '', // 새 팀 등록 실패 사유
  isSelected: false, // 팀 선택 성공
  isSelecting: false, // 팀 선택중
  selectedErrorReason: '', // 팀 선택 실패 사유
  isLoading: false, // 팀 순위리스트 로딩중
  isLoaded: false, // 팀 순위리스트 로딩 완료
  loadedErrorReason: '', // 팀 리스트 로딩 실패 사유
  isSearching: false, // 팀 검색
  isSearched: false,
  searchedErrorReason: '',
};

export const SELECT_TEAM_REQUEST = 'SELECT_TEAM_REQUSET';
export const SELECT_TEAM_SUCCESS = 'SELECT_TEAM_SUCCESS';
export const SELECT_TEAM_FAILURE = 'SELECT_TEAM_FAILURE';

export const ENROLL_TEAM_REQUEST = 'ENROLL_TEAM_REQUSET';
export const ENROLL_TEAM_SUCCESS = 'ENROLL_TEAM_SUCCESS';
export const ENROLL_TEAM_FAILURE = 'ENROLL_TEAM_FAILURE';

export const LOAD_LIST_REQUEST = 'LOAD_LIST_REQUSET';
export const LOAD_LIST_SUCCESS = 'LOAD_LIST_SUCCESS';
export const LOAD_LIST_FAILURE = 'LOAD_LIST_FAILURE';

export const SEARCH_TEAMS_REQUEST = 'SEARCH_TEAMS_REQUSET';
export const SEARCH_TEAMS_SUCCESS = 'SEARCH_TEAMS_SUCCESS';
export const SEARCH_TEAMS_FAILURE = 'SEARCH_TEAMS_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SELECT_TEAM_REQUEST:
      draft.isSelecting = true;
      draft.selectedErrorReason = null;
      break;
    case SELECT_TEAM_SUCCESS:
      draft.isSelecting = false;
      draft.isSelected = true;
      draft.info = dummyInfo;
      draft.memberList = dummyMember;
      break;
    case SELECT_TEAM_FAILURE:
      draft.isSelecting = false;
      draft.selectedErrorReason = action.error;
      draft.info = null;
      draft.isSelected = false;
      break;
    case ENROLL_TEAM_REQUEST:
      draft.isEnrolling = true;
      draft.isEnrolled = false;
      draft.enrollmentErrorReason = null;
      break;
    case ENROLL_TEAM_SUCCESS:
      draft.isEnrolled = true;
      draft.isEnrolling = false;
      break;
    case ENROLL_TEAM_FAILURE:
      draft.isEnrolling = false;
      draft.enrollmentErrorReason = action.error;
      break;
    case LOAD_LIST_REQUEST:
      draft.isLoading = true;
      draft.isLoaded = false;
      draft.loadedErrorReason = null;
      break;
    case LOAD_LIST_SUCCESS:
      draft.isLoaded = true;
      draft.isLoading = false;
      draft.rankingList = dummyRanking;
      break;
    case LOAD_LIST_FAILURE:
      draft.isLoading = false;
      draft.loadedErrorReason = action.error;
      break;
    case SEARCH_TEAMS_REQUEST:
      draft.query = action.data.query;
      draft.isSearching = true;
      draft.isSearched = false;
      draft.searchedErrorReason = null;
      break;
    case SEARCH_TEAMS_SUCCESS:
      draft.isSearching = false;
      draft.isSearched = true;
      draft.teamList = dummyList;
      break;
    case SEARCH_TEAMS_FAILURE:
      draft.isSearching = false;
      draft.searchedErrorReason = action.error;
      break;
    default:
      break;
  }
});
