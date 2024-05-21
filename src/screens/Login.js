import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as SQLite from 'expo-sqlite'; 


function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const checkLogin = async () => {
        const db = await SQLite.openDatabaseAsync('db.testDb');
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, password TEXT NOT NULL, role INTEGER);`);
        const results = await db.getAllAsync('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if(results){
          navigation.navigate("mypro");
        }else{
          Alert.alert("invalid email or password");
        }
      console.error('error: ', error);
      Alert.alert("error occurred");
    
  }
  

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/baby.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Цахим шууданs"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Нууц үг"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button} onPress={() => { navigation.navigate('Register') }}>Шинээр бүртгүүлэх</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={checkLogin}>
        <Text style={styles.loginText}>Нэвтрэх</Text>
      </TouchableOpacity>
    </View>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
