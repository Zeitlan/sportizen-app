/* eslint-disable linebreak-style */
import React from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Text} from 'react-native'

export function ListViews()
{
    return (
        <View style={{flex : 1, justifyContent: 'center'}}>
            <Text> test </Text>
        </View>
    )
}

export default class AutoCompleteInput extends React.Component{

   

    constructor(props)
    {
        super(props)
        this.state = {
            textDepart: '',
            textArrivee: '',
            textDepartFocus: false,
            textArriveeFocus: false,
            dat: []
        }
        this.secondTextInput = React.createRef()
        this.getAutoCompleteData()
    }

    getAutoCompleteData()
    {
        const url = 'http://autocomplete.geocoder.api.here.com/6.2/suggest.json?' + 
        'app_id=gfirui7ZmAzXhfP0XBOz' + 
        '&app_code=rjN9gEq6jCDEcbPc1DJfvA' + 
        '&query=1 allée' +
        '&beginHighlight=&endHighlight=' +
        '&language=fr' // call api to get suggestions for street/adress

        fetch(url)
            .then(response => response.json())
            .then(data => {
                test = data['suggestions']
                console.log(test)
            })
        console.log('done')    

    }

    render()
    {
        return (
            <View>
                <TextInput placeholder = "Départ"
                    returnKeyType = { 'next' }
                    onSubmitEditing={() => { this.secondTextInput.focus() }}
                    blurOnSubmit={false}
                    onFocus={() => {this.setState(this.textDepartFocus = true)}}
                    onBlur={() => {this.setState(this.textDepartFocus = false)}}/>

                <TextInput
                    ref={(input) => { this.secondTextInput = input }}
                    placeholder = "Arrivée"
                    onFocus={() => {this.setState(this.textArriveeFocus = true)}}
                    onBlur={() => {this.setState(this.textArriveeFocus = false)}} />
        

            </View> )
    }
}