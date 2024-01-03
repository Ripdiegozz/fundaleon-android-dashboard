import React from 'react';
import { Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-10">
        <Text className="underline text-5xl">Open up App.js to start working on your app!</Text>
        {/* Redirect to src/app.jsx */}
        <StatusBar style="auto" />
    </View>
  );
}