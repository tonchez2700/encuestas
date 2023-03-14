import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, ActivityIndicator, Dimensions
} from 'react-native';
import { QuestionStyle, general } from '../theme/customTheme';
import { Icon, Button, ButtonGroup, LinearProgress } from 'react-native-elements'

import { useNavigation } from '@react-navigation/native';
import ModalAlert from '../components/Modal/ModalAlert';
import tw from 'tailwind-react-native-classnames'
import ButtonGroupFrom from '../components/Forms/ButtonGroupFrom';
import * as Progress from 'react-native-progress';
import moment from 'moment';

import { Context as AccountDataContext } from '../context/AccountDataContext';

const windowWidth = Dimensions.get('window').width;

const QuestionScreen = ({ route }) => {


    const navigation = useNavigation();
    const {
        state,
        handleInputChange,
        isVisibleModal,
        store
    } = useContext(AccountDataContext);
    const { id, name, description, percentage_completed, total_questions, sections } = route.params


    const [seccionIndex, setSeccionIndex] = useState(0);
    const [preguntaIndex, setPreguntaIndex] = useState(0);
    const secciones = sections[seccionIndex]
    const preguntas = secciones.questions[preguntaIndex];



    const men = {
        name: 'No hay ayuda para ti',
        description: 'ni pedo'
    }
    const handleSiguientePregunta = () => {
        if (preguntaIndex + 1 < secciones.questions.length) {
            console.log(id, preguntas.id, state.answerQuiz);
            setPreguntaIndex(preguntaIndex + 1);
            store(id, preguntas.id, state.answerQuiz)
        } else if (seccionIndex + 1 < sections.length) {
            store(id, preguntas.id, state.answerQuiz)
            setSeccionIndex(seccionIndex + 1);
            setPreguntaIndex(0);
        } else {
            console.log("ya no hay preguntas");
        }
    };


    const renderContent = () => {

        return (
            <View style={QuestionStyle.container}>
                <ScrollView>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#6C6767' }}>Seccion "{secciones.name}"</Text>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#6C6767' }}>Pregunta {preguntaIndex + 1} de {secciones.questions.length}</Text>
                    </View>
                    <LinearProgress
                        value={percentage_completed / 100}
                        variant="determinate"
                        style={{ height: 10, marginVertical: 10 }}
                        color="#012B54"
                    />
                    <View style={QuestionStyle.CardQuestHelp}>
                        <View style={{ width: '80%', flex: 1, padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#6C6767' }}>{preguntas.name}</Text>
                            <Text style={{ fontSize: 14.5, fontWeight: '400' }}>{preguntas?.description}</Text>
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
                    <ButtonGroupFrom
                        fun={(item) => {
                            handleInputChange(item, 'answerQuiz')
                        }}
                        data={preguntas.options}
                    />
                    <View style={{ marginVertical: 20 }}>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button
                                onPress={() => { isVisibleModal() }}
                                titleStyle={{ fontSize: 17 }}
                                title={'Regresar'}
                                containerStyle={{ alignItems: 'center' }}
                                buttonStyle={{ backgroundColor: 'gray', borderRadius: 9, width: '80%' }}
                            />
                            <Button
                                onPress={() => { handleSiguientePregunta() }}
                                titleStyle={{ fontSize: 17 }}
                                title={'Siguiente'}
                                containerStyle={{ alignItems: 'center' }}
                                buttonStyle={{ backgroundColor: '#012B54', borderRadius: 9, width: '80%' }}
                            />
                        </View>
                        {/* <LinearProgress
                            value={percentage_completed / 100}
                            variant="determinate"
                            style={{ height: 10 }}
                            color="#012B54"
                        />
                        <View style={QuestionStyle.CardQuestHelp}>
                            <View style={{ width: '80%', flex: 1, padding: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: '#6C6767' }}>{name}</Text>
                                <Text style={{ fontSize: 14.5, fontWeight: '400' }}>{description}</Text>
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
                            <ButtonGroupFrom
                                data={sections[0].questions[0].options}
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
                        </View> */}

                    </View>
                </ScrollView>
                {
                    secciones.messages != '' ?

                        <ModalAlert
                            messages={secciones.messages[0]}
                        />
                        :
                        <ModalAlert
                            messages={men}
                        />
                }

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
                        onPress={() => navigation.navigate('Incio')}
                    />
                </View>
            :
            <ActivityIndicator size="large" color="#118EA6" style={tw`mt-5`} />
    )
}
export default QuestionScreen

const styles = StyleSheet.create({})
