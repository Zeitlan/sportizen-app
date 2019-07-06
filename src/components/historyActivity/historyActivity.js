/* eslint-disable linebreak-style */
import React from 'react'
import {Image, Animated, StyleSheet, TouchableHighlight, TouchableOpacity, FlatList, View, Text, Dimensions} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import Modal from 'react-native-modal'

import ListItem from './listActivity'
import { withContext } from '../../context'

var screen = Dimensions.get('window')

 
const radio_props = [
    {label: 'Affichage par jours', value: 0 },
    {label: 'Affichage par mois', value: 1 }
]


@withContext(['historyActions'], ['getHistory', 'filterData'])
class HistoryActivity extends React.Component{

    constructor(props){
        super(props)
        this.state={
            fadeAnim: new Animated.Value(0),
            dateFilter: 'days', // if days, means we have to display each activity by days
            radioInputValue: 0, 
            openModal: false
        }
        this._modal.bind(this)
    }

    async componentDidMount(){
        this._moveAnimation()
    }

    _moveAnimation = () => {
        const {actions : {getHistory}} = this.props
        getHistory().then(() => {
            Animated.timing(this.state.fadeAnim,           
                {
                    toValue: 1,                   
                    duration: 400,
                }).start()
        }).catch((error) => {
            console.log(error)
        })
    }

    /**
     * return header of the view (title + calendar)
     */

    _header = () => {
        return (
            <View style={styles.header}>
                <View style={{flex: 1, alignSelf: 'center'}}>
                    <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18}}> Historique d'activité</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10}}>
                    <TouchableHighlight style={{width: 32, height: 32}} onPress={() => this._openModal()}>
                        <Image source={require('../../../assets/history/calendar.png')}></Image>
                    </TouchableHighlight>
                </View>

            </View>
        )
    }

    /**
     * return the modal for filtering data
     */

    _modal = () => {
        return (
            <Modal  style={{marginLeft: 0}} visible={this.state.openModal} transparent={true} animationType="slide" onBackdropPress={() => this._closeModal()} onBackButtonPress={() => this._closeModal()}>
                <TouchableOpacity style={styles.Modal} onPress={() => this._closeModal()}>
                    <View style={{backgroundColor: 'white', width: 250, height: 150}}>
                        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>                        
                            <RadioForm
                                radio_props={radio_props}
                                initial={this.state.radioInputValue}
                                animation = {true}
                                onPress={(value) => {this.setState({radioInputValue : value})}}
                            />
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <TouchableOpacity style={{width: '100%', backgroundColor: '#1E90FF', height: 50, justifyContent: 'center', alignItems: 'center'}} onPress={() => this._changeDateFilter()}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}> Enregistrer </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>    
            </Modal>
        )
    }

    /**
     * change data filter, value is 0 if we want to filter by date or 1 if we want to filter by month
     */

    _changeDateFilter = () => {
        const actual_state_filter = this.state.dateFilter
        const new_filter = this.state.radioInputValue

        this._closeModal() // close the modal since data were saved
        if (new_filter === 0 && actual_state_filter === 'days' || new_filter === 1 && actual_state_filter === 'month')
            return // means nothing changed so just leave this functions
        
        const new_filter_as_string = (new_filter === 0)? 'days' : 'month' // convert 0 and 1 value to days or month

        this.setState({dateFilter: new_filter_as_string})    // set the state of the new date filter
        const {actions : {filterData}, state : {historyActions}} = this.props
        filterData(historyActions, new_filter_as_string) // filter the date which will dispatch the new array

    }
    _closeModal = () => {
        this.setState({openModal : false})
    }

    _openModal = () => {
        this.setState({openModal: true})
    }

    render(){
        const { actions: {postHistory, refreshData} } = this.props
        const {state : {historyActions}} = this.props // get all reports

        return (
            <View style={{flex : 1, backgroundColor: '#F1F1F3'}}>
                {this._header()}
                {this._modal()}
                <Animated.View style={{ flex: 1, opacity: this.state.fadeAnim, paddingBottom: 5}}>
                    <FlatList
                        style={{flex: 1}}
                        keyboardShouldPersistTaps={'always'}
                        data = {historyActions}
                        renderItem={({item, index}) => {
                            return (
                                <ListItem data={item} index={index} dateDateLength={historyActions.length}/>
                            )
                        }}
                        extraData = {historyActions}
                        keyExtractor={(item, index) => item.toString()}/>
                </Animated.View>
            </View>
        )
    }
}

export default HistoryActivity

const styles = StyleSheet.create({
    header : {
        flexDirection: 'row',
        backgroundColor: '#1E90FF', 
        height: 50,
        marginBottom: 20
    },
    Modal : {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        width: screen.width,
        height: screen.height,
        justifyContent: 'center',
        alignItems: 'center'
    }
})