import React from 'react'
import { Alert } from 'react-native'

export const activityActions = (object) => {
    return {
        getLoopPath: (range) => {
            const { dispatch } = object.actions
            const { user: { token }, position, current_activity} =  object.state
            const url = 'https://sportizen.ml/api/routes/loop'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    profile_type: current_activity.sport_choice,
                    location: {longitude: position.coords.longitude, latitude: position.coords.latitude},
                    range: range,
                    range_type: 'distance'
                })
            }).then((response) => response.json())
                .then(json => {
                    dispatch({...current_activity, current_activity: {default_path: json.path}})
                })
                .catch((error) => {
                    console.log(error)
                })
        },

        getPathPoints: (pointA, pointB) => {
            const { dispatch } = object.actions
            const { user: { token }} =  object.state
            const url = 'https://sportizen.ml/api/routes/loop'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    profile_type: object.state.current_activity.sport_choice,
                    waypoints: [pointA, pointB]
                })
            }).then((response) => response.json())
                .then(json => {
                    dispatch({current_activity: {default_path: json.path}})
                })
                .catch((error) => {
                    console.log(error)
                })
        },

        setCurrentSport: (sport) => {
            const { dispatch } = object.actions
            dispatch({current_activity: {sport_choice: sport}})
        }
    }
}