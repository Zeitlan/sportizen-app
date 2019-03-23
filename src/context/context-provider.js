import React from 'react'
import { Context } from './context'
import { authActions } from './actions/authActions'
import { geoActions } from './actions/geoActions'

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
        routes: undefined,
        language: 'Francais',
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
        ...geoActions(this)
    }

    render () {
        return (
            <Context.Provider value={{ state: this.state, actions: this.actions }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}