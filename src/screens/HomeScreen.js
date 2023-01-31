import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, ActivityIndicator
} from 'react-native';
import { Icon, Button } from 'react-native-elements'
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

    const renderContent = () => {

        return (
            <View style={{ flex: 1, backgroundColor: '#ECECEC', justifyContent: 'flex-start', padding: 10 }}>
                <ScrollView>
                   <View>
                    <Text>dasdas</Text>
                   </View>


                </ScrollView>
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

const styles = StyleSheet.create({
    iconBtn: {
        backgroundColor: '#2D5DA0'
    },
    TextItems: {
        width: '50%',
        color: '#23233C',
        fontWeight: 'bold'
    },
    TextTable: {
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 10,
        fontWeight: 'bold',
        color: 'white',
    },
    TextTableItems: {
        fontSize: 13,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1

    },
})
