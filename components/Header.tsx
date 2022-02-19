import { StyleSheet, View } from "react-native";
import React from "react";

import { colors } from "../constants/colors";

import Typography from "../components/Typography";

interface Props {
  title: string;
}
const Header = ({ title }: Props) => {
  return (
    <View style={styles.header}>
      <Typography style={styles.headerTitle}>{title}</Typography>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontFamily: "SourceSans-Bold",
  },
});
