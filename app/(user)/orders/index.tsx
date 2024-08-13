import { ActivityIndicator, FlatList } from "react-native";
import React from "react";
//import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { useMyOrderList } from "@/api/orders";
import { Text } from "react-native";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      keyExtractor={(_, index) => index.toString()}
    />
  );
}
