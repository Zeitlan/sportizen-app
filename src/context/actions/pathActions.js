import React from 'react'
import {  } from 'react-native'

export const pathActions = (object) => {
    return {
        getLoopPath: (range, profile_type) => {
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
                    profile_type: profile_type,
                    location: {longitude: position.coords.longitude, latitude: position.coords.latitude},
                    range: range,
                    range_type: 'distance'
                })
            }).then((response) => response.json())
                .then(json => {
                    console.log(json)
                    dispatch({current_route: json})
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        getPathPoints: (pointA, pointB, profile_type) => {
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
                    profile_type: profile_type,
                    waypoints: [pointA, pointB]
                })
            }).then((response) => response.json())
                .then(json => {
                    console.log(json)
                    dispatch({current_route: json})
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}