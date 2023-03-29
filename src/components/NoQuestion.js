import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from '@react-navigation/native';



const NoQuestion = () => {
    return (
      <View style={tw`items-center mt-8`}>
        <Text style={tw`text-lg text-gray-600`}>
          Por el momento no hay encuestas para contestar que tengas un excelente dia.
        </Text>
      </View>
    );
};
export default NoQuestion;

const styles = StyleSheet.create({});
