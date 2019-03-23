// Dependencies
import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'
import MapView, { Marker, Callout, Polyline } from 'react-native-maps'
import { withContext } from '../../context'

@withContext([],[])
class SportSelector extends React.Component {

    
    render() {
        const { state: {position} } = this.props
        console.log(position)
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Quel sport souhaitez-vous pratiquer ?</Text>
                    </View>
                    <View style={styles.sportList}>
                        <View style={styles.sportElm}>
                            <Image style={styles.sportImg} source={require('../../../assets/sport/bike.png')} />
                        </View>
                        <View style={styles.sportElm}>
                            <Image style={styles.sportImg} source={require('../../../assets/sport/running.png')} />
                            <View style={styles.sportChose}></View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default SportSelector
    
// CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    sportChose: {
        paddingTop: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    title: {
        fontSize:30,
        textAlign: 'center',
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sportList: {
        flexDirection:'row', 
        justifyContent:'space-between',
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