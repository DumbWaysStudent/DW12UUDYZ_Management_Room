import React from 'react';
import {AsyncStorage} from 'react-native';

const storageSet = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const storageGet = async key => {
  try {
    const result = await AsyncStorage.getItem(key);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const stroageDestroy = async () => {
  await AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => alert('Logout Berhasil'));
};

export {storageSet, storageGet, stroageDestroy};
