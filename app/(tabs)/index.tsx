import { Image, StyleSheet, Platform, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import useBLE from "@/hooks/useBLE";

export default function HomeScreen() {
  const {
    allDevices,
    connectedDevice,
    connectToDevice,
    color,
    requestPermissions,
    scanForPeripherals,
    stopScanForPeripherals
  } = useBLE();

  console.log(allDevices);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Bluetooth Scan Test</ThemedText>
        <Button title="Scan for devices" onPress={scanForDevices} />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {allDevices.map((device) => (
          <ThemedView style={styles.stepContainer} key={device.id}>
            <ThemedText type="title">
              {device.name}{device.localName && ' | ' + device.localName}
            </ThemedText>
            <ThemedText type="subtitle">{device.id}</ThemedText>
            <ThemedText type="subtitle">
            MTU: {device.mtu}  RSSI: {device.rssi}
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
      <Button title="Stop Scan" onPress={stopScanForPeripherals} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
