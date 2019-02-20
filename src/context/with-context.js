import React from 'react'
import { Context } from './context'

/*
  The goal of this class is to provide a custom context with
  the actions and the props that are needed.

  You only have to add a decorator like this:

  @withcontext(['users'],['fetchElement'])

  which will get the 'users' prop, and 'fetchElement' action
*/
export function withContext (mapStateToProps, mapActionsToProps) {
    return (Component) => (
        class extends React.Component {

            createReducer = (properties) => {
                return (accumulator, property) => {
                    accumulator[property] = properties[property]
                    return accumulator
                }
            }

            renderComponent (context) {
                let stateProps = {}

                if (!Array.isArray(mapStateToProps)) {
                    stateProps = context.state
                } 
                else {
                    stateProps = mapStateToProps.reduce(this.createReducer(context.state), {})
                }
            
                let actionsProps = {}
                if (!Array.isArray(mapActionsToProps)) {
                    actionsProps = context.actions
                } else {
                    actionsProps = mapActionsToProps.reduce(this.createReducer(context.actions), {})
                }

                return <Component {...this.props} state={stateProps} actions={actionsProps}/>
            }

            render () {
                return (
                    <Context.Consumer>
                        {value => this.renderComponent(value)}
                    </Context.Consumer>
                )
            }
        }
    )
}
