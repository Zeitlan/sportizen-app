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
                const json = await request.json()
                const status = request.status
                if (status !== 200) {
                    return json.error
                }
            }
            catch(error) {
                return {
                    message: 'Erreur : ' + error.message
                }
            }
            return undefined
        },

        loginUser: async (mail, pwd) => {
            // TODO: Handle errors with return value
            const { dispatch } = object.actions
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
                } else if (status === 400 || status === 401) {
                    return json.error
                } else {
                    return json.error
                }
            }
            catch(error) {
                return 'ERROR: ' + error.message
            }
            return undefined
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
                return {
                    message: 'Erreur : ' + error.message
                }
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
            return {
                message: 'Token invalide'
            }
        },
    }
}