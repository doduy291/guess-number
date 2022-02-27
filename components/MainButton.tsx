import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import Typography from "./Typography";

interface Props {
  children: React.ReactNode;
  onPress: () => void;
}

const MainButton = ({ children, onPress }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.button}>
        <Typography style={styles.buttonText}>{children}</Typography>
      </View>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});
