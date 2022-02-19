import { StyleSheet, View, Button, Image } from "react-native";
import React from "react";
import Typography from "../components/Typography";
import MainButton from "../components/MainButton";
import { colors } from "../constants/colors";
interface Props {
  roundsNumber: number;
  userNumber: number;
  onRestart: () => void;
}

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }: Props) => {
  return (
    <View style={styles.screen}>
      <Typography>Game Over!</Typography>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/success.jpg")}
          resizeMode="cover"
        />
      </View>
      <Typography>
        Number of rounds:{" "}
        <Typography style={styles.highlight}>{roundsNumber}</Typography>
      </Typography>
      <Typography>
        Number is:{" "}
        <Typography style={styles.highlight}>{userNumber}</Typography>
      </Typography>
      <MainButton onPress={onRestart}>NEW GAME</MainButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: "black",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: " 100%",
  },
  highlight: {
    color: colors.primary,
  },
});
