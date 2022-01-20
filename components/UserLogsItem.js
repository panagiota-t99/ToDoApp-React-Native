import React from 'react';
import {StyleSheet, Text} from 'react-native';

const UserLogsItem = props => {
  return (
    <>
      <Text style={styles.message}>Message: {props.message}</Text>
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
});

export default UserLogsItem;
