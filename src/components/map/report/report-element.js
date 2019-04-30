// Dependencies
import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'

class ReportElement extends React.Component {
    render() {
        const { imgPath } = this.props
        return (
            <View style={styles.reportElm}>
                <Image style={styles.reportImg} source={imgPath} />
            </View>
        )
    }
}

export default ReportElement
    
// CSS
const styles = StyleSheet.create({
    reportElm: {
        margin: 10,
        height:50,
        width: 50,
    },
    reportImg: {
        flex: 1,
        height:50,
        width: 50,
        resizeMode: 'contain',
    }
})