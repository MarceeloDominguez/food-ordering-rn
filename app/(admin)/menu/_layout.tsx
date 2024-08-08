import React from "react";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function _layout() {
  const productRoute = `/(admin)/menu/create` as `${string}:${string}`;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerRight: () => (
            <Link href={productRoute} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
                    size={25}
                    color={Colors.light.tint}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
