import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import Typography from "./Typography";

interface Props {
  children: React.ReactNode;
}

const Number = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <Typography style={styles.number}>{children}</Typography>
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  number: {
    color: colors.accent,
    fontSize: 22,
  },
});
