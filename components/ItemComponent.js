import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ItemComponent = props => {
  return (
    <View>
      <Text style={styles.title}>{props.name}</Text>
      <Text style={[styles.date, {paddingTop: 5}]}>
        Created at {props.dateCreated}
      </Text>
      {props.dateModified === '-' ? (
        <></>
      ) : (
        <Text style={styles.date}>Modified at {props.dateModified}</Text>
      )}
      <Text style={styles.date} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: '#2c306d',
  },
  date: {
    fontSize: 12,
  },
});

export default ItemComponent;
