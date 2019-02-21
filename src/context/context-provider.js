import React from 'react'
import { Context } from './context'

export class ContextProvider extends React.PureComponent {
    state = {
        user: undefined,
        achievements: undefined,
        network_status: undefined,
        error_notifier: undefined,
        warning_notifier: undefined,
        info_notifier: undefined,
        history: undefined,
        favorites: undefined,
        routes: undefined
    }

    actions = {
        fetchEntity: (name, stateName) => {
            const { dispatch } = this.actions
            fetch('http://sportizen.ml/api/' + name)
                .then((response) => {
                    dispatch({network_status : response.status})
                }).catch((error) => {
                    console.log('There has been a problem with your fetch operation: ' + error.message)
                    dispatch({network_status: 'ERROR' + error.message})
                })
        },

        signUpUser: (mail, pwd) => {
            const { dispatch } = this.actions
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
            }).then((response) => {
                if (response.status === 200) {
                    console.log('Signed up')
                    return response.json()
                } else if (response.status === 400) {
                    console.log('Signed up error')
                    return response.json()
                } else {
                    console.log('Other error, Status:' + response.status)
                }
                dispatch({network_status: response.status})
            }).then((json) => {
                console.log(json)
            }).catch((error) => {
                console.log('There has been a problem with your fetch operation: ' + error.message)
                dispatch({network_status: 'ERROR' + error.message})
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