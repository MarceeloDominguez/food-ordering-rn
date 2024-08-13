import { View, FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";

export default function CartScreen() {
  const { items, total, checkout } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.total}>Total: ${Math.round(total * 100) / 100}</Text>
      <Button onPress={checkout} text="Checkout" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 10,
  },
  contentContainerStyle: {
    gap: 10,
  },
  total: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 18,
  },
});
