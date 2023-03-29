import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ColorsG } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
//import { employees } from "./Data/DataFormAdmin";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

const EmploymentCard = ({ employee }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  console.log(JSON.stringify(employee, null, 6));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(employee);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [employee]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#012B54" style={tw`mt-5`} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 30, marginTop: 10 }}>
          Hola {employee.name}
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#6C6767",
            marginTop: 5,
          }}
        >
          Empleados
        </Text>
      </View>
      {employee.participants.map((emp) => (
        <View key={emp.id} style={styles.container}>
          <View style={{ marginLeft: 5 }}>
             <Text>
              Nombre: {emp.user.name} {emp.user.paternal_surname}
            </Text>
            <Text>Compañia: {emp.company.name}</Text> 
            {/* {emp.applications.map((apcl)=>(
              <Text>Encuesta: {apcl.name}</Text>
            ))
            } */}
            
          </View>
          <View style={styles.textIn}>
            <Text>encuestas </Text>
            <TouchableOpacity
              style={styles.iconBox}
              onPress={() => navigation.navigate("InFoEmployed", { emp })}
            >
              <AntDesign name="eye" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  {
    /* {employee.map((em) => (
        <View style={styles.container} key={em.id}>
          <View style={{ margin: 20 }}>
            <Text>{employee.name}</Text>
          </View>

          <View style={styles.textIn}>
            <Text>{employee.numberSurveys} encuestas</Text>
            <TouchableOpacity
              style={styles.iconBox}
              onPress={() => navigation.navigate("InFoEmployed", { employee })}
            >
              <AntDesign name="eye" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ))} */
  }
};

export default EmploymentCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
//height: 78,
height:78,
    borderWidth: 1,
    borderColor: ColorsG.gray,
    marginTop: 24,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center"
  },
  textIn: {
    margin: 20,
    flexDirection: "row",
    width: 90,
    height: 20,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    marginRight: 20
  },
  iconBox: {
    widt: 23,
    height: 25,
    backgroundColor: ColorsG.primary,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 2
  },
  iconContainer: {
    left: 70,
  },
});
