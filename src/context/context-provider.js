import React from 'react'
import { Context } from './context'
import { deviceStorage } from '../storage/device-storage'

export class ContextProvider extends React.PureComponent {
    state = {
        token: undefined,
        network_status: undefined,
        error_notifier: undefined,
        warning_notifier: undefined,
        info_notifier: undefined,
    }

    actions = {
        fetchEntity: (name, stateName) => {
            const { dispatch } = this.actions
            fetch('http://sportizen.ml/api/' + name)
                .then((response) => {
                    dispatch({error_notifier : response.status})
                }).catch((error) => {
                    dispatch({error_notifier: 'ERROR' + error.message})
                })
        },

        signUpUser: (mail, pwd) => {
            const { dispatch, loginUser } = this.actions
            fetch('https://sportizen.ml/signup', {
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
                        dispatch({info_notifier: 'User signed up'})
                    } else if (status === 400) {
                        dispatch({error_notifier: '[400] Signed up Error: ' + json.error.message})
                    } else {
                        dispatch({error_notifier: '[' + status + '] Other Error: ' + json.error})
                    }
                    loginUser(mail, pwd)
                }).catch((error) => {
                    dispatch({error_notifier: 'ERROR' + error.message})
                })
            
        },

        loginUser: (mail, pwd) => {
            const { dispatch } = this.actions
            fetch('https://sportizen.ml/login', {
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
                            token: json.token
                        })
                        console.log(deviceStorage)
                        deviceStorage.saveItem('token', json.token)
                    } else if (status === 400 || status === 401) {
                        dispatch({error_notifier: '[' + status + '] Login Error: ' + json.error})
                    } else {
                        dispatch({error_notifier: '[' + status + '] Other Error: ' + json.error})
                    }
                }).catch((error) => {
                    dispatch({error_notifier: 'ERROR' + error.message})
                })
            
        },

        dispatch: (newState) => {
            this.setState({ ...newState })
        }
    }

    render () {
        return (
            <Context.Provider value={{ state: this.state, actions: this.actions }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}