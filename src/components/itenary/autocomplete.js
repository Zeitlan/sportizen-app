/* eslint-disable linebreak-style */
import React from 'react'
import { View, TextInput, Text, FlatList, TouchableWithoutFeedback, ActivityIndicator} from 'react-native'
import themeStyle from '../../styles/theme.style'

class FlatListItem extends React.Component {
    
    getAdress(data)
    {
        full_address = data['address']['houseNumber'] + ', ' + data['address']['street'] + ', ' +
            data['address']['postalCode'] + ', ' + data['address']['city'] + ', ' + data['address']['country']
        return (full_address.includes('undefined'))? data['label'] : full_address
    }

    render() {
        data = this.props.item
        full_address = this.getAdress(data) // get the adress which we're going to display for autocompletion
        return(
            <TouchableWithoutFeedback onPress={() => {this.props.textCallback(this.getAdress(this.props.item))}}>
                <View style={{justifyContent:'center', height: 40}}>
                    <Text style={{paddingLeft: 10, fontSize: 13, fontWeight: '500'}}>{full_address} </Text>
                </View>
            </TouchableWithoutFeedback>
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
            dataCompletion: [], // data for auto completion
            loading: false // if api is being called, loading = true
        }
        this.secondTextInput = React.createRef()
        this.AutoCompleteView = this.AutoCompleteView.bind(this)
        this.fill_textinput = this.fill_textinput.bind(this)
    }

    fill_textinput(text)
    {
        if (this.state.textDepartFocus)
            this.setState({textDepart : text, dataCompletion : []})
        else if (this.state.textArriveeFocus)
            this.setState({textArrivee : text, dataCompletion : []}) 
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
                    dataCompletion : dataJson['suggestions'],
                    loading: false
                }), () => console.log(this.state))
            })
    }

    AutoCompleteView()
    {
        if (!this.state.loading) // means api was called
        {
            return(
                <FlatList
                    keyboardShouldPersistTaps={'always'}
                    data = {this.state.dataCompletion}
                    renderItem={({item, index}) => {
                        return (
                            <FlatListItem item={item} index={index} textCallback={this.fill_textinput}>
                            </FlatListItem>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}/>
            )
        }

        return(
            <View style={{alignItems: 'center', justifyContent: 'center', height: 50}}>
                <ActivityIndicator size='large' color = {themeStyle.PRIMARY_COLOR}/>
            </View>
        )
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
                        onChangeText={(text) => this.setState({textDepart : text, loading : true}, () => {this.getAutoCompleteData(text)})}
                        value={this.state.textDepart}
                        onFocus={() => this.setState({textDepartFocus : true, textArriveeFocus : false, dataCompletion : []})}
                        selectionColor='#B0C4DE'
                        underlineColorAndroid={(this.state.textDepartFocus == true)? '#B0C4DE' : '#A9A9A9'}/>
                </View>    
               
                <View style={{marginLeft: 10, marginRight: 10, marginTop: 12, backgroundColor: '#E8E8E8'}}>
                    <TextInput
                        ref={(input) => { this.secondTextInput = input }}
                        placeholder = "Arrivée"
                        onChangeText={(text) => this.setState({textArrivee : text, loading : true}, () => {this.getAutoCompleteData(text)})}
                        value={this.state.textArrivee}
                        onFocus={() => {this.setState({textArriveeFocus : true, textDepartFocus: false, dataCompletion : []})}}
                        selectionColor='#B0C4DE'
                        underlineColorAndroid={(this.state.textArriveeFocus == true)? '#B0C4DE' : '#A9A9A9'} />
                </View>

                <View style={{borderBottomColor:'#D3D3D3', borderBottomWidth: 1, margin: 15, marginTop: 8, marginBottom: 5}}></View>
                    
                <this.AutoCompleteView/>
            </View> 
        )
    }
}