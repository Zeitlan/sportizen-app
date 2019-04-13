/* eslint-disable linebreak-style */
import React from 'react'
import { View, Image, TextInput, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import themeStyle from '../../styles/theme.style'

class FlatListItem extends React.Component {
    render() {
        data = this.props.item
        full_address = data['address']['houseNumber'] + ', ' + data['address']['street'] + ', ' +
            data['address']['postalCode'] + ', ' + data['address']['city'] + ', ' + data['address']['country']
        full_address = (full_address.includes('undefined'))? data['label'] : full_address    
        return(
            <TouchableOpacity onPress={() => console.log('clicked')}>
                <View style={{justifyContent:'center', height: 40}}>
                    <Text style={{paddingLeft: 10, fontSize: 13, fontWeight: '500'}}>{full_address} </Text>
                </View>
            </TouchableOpacity>
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

    fill_textinput(text)
    {
        if (textDepartFocus)
            this.setState({textDepart : text})
        else if (textArriveeFocus)
            this.setState({textArrivee : text})    
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
                <View style={{marginLeft: 10, marginRight: 10, backgroundColor:'#E8E8E8'}}>
                    <TextInput 
                        placeholder = "Départ"
                        returnKeyType = { 'next' }
                        onSubmitEditing={() => { this.secondTextInput.focus() }}
                        blurOnSubmit={false}
                        onChangeText={(text) => this.setState({textDepart : text}, () => {this.getAutoCompleteData(text)})}
                        value={this.state.textDepart}
                        onFocus={() => this.setState({textDepartFocus : true})}
                        onBlur={() => this.setState({textDepartFocus : false, dataCompletion : []})}
                        selectionColor='#B0C4DE'
                        underlineColorAndroid={(this.state.textDepartFocus == true)? '#B0C4DE' : '#A9A9A9'}/>
                </View>    
               
                <View style={{marginLeft: 10, marginRight: 10, marginTop: 12, backgroundColor: '#E8E8E8'}}>
                    <TextInput
                        ref={(input) => { this.secondTextInput = input }}
                        placeholder = "Arrivée"
                        onChangeText={(text) => this.setState({textArrivee : text}, () => {this.getAutoCompleteData(text)})}
                        value={this.state.textArrivee}
                        onFocus={() => {this.setState({textArriveeFocus : true})}}
                        onBlur={() => {this.setState({textArriveeFocus : false, dataCompletion : []})}}
                        selectionColor='#B0C4DE'
                        underlineColorAndroid={(this.state.textArriveeFocus == true)? '#B0C4DE' : '#A9A9A9'} />
                </View>

                <View style={{borderBottomColor:'#D3D3D3', borderBottomWidth: 1, margin: 15, marginTop: 8, marginBottom: 5}}></View>
                    
                <FlatList 
                    data = {this.state.dataCompletion}
                    renderItem={({item, index}) => {
                        return (
                            <FlatListItem item={item} index={index} textCallback={this.fill_textinput.bind(this)}>
                            </FlatListItem>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}/>
            </View> 
        )
    }
}