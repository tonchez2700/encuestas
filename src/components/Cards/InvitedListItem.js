import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import moment from 'moment';

/**
 * Item general de la lista de invitados que recibe la data y una función
 */
const InvitedListItem = memo(({ data, onPress }) => {
    console.log(data);
    return (
        //Header de la invitación
        <View style={tw`m-4 p-2 border border-gray-400 rounded`}>
            <View style={tw`flex-row justify-between items-center border-b border-gray-400 pb-3 mb-3`}>
                <View style={[tw`w-5/12 flex-row p-3 rounded-md border`, {borderColor: '#118ea6'}]}>
                    <Icon name="user" type='font-awesome' size={18} color="black" />
                    <Text style={tw`flex-1 ml-1 text-center`}>Invitado</Text>
                </View>
                <Text style={tw`w-6/12 text-center`}>{moment('2021-12-31T04:01:57.527Z').format('DD/MM/YYYY')}</Text>
            </View>

            {/* Body de la invitación */}
            {
                /* Reliza una comprobación si hay data mapea la data y regresa el item con su diseño
                   caso contrario regresa una leyenda */
                data ?
                    data.map((item) => {
                        return (
                            <View key={item.id} style={tw`border-b mb-5 border-gray-400`}>
                                <Text style={tw`text-black text-base font-thin`}>Nombre del invitado</Text>
                                <Text style={tw`text-gray-500 text-base font-thin mb-2`}>{item.id}</Text>

                                <View style={tw`flex-row mb-3`}>
                                    <View style={tw`w-1/3`}>
                                        <Text style={tw`text-black`}>Modelo</Text>
                                        <Text style={tw`text-gray-500 text-base font-thin mb-2`}>{item.compania}</Text>
                                    </View> 
                                    <View style={tw`w-1/3`}>
                                        <Text style={tw`text-black`}>Placas</Text>
                                        <Text style={tw`text-gray-500 text-base font-thin mb-2`}>{item.cuenta}</Text>
                                    </View> 
                                    <View style={tw`w-1/3`}>
                                        <Text style={tw`text-black`}>Color</Text>
                                        <Text style={tw`text-gray-500 text-base font-thin mb-2`}>{item.tipo}</Text>
                                    </View> 
                                </View>
                            </View>
                        );
                    })
                :
                    <Text style={tw`text-red-800 mb-3 text-center border border-red-300 bg-red-200 p-3`}>No hay entradas para esta invitacion</Text>
            }
            
            {/* Footer de la invitación */}
            {/* Botón para volver a invitar, si hay data se habilita caso contrario se deshabilita
                y manda una función con la data recibida en el componente */}
            <View style={tw`items-end mb-3`}>
                <Button
                    containerStyle={tw`w-3/6`}
                    buttonStyle={styles.primaryButton}
                    titleStyle={styles.primaryTitleButton}
                    title="Volver a invitar"
                    disabled={!data ? true : false}
                    onPress={() => onPress(data)}
                />
            </View>
        </View>
    )
})

export default InvitedListItem

/* Estilos extras*/
const styles = StyleSheet.create({
    primaryButton: {
        borderWidth: 1,
        borderColor: '#118ea6',
        backgroundColor: '#118ea6'
    },
    primaryTitleButton: {
        paddingLeft: 5, 
        fontSize: 14
    },
});
