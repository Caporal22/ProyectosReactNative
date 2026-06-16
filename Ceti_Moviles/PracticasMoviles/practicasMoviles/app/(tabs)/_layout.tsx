import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "transparent",
                    borderTopWidth: 0.5,
                    borderTopColor: "rgba(255,255,255,0.15)",
                    position: "absolute",
                    elevation: 0,
                },
                tabBarBackground: () => (
                    <BlurView
                        intensity={90}
                        tint="dark"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        }}
                    />
                ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Sensor",
                    tabBarIcon: () => (
                        <Ionicons size={28} name="speedometer" color="white" />
                    ),
                }}
            />
            <Tabs.Screen
                name="scanner"
                options={{
                    title: "Scanner",
                    tabBarIcon: () => (
                        <Ionicons size={28} name="scan" color="white" />
                    ),
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    title: "Media",
                    tabBarIcon: () => (
                        <Ionicons size={28} name="videocam" color="white" />
                    ),
                }}
            />
        </Tabs>
    );
}
