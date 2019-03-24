// Dependencies
import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'
import { withContext } from '../../context'

@withContext([],[])
class SportElement extends React.Component {
    render() {
        const { selected, imgPath } = this.props
        return (
            <View style={styles.sportElm}>
                <Image style={styles.sportImg} source={imgPath} />
            </View>
        )
    }
}

export default SportElement
    
// CSS
const styles = StyleSheet.create({
    sportChose: {
        paddingTop: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    sportElm: {
        margin: 40,
        height:100,
        width: 100,
        marginTop: 60,
    },
    sportImg: {
        flex: 1,
        height:100,
        width: 100,
        resizeMode: 'contain',
    }
})