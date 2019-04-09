import React from 'react'
import { Platform, Alert, PermissionsAndroid } from 'react-native'

export const geoActions = (object) => {
    return {
        watchUserPosition: () => {
            const { dispatch } = object.actions
            const { currentWatchId } = object.state
            if (currentWatchId === undefined) {
                console.log('Watch position')
                watchId = navigator.geolocation.watchPosition(
                    position => {
                        dispatch({position: position})
                    },
                    error => Alert.alert(error.message),
                    { timeout: 20000 }
                )

                console.log(watchId)
                dispatch({currentWatchId: watchId})
            }
        },
        clearUserPosition: () => {
            const { dispatch } = object.actions
            const { currentWatchId } = object.state
            navigator.geolocation.clearUserPosition(currentWatchId)
            dispatch({currentWatchId: undefined})
        },

        requestPosPermission: async () => {
            try {
                const { dispatch } = object.actions
                if (Platform.OS === 'ios') {
                    dispatch({permissions: {location: true}})
                } else {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Need location Permission',
                            message:
                            'If you want to use this application' + 
                            ' allow location',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        },)
                    dispatch({permissions: {location:  PermissionsAndroid.RESULTS.GRANTED === 'granted'}}) 
                }
            } 
            catch (err) {
                console.warn(err)
            }
        },

        getSquarePos: (positions) => {
            let minLong = positions[0].longitude
            let minLat = positions[0].latitude
            let maxLong = positions[0].longitude
            let maxLat = positions[0].latitude
            for (let position in positions) {
                if (position.latitude > maxLat) {
                    maxLat = position.latitude
                }
                else if (position.latitude < minLat) {
                    minLat = position.latitude
                }
                if (position.longitude > maxLat) {
                    maxLong = position.longitude
                }
                else if (position.longitude < minLat) {
                    minLong = position.longitude
                }
            }
            return {southWest: { latitude: minLat, longitude: minLong}, northEast: { latitude: maxLat, lognitude: maxLong}}
        }
    }
}