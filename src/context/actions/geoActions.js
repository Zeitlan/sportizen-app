import React from 'react'
import { Platform, Alert, PermissionsAndroid } from 'react-native'
import { point } from '@turf/helpers'
import distance from '@turf/distance'

export const geoActions = (object) => {
    return {
        watchUserPosition: () => {
            const { dispatch, handlePosition } = object.actions
            const { currentWatchId } = object.state
            if (currentWatchId === undefined) {
                console.log('Watch position')
                watchId = navigator.geolocation.watchPosition(
                    position => handlePosition(position),
                    error => Alert.alert(error.message),
                    {timeout: 20000, maximumAge: 0, distanceFilter: 1}
                )

                console.log(watchId)
                dispatch({currentWatchId: watchId})
            }
        },

        handlePosition: (position) => {
            const { dispatch } = object.actions
            const { current_activity } = object.state
            let new_user_path = current_activity.user_path.slice()
            new_user_path.push({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
            current_activity.user_path = new_user_path
            position.coords.speed = position.coords.speed * 2.23694
            if (new_user_path.length > 1) {
                let point1 = point([position.coords.longitude, position.coords.latitude])
                let point2 = point([new_user_path[new_user_path.length - 2].longitude, new_user_path[new_user_path.length - 2].latitude])
                current_activity.distance += distance(point1, point2)
            }
            dispatch({
                position: position, 
                current_activity,
            })
        },
        stopFollowingUser: () => {
            const { dispatch } = object.actions
            const { currentWatchId } = object.state
            navigator.geolocation.clearWatch(currentWatchId)
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
        }
    }
}