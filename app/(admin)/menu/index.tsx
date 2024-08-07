import { FlatList, StyleSheet, View } from "react-native";
import ProductListItem from "@/components/ProductListItem";
import products from "@/assets/data/products";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
});
