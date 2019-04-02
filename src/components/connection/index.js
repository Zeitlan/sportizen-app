// Dependencies
import React from 'react'
import { Alert, View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Text} from 'react-native'
import logo from '../../../assets/logo.png'
import themeStyle from '../../styles/theme.style'
import DefaultButton from './button'
import { withContext } from '../../context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackActions, NavigationActions } from 'react-navigation'


@withContext(['user', 'logs'],['loginUser', 'checkLoginUser'])
class ConnectionView extends React.Component {
    state = {
        username: 'a@b.fr',
        password: 'Testtes4',
        connected: false
    }

    navigateToNextPage = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SportSelector' })],
        })
        this.props.navigation.dispatch(resetAction)
    }
    componentDidMount() {
        const { actions: {checkLoginUser} } = this.props
        checkLoginUser().then((connected) => {
            if (connected) {
                this.navigateToNextPage()
            }
        })
    }

    loginUser = () => {
        const { actions: { loginUser } } = this.props
        const { username, password } = this.state
        loginUser(username, password).then((connected) => {
            if (connected) {
                this.navigateToNextPage()
            }
        })
    }
    
    render() {
        return (
            <KeyboardAwareScrollView
                innerRef={(ref) => { this.scroll = ref }}
                style={{ backgroundColor: '#2896d3' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={true} >
                <View style={styles.container}>
                    <View style={styles.divider_img}>
                        <Image source={logo} style={styles.image}/>
                    </View>

                    <View style={styles.form}>                
                        <View style={[styles.divider, styles.simple_margin]}>
                            <TextInput
                                style={styles.text}
                                maxLength={13}
                                placeholder="Nom d'utilisateur / Mail"
                                textAlign={'left'}
                                onChangeText={(username) => this.setState({username})}
                            />
                        </View>
                        <View style={[styles.divider, styles.simple_margin]}>
                            <TextInput
                                style={styles.text}
                                placeholder='Mot de passe'
                                textAlign={'left'}
                                onChangeText={(password) => this.setState({password})}
                                secureTextEntry={true}
                            />
                        </View>

                        <View style={styles.divider_suscribe_pass}>
                            <View style={{alignItems:'flex-start', flex: 1, paddingStart: 20}}>
                                <Text style={{fontSize: 10}}>Inscrivez vous</Text>
                            </View>
                            <View style={{alignItems: 'flex-end', flex: 1, paddingEnd: 20}}>
                                <Text style={{fontSize: 10}}>mot de passe oublié?</Text>
                            </View>
                        </View>
                        <DefaultButton onPress={this.loginUser}button_text='Connect' button_style={styles.button_style} text_style={styles.text_style}/>
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
        margin: 5,
        marginTop: 150,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
        height: 42,
        fontSize: 13,
        borderBottomWidth: 1,
        borderBottomColor:'#D3D3D3',
        paddingBottom: 2    
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