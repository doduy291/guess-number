import React, { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    "SourceSans-Regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "SourceSans-Bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
    "SourceSans-SemiBold": require("./assets/fonts/SourceSansPro-SemiBold.ttf"),
  });

  const [userNumber, setUserNumber] = useState(0);
  const [guessRounds, setGuessRounds] = useState(0);

  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(0);
  };
  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };
  const gameOverHandler = (numOfRounds: number) => {
    setGuessRounds(numOfRounds);
  };

  let contentOutput = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && guessRounds <= 0) {
    contentOutput = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    contentOutput = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={newGameHandler}
      />
    );
  }

  // Custom Fonts
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number" />
      {contentOutput}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
