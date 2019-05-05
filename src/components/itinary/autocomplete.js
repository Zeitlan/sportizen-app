/* eslint-disable linebreak-style */
import React from 'react'
import { Image, View, TextInput, Text, FlatList, StyleSheet, TouchableWithoutFeedback, ActivityIndicator, TouchableOpacity} from 'react-native'
import themeStyle from '../../styles/theme.style'
import getCoordinates from './getCoordinates'
import { withContext } from '../../context'

/**
 * The FlatList data corresponding to the Auto Complete View
 */

class FlatListItem extends React.Component {
    
    RenderingData(address){ // return the data view from autoComplete fetch
        return (
            <View style={{justifyContent:'center', height: 40}}>
                <Text style={{paddingLeft: 10, fontSize: 13, fontWeight: '500'}}>{address} </Text>
            </View>
        )
    }

    RenderingMaPosition(address){ // return the view for 'ma position' which is supposed to be into index 0
        return (
            <View style={{textAlign: 'center', justifyContent:'center', height: 40, flexDirection:'row'}}>
                <Image style={{width: 20, height: 20}} source={require('../../../assets/itinary/placeholder.png')}/>
                <Text style={{marginLeft: 10, fontSize: 15, fontWeight: '500'}}>{address} </Text>
            </View>
        )
    }

    getAdress(data, index)
    {
        if (index == 0) // ma position
            return data // return ma position
        full_address = data['address']['houseNumber'] + ', ' + data['address']['street'] + ', ' +
            data['address']['postalCode'] + ', ' + data['address']['city'] + ', ' + data['address']['country']
        return (full_address.includes('undefined'))? data['label'] : full_address
    }

    render() {
        index = this.props.index
        data = this.props.item
        full_address = this.getAdress(data, index) // get the adress which we're going to display for autocompletion
        const render_position = (index == 0)? this.RenderingMaPosition.bind(this) : this.RenderingData.bind(this) // if index == 0, 
        // then display the view for 'ma position', otherwise display the view for data fetch for auto complete

        return(
            <TouchableWithoutFeedback onPress={() => {this.props.textCallback(this.getAdress(this.props.item, this.props.index))}}>
                {render_position(full_address)}
            </TouchableWithoutFeedback>
        )
    }
}

@withContext([],['getPathPoints'])
class AutoCompleteInput extends React.Component{

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
        if (adress.trim() == '') // if no adress set, avoid call an api
            this.setState({
                dataCompletion : ['ma position'],
                loading: false})
        else
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
                        dataCompletion : ['ma position', ...dataJson['suggestions']],
                        loading: false
                    }), () => console.log(this.state))
                })
        }
                
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
        if (this.state.textDepart.trim() == '' || this.state.textArrivee.trim() == '') // all fields not completed
            this.setState({error: 'Tous les champs ne sont pas renseignés, Veuillez remplir tous les champs puis réessayer'})
        else{
            let is_error = false
            let position_depart = undefined
            let position_arrivee = undefined

            await getCoordinates(this.state.textDepart, 0).then((data) => { // get coordinates of text départ
                let error_ = data.error
                if (error_ != '') // means an error has occured
                    throw error_
                position_depart = {latitude: data.latitude, longitude: data.longitude}  // no error  
            }).catch((error_) => {
                this.setState({error : error_})
                is_error = true }) // error occured

            await getCoordinates(this.state.textArrivee, 1).then((data) => { // get coordinates of text arrivée
                let error_ = data.error
                if (error_ != '') // means an error has occured
                    throw error_
                position_arrivee = {latitude: data.latitude, longitude: data.longitude}    
            }).catch((error_) => {
                this.setState({error : error_})
                is_error = true }) // error occured

            if (is_error == false){ // means no errors have occured, we got all coordinates values
                console.log('position départ ', position_depart) // FIXME: ADD NAVIGATION THERE
                console.log('position arrivée ', position_arrivee)

                const { actions: { getPathPoints } } = this.props
                getPathPoints(position_depart, position_arrivee)
                this.props.navigation.navigate('CustomMapView')
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
                        onFocus={() => this.setState({textDepartFocus : true, textArriveeFocus : false, dataCompletion : ['ma position']})}
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
                        onFocus={() => {this.setState({textArriveeFocus : true, textDepartFocus: false, dataCompletion : ['ma position']})}}
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
export default AutoCompleteInput

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