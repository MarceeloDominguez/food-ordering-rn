import { ActivityIndicator, View } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

export default function Index() {
  const { session, loading, isAdmin, profile } = useAuth();

  if (loading) {
    return <ActivityIndicator size={24} color="green" />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  if (!profile) {
    return <ActivityIndicator size={24} color="orange" />;
  }

  if (!isAdmin) {
    return <Redirect href={"/(user)"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      {/* <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link> */}
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      {/* <Link href={"/sign-in"} asChild>
        <Button text="Sign in" />
      </Link> */}
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
}
