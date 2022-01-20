const getCurrentDate = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let day = today.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  return year + '-' + month + '-' + day;
};

const formatPartialDate = date => {
  let newDate = new Date(date).toDateString().split(' ');
  return newDate[2] + ' ' + newDate[1] + ' ' + newDate[3];
};

const formatDate = list => {
  for (let item of list) {
    item.dateCreated = formatPartialDate(item.dateCreated);
    if (item.dateModified == null) {
      item.dateModified = '-';
    } else {
      item.dateModified = formatPartialDate(item.dateModified);
    }
  }
  return list;
};

const formatDateLogs = list => {
  for (let item of list) {
    item.dateCreated = formatPartialDate(item.dateCreated);
  }
  return list;
};

module.exports = {
  getCurrentDate,
  formatPartialDate,
  formatDate,
  formatDateLogs,
};
