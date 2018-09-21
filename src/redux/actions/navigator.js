export const GET_NAVIGATOR_REQUEST = "navigator/GET_NAVIGATOR_REQUEST";
export const GET_NAVIGATOR_SUCCESS = "navigator/GET_NAVIGATOR_SUCCESS";
export const GET_NAVIGATOR_FAIL = "navigator/GET_NAVIGATOR_FAIL";

export function getHeaderNav() {
    return {
        types: [GET_NAVIGATOR_REQUEST, GET_NAVIGATOR_SUCCESS, GET_NAVIGATOR_FAIL],
        promise: client => client.get(`/api/navigator`)
    }
}