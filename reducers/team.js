const dummyInfo = {
    req:"1",
    title:"잔디FC",
    location:"서울특별시 종로구",
    time:"매주 일요일 아침8시",
    recruit:"Y",
    description:"20대로 이루어진 풋살팀입니다.",
    picture:[],
    record:[],
    captures:[
        {
            req: 1, //시퀀스
            lat: "37.5795876",
            lng: "126.9636324",
        },
        {
            req: 2, //시퀀스
            lat: "37.602835",
            lng: "126.945915",
        },
        {
            req: 3, //시퀀스
            lat: "37.584397",
            lng: "126.968567",
        },
    ],
}
const dummyRanking = [
    {
        key: 1,
        name: '잔디FC',
        rank: 1,
        location:'서울',
        occupation:3,
        recruit:'Y',
        leader:'everest88',
    },
    {
        key: 2,
        name: 'FC벌',
        rank: 2,
        location:'서울',
        occupation:1,
        recruit:'N',
        leader:'leese',
    },
]
const dummyList = [
    {
        req: 1,
        name: '잔디FC',
        location:'서울',
        occupation:3,
        recruit:'Y',
        leader:'everest88',
        description:'20대로 이루어진 풋살팀입니다.',
    },
    {
        req: 2,
        name: 'FC벌',
        location:'서울',
        occupation:1,
        recruit:'N',
        leader:'leese',
        description:'축구팀도 하고 있습니다.',
    },
]

export const initialState = {
    info:null, //팀 정보
    teamList:null,
    rankingList:null,
    query:'', //검색 내용
    isEnrolling:false, //새 팀 등록중
    isEnrolled:false,//새 팀 등록 성공
    enrollmentErrorReason:'', //새 팀 등록 실패 사유
    isSelected:false, //팀 선택 성공
    isSelecting:false, //팀 선택중
    selectedErrorReason:'',//팀 선택 실패 사유
    isLoading:false, //팀 순위리스트 로딩중
    isLoaded:false, // 팀 순위리스트 로딩 완료
    loadedErrorReason:'', //팀 리스트 로딩 실패 사유
    isSearching:false,//팀 검색
    isSearched:false,
    searchedErrorReason:'',
}

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

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_TEAM_REQUEST:{
            return{
                ...state,
                isSelecting:true,
                selectedErrorReason:'',
            }
        }
        case SELECT_TEAM_SUCCESS:{
            return{
                ...state,
                isSelecting:false,
                isSelected:true,
                info:dummyInfo,
            }
        }
        case SELECT_TEAM_FAILURE:{
            return{
                ...state,
                isSelecting:false,
                selectedErrorReason:action.error,
                info:null,
                isSelected:false,
            }
        }
        case ENROLL_TEAM_REQUEST:{
            return{
                ...state,
                isEnrolling:true,
                isEnrolled:false,
                enrollmentErrorReason:'',
            }
        }
        case ENROLL_TEAM_SUCCESS:{
            return{
                ...state,
                isEnrolled:true,
                isEnrolling:false,
            }
        }
        case ENROLL_TEAM_FAILURE:{
            return{
                ...state,
                isEnrolling:false,
                enrollmentErrorReason:action.error,
            }
        }
        case LOAD_LIST_REQUEST:{
            return{
                ...state,
                isLoading:true,
                isLoaded:false,
                loadedErrorReason:'',
            }
        }
        case LOAD_LIST_SUCCESS:{
            return{
                ...state,
                isLoaded:true,
                isLoading:false,
                rankingList:dummyRanking,
            }
        }
        case LOAD_LIST_FAILURE:{
            return{
                ...state,
                isLoading:false,
                loadedErrorReason:action.error,
            }
        }
        case SEARCH_TEAMS_REQUEST:{
            return{
                ...state,
                query:action.data.query,
                isSearching:true,
                isSearched:false,
                searchedErrorReason:'',
            }
        }
        case SEARCH_TEAMS_SUCCESS:{
            return{
                ...state,
                isSearching:false,
                isSearched:true,
                teamList:dummyList,
            }
        }
        case SEARCH_TEAMS_FAILURE:{
            return{
                ...state,
                isSearching:false,
                searchedErrorReason:action.error,
            }
        }
        default: {
        return {
            ...state,
        };
        }
}
};
