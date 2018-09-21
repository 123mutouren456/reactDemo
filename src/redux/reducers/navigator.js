import {GET_NAVIGATOR_REQUEST, GET_NAVIGATOR_SUCCESS, GET_NAVIGATOR_FAIL} from 'actions/navigator';


const initState = {
    isLoading: false,
    navlist: [],
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case GET_NAVIGATOR_REQUEST:
            return {
                ...state,
                isLoading: true,
                navlist: [],
                errorMsg: ''
            };
        case GET_NAVIGATOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                navlist: action.result.data.data,
                errorMsg: ''
            };
        case GET_NAVIGATOR_FAIL:
            return {
                ...state,
                isLoading: false,
                navlist: [],
                errorMsg: '请求错误'
            };
        default:
            return state;
    }
}