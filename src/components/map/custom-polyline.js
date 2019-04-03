// Dependencies
import React from 'react'
import { withContext } from '../../context'
import { Polyline } from 'react-native-maps'

@withContext(['current_activity'],[])
class CustomPolyline extends React.Component {
    
    render() {
        const { state: {current_activity} } = this.props
        return (
            <Polyline
                coordinates={current_activity.default_path ? current_activity.default_path : []}
                strokeWidth={1}
            />)
    }
}

export default CustomPolyline