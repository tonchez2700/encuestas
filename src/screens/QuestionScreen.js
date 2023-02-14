import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, ActivityIndicator, Dimensions
} from 'react-native';
import { QuestionStyle } from '../theme/customTheme';
import { Icon, Button, ButtonGroup, LinearProgress } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as AccountDataContext } from '../context/AccountDataContext';
import ModalAlert from '../components/Modal/ModalAlert';
import tw from 'tailwind-react-native-classnames'
import * as Progress from 'react-native-progress';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;

const QuestionScreen = () => {


    const navigation = useNavigation();
    const { state: dataState,
        setDataAccount,
        isVisibleModal
    } = useContext(AccountDataContext);

    const [index, setindex] = useState()


    const renderContent = () => {

        return (


            <View style={QuestionStyle.container}>
                <ScrollView>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#6C6767' }}>Pregunta 1 de 45</Text>
                    <View style={{ marginVertical: 20 }}>
                        <LinearProgress
                            value={50 / 100}
                            variant="determinate"
                            style={{ height: 10 }}
                            color="#012B54"
                        />
                        <View style={QuestionStyle.CardQuestHelp}>
                            <View style={{ width: '80%', flex: 1, padding: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: '#6C6767' }}>Preguta 1</Text>
                                <Text style={{ fontSize: 14.5, fontWeight: '400' }}>
                                    El espacio donde trabaja me permite realizar
                                    mis actividades de manera segura e higienica</Text>
                            </View>
                            <View style={{ width: '20%', borderColor: '#B7B7B7', }}>
                                <TouchableOpacity onPress={() => isVisibleModal()} style={QuestionStyle.ButtonQuestHelp}>
                                    <Icon
                                        size={58}
                                        name='question-circle-o'
                                        type='font-awesome'
                                        color={"white"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>

                            <ButtonGroup
                                buttons={['Multiple', 'Select', 'Button', 'Group']}
                                vertical={true}
                                onPress={(value) => setindex(value)}
                                selectedIndex={index}
                                textStyle={{ fontSize: 20, fontWeight: '400' }}
                                selectedTextStyle={{ color: 'white' }}
                                selectedButtonStyle={{ backgroundColor: '#012B54' }}
                                containerStyle={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF', marginTop: 35 }}
                                buttonContainerStyle={{ marginBottom: 20, height: 70, }}
                                buttonStyle={QuestionStyle.ButtonGruopQuest}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button
                                onPress={() => { isVisibleModal() }}
                                titleStyle={{ fontSize: 17 }}
                                title={'Regresar'}
                                containerStyle={{ alignItems: 'center' }}
                                buttonStyle={{ backgroundColor: 'gray', borderRadius: 9, width: '80%' }}
                            />
                            <Button
                                onPress={() => { isVisibleModal() }}
                                titleStyle={{ fontSize: 17 }}
                                title={'Siguiente'}
                                containerStyle={{ alignItems: 'center' }}
                                buttonStyle={{ backgroundColor: '#012B54', borderRadius: 9, width: '80%' }}
                            />
                        </View>

                    </View>
                </ScrollView>
                <ModalAlert />
            </View >
        );
    }

    return (
        !dataState.fetchingData
            ?
            !dataState.error
                ?
                renderContent()
                :
                <View style={tw`flex-1 p-5 justify-center items-center`}>
                    <Text style={tw`text-center text-lg mb-3`}>
                        {dataState.message}
                    </Text>
                    <Button
                        containerStyle={{ width: 120 }}
                        buttonStyle={[{ backgroundColor: '#118ea6' }]}
                        title="Actualizar"
                        onPress={() => navigation.navigate('Incio')}
                    />
                </View>
            :
            <ActivityIndicator size="large" color="#118EA6" style={tw`mt-5`} />
    )
}
export default QuestionScreen

const styles = StyleSheet.create({})
