import { useRouter, useLocalSearchParams } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { source } = useLocalSearchParams(); // Get source from navigation params

  // Process image (API call and navigation)
  const processImage = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets) {
      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: {
              inlineData: {
                data: result.assets[0].base64,
                mimeType: "image/jpeg",
              },
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // const data = {
        //   productAnalysis: {
        //     brand: "Unknown",
        //     identifiedProduct:
        //       "White quilted crossbody bag with a gold chain strap and a gold 'VK' logo.",
        //     size: "S",
        //     condition: "New",
        //     estimatedCost: "70",
        //     fabricsUsed:
        //       "Likely made of faux leather (PU leather) with a quilted pattern. The hardware, including the logo and chain, appears to be gold-plated metal.",
        //     featureHighlights:
        //       "The quilted design provides visual texture and padded feel. The gold chain strap adds a luxurious touch and allows for crossbody or shoulder wear. The prominent 'VK' logo serves as a distinctive branding element.",
        //     productCategory: "Bags",
        //     verbalDescription:
        //       "A stylish crossbody bag in white, featuring a quilted design and a front flap closure. The bag is adorned with a prominent gold 'VK' logo, adding a touch of elegance. It also features a gold chain strap, providing both functionality and fashion.",
        //     productDescription:
        //       "A stylish crossbody bag in white, featuring a quilted design and a front flap closure. The bag is adorned with a prominent gold 'VK' logo, adding a touch of elegance. It also features a gold chain strap, providing both functionality and fashion.",
        //   },
        // };
        // Use setTimeout to defer navigation
        console.log("Product Analysis from api:", data.data.productAnalysis);

        // Use requestAnimationFrame instead of setTimeout for better timing
        requestAnimationFrame(() => {
          router.replace({
            pathname: "/AddProduct",
            params: {
              ...data.data.productAnalysis,
              imageUri: result.assets[0].uri,
            },
          });
        });
      } catch (error) {
        console.error("Network or Analysis Error:", error);
        Alert.alert(
          "Connection Error",
          "Please check your internet connection and try again."
        );
      }
    }
  };

  // Capture image
  const captureImage = async (forceGallery = false) => {
    let result;

    if (!forceGallery) {
      // Request camera permissions
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Denied",
          "Camera access is required to take photos. Would you like to pick from the gallery instead?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Pick from Gallery", onPress: () => captureImage(true) },
          ]
        );
        return;
      }

      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });

      // If camera is canceled or unavailable, prompt for gallery
      if (result.canceled && !result.assets) {
        Alert.alert(
          "Camera Unavailable",
          "Would you like to pick an image from the gallery?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Pick from Gallery", onPress: () => captureImage(true) },
          ]
        );
        return;
      }
    } else {
      // Request media library permissions for gallery
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Denied",
          "Gallery access is required to pick photos."
        );
        return;
      }

      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
    }

    await processImage(result);
  };

  // Trigger captureImage based on source when component mounts
  useEffect(() => {
    if (source) {
      captureImage(source === "gallery");
    }
  }, [source]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 10 }}>Choose an image</Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#ccc",
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => captureImage()} // Launch camera
      >
        <Text>📸 Capture Image</Text>
      </TouchableOpacity>
    </View>
  );
}
