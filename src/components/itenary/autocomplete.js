/* eslint-disable linebreak-style */
import React from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Text, FlatList} from 'react-native'

class FlatListItem extends React.Component {
    render() {
        data = this.props.item
        full_address = data['address']['houseNumber'] + ', ' + data['address']['street'] + ', ' +
            data['address']['postalCode'] + ', ' + data['address']['city'] + ', ' + data['address']['country']
        return( 
            <View style={{justifyContent:'center', alignSelf: 'baseline', height: 40}}>
                <Text style={{paddingLeft: 10, fontSize: 13, fontWeight: '500'}}>{ full_address} </Text>
            </View>
        )
    }
}

export default class AutoCompleteInput extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            textDepart: '',
            textArrivee: '',
            textDepartFocus: false,
            textArriveeFocus: false, // if the text is focus = true
            dataCompletion: [] // data for auto completion
        }
        this.secondTextInput = React.createRef()
    }

    getAutoCompleteData(adress)
    {
        const url = 'http://autocomplete.geocoder.api.here.com/6.2/suggest.json?' + 
        'app_id=gfirui7ZmAzXhfP0XBOz' + 
        '&app_code=rjN9gEq6jCDEcbPc1DJfvA' + 
        '&query=' + adress +
        '&beginHighlight=&endHighlight=' +
        '&language=fr' // call api to get suggestions for street/adress

        fetch(url)
            .then(response => response.json())
            .then(data => {
                dataJson = JSON.parse(JSON.stringify(data))    
                this.setState(() => ({
                    dataCompletion : dataJson['suggestions']
                }), () => console.log(this.state))
            })
    }

    render()
    {
        return (
            <View>
                <TextInput placeholder = "Départ"
                    returnKeyType = { 'next' }
                    onSubmitEditing={() => { this.secondTextInput.focus() }}
                    blurOnSubmit={false}
                    onChangeText={(text) => this.setState({textDepart : text}, () => {this.getAutoCompleteData(text)})}
                    onFocus={() => this.setState({textDepartFocus : true})}
                    onBlur={() => this.setState({textDepartFocus : false})}/>

                <TextInput
                    ref={(input) => { this.secondTextInput = input }}
                    placeholder = "Arrivée"
                    onChangeText={(text) => this.setState({textArrivee : text})}
                    onFocus={() => {this.setState({textArriveeFocus : true})}}
                    onBlur={() => {this.setState({textArriveeFocus : false})}} />

                <View style={{borderBottomColor:'#D3D3D3', borderBottomWidth: 1, margin: 15, marginTop: 2, marginBottom: 5}}></View>

                <FlatList 
                    data = {this.state.dataCompletion}
                    renderItem={({item, index}) => {
                        return (
                            <FlatListItem item={item} index={index}>
                            </FlatListItem>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}/>
            </View> 
        )
    }
}