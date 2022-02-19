import { StyleSheet, TextInput } from "react-native";
import React from "react";

interface Props {
  value: string;
  numberInputHandler: (text: string) => void;
}

const Input = ({ value, numberInputHandler }: Props) => {
  return (
    <TextInput
      style={styles.input}
      blurOnSubmit
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="number-pad"
      maxLength={2}
      value={value}
      onChangeText={numberInputHandler}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: 50,
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    textAlign: "center",
  },
});
