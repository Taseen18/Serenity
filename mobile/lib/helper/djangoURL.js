import { Platform } from "react-native";

//const hostname = '192.168.0.1' //use when using personal device. Replace with your own computers IP
const hostname = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'; //use if errors arise with emulators.

const port = '8000'

export const getApiUrl = () => {
    return `http://${hostname}:${port}/`;
};

export const getWsUrl = () => {
    return `ws://${hostname}:${port}/`;
}