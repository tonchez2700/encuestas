import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, ActivityIndicator, Animated, 
} from 'react-native';
import { general } from '../theme/customTheme';
import { Icon, Button, Slider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as AccountDataContext } from '../context/AccountDataContext';

import tw from 'tailwind-react-native-classnames'
import EntryList from '../components/EntryList';
import moment from 'moment';
import NoQuestion from '../components/NoQuestion';
import { log } from 'react-native-reanimated';

const HomeScreen = () => {

    const navigation = useNavigation();
    const { state, getUserQuestionnaires, clearState} = useContext(AccountDataContext);
    const [loading, setLoading] = useState(true);
    const [showNoQuestion, setShowNoQuestion] = useState(false);
    const [seccionIndex, setSeccionIndex] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //Cada que cambias de pantalla se corren estos metodos
            clearState();
            getUserQuestionnaires();
            setLoading(true);
            setShowNoQuestion(false);
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
            if (state.questionnaire.message == "Unauthenticated.") {
                setShowNoQuestion(true);
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [state.questionnaire]);

    const renderContent = () => {
        return (
            <View style={general.container}>
                <Text style={general.Tittle}>Encuestas</Text>
                <View style={{ marginVertical: 45 }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#012B54" style={tw`mt-5`} />
                        
                    ) : (
                        showNoQuestion
                        ? <NoQuestion />
                        : <EntryList data={state.questionnaire} />
                    )}
                </View>
            </View>
        );
    }

    return (
        !state.fetchingData
            ? !state.error
                ? renderContent()
                : <View style={tw`flex-1 p-5 justify-center items-center`}>
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
            : <ActivityIndicator size="large" color="#118EA6" style={tw`mt-5`} />
    )
}

export default HomeScreen;