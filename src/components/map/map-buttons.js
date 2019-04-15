// Dependencies
import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image} from 'react-native'

class MapButtons extends React.Component {
    
    state = {
        buttons: {
            user: require('../../../assets/map/cursor.png'),
            path: require('../../../assets/map/map.png')
        }
    }

    render() {
        const { coordinate } = this.props
        return (
            <View
                style={styles.container}>

                <TouchableOpacity onPress={this.props.setUserFollow} underlayColor="white" style={styles.buttonElm}>
                    <Image style={styles.buttonImg} source={this.state.buttons.user} />
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.zoomPath} underlayColor="white" style={styles.buttonElm}>
                    <Image style={styles.buttonImg} source={this.state.buttons.path} />
                </TouchableOpacity>
            </View>)
    }
}

export default MapButtons
    
// CSS
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '10%',
        alignSelf: 'flex-end',
        paddingRight: 10
    },

    buttonElm: {
        margin: 5,
        height:30,
        width: 30,
        marginTop: 10,
    },
    buttonImg: {
        flex: 1,
        height:30,
        width: 30,
        resizeMode: 'contain',
    }
})