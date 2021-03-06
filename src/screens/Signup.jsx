import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import AntIcon from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Input, Button, ErrorText } from "../components";
import { colors } from "../config/colors";
import defaultStyles from "../config/styles";
import { signup } from "../utils";
import { setUserFailure, setUserRequest } from "../actions";
import { routes } from "../navigation/routes";

export const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const createAccount = () => {
    if (email && password === confirmPassword) {
      dispatch(setUserRequest());
      const response = signup(email, password);

      response.then((resp) => {
        if (resp) {
          dispatch(setUserFailure("Email already in use"));
        }
      });
    } else if (password !== confirmPassword) {
      dispatch(setUserFailure("Password does not match"));
    } else {
      dispatch(setUserFailure("Inputs must be filled"));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../assets/linda-xu-Mxn_DRdp5s8-unsplash.jpg")}
      >
        <View>
          <Text style={styles.title}>Create</Text>
          <Text style={styles.title}>an Account</Text>
          <Text style={styles.subtitle}>
            Fill the details & create your account
          </Text>
        </View>

        <KeyboardAwareScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <ErrorText error={state.message} />
            <Input
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              textContentType="emailAddress"
            />
            <Input
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
            />
            <Input
              placeholder="Confirm Password"
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
            />

            <Button
              title="Continue"
              onPress={createAccount}
              loading={state.loading}
            />

            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(routes.LOGIN)}
            >
              <Text style={defaultStyles.authLinkText}>
                Have an account already?{" "}
                <Text style={defaultStyles.authLinkText2}>Signin</Text>
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAwareScrollView>

        <View>
          <Text style={styles.iconsContainerText}>or sign in with</Text>
          <View style={styles.iconsContainer}>
            <View
              style={[styles.iconContainer, { backgroundColor: colors.fbBlue }]}
            >
              <FAIcon name="facebook" color="white" size={24} />
            </View>

            <View
              style={[styles.iconContainer, { backgroundColor: colors.gRed }]}
            >
              <AntIcon name="google" color="white" size={24} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    color: colors.whiteText,
    fontSize: 45,
    fontWeight: "600",
  },
  subtitle: {
    color: colors.greyText,
  },
  inputContainer: {
    marginVertical: 70,
  },
  iconsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-around",
    borderWidth: 2,
    width: "30%",
  },
  iconsContainerText: {
    color: colors.greyText,
    textAlign: "center",
  },
  iconContainer: {
    backgroundColor: "red",
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
