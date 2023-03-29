import { Alert } from "react-native";
import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import httpClient from "../services/httpClient";
import * as rootNavigation from "../helpers/rootNavigation";
import {
  INVITED_ENTRY_TYPE,
  PROVIDER_ENTRY_TYPE,
  SERVICE_ENTRY_TYPE,
} from "../config/defines";
import moment from "moment";

const initialState = {
  error: false, // indica si hubo un error en la solicitud
  message: null, // mensaje de error
  isVisible: false, // indica si la ventana modal está visible o no
  fetchingData: false, // indica si se está obteniendo datos del servidor
  indexSection: 0, // índice de la sección actual
  indexQuestion: 0, // índice de la pregunta actual
  questionnaire: [], // arreglo que almacena el cuestionario
  sections: [], // arreglo que almacena las secciones del cuestionario
  answerQuiz: "", // respuesta dada por el usuario a la pregunta actual
  questionSection: "", // nombre de la sección actual
  questions: "", // texto de la pregunta actual
  isVisibleBack: false, //Variable de estado de Modal de agradecimiento
  isVisibleAnswere: false, 
  userData: [],
};

// Define el reducer que se encarga de manejar el estado de la aplicación
const AccountDataReducer = (state = initialState, action) => {
  switch (action.type) {
    // Limpia el estado de la aplicación
    case "CLEAR_STATE":
      return {
        ...initialState,
      };
    // Indica si se está obteniendo datos del servidor
    case "FETCHING_DATA":
      return { ...state, fetchingData: action.payload.fetchingData };
    // Indica que ocurrió un error al realizar una solicitud al servidor
    case "SET_REQUEST_ERROR":
      return {
        ...state,
        error: true,
        message: action.payload.message,
        fetchingData: false,
      };
    // Almacena el resultado de una solicitud de pagos en el estado
    case "SET_REQUEST_PAYMENTS":
      return {
        ...state,
        payments: action.payload.response,
        fetchingData: false,
      };
    // Almacena el resultado de una solicitud de cuestionarios de usuario en el estado
    case "SET_QUESTIONARY_USER":
      return {
        ...state,
        questionnaire: action.payload.response,
        fetchingData: false,
      };
    // Almacena el resultado de una solicitud de secciones de usuario en el estado
    case "SET_SECTIONS_USER":
      return {
        ...state,
        questionSection: action.payload.data,
        fetchingData: false,
      };
    // Almacena la respuesta dada por el usuario a la pregunta actual en el estado
    case "SET_ANSWER":
      let typeValue = action.payload.type;
      return {
        ...state,
        [typeValue]: action.payload.value,
      };
    // Almacena el texto de la pregunta actual en el estado
    case "SET_QUESTION_USER":
      return {
        ...state,
        questions: action.payload.data,
        fetchingData: false,
      };
      case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload.response,
        fetchingData: false,
      };
    // Cambia el estado de la ventana modal
    case "CHANGE_VISIBLE_MODAL":
      let visibleCheck = !state.isVisible;
      return {
        ...state,
        error: false,
        message: "",
        fetchingData: false,
        isVisible: visibleCheck,
      };
    case "CHANGE_VISIBLE_MODALBACK":
      let visibleCheckBack = !state.isVisibleBack;
      return {
        ...state,
        error: false,
        message: "",
        fetchingData: false,
        isVisibleBack: visibleCheckBack,
      };
    case "CHANGE_VISIBLE_MODALANSWERED":
      let visibleCheckAnswer = !state.isVisibleAnswere;
      console.log(visibleCheckAnswer);
      return {
        ...state,
        error: false,
        message: "",
        fetchingData: false,
        isVisibleAnswere: visibleCheckAnswer,
      };
    // Maneja cualquier otro tipo de acción
    default:
      return state;
  }
};

const clearState = (dispatch) => {
  return () => {
    dispatch({ type: "CLEAR_STATE" });
  };
};

const isVisibleModal = (dispatch) => {
  return async (message) => {
    dispatch({
      type: "CHANGE_VISIBLE_MODAL",
      payload: { message },
    });
  };
};

const isVisibleModalBack = (dispatch) => {
  return async (message) => {
    dispatch({
      type: "CHANGE_VISIBLE_MODALBACK",
      payload: { message },
    });
  };
};

const isVisibleModalAnswere = (dispatch) => {
  return async (message) => {
    dispatch({
      type: "CHANGE_VISIBLE_MODALANSWERED",
      payload: { message },
    });
  };
};

const getUserQuestionnaires = (dispatch) => {
  return async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      const token = user.token;
      const id = user.userData.id;
      const response = await httpClient.get(`users/${id}/applications`, {
        Authorization: `Bearer ${token}`,
      });

      dispatch({
        type: "SET_QUESTIONARY_USER",
        payload: {
          response,
        },
      });
    } catch (error) {
      dispatch({
        type: "SET_REQUEST_ERROR",
        payload: {
          error: true,
          message:
            "Por el momento el getUserQuestionnaires no está disponible, inténtelo mas tarde.",
        },
      });
    }
  };
};

const getUsersWhithApplications = (dispatch) => {
  return async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      const token = user.token;
      const id = user.userData.id;
      const response = await httpClient.get(`users/${id}`, 
      {
        Authorization: `Bearer ${token}`,
      });
      //console.log(JSON.stringify(response, null, 2));
      dispatch({
        type: "SET_USER_DATA",
        payload: {
          response,
        },
      });
    } catch (error) {
      dispatch({
        type: "SET_REQUEST_ERROR",
        payload: {
          error: true,
          message:
            "Por el momento el getUser no está disponible, inténtelo mas tarde.",
        },
      });
    }
  };
};

const handleInputChange = (dispatch) => {
  return async (value, type) => {
    dispatch({
      type: "SET_ANSWER",
      payload: {
        type,
        value,
      },
    });
  };
};

const store = (dispatch) => {
  return async (questionnaire_id, question_id, option_id) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      const token = user.token;
      const id = user.userData.id;

      const data = {
        application_id: questionnaire_id,
        question_id: question_id,
        option_id: option_id,
      };

      const response = await httpClient.post(`users/6/answers`, data, {
        Authorization: `Bearer ${token}`,
      });
      console.log(JSON.stringify(response, null, 2));
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      dispatch({
        type: "SET_REQUEST_ERROR",
        payload: {
          error: true,
          message:
            "Por el momento el getUserQuestionnaires no está disponible, inténtelo mas tarde.",
        },
      });
    }
  };
};

export const { Context, Provider } = createDataContext(
  AccountDataReducer,
  {
    clearState,
    isVisibleModal,
    isVisibleModalBack,
    isVisibleModalAnswere,
    getUserQuestionnaires,
    handleInputChange,
    store,
    getUsersWhithApplications,
  },
  initialState
);
