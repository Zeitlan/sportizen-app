/* eslint-disable linebreak-style */
import React from 'react'
import { Image, View, TextInput, Text, FlatList, StyleSheet, TouchableWithoutFeedback, ActivityIndicator, TouchableOpacity} from 'react-native'
import themeStyle from '../../styles/theme.style'
import getCoordinates from './getCoordinates'

/**
 * The FlatList data corresponding to the Auto Complete View
 */

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
            loading: false, // if api is being called, loading = true
            error: null
        }
        this.secondTextInput = React.createRef()
        this.AutoCompleteView = this.AutoCompleteView.bind(this)
        this.fill_textinput = this.fill_textinput.bind(this)
        this._onValidateSelected = this._onValidateSelected.bind(this)
        this.ValidateData.bind(this)
    }

    /**
     *  when user clicks on autocomplete data, fill the text input which was focused
     * @param {*} text the new text of the text input
     */

    fill_textinput(text)
    {
        if (this.state.textDepartFocus)
            this.setState({textDepart : text, dataCompletion : []})
        else if (this.state.textArriveeFocus)
            this.setState({textArrivee : text, dataCompletion : []}) 
    }

    /**
     * Call the api for autoComplete data 
     * @param {*} adress adress typed by the user
     */

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

    /**
     * Auto Complete data
     */

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


    _onValidateSelected(){
        this.props.navigation.navigate('CustomMapView')
    }
    /**
     * if there is an error, renders this function
     */

    Render_error(){
        return (this.state.error === null)? (null) : <Text style={{color: 'red', margin: 2, textAlign: 'center'}}> {this.state.error} </Text> 
    }
    
    /**
     * When user Clicks on Button 'Research', get the coordinates to launch the running traject, check before is there is error
     */

    async ValidateData(){
        if (this.state.textDepart.trim() == '' || this.state.textDepart.trim() == '') // all fields not completed
            this.setState({error: 'Tous les champs ne sont pas renseignés, Veuillez remplir tous les champs puis réessayer'})
        else{
            let is_error = false
            let position_depart = undefined
            let position_arrivee = undefined

            await getCoordinates(this.state.textDepart).then((data) => { // get coordinates of text départ
                let error_ = data.error
                if (error_ != '') // means an error has occured
                    throw error_
                position_depart = {latitude: data.latitude, longitude: data.longitude}  // no error  
            }).catch((error_) => {
                this.setState({error : error_})
                is_error = true  }) // error occured

            await getCoordinates(this.state.textArrivee).then((data) => { // get coordinates of text arrivée
                let error_ = data.error
                if (error_ != '') // means an error has occured
                    throw error_
                position_arrivee = {latitude: data.latitude, longitude: data.longitude}    
            }).catch((error_) => {this.setState({error : error_})
                is_error = true  }) // error occured
            if (is_error == false){
                console.log('position départ ', position_depart) // FIXME ADD NAVIGATION THERE
                console.log('position arrivée ', position_arrivee)
            }
        }
    }

    render()
    {
        const render_error = this.Render_error.bind(this)
        return (
            <View>
                <View style={{marginLeft: 10, marginRight: 10, backgroundColor:'#E8E8E8'}}>
                    <TextInput 
                        placeholder = "Départ"
                        returnKeyType = { 'next' }
                        onSubmitEditing={() => { this.secondTextInput.focus() }}
                        blurOnSubmit={false}
                        style={styles.inputs}
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
                        style={styles.inputs}
                        onChangeText={(text) => this.setState({textArrivee : text, loading : true}, () => {this.getAutoCompleteData(text)})}
                        value={this.state.textArrivee}
                        onFocus={() => {this.setState({textArriveeFocus : true, textDepartFocus: false, dataCompletion : []})}}
                        selectionColor='#B0C4DE'
                        underlineColorAndroid={(this.state.textArriveeFocus == true)? '#B0C4DE' : '#A9A9A9'} />
                </View>

                {render_error()}

                <TouchableOpacity onPress={() =>  {this.ValidateData()}}>
                    <View style={styles.button_validation}>
                        <Image style={{width: 15, height: 15}} source={require('../../../assets/itinary/search.png')}></Image>
                        <Text style={{marginLeft: 8}}>Rechercher</Text>
                    </View>
                </TouchableOpacity>

                <View style={{borderBottomColor:'#D3D3D3', borderBottomWidth: 1, margin: 15, marginTop: 8, marginBottom: 5}}></View>
                    
                <this.AutoCompleteView/>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    button_validation: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 20,
        marginTop: 12, 
        marginLeft: 50, 
        marginRight: 50, 
        backgroundColor: '#D8D8D8', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    inputs: {
        fontSize: 18,
        padding: 10,
    }
})