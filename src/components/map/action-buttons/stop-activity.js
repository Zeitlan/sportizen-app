// Dependencies
import React from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native'

class StopActivityButton extends React.Component {
    render() {
        return (
            <TouchableOpacity 
                onPress={() => this.props._onClick()}
                underlayColor="white"
                style={styles.buttonStyle}>
                <Text style={styles.text}>STOP</Text>
            </TouchableOpacity>
        )
    }
}

export default StopActivityButton
    
// CSS
const styles = StyleSheet.create({
    buttonStyle: {
        borderWidth:1,
        borderColor:'#CCCCCC',
        alignItems:'center',
        justifyContent:'center',
        width:75,
        height:75,
        backgroundColor:'#f2f2f2',
        borderRadius:50,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    text: {
        color: '#BF3B58',
        fontWeight: 'bold'
    }
})