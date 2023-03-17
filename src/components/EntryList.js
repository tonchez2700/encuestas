import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { general } from '../theme/customTheme';
import { Icon, LinearProgress } from 'react-native-elements'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const EntryList = ({ data }) => {

    const navigation = useNavigation();
    return (

        <ScrollView>
            {
                data.map((e) =>
                    <View key={e.id} style={[tw`flex-row`, { backgroundColor: 'white', marginBottom: 24, }]}>
                        <View style={general.CardQuiz}>
                            <View style={{ width: '60%', justifyContent: 'center' }}>
                                <Text style={general.textCardQuiz}>
                                    {e.name}
                                </Text>
                                <View style={{ marginVertical: 7 }}>
                                    <LinearProgress
                                        value={e.percentage_completed / 100}
                                        variant="determinate"
                                        style={{ height: 10, marginVertical: 4, width: '80%' }}
                                        color="#012B54"
                                    />
                                </View>
                            </View>
                            <View style={{ width: '25%', justifyContent: 'center' }}>
                                <Text style={general.textCountCuestions}>{e.total_questions} Preguntas</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('QuestionScreen', e)}
                                style={{ justifyContent: 'center', marginLeft: 5 }}
                            >
                                <View style={{ width: '15%' }}>
                                    <Icon
                                        size={20}
                                        name='pencil'
                                        containerStyle={general.CardIconQuiz}
                                        type='font-awesome'
                                        color={"white"} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default EntryList

const styles = StyleSheet.create({

    TextTableItems: {
        fontSize: 13,
        padding: 10,
        textAlign: 'center',
        color: '#000000',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1

    },
})
