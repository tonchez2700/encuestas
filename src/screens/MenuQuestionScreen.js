import React, { useState, useEffect, useContext } from 'react'
import { View, TextInput, FlatList, Text } from 'react-native';
import { QuestionStyle } from '../theme/customTheme';
import { Icon, Button, ButtonGroup, LinearProgress } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import ModalAlert from '../components/Modal/ModalAlert';
import tw from 'tailwind-react-native-classnames'
import ButtonGroupFrom from '../components/Forms/ButtonGroupFrom';
import * as Progress from 'react-native-progress';
import moment from 'moment';

import { Context as AccountDataContext } from '../context/AccountDataContext';

const windowWidth = Dimensions.get('window').width;

const data = [
    { id: '1', name: 'Elemento 1' },
    { id: '2', name: 'Elemento 2' },
    { id: '3', name: 'Elemento 3' },
    { id: '4', name: 'Elemento 4' },
    { id: '5', name: 'Elemento 5' },
  ];
  
  const Buscador = () => {
    const [searchValue, setSearchValue] = useState('');
    
    const handleSearch = text => {
      setSearchValue(text);
    };
    
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

const MenuQuestionScreen = () => {


    const navigation = useNavigation();
    const {
        state,
        getUsersections,
        isVisibleModal
    } = useContext(AccountDataContext);

    const [index, setindex] = useState()

    
    useEffect(() => {
        getUsersections();
    }, [])

    //const buttons = ['INSERT', 'UPDATE', 'DELETE']

    const renderContent = () => {

        return (
            <View style={QuestionStyle.container}>
                <ScrollView>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Buscar..."
                            placeholderTextColor="#B4B4B4"
                            onChangeText={handleSearch}
                            value={searchValue}
                        />
                        <FlatList
                            data={filteredData}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.itemText}>{item.name}</Text>
                            </View>
                            )}
                        />
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
                        onPress={() => navigation.navigate('Incio')}
                    />
                </View>
            :
            <ActivityIndicator size="large" color="#118EA6" style={tw`mt-5`} />
    )
}
export default MenuQuestionScreen

const styles = StyleSheet.create({})