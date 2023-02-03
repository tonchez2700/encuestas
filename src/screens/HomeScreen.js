import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, ActivityIndicator, Animated
} from 'react-native';
import { general } from '../theme/customTheme';
import { Icon, Button, Slider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as AccountDataContext } from '../context/AccountDataContext';

import tw from 'tailwind-react-native-classnames'
import EntryList from '../components/EntryList';
import moment from 'moment';



const HomeScreen = () => {


    const navigation = useNavigation();
    const { state,
        setDataAccount,
    } = useContext(AccountDataContext);


    const data = [
        {
            name: 'Cuestionario NOM - 035 - STPS  F2018. Guia de referencia III',
            cantidad: 43,
            porcentaje: .2
        },
        {
            name: 'Cuestionario para  identificar a los trabajadores sujetos a ATS',
            cantidad: 32,
            porcentaje: .4
        },
        {
            name: 'Cuestionario para  identificar a los trabajadores sujetos a ATS',
            cantidad: 73,
            porcentaje: .5
        },
        {
            name: 'Cuestionario para  identificar a los trabajadores sujetos a ATS',
            cantidad: 93,
            porcentaje: .6
        },
        {
            name: 'Cuestionario para  identificar a los trabajadores sujetos a ATS',
            cantidad: 73,
            porcentaje: .9
        },
    ]
    const renderContent = () => {

        return (
            <View style={general.container}>
                <Text style={general.Tittle}>Encuestas</Text>
                <View style={{marginVertical: 63}}>
                    <EntryList
                        data={data} />
                </View>
            </View >

        );
    }

    return (
        !state.fetchingData
            ?
            !state.error
                ?
                renderContent()
                :
                <View style={tw`flex-1 p-5 justify-center items-center`}>
                    <Text style={tw`text-center text-lg mb-3`}>
                        {state.message}
                    </Text>
                    <Button
                        containerStyle={{ width: 120 }}
                        buttonStyle={[{ backgroundColor: '#118ea6' }]}
                        title="Actualizar"
                        onPress={() => setDataAccount()}
                    />
                </View>
            :
            <ActivityIndicator size="large" color="#118EA6" style={tw`mt-5`} />
    )
}
export default HomeScreen

const styles = StyleSheet.create({})
