import { useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Page() {
  const router = useRouter();

  // Capture image
  const captureImage = async (camera = false) => {
    let result;
    if (camera) {
      // Request camera permissions
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Denied",
          "Camera access is required to take photos."
        );
        return;
      }

      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Fixed enum value
        allowsEditing: true, // Enable editing (optional)
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Fixed enum value
        allowsEditing: true, // Enable editing (optional)
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
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
          marginBottom: 10,
        }}
        onPress={() => captureImage(true)} // Launch camera
      >
        <Text>📸 Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#ccc",
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => captureImage(false)} // Launch gallery
      >
        <Text>🏞️ Pick from Gallery</Text>
      </TouchableOpacity>
    </View>
  );
}
