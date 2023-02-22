import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';


const ButtonGroupFrom = ({ data }) => {
    console.log(data);

    return (
        <View>
            {
                data.map((e) =>
                    <View key={e.id}>
                        <TouchableOpacity
                            onPress={() => console.log(e.id)}
                            style={{ width: '100%', alignItems: 'center', padding: 20, marginBottom: 10, borderWidth: 1, borderColor: 'gray' }}>

                            <Text>{e.description}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    )
}

export default ButtonGroupFrom
