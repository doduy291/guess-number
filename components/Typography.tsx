import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface Props {
  children: React.ReactNode;
  style?: object;
}

const Typography = ({ children, style }: Props) => {
  return <Text style={[styles.defaultFont, style]}>{children}</Text>;
};

export default Typography;

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "SourceSans-Regular",
    color: "black",
  },
});
