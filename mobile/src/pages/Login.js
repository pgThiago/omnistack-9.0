import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Text, Image, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles/LoginStyles';

import logo from'../assets/logo.png';

import api from '../services/api';

function Login({ navigation }){

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('List');
            }
        })

    }, [])


    async function handleSubmit(){
        // email, techs
        // Na rota sessions cadastra o email do usuário passando no 2° parâmetro

        const response = await api.post('/sessions', { 
            email
        })

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }


    return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
        <Image source={logo} />

        <View style={styles.form}>
            <Text style={styles.label}>SEU E-MAIL *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>TECNOLOGIAS *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Tecnologias de interesse"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}> Encontrar spot </Text>
            </TouchableOpacity>

        </View>
    </KeyboardAvoidingView>
    )
}

export default Login;