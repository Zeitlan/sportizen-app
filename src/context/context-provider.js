import React from 'react'
import { Context } from './context'

export class ContextProvider extends React.PureComponent {
    state = {
        user: undefined,
        language: 'Francais',
        achievements: undefined,
        history: undefined,
        favorites: undefined,
        routes: undefined
    }

    actions = {
        fetchEntity: (name, stateName) => {
            const { dispatch } = this.actions
            window.fetch('http://sportizen.ml/api/' + name, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.getData)
            }).then((response) => {
                dispatch({network_status : response.status})
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