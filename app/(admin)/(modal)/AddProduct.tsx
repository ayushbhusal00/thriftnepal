import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Alert,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ArrowLeft, Camera, Images } from "phosphor-react-native";
import { ThemeContext } from "@/providers/ThemeProvider";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";

type ProductParams = {
  imageUri?: string;
  identifiedProduct?: string;
  productCategory?: string;
  verbalDescription?: string;
  size?: string;
  condition?: string;
  estimatedCost?: string;
  brand?: string;
  fabricsUsed?: string;
  featureHighlights?: string;
};

type Product = {
  imageUri?: string;
  identifiedProduct: string;
  productCategory: string;
  verbalDescription: string;
  size: string;
  condition: string;
  estimatedCost: string;
  brand: string;
  fabricsUsed: string;
  featureHighlights: string;
  userId: Id<"users">;
  approved: boolean;
};

interface UserProfile {
  _id: Id<"users">;
  // Other fields
}

const Page = () => {
  const { colors } = useContext(ThemeContext);
  const { userProfile } = useUserProfile() as {
    userProfile: UserProfile | null;
  };
  const { source, ...params } = useLocalSearchParams<{
    source?: string;
    imageUri?: string;
    identifiedProduct?: string;
    productCategory?: string;
    verbalDescription?: string;
    size?: string;
    condition?: string;
    estimatedCost?: string;
    brand?: string;
    fabricsUsed?: string;
    featureHighlights?: string;
  }>();
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);
  const addProduct = useMutation(api.products.addProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [formData, setFormData] = useState<Product>({
    brand: params.brand || "",
    identifiedProduct: params.identifiedProduct || "",
    size: params.size || "",
    condition: params.condition || "",
    estimatedCost: params.estimatedCost || "",
    fabricsUsed: params.fabricsUsed || "",
    featureHighlights: params.featureHighlights || "",
    productCategory: params.productCategory || "",
    verbalDescription: params.verbalDescription || "",
    userId: userProfile?._id || ("" as Id<"users">),
    approved: false,
    imageUri: params.imageUri || "",
  });

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL", "Regular"];
  const conditions = ["New", "Used", "Fair", "Unknown"];
  const categories = [
    "Skirt",
    "Top",
    "Pants",
    "Dress",
    "Outerwear",
    "Accessories",
    "Footwear",
    "Bags",
    "Jewellery",
    "Other",
  ];

  const handleImageUpload = useCallback(async (fromGallery = false) => {
    const pickImage =
      async (): Promise<ImagePicker.ImagePickerResult | null> => {
        const permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert(
            "Permission Denied",
            "Gallery access is required to pick photos."
          );
          return null;
        }
        return await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: false,
          quality: 1,
        });
      };

    const captureImage =
      async (): Promise<ImagePicker.ImagePickerResult | null> => {
        const permissionResult =
          await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert(
            "Permission Denied",
            "Camera access is required to take photos. Would you like to pick from the gallery instead?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Pick from Gallery",
                onPress: () => handleImageUpload(true),
              },
            ]
          );
          return null;
        }
        return await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      };

    setLoading(true);
    try {
      const result = fromGallery ? await pickImage() : await captureImage();
      if (!result || result.canceled || !result.assets) return;

      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      setFormData((prev) => ({ ...prev, imageUri }));
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFillWithAI = async () => {
    if (!formData.imageUri) {
      Alert.alert("Error", "Please upload an image before using AI analysis.");
      return;
    }

    setAiLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: formData.imageUri }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to analyze image");
      }

      const { productAnalysis } = result.data;
      setFormData((prev) => ({
        ...prev,
        brand: productAnalysis.brand || prev.brand,
        identifiedProduct:
          productAnalysis.identifiedProduct || prev.identifiedProduct,
        size: productAnalysis.size || prev.size,
        condition: productAnalysis.condition || prev.condition,
        estimatedCost: productAnalysis.estimatedCost || prev.estimatedCost,
        fabricsUsed: productAnalysis.fabricsUsed || prev.fabricsUsed,
        featureHighlights:
          productAnalysis.featureHighlights || prev.featureHighlights,
        productCategory:
          productAnalysis.productCategory || prev.productCategory,
        verbalDescription:
          productAnalysis.verbalDescription || prev.verbalDescription,
      }));

      Alert.alert("Success", "Form filled with AI-generated data!");
    } catch (error) {
      console.error("Error in AI analysis:", error);
      Alert.alert("Error", "Failed to analyze image. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!source) return;
    if (source === "camera") {
      handleImageUpload(false);
    } else if (source === "gallery") {
      handleImageUpload(true);
    }
  }, [source, handleImageUpload]);

  useEffect(() => {
    console.log("userProfile:", userProfile);
    console.log("userProfile._id:", userProfile?._id);
    console.log("formData.userId:", formData.userId);
  }, [userProfile, formData.userId]);

  if (!userProfile || !userProfile._id) {
    console.warn("useUserProfile returned invalid data:", userProfile);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color={colors.brand.default} />
        <Text style={{ color: colors.text.primary, marginBottom: 4 }}>
          Loading user profile...
        </Text>
      </View>
    );
  }

  const handleBack = () => {
    Alert.alert(
      "Discard Changes",
      "Are you sure you want to go back? All changes will be discarded.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => router.dismiss(),
        },
      ]
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (
        !formData.identifiedProduct ||
        !formData.productCategory ||
        !formData.verbalDescription ||
        !formData.size ||
        !formData.condition ||
        !formData.estimatedCost ||
        isNaN(parseFloat(formData.estimatedCost)) ||
        !formData.imageUri
      ) {
        Alert.alert(
          "Error",
          "Please fill in all required fields with valid data."
        );
        setIsSubmitting(false);
        return;
      }

      if (!formData.userId) {
        Alert.alert("Error", "User ID is missing. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const uploadUrl = await generateUploadUrl();
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": "image/jpeg" },
        body: await fetch(formData.imageUri).then((res) => res.blob()),
      });
      const data = await response.json();
      if (!data.storageId) {
        throw new Error("Failed to retrieve storage ID");
      }
      const { storageId } = data;

      const productPayload = {
        images: [storageId],
        title: formData.identifiedProduct,
        category: formData.productCategory,
        description: formData.verbalDescription,
        size: formData.size,
        condition: formData.condition,
        price: parseFloat(formData.estimatedCost),
        brand: formData.brand || undefined,
        fabrics: formData.fabricsUsed || undefined,
        highlights: formData.featureHighlights || undefined,
        userId: formData.userId,
      };

      console.log("Submitting product payload:", productPayload);

      await addProduct(productPayload);

      Alert.alert("Success", "Product added successfully!");
      router.dismissTo({ pathname: "/" });
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", "Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background.primary }}
    >
      <ScrollView
        className='flex-1'
        style={{ flex: 1, backgroundColor: colors.background.primary }}
      >
        <View className='relative'>
          <Pressable
            onPress={handleBack}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 1,
              backgroundColor: colors.background.secondary,
              borderRadius: 50,
              padding: 10,
              borderColor: colors.background.border,
              borderWidth: 0.25,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <ArrowLeft color={colors.text.primary} />
          </Pressable>

          <View style={{ padding: 20 }}>
            <Text
              className='text-2xl font-bold text-center mb-10'
              style={{ color: colors.text.primary }}
            >
              Start Selling
            </Text>

            <View
              style={{
                backgroundColor: colors.background.secondary,
                borderRadius: 10,
                padding: 20,
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{ color: colors.text.primary, marginBottom: 2 }}
                className='text-sm'
              >
                UPLOAD IMAGE
              </Text>
              <Text
                className='text-xs mb-4'
                style={{
                  color: colors.text.primary,
                  marginBottom: 4,
                  opacity: 0.6,
                }}
              >
                Required
              </Text>

              {formData.imageUri ? (
                <View
                  style={{
                    alignItems: "center",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <Image
                    source={{ uri: formData.imageUri }}
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  />
                  <TouchableOpacity
                    onPress={handleFillWithAI}
                    disabled={aiLoading}
                    style={{
                      backgroundColor: aiLoading
                        ? colors.brand.interactive
                        : colors.brand.default,
                      padding: 10,
                      borderRadius: 5,
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 1,
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      {aiLoading ? "Analyzing..." : "Fill with AI"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      setFormData((prev) => ({ ...prev, imageUri: "" }))
                    }
                    accessibilityLabel='Remove uploaded image'
                  >
                    <Text
                      style={{ color: colors.brand.default, marginBottom: 10 }}
                    >
                      Remove Image
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => handleImageUpload(true)}
                  style={{
                    borderWidth: 2,
                    borderStyle: "dashed",
                    borderColor: colors.background.border,
                    borderRadius: 10,
                    width: "100%",
                    height: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                  accessibilityLabel='Upload image'
                >
                  <View
                    style={{
                      backgroundColor: colors.background.primary,
                      borderRadius: 50,
                      padding: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Images color={colors.text.secondary} size={24} />
                  </View>
                  <Text
                    style={{
                      color: colors.brand.default,
                      fontSize: 14,
                      marginBottom: 5,
                    }}
                  >
                    Drag & Drop or Browse
                  </Text>
                  <Text
                    style={{
                      color: colors.text.secondary,
                      fontSize: 12,
                      opacity: 0.7,
                    }}
                  >
                    Max 256MB
                  </Text>
                </TouchableOpacity>
              )}

              {loading && (
                <ActivityIndicator
                  size='large'
                  color={colors.brand.default}
                  style={{ marginVertical: 10 }}
                />
              )}

              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                  marginVertical: 10,
                }}
              >
                Or
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  onPress={() => handleImageUpload(false)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: colors.background.primary,
                    padding: 10,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: colors.background.border,
                  }}
                  accessibilityLabel='Take photo with camera'
                >
                  <Camera color={colors.text.secondary} size={20} />
                  <Text style={{ color: colors.text.secondary, marginLeft: 5 }}>
                    Take Photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleImageUpload(true)}
                  style={{
                    backgroundColor: colors.brand.default,
                    padding: 10,
                    borderRadius: 5,
                  }}
                  accessibilityLabel='Pick from gallery'
                >
                  <Text style={{ color: "white" }}>Pick from Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className='p-6'>
          <View className='space-y-4 flex-col gap-6'>
            <View>
              <Text
                className='text-sm mb-1'
                style={{ color: colors.text.primary, marginBottom: 4 }}
              >
                Brand
              </Text>
              <TextInput
                value={formData.brand}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, brand: text }))
                }
                className='rounded-lg p-3'
                style={{
                  color: colors.text.primary,
                  marginBottom: 4,
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.background.border,
                  borderWidth: 1,
                }}
                placeholder='Enter brand name'
              />
            </View>

            <View>
              <Text
                className='text-sm mb-1'
                style={{ color: colors.text.primary, marginBottom: 4 }}
              >
                Product Name
              </Text>
              <TextInput
                value={formData.identifiedProduct}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, identifiedProduct: text }))
                }
                className='rounded-lg p-3'
                style={{
                  color: colors.text.primary,
                  marginBottom: 4,
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.background.border,
                  borderWidth: 1,
                }}
                placeholder='Enter product name'
              />
            </View>

            <View>
              <Text
                className='text-sm mb-1'
                style={{ color: colors.text.primary, marginBottom: 4 }}
              >
                Size
              </Text>
              <SelectList
                setSelected={(val: string) =>
                  setFormData((prev) => ({ ...prev, size: val }))
                }
                data={sizes}
                defaultOption={
                  sizes.includes(formData.size)
                    ? { key: formData.size, value: formData.size }
                    : undefined
                }
                save='value'
                search={false}
                boxStyles={{
                  borderRadius: 8,
                  borderColor: colors.background.border,
                  backgroundColor: colors.background.secondary,
                  padding: 12,
                  marginBottom: 4,
                  borderWidth: 1,
                }}
                inputStyles={{ color: colors.text.primary }}
                dropdownStyles={{
                  borderRadius: 8,
                  borderColor: colors.background.border,
                  backgroundColor: colors.background.secondary,
                  borderWidth: 1,
                }}
                dropdownItemStyles={{
                  backgroundColor: colors.background.secondary,
                }}
                dropdownTextStyles={{ color: colors.text.primary }}
              />
            </View>

            <View>
              <Text
                className='text-sm mb-1'
                style={{ color: colors.text.primary, marginBottom: 4 }}
              >
                Category
              </Text>
              <SelectList
                setSelected={(val: string) =>
                  setFormData((prev) => ({ ...prev, productCategory: val }))
                }
                data={categories}
                defaultOption={
                  categories.includes(formData.productCategory)
                    ? {
                        key: formData.productCategory,
                        value: formData.productCategory,
                      }
                    : undefined
                }
                save='value'
                search={false}
                boxStyles={{
                  borderRadius: 8,
                  borderColor: colors.background.border,
                  backgroundColor: colors.background.secondary,
                  padding: 12,
                  marginBottom: 4,
                  borderWidth: 1,
                }}
                inputStyles={{ color: colors.text.primary }}
                dropdownStyles={{
                  borderRadius: 8,
                  borderColor: colors.background.border,
                  backgroundColor: colors.background.secondary,
                  borderWidth: 1,
                }}
                dropdownItemStyles={{
                  backgroundColor: colors.background.secondary,
                }}
                dropdownTextStyles={{ color: colors.text.primary }}
              />
            </View>

            <View>
              <Text
                className='text-sm mb-1'
                style={{ color: colors.text.primary, marginBottom: 4 }}
              >
                Condition
              </Text>
              <SelectList
                setSelected={(val: string) =>
                  setFormData((prev) => ({ ...prev, condition: val }))
                }
                data={conditions}
                defaultOption={
                  conditions.includes(formData.condition)
                    ? { key: formData.condition, value: formData.condition }
                    : undefined
                }
                save='value'
                search={false}
                boxStyles={{
                  borderRadius: 8,
                  borderColor: colors.background.border,
                  backgroundColor: colors.background.secondary,
                  padding: 12,
                  marginBottom: 4,
                  borderWidth: 1,
                }}
                inputStyles={{ color: colors.text.primary }}
                dropdownStyles={{
                  borderRadius: 8,
                  borderColor: colors.background.border,
                  backgroundColor: colors.background.secondary,
                  borderWidth: 1,
                }}
                dropdownItemStyles={{
                  backgroundColor: colors.background.secondary,
                }}
                dropdownTextStyles={{ color: colors.text.primary }}
              />
            </View>

            <View>
              <Text
                className='text-sm mb-1'
                style={{ color: colors.text.primary, marginBottom: 4 }}
              >
                Estimated Cost
              </Text>
              <TextInput
                value={formData.estimatedCost}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, estimatedCost: text }))
                }
                keyboardType='numeric'
                className='rounded-lg p-3'
                style={{
                  color: colors.text.primary,
                  marginBottom: 4,
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.background.border,
                  borderWidth: 1,
                }}
                placeholder='Enter estimated cost'
              />
            </View>

            <View>
              <Text
                className='text-sm mb-1'
                style={{ color: colors.text.primary, marginBottom: 4 }}
              >
                Materials Used
              </Text>
              <TextInput
                value={formData.fabricsUsed}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, fabricsUsed: text }))
                }
                multiline
                numberOfLines={3}
                className='rounded-lg p-3'
                style={{
                  color: colors.text.primary,
                  marginBottom: 4,
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.background.border,
                  borderWidth: 1,
                }}
                placeholder='Enter materials used'
              />
            </View>

            <View>
              <Text
                className='text-sm mb-1'
                style={{ color: colors.text.primary, marginBottom: 4 }}
              >
                Feature Highlights
              </Text>
              <TextInput
                value={formData.featureHighlights}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, featureHighlights: text }))
                }
                multiline
                numberOfLines={3}
                className='rounded-lg p-3'
                style={{
                  color: colors.text.primary,
                  marginBottom: 4,
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.background.border,
                  borderWidth: 1,
                }}
                placeholder='Enter feature highlights'
              />
            </View>

            <View>
              <Text
                className='text-sm mb-1'
                style={{ color: colors.text.primary, marginBottom: 4 }}
              >
                Description
              </Text>
              <TextInput
                value={formData.verbalDescription}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, verbalDescription: text }))
                }
                multiline
                numberOfLines={4}
                className='rounded-lg p-3'
                style={{
                  color: colors.text.primary,
                  marginBottom: 4,
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.background.border,
                  borderWidth: 1,
                }}
                placeholder='Enter product description'
              />
            </View>

            <Pressable
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting
                  ? colors.brand.interactive
                  : colors.brand.default,
              }}
              className='rounded-lg p-4 mt-6'
            >
              <Text
                style={{ color: colors.text.primary }}
                className='text-center font-semibold'
              >
                {isSubmitting ? "Adding..." : "Add Product"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
