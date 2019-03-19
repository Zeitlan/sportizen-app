import React from 'react'

export const geoActions = (object) => {
    return {
        watchUserPosition: () => {
            const { dispatch } = object.actions
            const { currentWatchId } = object.state
            if (currentWatchId === undefined) {
                watchId = navigator.geolocation.watchPosition(
                    position => {
                        dispatch({position: position})
                    },
                    error => Alert.alert(error.message),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                )
                dispatch({currentWatchId: watchId})
            }
        },
        clearUserPosition: () => {
            const { dispatch } = object.actions
            const { currentWatchId } = object.state
            navigator.geolocation.clearUserPosition(currentWatchId)
            dispatch({currentWatchId: undefined})
        },
    }
}