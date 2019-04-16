import React from 'react'
import { AlertIOS } from 'react-native'
import { Context } from './context'
import { authActions } from './actions/authActions'
import { geoActions } from './actions/geoActions'
import { activityActions } from './actions/activityActions'
import { weatherActions } from './actions/weatherActions'

export class ContextProvider extends React.PureComponent {
    state = {
        user: {
            mail: undefined,
            name: undefined,
            token: undefined
        },
        position: undefined,
        achievements: undefined,
        history: undefined,
        favorites: undefined,
        weather: undefined,
        current_activity: {
            default_path: undefined,
            user_path: undefined,
            sport_choice: undefined
        },
        language: 'Francais',
        permissions: {
            location: undefined,
        },
        logs: {
            error_notifier: undefined,
            warning_notifier: undefined,
            info_notifier: undefined
        }
    }

    actions = {
        fetchEntity: (name, stateName) => {
            const { dispatch } = this.actions
            fetch('http://sportizen.ml/api/' + name)
                .then((response) => {
                    dispatch({logs : {error_notifier : response.status}})
                }).catch((error) => {
                    dispatch({ logs : {error_notifier: 'ERROR: ' + error.message}})
                })
        },

        dispatch: (newState) => {
            this.setState({ ...newState })
        },
        ...authActions(this),
        ...geoActions(this),
        ...activityActions(this),
        ...weatherActions(this),
    }

    render () {
        return (
            <Context.Provider value={{ state: this.state, actions: this.actions }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}