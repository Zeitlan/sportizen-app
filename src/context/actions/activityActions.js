import { Alert } from 'react-native'

export const activityActions = (object) => {
    return {
        getLoopPath: async (range) => {
            const { dispatch } = object.actions
            const { user: { token }, position, current_activity} =  object.state
            const url = 'https://sportizen.ml/api/routes/loopV2'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    profile_type: object.state.current_activity.sport_choice,
                    location: {longitude: position.coords.longitude, latitude: position.coords.latitude},
                    range: range,
                    range_type: 'distance'
                })
            }).then((response) => response.json())
                .then(json => {
                    current_activity.default_path = json.path
                    current_activity.user_path = current_activity.user_path.slice(-1)
                    current_activity.distance = 0
                    console.log(current_activity)
                    dispatch({current_activity})
                })
                .catch((error) => {
                    console.log(error)
                })
        },

        getPathPoints: (pointA, pointB) => {
            const { dispatch } = object.actions
            const { user: { token }, current_activity} =  object.state
            const url = 'https://sportizen.ml/api/routes/generate'
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
                    current_activity.default_path = json.path
                    console.log('CURRENT ACTIVITY')
                    console.log(current_activity)
                    dispatch({current_activity})
                })
                .catch((error) => {
                    console.log(error)
                })
        },

        setCurrentSport: (sport) => {
            const { dispatch } = object.actions
            const { current_activity } = object.state
            current_activity.sport_choice = sport
            dispatch({current_activity})
        },

        createActivity: () => {
            const { user: { token }, current_activity } =  object.state
            const { dispatch } = object.actions
            const url = 'https://sportizen.ml/api/activities'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    name: Date.now().toString(),
                    way_type: current_activity.sport_choice,
                })
            }).then((response) => response.json())
                .then(json => {
                    console.log('CREATE ACTIVITY')
                    console.log(json)
                    dispatch({server_activity: json})
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        
        updateActivityPoints: async () => {
            const { user: { token }, server_activity, current_activity } =  object.state
            const { dispatch } = object.actions
            const url = 'https://sportizen.ml/api/activities/' + server_activity.id + '/points'
            const newPoints = current_activity.user_path.map(point => {
                return {
                    position: {
                        latitude: point.latitude,
                        longitude: point.longitude
                    },
                    created_at: point.created_at
                }
            })
            console.log('UPDATE POINTS')
            console.log(newPoints)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    points: newPoints
                })
            })
            const json = await response.json()
            console.log(json)
        },

        getActivityResume: async (id = undefined) => {
            const { user: { token }, server_activity } =  object.state
            console.log(server_activity)
            if (!id) {
                id = server_activity.id
            }
            const response = await fetch('https://sportizen.ml/api/activities/' + id + '/resume', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            })
            const json = await response.json()
            console.log(json)
            return json
        }
    }
}