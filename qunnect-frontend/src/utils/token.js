export const storeAccessToken=(accessToken)=> {
    sessionStorage.setItem('accessToken', accessToken);
}

export const getAccessToken=()=> {
    // Retrieve from session storage
    return sessionStorage.getItem('accessToken');
}

export const removeAccessToken=()=> {
    sessionStorage.removeItem('accessToken');
}