import React, { useState } from 'react';
import { SafeAreaView, Text, Alert, AsyncStorage, TextInput, TouchableOpacity } from 'react-native';


import styles from './styles/BookStyles';

import api from '../services/api';

function Book({ route, navigation }){

    const [date, setData] = useState('')

    const id = route.params.id

    function handleCancel(){
        navigation.navigate('List')
    }

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    }

    return (
    <SafeAreaView>
        <Text style={styles.label}> DATA DE INTERESSE * </Text>

        <TextInput 
            style={styles.input}
            placeholder="Qual data você quer reservar?"        
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={date}
            onChangeText={setData} 
        />

    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}> Solicitar reserva </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}> Cancelar </Text>
            </TouchableOpacity>
    </SafeAreaView>
    )
}

export default Book;