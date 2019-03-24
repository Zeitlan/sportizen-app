// Dependencies
import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import { withContext } from '../../context'
import SportElement from './sport-element'
import { tsImportEqualsDeclaration } from '@babel/types'

@withContext([],[])
class SportSelector extends React.Component {

    constructor() {
        super()
        this._onChangeSelected = this._onChangeSelected.bind(this)
        this.state = {
            selected: undefined,
            sports: {
                running: {
                    selected: require('../../../assets/sport/running-selected.png'),
                    notSelected: require('../../../assets/sport/running.png'),
                },
                cycling: {
                    selected: require('../../../assets/sport/bike-selected.png'),
                    notSelected: require('../../../assets/sport/bike.png'),
                }
            }
        }
    }
    

    _onChangeSelected(selected){
        this.setState({selected})
    }

    _onValidateSelected(selected){
        // Here, handle redirection with sport selected (check selected !)
    }
    
    render() {
        const { selected, sports } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Quel sport souhaitez-vous pratiquer ?</Text>
                    </View>
                    <View style={styles.sportList}>
                        <TouchableOpacity onPress={() => this._onChangeSelected(1)} underlayColor="white">
                            <SportElement selected={selected === 1} imgPath={selected === 1 ? sports.cycling.selected : sports.cycling.notSelected} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onChangeSelected(2)} underlayColor="white">
                            <SportElement selected={selected === 2} imgPath={selected === 2 ? sports.running.selected : sports.running.notSelected} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this._onValidateSelected} underlayColor="white">
                            <View>
                                <Text style={styles.buttonText}>Valider</Text>
                            </View>
                        </TouchableOpacity>
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
    buttonText: {
        fontSize: 20,
        color: '#00AEEF',
    },
})