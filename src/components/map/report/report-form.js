// Dependencies
import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import ReportElement from './report-element'
import { withContext } from '../../../context'

@withContext([], ['addReport'])
class ReportForm extends React.Component {
    
    state = {
        commentary: undefined,
        selected: 1,
        imgs: {
            level_1: {
                selected: require('../../../../assets/report/report-1-selected.png'),
                notSelected: require('../../../../assets/report/report-1.png'),
            },
            level_2: {
                selected: require('../../../../assets/report/report-2-selected.png'),
                notSelected: require('../../../../assets/report/report-2.png'),
            },
            level_3: {
                selected: require('../../../../assets/report/report-3-selected.png'),
                notSelected: require('../../../../assets/report/report-3.png'),
            }
        },
    }

    _resetForm = () => {
        this.setState({
            selected: 1,
            commentary: '',
        })
    }
    _onChangeSelected = (selected) => {
        this.setState({selected})
    }

    _onValidateSelected = () => {
        const { actions: { addReport }, position } = this.props
        const { selected, commentary} = this.state
        addReport(selected, commentary, position)
        this._resetForm()
        this.props.closeModal()
    }

    render() {
        const { imgs, selected } = this.state
        return (
            <Modal
                isVisible={this.props.modalVisible}
                style={styles.modal}
                onBackdropPress={() => this.props.closeModal()}
                onBackButtonPress={() => this.props.closeModal()}
                avoidKeyboard={true}>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.text}>Un commentaire sur cette perturbation ?</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Commentaire(s)"
                            onChangeText={(commentary) => this.setState({commentary})}
                            value={this.state.commentary}
                        />
                        <View style={styles.text}>
                            <Text>À quel point est-ce bloquant ?</Text>
                        </View>
                        <View style={styles.level_list}>
                            <TouchableOpacity onPress={() => this._onChangeSelected(1)} underlayColor="white">
                                <ReportElement selected={selected === 1} imgPath={selected === 1 ? imgs.level_1.selected : imgs.level_1.notSelected} />
                                <Text style={styles.subText}>Non bloquant</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._onChangeSelected(2)} underlayColor="white">
                                <ReportElement selected={selected === 2} imgPath={selected === 2 ? imgs.level_2.selected : imgs.level_2.notSelected} />
                                <Text style={styles.subText}>Peu bloquant</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._onChangeSelected(3)} underlayColor="white">
                                <ReportElement selected={selected === 3} imgPath={selected === 3 ? imgs.level_3.selected : imgs.level_3.notSelected} />
                                <Text style={styles.subText}>Bloquant</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actionView}>
                            <TouchableOpacity onPress={this._onValidateSelected} underlayColor="white">
                                <View>
                                    <Text style={styles.buttonText}>Valider</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>)
    }
}

export default ReportForm
    
// CSS
const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    text:{
        paddingTop: 10,
        paddingBottom: 10,
    },
    textInput: {
        marginTop: 10,
        marginBottom: 10,
        color: '#777777',
    },
    subText: {
        fontSize: 10,
        color: '#C8C8C8',
        textAlign: 'center',
    },
    level_list: {
        flexDirection:'row', 
        justifyContent:'space-between',
    },
    actionView: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttonText: {
        fontSize: 16,
        color: '#00AEEF',
    },
})