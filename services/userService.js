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

async function register(fname, lname, email, username, password) {
  try {
    return await postRequest('users/register', {
      fname,
      lname,
      email,
      username,
      password,
    });
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

async function getUsers() {
  try {
    return await getRequest('users/all');
  } catch (e) {
    throw e;
  }
}

async function getUsername() {
  try {
    return await getRequest('users/username');
  } catch (e) {
    throw e;
  }
}

async function deleteUserList(listid, listname) {
  try {
    return await deleteRequest('lists/list/' + listid + '/' + listname + '/');
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

async function deleteListItem(itemsid, itemname) {
  try {
    return await deleteRequest(
      'lists/list/item/' + itemsid + '/' + itemname + '/',
    );
  } catch (e) {
    throw e;
  }
}

async function deleteUser(id) {
  try {
    return await deleteRequest('users/delete/' + id);
  } catch (e) {
    throw e;
  }
}

async function updateListItem(itemsid, itemname, dateModified, listname) {
  try {
    return await putRequest('lists/item', {
      itemsid,
      itemname,
      dateModified,
      listname,
    });
  } catch (e) {
    throw e;
  }
}

async function addReminder(reminder, itemsid) {
  try {
    return await putRequest('lists/item/reminder', {
      reminder,
      itemsid,
    });
  } catch (e) {
    throw e;
  }
}

async function deleteReminder(itemsid) {
  try {
    return await putRequest('lists/list/item/delete/reminder', {
      itemsid,
    });
  } catch (e) {
    throw e;
  }
}

async function updateUserDetails(
  firstname,
  lastname,
  email,
  username,
  roleid,
  userid,
) {
  try {
    return await putRequest('users/update', {
      firstname,
      lastname,
      email,
      username,
      roleid,
      userid,
    });
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
  getUsers,
  updateUserDetails,
  deleteUser,
  register,
  getUsername,
  addReminder,
  deleteReminder,
};
