// Dependencies
import React from 'react'
import { Alert, View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Text} from 'react-native'
import logo from '../../../assets/logo.png'
import themeStyle from '../../styles/theme.style'
import DefaultButton from './button'
import { withContext } from '../../context'
import ErrorModal from '../error-modal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackActions, NavigationActions } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'


@withContext(['user', 'logs'],['loginUser', 'getWeather', 'checkLoginUser', 'requestPosPermission', 'watchUserPosition'])
class ConnectionView extends React.Component {
    state = {
        username: 'a@b.fr',
        password: 'Testtes4',
        connected: false,
        error: undefined,
    }

    navigateToNextPage = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'UserProfilPage' })],
        })
        this.props.navigation.dispatch(resetAction)
    }
    componentDidMount() {
        const { actions: {checkLoginUser} } = this.props

        const { actions: { getWeather } } = this.props
        const { actions: { requestPosPermission, watchUserPosition } } = this.props
        getWeather()
        requestPosPermission().then(() => {
            watchUserPosition()
        })
        checkLoginUser().then((error) => {
            if (error === undefined) {
                this.navigateToNextPage()
            }
        })
    }

    loginUser = () => {
        const { actions: { loginUser, getUserInformation } } = this.props
        const { username, password } = this.state
        loginUser(username, password).then((error) => {
            if (error === undefined) {
                this.navigateToNextPage()
            }
            this.setState({error})
        })
    }
    
    render() {
        const {password, username, error} = this.state
        return (
            <KeyboardAwareScrollView
                innerRef={(ref) => { this.scroll = ref }}
                style={{ backgroundColor: '#F2F2F2' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={true} >
                <View style={styles.container}>
                    <ErrorModal modalVisible={error !== undefined} message={error !== undefined ? error.message : ''} closeModal={() => this.setState({error: undefined})}/>
                    <View style={styles.divider_img}>
                        <Image source={logo} style={styles.image}/>
                    </View>

                    <View style={styles.form}>                
                        <View style={[styles.divider, styles.simple_margin]}>
                            <TextInput
                                style={styles.text}
                                placeholder="Nom d'utilisateur / Mail"
                                onChangeText={(username) => this.setState({username})}
                                value={username}
                                keyboardType={'email-address'}
                            />
                        </View>
                        <View style={[styles.divider, styles.simple_margin]}>
                            <TextInput
                                style={styles.text}
                                placeholder='Mot de passe'
                                onChangeText={(password) => this.setState({password})}
                                secureTextEntry={true}
                                value={password}
                            />
                        </View>

                        <View style={styles.divider_suscribe_pass}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpView')} style={{alignItems:'flex-start', flex: 1, paddingStart: 20}}>
                                <Text style={{fontSize: 12}}>Inscrivez-vous</Text>
                            </TouchableOpacity>
                            <View style={{alignItems: 'flex-end', flex: 1, paddingEnd: 20}}>
                                <Text style={{fontSize: 12}}>Mot de passe oublié?</Text>
                            </View>
                        </View>
                        <DefaultButton onPress={this.loginUser}button_text='Se connecter' button_style={styles.button_style} text_style={styles.text_style}/>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

export default ConnectionView
    
// CSS
const styles = StyleSheet.create({
    divider_img: {
        flex: 1,
        margin: 30,
        marginTop: 150,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    form: {
        flex:3
    },
    color: {
        backgroundColor: '#000'
    },

    simple_margin: {
        marginBottom: 5
    },

    text: {
        flex:1,
        alignSelf: 'stretch',
        textAlign: 'center'
    },

    divider: {
        backgroundColor: '#EFEFEF',
        alignItems:'center',
        justifyContent: 'center',
        height: 50,
        margin: 15
    },

    button_style: {
        marginTop: 20,
        margin: 100,
        marginBottom: 5,
        backgroundColor: themeStyle.SECONDARY_COLOR,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text_style: {
        color: '#FFF'
    },

    divider_suscribe_pass: {
        marginTop: 15,
        alignSelf: 'stretch',
        flexDirection: 'row',
    }
})