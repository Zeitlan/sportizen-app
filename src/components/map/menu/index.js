// Dependencies
import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import SpeedView from '../speed/speed-view'

class MapMenu extends React.Component {
    
    state = {
        buttons: {
            user: require('../../../../assets/map/cursor.png'),
            path: require('../../../../assets/map/map.png')
        }
    }
    render() {
        const { coordinate } = this.props
        return (
            <View
                style={styles.container}>
                <SpeedView/>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={this.props.setUserFollow} underlayColor="white" style={styles.buttonElm}>
                        <Image style={styles.buttonImg} source={this.state.buttons.user} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.zoomPath} underlayColor="white" style={styles.buttonElm}>
                        <Image style={styles.buttonImg} source={this.state.buttons.path} />
                    </TouchableOpacity>
                </View>
            </View>)
    }
}

export default MapMenu
    
// CSS
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '0%',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20,
        width: '100%',
        height: 80,
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor: '#F2F2F2',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        
    },

    buttonElm: {
        margin: 5,
        height:30,
        width: 30,
        marginLeft: 20,
    },
    buttonImg: {
        flex: 1,
        height:30,
        width: 30,
        resizeMode: 'contain',
    }
})