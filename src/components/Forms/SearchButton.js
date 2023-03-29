import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalSearch from "../Modal/ModalSearch";
import { FontAwesome5 } from "@expo/vector-icons";

const SearchButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleToggleModal}>
        <Text style={styles.text}>Filtros de búsqueda</Text>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="filter" size={15} color="#fff" />
        </View>
      </TouchableOpacity>
      {showModal && <ModalSearch onClose={handleToggleModal} />}
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