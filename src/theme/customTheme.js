import { StyleSheet } from 'react-native';

export const colors = {
    black: '#23233C',
    blue: '#23233C',
    info: '#8D8D8D',
    primary: '#005691',
    secondary: '#00A558',
    transparent: 'transparent',
    white: '#FFFFFF',

    black_opacity: 'rgba(35, 35, 60, 0.5)',
    secondary_opacity: 'rgba(0, 165, 88, 0.8)',
    gray_opacity: '#707070',
    gray_light: '#51515150',

    opacity: 0.7,
}

export const general = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC',
        justifyContent: 'flex-start',
        padding: 20
    },
    Tittle: {
        marginTop: 43,
        fontSize: 29,
        color: '#6C6767',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textCardQuiz: {

        fontSize: 14,
        color: '#6C6767',
        lineHeight: 14,
        textAlign: 'left',
        fontWeight: '700',
    },
    textCountCuestions: {
        fontSize: 12,
        lineHeight: 12,
        textAlign: 'left',
        fontWeight: '500',
    },
    CardIconQuiz: {

        backgroundColor: '#012B54',
        height: 39,
        width: 37,
        justifyContent: 'center',
        borderRadius: 4

    },
    CardQuiz: {
        borderWidth: 1,
        borderColor: '#B7B7B7',
        paddingHorizontal: 5,
        height: 63,
        flexDirection: 'row',
        width: '100%'

    },
})

export const private_screens = StyleSheet.create({
    container_view: {
        backgroundColor: colors.white,
        padding: 10,
    },
    image_view: {
        alignSelf: 'center',
        width: '70%',
    },
    title_view: {
        color: colors.black,
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle_view: {
        color: colors.black,
        fontSize: 14,
        fontWeight: 'bold',
    },
    text_view: {
        color: colors.black,
        fontSize: 14,
    },
})