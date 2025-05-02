import { useRouter, useLocalSearchParams } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { source } = useLocalSearchParams();

  // Process image (compression, size validation, API call, and navigation)
  const processImage = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets) {
      try {
        // Compress the image using expo-image-manipulator
        const compressedImage = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800 } }], // Resize to 800px width, maintaining aspect ratio
          {
            compress: 0.6, // 60% quality for smaller file size
            format: SaveFormat.JPEG,
            base64: true, // Ensure base64 output for API
          }
        );

        // Validate compressed image size
        const response = await fetch(compressedImage.uri);
        const blob = await response.blob();
        const sizeInMB = blob.size / (1024 * 1024);
        if (sizeInMB > 1) {
          throw new Error(
            "Compressed image is too large (over 1 MB). Try a different image."
          );
        }

        // Send compressed image to analysis API
        const analysisResponse = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: {
              inlineData: {
                data: compressedImage.base64,
                mimeType: "image/jpeg",
              },
            },
          }),
        });

        if (!analysisResponse.ok) {
          throw new Error(`HTTP error! status: ${analysisResponse.status}`);
        }

        const data = await analysisResponse.json();
        console.log("Product Analysis from API:", data.data.productAnalysis);

        // Navigate to AddProduct with compressed image URI
        requestAnimationFrame(() => {
          router.replace({
            pathname: "/AddProduct",
            params: {
              ...data.data.productAnalysis,
              imageUri: compressedImage.uri, // Use compressed image URI
            },
          });
        });
      } catch (error: any) {
        console.error("Error processing image:", error);
        Alert.alert(
          "Error",
          error.message || "Failed to process image. Please try again."
        );
      }
    }
  };

  // Capture image from camera or gallery
  const captureImage = async (forceGallery = false) => {
    let result;

    if (!forceGallery) {
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

  // Trigger image capture based on source parameter
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
        onPress={() => captureImage()}
      >
        <Text>📸 Capture Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#ccc",
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
        onPress={() => captureImage(true)}
      >
        <Text>🖼️ Pick from Gallery</Text>
      </TouchableOpacity>
    </View>
  );
}
