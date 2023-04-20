import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
  Alert
} from "react-native";
import { QuestionStyle, general } from "../theme/customTheme";
import {
  Icon,
  Button,
  ButtonGroup,
  LinearProgress,
} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import ModalAlert from "../components/Modal/ModalAlert";
import tw from "tailwind-react-native-classnames";
import ButtonGroupFrom from "../components/Forms/ButtonGroupFrom";
import { Context as AccountDataContext } from "../context/AccountDataContext";
import ModalBack from "../components/Modal/ModalBack";

const windowWidth = Dimensions.get("window").width;

const SurveyHubAdmin = () => {
  const navigation = useNavigation();
  const {
    state,
    handleInputChange,
    isVisibleModal,
    isVisibleModalBack,
    store,
  } = useContext(AccountDataContext);
//   const {
//     id,
//     name,
//     description,
//     percentage_completed,
//     total_questions,
//     questionnaire,
//   } = route.params;
  const [seccionIndex, setSeccionIndex] = useState(0);
  const [preguntaIndex, setPreguntaIndex] = useState(0);
 // const secciones = questionnaire.sections[seccionIndex];
  //const preguntas = secciones.questions[preguntaIndex];
  const [count, setCount] = useState(1);

  const men = {
    name: "Lo sentimos",
    description:
      "Queremos informarte que en algunos casos, puede que no contemos con ayuda disponible para responder a tu pregunta.",
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        //Cada que cambias de pantalla se corren estos metodos
        setSeccionIndex(0);
        setPreguntaIndex(0);
        setCount(1);
    });
    return unsubscribe;
}, [navigation]);
 

//   const handleSiguientePregunta = () => {
//     if (preguntaIndex + 1 < secciones.questions.length) {
//       setPreguntaIndex(preguntaIndex + 1);
//       store(id, preguntas.id, state.answerQuiz);
//     } else if (seccionIndex + 1 < questionnaire.sections.length) {
//       store(id, preguntas.id, state.answerQuiz);
//       setSeccionIndex(seccionIndex + 1);
//       setPreguntaIndex(0);
//     } else {
//       isVisibleModalBack();
//     }
//     setCount(count + 1);
//   };

  const renderContent = () => {
    return (
      <View style={QuestionStyle.container}>
        <ScrollView>
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", color: "#6C6767" }}>
              Sección 1 
            </Text>
            {/* {preguntaIndex + 1}    {secciones.questions.length} */}
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#6C6767" }}>
              Pregunta 1 de 5
            </Text>
          </View>
          <LinearProgress
            //value={count / total_questions}
            variant="determinate"
            style={{ height: 10, marginVertical: 10 }}
            color="#012B54"
          />
          <View style={QuestionStyle.CardQuestHelp}>
            <View style={{ width: "80%", flex: 1, padding: 10 }}>
              {/* eRROR aQUI Cada que se empieza una nueva encuesta */}
              <Text
                style={{ fontSize: 18, fontWeight: "700", color: "#6C6767" }}
              >
                
                Pregunta 1: Cuales son tus animales favoritos
              </Text>
              <Text style={{ fontSize: 14.5, fontWeight: "400" }}>
                Descripcion de las preguntas 
              </Text>
            </View>
            <View style={{ width: "20%", borderColor: "#B7B7B7" }}>
              <TouchableOpacity
                onPress={() => isVisibleModal()}
                style={QuestionStyle.ButtonQuestHelp}
              >
                <Icon
                  size={58}
                  name="question-circle-o"
                  type="font-awesome"
                  color={"white"}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* {preguntas?.options && preguntas?.options !== "" ? (
            <ButtonGroupFrom
              fun={(item) => {
                handleInputChange(item, "answerQuiz");
              }}
              data={preguntas?.options}
            />
          ) : (
            <Text>No hay opciones disponibles</Text>
          )} */}

          <View style={{ marginVertical: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                //   onPress={() => {
                //     if (preguntas?.options == "") {
                //       handleSiguientePregunta();
                //     } else {
                //       if (state.answerQuiz == "") {
                //         Alert.alert("Error", "No has seleccionado la opcion")
                //       } else {
                //         handleSiguientePregunta();
                //       }
                //     }
                //   }}
                  titleStyle={{ fontSize: 17 }}
                  title={"Siguiente"}
                  containerStyle={{ alignItems: "center" }}
                  buttonStyle={{
                    backgroundColor: "#012B54",
                    borderRadius: 9,
                    width: "80%",
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <ModalBack />
        {/* {secciones.messages != "" ? (
          <ModalAlert messages={secciones.messages[0]} />
        ) : ( */}
          <ModalAlert messages={men} />
        {/* )} */}
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
export default SurveyHubAdmin;

const styles = StyleSheet.create({});
