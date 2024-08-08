import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const { width: WIDTH_SCREEN } = Dimensions.get("window");

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <Text>Product not found</Text>;

  const productRoute = `/(admin)/menu/create?id=${id}` as `${string}:${string}`;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerRight: () => (
            <Link href={productRoute} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        options={{
          title: product.name,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.light.background },
          headerTitleAlign: "center",
        }}
      />

      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    padding: 10,
  },
  image: {
    width: WIDTH_SCREEN * 0.8,
    aspectRatio: 1,
    alignSelf: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
