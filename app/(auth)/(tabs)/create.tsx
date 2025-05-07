import { useRouter, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@/providers/ThemeProvider";

export default function Page() {
  const router = useRouter();
  const { colors } = useContext(ThemeContext);
  const { source } = useLocalSearchParams<{ source?: string }>();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const screenHeight = Dimensions.get("window").height;

  // const handleImageUpload = async (fromGallery = false) => {
  //   const pickImage =
  //     async (): Promise<ImagePicker.ImagePickerResult | null> => {
  //       const permissionResult =
  //         await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (!permissionResult.granted) {
  //         Alert.alert(
  //           "Permission Denied",
  //           "Gallery access is required to pick photos."
  //         );
  //         return null;
  //       }
  //       return await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         allowsMultipleSelection: false,
  //         quality: 1,
  //       });
  //     };

  //   const captureImage =
  //     async (): Promise<ImagePicker.ImagePickerResult | null> => {
  //       const permissionResult =
  //         await ImagePicker.requestCameraPermissionsAsync();
  //       if (!permissionResult.granted) {
  //         Alert.alert(
  //           "Permission Denied",
  //           "Camera access is required to take photos. Would you like to pick from the gallery instead?",
  //           [
  //             { text: "Cancel", style: "cancel" },
  //             {
  //               text: "Pick from Gallery",
  //               onPress: () => handleImageUpload(true),
  //             },
  //           ]
  //         );
  //         return null;
  //       }
  //       return await ImagePicker.launchCameraAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         allowsEditing: true,
  //         aspect: [4, 3],
  //         quality: 1,
  //       });
  //     };

  //   setLoading(true);
  //   try {
  //     const result = fromGallery ? await pickImage() : await captureImage();
  //     if (!result || result.canceled || !result.assets) return;

  //     const imageUri = result.assets[0].uri;
  //     setImage(imageUri);

  //     router.push({
  //       pathname: "/addProduct",
  //       params: { imageUri },
  //     });
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     Alert.alert("Error", "Failed to upload image. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (source === "camera") {
  //     handleImageUpload(false);
  //   } else if (source === "gallery") {
  //     handleImageUpload(true);
  //   }
  // }, [source]);

  // const removeImage = () => {
  //   setImage(null);
  // };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            width: "100%",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <Image
            source={require("@/assets/images/list.png")}
            style={{ width: 160, height: "100%", resizeMode: "contain" }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 4,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.text.primary,
                textAlign: "left",
                marginTop: 20,
              }}
            >
              01. List
            </Text>
            <Text style={{ color: colors.text.secondary }}>
              Include well-lit photographs, be descriptive, and pick a good
              price.
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            width: "100%",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 4,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.text.primary,
                textAlign: "left",
                marginTop: 20,
              }}
            >
              01. List
            </Text>
            <Text style={{ color: colors.text.secondary }}>
              Include well-lit photographs, be descriptive, and pick a good
              price.
            </Text>
          </View>
          <Image
            source={require("@/assets/images/shipping.png")}
            style={{ width: 160, height: "100%", resizeMode: "contain" }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            width: "100%",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <Image
            source={require("@/assets/images/get-paid.png")}
            style={{ width: 160, height: "100%", resizeMode: "contain" }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 4,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.text.primary,
                textAlign: "left",
                marginTop: 20,
              }}
            >
              01. List
            </Text>
            <Text style={{ color: colors.text.secondary }}>
              Include well-lit photographs, be descriptive, and pick a good
              price.
            </Text>
          </View>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.brand.default,
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => router.push("/(auth)/(modal)/AddProduct")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Sell new product
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.brand.default,
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => handleImageUpload(false)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.brand.default,
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={() => handleImageUpload(true)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Pick from Gallery
          </Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
}
