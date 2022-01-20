import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'http://192.168.1.8:3000/';

async function getToken() {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    alert(e);
    return null;
  }
}

async function getRequest(endpoint = '') {
  console.log('fetch get');
  const token = await getToken();
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      'Cache-Control': 'no-cache',
    },
  });
  return await response.json();
}
/**
 *
 * @param endpoint
 * @param data
 * @returns {Promise<any>}
 */
async function postRequest(endpoint = '', data = {}) {
  console.log('fetch post');
  const token = await getToken();
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function putRequest(endpoint = '', data = {}) {
  console.log('fetch put');
  const token = await getToken();
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function deleteRequest(endpoint = '') {
  console.log('fetch delete');
  const token = await getToken();
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      'Cache-Control': 'no-cache',
    },
  });
  return await response.json();
}

module.exports = {getRequest, postRequest, putRequest, deleteRequest};
