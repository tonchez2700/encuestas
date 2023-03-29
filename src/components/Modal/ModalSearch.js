import React,{useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

const ModalSearch = ({ visible, onClose }) => {

  const [empresa, setEmpresa] = useState("");
  const [encuesta, setEncuesta] = useState("");
  const [nombre, setNombre] = useState("");

  return (
    <View style={{ height: 180, width: 340,}}>
      <View style={{ marginTop: 14 }}>
        <View style={{ marginBottom: 5, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.inputText}>EMPRESA</Text>
          <TextInput 
          style={styles.filtercontainer} 
          placeholder="EMPRESA"
          onChangeText={setEmpresa}/>
        </View>
        <View style={{ marginBottom: 5, flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={styles.inputText}>ENCUESTA</Text>
          <TextInput 
          style={styles.filtercontainer} 
          placeholder="Encuesta"
          onChangeText={setEncuesta}/>
        </View>
        <View style={{ marginBottom: 5, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.inputText}>NOMBRE</Text>
          <TextInput 
          style={styles.filtercontainer} 
          placeholder="NOMBRE"
          onChangeText={setNombre}/>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filtercontainer: {
    height: 39,
    width: 259,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#00000026",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5, 
  },
  inputText: {
    fontSize: 14, 
    marginTop: 10, 
    justifyContent: "space-between"
  }
});

export default ModalSearch;