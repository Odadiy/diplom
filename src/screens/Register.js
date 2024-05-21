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
const db = SQLite.openDatabaseSync('db.testDb');

 async function RegisterScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const RegisterUser = async ()=>
  {
        await db.execAsync(
          "CREATE TABLE IF NOT EXISTS users  (user_id INTEGER PRIMARY KEY AUTOINCREMENT,  email TEXT, password TEXT, role INTEGER)", //role {admin = 0, users = 1}
            (txObj, result) => console.log('result: ', result),
            (txObj, error) => console.log('Error insert ', error)
                  );
          await db.execAsync(
          "ALTER TABLE admin ADD COLUMN role INTEGER DEFAULT 0",
          [],
          (_txObj, ret) => {
            Alert,alert('success');
          },
          (_txObj, error) => {
            console.log('Error ', error);
          }
        ),
        await db.execAsync(
          "CREATE TABLE IF NOT EXISTS users  (admin_id INTEGER PRIMARY KEY AUTOINCREMENT,  email TEXT, password TEXT)",
            (txObj, result) => console.log('result: ', result),
            (txObj, error) => console.log('Error insert ', error)
                  );
      };
        await db.execAsync(
          "INSERT INTO users (email,password) values (?, ?)", [email, password],
          (txObj, result) => {
            console.log('Results', result.rowsAffected);
            if (result.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Амжилттай бүртгүүллээ.',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Login'),
                  },
                ],
                { cancelable: false }
              );
            } 
            else Alert.alert('Бүртгэл амжилтгүй.');

          },
          (txObj, error) => console.log('Error insert ', error)
       );
  return (
   <View style={styles.container}>
     <Text>Бүртгүүлэх</Text>
     <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Цахим шуудан"
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
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={RegisterUser}>Бүртгүүлэх</Text> 
      </TouchableOpacity> 
    </View> 
  );
};
export default RegisterScreen;

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