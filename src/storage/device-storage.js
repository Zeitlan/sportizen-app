import { AsyncStorage } from 'react-native'

//TODO: Refactor functions (repeting try/catch)
export const deviceStorage = {
    
    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value)
            console.log('AsynStorage: (' + key + '=' + value +') added')
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message)
        }
    },

    async loadItem(key) {
        try {
            item = await AsyncStorage.getItem(key)
            console.log('AsynStorage: (' + key + '=' + item +') retrieved')
            return item
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message)
        }
    },

    async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key)
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message)
        }
    }
}