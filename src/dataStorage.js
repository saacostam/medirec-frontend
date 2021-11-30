const tokenKey = 'token';
const pacienteKey = 'paciente';

export function getAuthenticationToken(){
    return JSON.parse( localStorage.getItem( tokenKey ) );
}

export function setAuthenticationToken( response = '{}' ){
    return localStorage.setItem( tokenKey, JSON.stringify(response) );
}

export function deleteAuthenticationToken(){
    localStorage.clear(tokenKey);
}

export function setPaciente( user = '{}' ){
    return localStorage.setItem( pacienteKey, JSON.stringify( user ) );
}

export function getPaciente(){
    return JSON.parse( localStorage.getItem( pacienteKey ) );
}

export function deletePaciente(){
    localStorage.clear( pacienteKey );
}
