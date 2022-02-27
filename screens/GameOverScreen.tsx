import { StyleSheet, View, Image, ScrollView } from "react-native";
import React from "react";
import Typography from "../components/Typography";
import MainButton from "../components/MainButton";
import { colors } from "../constants/colors";
import useOrientation from "../hooks/useOrientation";
interface Props {
  roundsNumber: number;
  userNumber: number;
  onRestart: () => void;
}

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }: Props) => {
  const orientation = useOrientation();
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Typography>Game Over!</Typography>
        <View
          style={[
            styles.imageContainer,
            {
              width: orientation.width * 0.7,
              height: orientation.width * 0.7,
              marginVertical: orientation.height / 30,
            },
          ]}
        >
          <Image
            style={styles.image}
            source={require("../assets/success.jpg")}
            resizeMode="cover"
          />
        </View>
        <Typography>
          Number of rounds:
          <Typography style={styles.highlight}>{roundsNumber}</Typography>
        </Typography>
        <Typography>
          Number is:
          <Typography style={styles.highlight}>{userNumber}</Typography>
        </Typography>
        <MainButton onPress={onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    // width: Dimensions.get("window").width * 0.7,
    // height: Dimensions.get("window").width * 0.7, // Use width because this is circle, need the same value
    borderRadius: 500,
    borderColor: "black",
    overflow: "hidden", // to get image radius
    // marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: " 100%",
  },
  highlight: {
    color: colors.primary,
  },
});
