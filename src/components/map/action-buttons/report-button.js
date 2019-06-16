// Dependencies
import React from 'react'
import { StyleSheet, Image, TouchableOpacity} from 'react-native'

class ReportButton extends React.Component {

    state = {
        img: require('../../../../assets/report/report-1-selected.png'),
    }
    render() {
        return (
            <TouchableOpacity 
                onPress={() => this.props._onClick()}
                underlayColor="white"
                style={styles.buttonStyle}>
                <Image style={styles.reportImg} source={this.state.img} />
            </TouchableOpacity>
        )
    }
}

export default ReportButton
    
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
        bottom: 20,
        left: 10,
    },
    reportImg: {
        flex: 1,
        height:50,
        width: 50,
        resizeMode: 'contain',
    }
})