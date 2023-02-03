import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { general } from '../theme/customTheme';
import { Icon } from 'react-native-elements'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const EntryList = ({ data }) => {

    const navigation = useNavigation();
    return (

        <View>
            {
                data.map((e) =>
                    <View key={e.NumRecibo} style={[tw`flex-row`, { backgroundColor: 'white', marginBottom: 24, }]}>
                        <View style={general.CardQuiz}>
                            <View style={{ width: '60%', justifyContent: 'center' }}>
                                <Text style={general.textCardQuiz}>
                                    {e.name}
                                </Text>
                                <View style={{marginVertical: 7}}>
                                    <Progress.Bar
                                        progress={e.porcentaje}
                                        pointerEvents={'auto'}
                                        color={'#012B54'}
                                        height={10} width={200}
                                    />
                                </View>
                            </View>
                            <View style={{ width: '25%', justifyContent: 'center' }}>
                                <Text style={general.textCountCuestions}>{e.cantidad} Preguntas</Text>
                            </View>
                            <View style={{ width: '15%', justifyContent: 'center' }}>
                                <Icon
                                    size={20}
                                    name='pencil'
                                    containerStyle={general.CardIconQuiz}
                                    type='font-awesome'
                                    color={"white"} />
                            </View>
                        </View>
                    </View>
                )
            }
        </View>
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
