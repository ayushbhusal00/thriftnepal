import AsyncStorage from "@react-native-async-storage/async-storage";

const cacheRole = async (value: string) => {
  try {
    return await AsyncStorage.setItem("userRole", value);
  } catch (e) {
    // saving error
    console.log(e);
    return JSON.stringify(e);
  }
};

const getRole = async () => {
  try {
    return await AsyncStorage.getItem("userRole");
  } catch (e) {
    // error reading value
    console.log(e);
    return JSON.stringify(e);
  }
};
