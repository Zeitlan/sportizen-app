import React from 'react'

const context = (datas, actions) => (WrappedComponent) => {
    return class extends React.Component {  
        state = {
            user: undefined,
            language: 'Francais',
            achievements: undefined,
            history: undefined,
            favorites: undefined,
            routes: undefined
        }

        actions = {
            getDataFromAPI: (name, id) => {
                console.log('Get ' + name + ' of id ' + id)
            },
            sendDataToAPI: (name, json) => {
                console.log('Send ' + name + ' containing ' + json)
            }
        }

        render() {
            return <WrappedComponent state={this.state} actions={this.actions} {...this.props} />
        }
    }
}
export default context