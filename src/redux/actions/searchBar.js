export const CONDITIONS_CHANGE = "searchBar/KEYWORDS_CHANGE";

export function conditionsChange(conditions) {
    return {type: CONDITIONS_CHANGE,conditions:conditions}
}

export const SEARCH_REQUEST = "searchBar/SEARCH_REQUEST";
export const SEARCH_SUCCESS = "searchBar/SEARCH_SUCCESS";
export const SEARCH_FAIL = "searchBar/SEARCH_FAIL";

export function search() {
    return {
        types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAIL],
        promise: client => client.get(`/api/search`)
    }
}