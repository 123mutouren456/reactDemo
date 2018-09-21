import { CONDITIONS_CHANGE, SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAIL } from '../actions/searchBar';

/*
* 初始化state
 */

const initState = {
    conditions:{
        "searchTypes": "",
        "keywords": "",
        "categoryMains": "",
        "categoryMainMDM": "",
        "categoryMainWiki": ""
    },
    resSearch: {
        facet: [],
        searchTime: 0.494,
        totalNum: 11,
        totalPageNum: 2,
        currentPageNum: 1,
        items: []
    }
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case CONDITIONS_CHANGE:
            return {
                ...state,
                conditions: Object.assign({},state.conditions,action.conditions)
            };
        case SEARCH_REQUEST:
            return {
                ...state,
                isLoading: true,
                resSearch: {},
                errorMsg: ''
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resSearch: action.result.data.data,
                errorMsg: ''
            };
        case SEARCH_FAIL:
            return {
                ...state,
                isLoading: false,
                resSearch: {},
                errorMsg: '请求错误'
            };
        default:
            return state
    }
}
