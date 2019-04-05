import client from 'client';
import jwtDecode from 'jwt-decode';
import cookies from 'js-cookie';
import gql from 'graphql-tag';

const tokenName = 'soapee-token';

export function setToken(token) {
  const exp = getField(token, 'exp');
  const attributes = exp ? { expires: new Date(exp * 1000) } : null;

  cookies.set(tokenName, token, attributes);
}

export function clearAuthToken() {
  cookies.remove(tokenName);
}

export function getAuthHeader() {
  const token = getToken();

  if (token) {
    return {
      Authorization: `Bearer ${token}`
    };
  }
}

export function isLoggedIn() {
  return ((getToken() && !isExpired()) === true);
}

export function setAuthenticated(authenticated) {
  const mutation = gql`
    mutation setAuthenticated($authenticated: Boolean!) {
      setAuthenticated(authenticated: $authenticated) @client
    } 
  `;

  return client
    .mutate({
      mutation,
      variables: { authenticated }
    });
}

export function getToken() {
  return cookies.get(tokenName);
}

// private


function isExpired() {
  const exp = getField(getToken(), 'exp');
  return exp ? exp * 1000 < Date.now() : true;
}

function getField(token, field) {
  if (token) {
    try {
      return jwtDecode(token)[field];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Could not decode JWT token.', e);
      return null;
    }
  }
}
