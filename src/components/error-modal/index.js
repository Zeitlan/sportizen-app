// Dependencies
import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

class ErrorModal extends React.Component {
    render() {
        return (
            <Modal
                isVisible={this.props.modalVisible}
                style={styles.modal}
                onBackdropPress={() => this.props.closeModal()}
                onBackButtonPress={() => this.props.closeModal()}
                avoidKeyboard={true}>
                <View style={styles.content}>
                    <View style={styles.actionView}>
                        <TouchableOpacity onPress={() => this.props.closeModal()} underlayColor="white" style={{justifyContent: 'flex-end'}}>
                            <View>
                                <Text style={styles.buttonText}>X</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text}>{this.props.message}</Text>
                </View>
            </Modal>)
    }
}

export default ErrorModal
    
// CSS
const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    content: {
        backgroundColor: '#BF3B58',
        padding: 10,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    text:{
        padding: 10,
        color: '#F2F2F2'
    },
    actionView: {
        marginLeft: 'auto',
        padding: 5
    },
    buttonText: {
        fontSize: 16,
        color: '#F2F2F2'
    },
})