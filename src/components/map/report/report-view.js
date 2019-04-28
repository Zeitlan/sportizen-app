// Dependencies
import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

class ReportView extends React.Component {
    state = {
        level: 2,
        commentary: 'Quelques travaux, possible de passer sur le côté mais pas très pratique.',
        date: '20/03/2018 - 21:30:20',
        imgs: {
            level_1: require('../../../../assets/report/report-1-selected.png'),
            level_2: require('../../../../assets/report/report-2-selected.png'),
            level_3: require('../../../../assets/report/report-3-selected.png'),
        },
    }

    getImgFromLevel = () => {
        const { level, imgs } = this.state
        if (level === 1) {
            return <Image style={styles.reportImg} source={imgs.level_1} />
        } else if (level === 2) {
            return <Image style={styles.reportImg} source={imgs.level_2} />
        } else {
            return <Image style={styles.reportImg} source={imgs.level_3} />
        }
    }
    render() {
        return (
            <View style={styles.informations}>
                {this.getImgFromLevel()}
                <View style={styles.content}>
                    <Text style={styles.date}>{this.state.date}</Text>
                    <Text style={styles.commentary}>{this.state.commentary}</Text>
                </View>
            </View>)
    }
}

export default ReportView
    
// CSS
const styles = StyleSheet.create({
    informations: {
        width: 300,
        padding: 5,
        paddingRight: 50,
        flexDirection:'row', 
    },
    content: {
        paddingLeft: 20,
    },
    date: {

    },
    commentary: {
        color: '#777777'
    },
    reportImg: {
        height:50,
        width: 50,
        resizeMode: 'contain',
    }
})