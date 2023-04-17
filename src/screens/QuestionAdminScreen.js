import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { QuestionStyle } from "../theme/customTheme";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Colors, ColorsG } from "../../constants/Colors";
import tw from "tailwind-react-native-classnames";
import { Context as AccountDataContext } from "../context/AccountDataContext";
import SearchButton from "../components/Forms/SearchButton";
import EmploymentCard from "../components/Employment";
import { employees } from "../components/Data/DataFormAdmin";

const QuestionAdminScreen = () => {
  const navigation = useNavigation();
  const { state, getUsersWhithApplications } = useContext(AccountDataContext);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUsersWhithApplications();
    });
    return unsubscribe;
  }, [navigation]);
  

  const renderContent = () => {
    return (
      <View style={QuestionStyle.container}>
        <View>
          <SearchButton />
        </View>

        <ScrollView>
          {state.userData && <EmploymentCard employee={state.userData} />}
        </ScrollView>
      </View>
    );
  };

  return !state.fetchingData ? (
    !state.error ? (
      renderContent()
    ) : (
      <View style={tw`flex-1 p-5 justify-center items-center`}>
        <Text style={tw`text-center text-lg mb-3`}>{state.message}</Text>
        <Button
          containerStyle={{ width: 120 }}
          buttonStyle={[{ backgroundColor: "#118ea6" }]}
          title="Actualizar"
          onPress={() => navigation.navigate("Incio")}
        />
      </View>
    )
  ) : (
    <ActivityIndicator size="large" color="#118EA6" style={tw`mt-5`} />
  );
};
export default QuestionAdminScreen;

const styles = StyleSheet.create({
  questiontext: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6C6767",
    marginTop: 10,
  },
  questionView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});
