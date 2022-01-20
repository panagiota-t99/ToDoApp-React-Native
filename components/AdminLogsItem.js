import React from 'react';
import {StyleSheet, Text} from 'react-native';

const AdminLogsItem = props => {
  return (
    <>
      <Text style={styles.message}>Message: {props.message}</Text>
      <Text style={styles.userInfo}>First Name: {props.firstname}</Text>
      <Text style={styles.userInfo}>Last Name: {props.lastname}</Text>
      <Text>UserId: {props.userid}</Text>
      <Text>LogId: {props.logid}</Text>
      <Text>Action: {props.action}</Text>
      <Text>Date Created: {props.dateCreated}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    color: '#3F51B5',
  },
  userInfo: {
    color: '#7b88d1',
  },
});

export default AdminLogsItem;
