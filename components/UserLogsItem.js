import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Chip} from 'react-native-paper';

const UserLogsItem = props => {
  return (
    <>
      <Text style={styles.message}>Message: {props.message}</Text>

      {props.action === 'ADD' ? (
        <Chip style={styles.chip} icon={'text-box-plus-outline'}>
          {props.dateCreated}
        </Chip>
      ) : props.action === 'DELETE' ? (
        <Chip style={styles.chip} icon={'text-box-remove-outline'}>
          {props.dateCreated}
        </Chip>
      ) : (
        <Chip style={styles.chip} icon={'file-document-edit-outline'}>
          {props.dateCreated}
        </Chip>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  message: {
    paddingBottom: 10,
    marginHorizontal: 15,
  },
  chip: {
    width: 125,
    marginLeft: 15,
    backgroundColor: '#daddf1',
  },
});

export default UserLogsItem;
