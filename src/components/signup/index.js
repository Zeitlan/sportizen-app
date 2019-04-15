// Dependencies
import React from 'react'
import { Alert, View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Text} from 'react-native'
import logo from '../../../assets/logo.png'
import themeStyle from '../../styles/theme.style'
import DefaultButton from '../connection/button'
import { withContext } from '../../context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackActions, NavigationActions } from 'react-navigation'


@withContext([],['signUpUser'])
class SignUpView extends React.Component {
    state = {
        email: '',
        username: '',
        password: '',
        validatepassword: '',
        signedUp: false
    }

    navigateToNextPage = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'ConnectionView' })],
        })
        this.props.navigation.dispatch(resetAction)
    }

    signUpUser = () => {
        const { actions: { signUpUser } } = this.props
        const { email, username, password, validatepassword } = this.state
        if (validatepassword !== password) {
            Alert.alert('Les mots de passes ne sont pas identique.')
        }
        signUpUser(email, password, username).then((signedUp) => {
            if (signedUp) {
                this.navigateToNextPage()
            }
        })
    }
    
    render() {
        const {validatepassword, password, username, email} = this.state
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
                                placeholder="Nom d'utilisateur"
                                onChangeText={(username) => this.setState({username})}
                                value={username}
                            />
                        </View>
                        <View style={[styles.divider, styles.simple_margin]}>
                            <TextInput
                                style={styles.text}
                                placeholder="Mail"
                                onChangeText={(email) => this.setState({email})}
                                value={email}
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
                        <View style={[styles.divider, styles.simple_margin]}>
                            <TextInput
                                style={styles.text}
                                placeholder='Confirmez le Mot de passe'
                                onChangeText={(validatepassword) => this.setState({validatepassword})}
                                secureTextEntry={true}
                                value={validatepassword}
                            />
                        </View>
                        <DefaultButton onPress={this.signUpUser}button_text="S'inscrire" button_style={styles.button_style} text_style={styles.text_style}/>
                    </View>
                </View>
            </KeyboardAwareScrollView>

        )
    }
}

export default SignUpView
    
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