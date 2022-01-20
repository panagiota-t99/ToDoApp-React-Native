import {
  postRequest,
  getRequest,
  deleteRequest,
  putRequest,
} from './commonService';

/**
 *
 * @param username
 * @param password
 * @returns {Promise<any>}
 */
async function login(username, password) {
  try {
    return await postRequest('users/login', {username, password});
  } catch (e) {
    throw e;
  }
}

async function getRole() {
  try {
    return await getRequest('users/role');
  } catch (e) {
    throw e;
  }
}

async function getUserLists() {
  try {
    return await getRequest('users/lists');
  } catch (e) {
    throw e;
  }
}

async function getLogs(user) {
  try {
    return await getRequest('logs/' + user);
  } catch (e) {
    throw e;
  }
}

async function getListItems(listid) {
  try {
    return await getRequest('lists/items/' + listid);
  } catch (e) {
    throw e;
  }
}

async function deleteUserList(listid) {
  try {
    return await deleteRequest('lists/list/' + listid);
  } catch (e) {
    throw e;
  }
}

async function updateUserList(listid, listname, dateModified) {
  try {
    return await putRequest('lists/list', {listid, listname, dateModified});
  } catch (e) {
    throw e;
  }
}

async function addUserList(listname) {
  try {
    return await postRequest('lists/list/add', {listname});
  } catch (e) {
    throw e;
  }
}

async function addItemToList(id, listname, itemname) {
  try {
    return await postRequest('lists/list/item/add', {id, listname, itemname});
  } catch (e) {
    throw e;
  }
}

async function deleteListItem(itemsid) {
  try {
    return await deleteRequest('lists/list/item/' + itemsid);
  } catch (e) {
    throw e;
  }
}

async function updateListItem(itemsid, itemname, dateModified) {
  try {
    return await putRequest('lists/item', {itemsid, itemname, dateModified});
  } catch (e) {
    throw e;
  }
}

module.exports = {
  login,
  getRole,
  getLogs,
  getUserLists,
  deleteUserList,
  updateUserList,
  addUserList,
  getListItems,
  addItemToList,
  deleteListItem,
  updateListItem,
};
