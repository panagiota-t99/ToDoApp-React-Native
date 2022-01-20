import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

const ItemComponent = props => {
  return (
    <View>
      <Text>Id: {props.id}</Text>
      <Text>List: {props.name}</Text>
      <Text>Date Created: {props.dateCreated}</Text>
      <Text>Date Modified: {props.dateModified}</Text>
    </View>
  );
};

export default ItemComponent;
