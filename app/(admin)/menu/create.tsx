import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";

export default function CreateProductScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setErrors("");

    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }

    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    //save in the db

    resetFields();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: "Create Product",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />

      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.textButton} onPress={pickImage}>
        Select Image
      </Text>
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Price ($)</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          placeholder="9.99"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text="Create" onPress={onCreate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 100,
  },
  textButton: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginTop: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    height: 45,
    borderRadius: 14,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
});
