import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalSearch from "../Modal/ModalSearch";
import { FontAwesome5 } from "@expo/vector-icons";

const SearchButton = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [empresa, setEmpresa] = useState("");
  const [encuesta, setEncuesta] = useState("");
  const [nombre, setNombre] = useState("");

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFilterData = () => {
    const filteredData = data.filter((item) => {
      if (
        item.participants.company.name.toLowerCase().includes(empresa.toLowerCase()) &&
        item.encuesta.toLowerCase().includes(encuesta.toLowerCase()) &&
        item.nombre.toLowerCase().includes(nombre.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    setData(filteredData);
    //
    //setShowModal(false);
  };

  const handleResetFilter = () => {
    setData(data);
    //setShowModal(false);
    setEmpresa("");
    setEncuesta("");
    setNombre("");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleToggleModal}>
        <Text style={styles.text}>Filtros de búsqueda</Text>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="filter" size={15} color="#fff" />
        </View>
      </TouchableOpacity>
      {showModal && (
        <ModalSearch
          empresa={empresa}
          encuesta={encuesta}
          nombre={nombre}
          setEmpresa={setEmpresa}
          setEncuesta={setEncuesta}
          setNombre={setNombre}
          onClose={handleToggleModal}
          onFilter={handleFilterData}
          onReset={handleResetFilter}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#012B54",
    flexDirection: "row",
    width: 340,
    borderRadius: 5,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  iconContainer: {
    left: 70,
  },
});

export default SearchButton;
