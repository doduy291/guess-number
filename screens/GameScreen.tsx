import { StyleSheet, View, Alert, ScrollView } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import Number from "../components/Number";
import Card from "../components/Card";
import Typography from "../components/Typography";
import MainButton from "../components/MainButton";
import useOrientation from "../hooks/useOrientation";

interface Props {
  userChoice: number;
  onGameOver: (numOfRounds: number) => void;
}
const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const GameScreen = ({ userChoice, onGameOver }: Props) => {
  const orientation = useOrientation();
  const initialNumber = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialNumber);
  const [pastGuess, setPastGuess] = useState<Array<number>>([initialNumber]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuess((currentState) => [nextNumber, ...currentState]);
  };

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuess.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  if (!orientation.isPortait) {
    return (
      <View style={styles.screen}>
        <Typography>Opponent's Guess</Typography>

        <View style={styles.buttonContainerLandscape}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons
              name="md-remove"
              size={orientation.width <= 320 ? 15 : 24}
              color="white"
            />
          </MainButton>
          <Number>{currentGuess}</Number>

          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons
              name="md-add"
              size={orientation.width <= 320 ? 15 : 24}
              color="white"
            />
          </MainButton>
        </View>

        <View style={styles.list}>
          <ScrollView>
            {pastGuess.map((pastNum, i) => (
              <View key={i} style={styles.listItem}>
                <Typography>Round: #{pastGuess.length - i}</Typography>
                <Typography>{pastNum}</Typography>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Typography>Opponent's Guess</Typography>
      <Number>{currentGuess}</Number>
      <Card>
        <View style={styles.buttonContainerPortrait}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons
              name="md-remove"
              size={orientation.width <= 320 ? 15 : 24}
              color="white"
            />
          </MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons
              name="md-add"
              size={orientation.width <= 320 ? 15 : 24}
              color="white"
            />
          </MainButton>
        </View>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuess.map((pastNum, i) => (
            <View key={i} style={styles.listItem}>
              <Typography>Round: #{pastGuess.length - i}</Typography>
              <Typography>{pastNum}</Typography>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainerPortrait: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    maxWidth: "90%",
  },
  buttonContainerLandscape: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  list: {
    flex: 1,
    width: "80%",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
  },
});
