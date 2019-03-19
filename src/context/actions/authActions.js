import { deviceStorage } from '../../storage/device-storage'

export const authActions = (object) => {
    return {
        signUpUser: (mail, pwd, username) => {
            const { dispatch, loginUser } = object.actions
            fetch('https://sportizen.ml/auth/signup', {
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
            }).then((r) => r.json().then(json => ({status: r.status, json: json})))
                .then(({status, json}) => {
                    console.log(json)
                    if (status === 200) {
                        dispatch({logs: {info_notifier: 'User signed up'}})
                    } else if (status === 400) {
                        dispatch({logs: {error_notifier: '[400] Signed up Error: ' + json.error.message}})
                    } else {
                        dispatch({logs: {error_notifier: '[' + status + '] Other Error: ' + json.error}})
                    }
                    loginUser(mail, pwd)
                }).catch((error) => {
                    dispatch({logs: {error_notifier: 'ERROR: ' + error.message}})
                })
                
        },

        loginUser: (mail, pwd) => {
            const { dispatch } = object.actions
            fetch('https://sportizen.ml/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify({
                    email: mail,
                    password: pwd,
                })
            }).then((r) => r.json().then(json => ({status: r.status, json: json})))
                .then(({status, json}) => {
                    if (status === 200) {
                        dispatch({
                            info_notifier: 'User signed up',
                            user: { token: json.token }
                        })
                        console.log(deviceStorage)
                        deviceStorage.saveItem('token', json.token)
                    } else if (status === 400 || status === 401) {
                        dispatch({logs: {error_notifier: '[' + status + '] Login Error: ' + json.error}})
                    } else {
                        dispatch({logs: {error_notifier: '[' + status + '] Other Error: ' + json.error}})
                    }
                }).catch((error) => {
                    dispatch({logs: {error_notifier: 'ERROR: ' + error.message}})
                })
                
        },

        logoutUser: () => {
            const { dispatch } = object.actions
            dispatch({
                user: { token: undefined }
            })
            deviceStorage.removeItem('token')
        },
            
        checkLoginUser: () => {
            const { dispatch } = object.actions
            deviceStorage.loadItem('token')
                .then((token) => dispatch({token}))
        },
    }
}