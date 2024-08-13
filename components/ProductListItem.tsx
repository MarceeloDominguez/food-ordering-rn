import { Text, StyleSheet, Image, Dimensions, Pressable } from "react-native";
import React from "react";
import { Product, Tables } from "@/types";
import { Colors } from "@/constants/Colors";
import { Link, useSegments } from "expo-router";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  //product: Product;
  product: Tables<"products">;
};

const { width: WIDTH_SCREEN } = Dimensions.get("window");

export default function ProductListItem({ product }: ProductListItemProps) {
  const segments = useSegments();

  const productRoute =
    `/${segments[0]}/menu/${product.id}` as `${string}:${string}`;

  return (
    <Link href={productRoute} asChild>
      <Pressable style={styles.container}>
        <Image
          src={product.image || defaultPizzaImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: WIDTH_SCREEN * 0.5 - 20,
    paddingVertical: 12,
    borderRadius: 16,
    elevation: 2,
  },
  image: {
    width: WIDTH_SCREEN * 0.4,
    aspectRatio: 1,
  },
  name: {
    fontSize: 16,
    marginVertical: 5,
    color: Colors.light.tint,
    fontWeight: "700",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
