import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {Avatar} from 'react-native-paper';

const AdminLogsItem = props => {
  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar.Icon
          size={48}
          icon="account-circle-outline"
          color={'#3F51B5'}
          style={{backgroundColor: 'transparent'}}
        />
        <Text style={styles.userInfo}>
          {props.firstname} {props.lastname}
        </Text>
      </View>
      <Text style={styles.message}>{props.message}</Text>

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
    fontSize: 16,
    paddingBottom: 10,
    marginHorizontal: 15,
  },
  userInfo: {
    color: '#7b88d1',
  },
  chip: {
    width: 125,
    marginLeft: 15,
    backgroundColor: '#daddf1',
  },
});

export default AdminLogsItem;
