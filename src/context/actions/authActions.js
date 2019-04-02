import { deviceStorage } from '../../storage/device-storage'
import { Alert } from 'react-native'

export const authActions = (object) => {
    return {
        signUpUser: async (mail, pwd, username) => {
            // TODO: Handle errors with return value
            const { dispatch, loginUser } = object.actions
            try {
                const request = await fetch('https://sportizen.ml/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept' : 'application/json'
                    },
                    body: JSON.stringify({
                        email: mail,
                        password: pwd,
                        username: username
                    })
                })
                const status = request.status
                if (status === 200) {
                    dispatch({logs: {info_notifier: 'User signed up'}})
                    return await loginUser(mail, pwd)
                } else if (status === 400) {
                    dispatch({logs: {error_notifier: '[400] Signed up Error: ' + json.error.message}})
                } else {
                    dispatch({logs: {error_notifier: '[' + status + '] Other Error: ' + json.error}})
                }
            }
            catch(error) {
                dispatch({logs: {error_notifier: 'ERROR: ' + error.message}})
            }
        },

        loginUser: async (mail, pwd) => {
            // TODO: Handle errors with return value
            const { dispatch } = object.actions
            let connected = false
            try {
                const request = await fetch('https://sportizen.ml/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept' : 'application/json'
                    },
                    body: JSON.stringify({
                        email: mail,
                        password: pwd,
                    })
                })
                const json = await request.json()
                const status = request.status
                if (status === 200) {
                    dispatch({
                        info_notifier: 'User signed up',
                        user: { token: json.token }
                    })
                    console.log(deviceStorage)
                    deviceStorage.saveItem('token', json.token)
                    connected = true
                } else if (status === 400 || status === 401) {
                    dispatch({logs: {error_notifier: '[' + status + '] Login Error: ' + JSON.stringify(json.error)}})
                } else {
                    dispatch({logs: {error_notifier: '[' + status + '] Other Error: ' + json.error}})
                }
            }
            catch(error) {
                dispatch({logs: {error_notifier: 'ERROR: ' + error.message}})
            }
            return connected
        },

        logoutUser: () => {
            const { dispatch } = object.actions
            dispatch({
                user: { token: undefined }
            })
            deviceStorage.removeItem('token')
        },

        getUserInformation: async () => {
            // TODO: Handle errors with return value
            const { dispatch } = object.actions
            const { user } = object.state
            try {
                
                const request = await fetch('https://sportizen.ml/api/users/me', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': user.token
                    },
                })

                const json = request.json()

                dispatch({
                    ...user,
                    user : {
                        email: json.email,
                        username: json.username
                    }
                })
            }
            catch(error) {
                dispatch({logs: {error_notifier: 'ERROR: ' + error.message}})
            }
        },
            
        checkLoginUser: async () => {
            const { dispatch, getUserInformation } = object.actions
            var connected = false
            deviceStorage.loadItem('token')
                .then((token) => {
                    dispatch({user : { token }})
                    getUserInformation()
                    connected = token !== undefined
                })
            return connected
        },
    }
}