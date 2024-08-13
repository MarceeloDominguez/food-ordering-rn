import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
//import products from "@/assets/data/products";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { useProduct } from "@/api/products";
import { defaultPizzaImage } from "@/components/ProductListItem";

const { width: WIDTH_SCREEN } = Dimensions.get("window");

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

export default function ProductDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();

  const router = useRouter();

  //const product = products.find((p) => p.id.toString() === id);

  if (isLoading) {
    return <ActivityIndicator size={24} color="red" />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  const addToCart = () => {
    addItem(product!, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product?.name,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.light.background },
          headerTitleAlign: "center",
        }}
      />

      <Image
        source={{ uri: product?.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.selectSizeTitle}>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedSize(size)}
            style={[
              styles.containerTextSize,
              {
                backgroundColor:
                  selectedSize === size ? "gainsboro" : Colors.light.background,
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === size ? "#000" : "#837d7d" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product?.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
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
    marginTop: "auto",
  },
  selectSizeTitle: {
    fontWeight: "600",
    fontSize: 15,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  containerTextSize: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
