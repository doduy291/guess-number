import {
  Button,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../constants/colors";

import Card from "../components/Card";
import Input from "../components/Input";
import Number from "../components/Number";
import Typography from "../components/Typography";
import MainButton from "../components/MainButton";

import useOrientation from "../hooks/useOrientation";

interface Props {
  onStartGame: (selectedNum: number) => void;
}

const StartGameScreen = ({ onStartGame }: Props) => {
  const orientation = useOrientation();
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);

  const numberInputHandler = (inputText: string) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    Keyboard.dismiss();
    setConfirmed(false);
    setEnteredValue("");
  };
  const confirmInputHandler = () => {
    Keyboard.dismiss();
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card>
        <Typography>Chosen Number: </Typography>
        <Number>{selectedNumber}</Number>
        <MainButton onPress={onStartGame.bind(this, selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Typography style={styles.title}>Start Game</Typography>
            <View style={styles.cardWrapper}>
              <Card>
                <Typography>Select a Number</Typography>
                <Input
                  numberInputHandler={numberInputHandler}
                  value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                  <View style={{ width: orientation.width / 4 }}>
                    <Button
                      title="Reset"
                      onPress={resetInputHandler}
                      color={colors.accent}
                    />
                  </View>
                  <View style={{ width: orientation.width / 4 }}>
                    <Button
                      title="Confirm"
                      onPress={confirmInputHandler}
                      color={colors.primary}
                    />
                  </View>
                </View>
              </Card>
            </View>
            <View style={styles.cardWrapper}>{confirmedOutput}</View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: "SourceSans-Bold",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  cardWrapper: {
    marginVertical: 20,
  },
});
