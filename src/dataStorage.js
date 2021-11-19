const tokenKey = 'token';

export function getAuthenticationToken(){
    return JSON.parse( localStorage.getItem( tokenKey ) );
}

export function setAuthenticationToken( response = '{}' ){
    return localStorage.setItem( tokenKey, JSON.stringify(response) );
}