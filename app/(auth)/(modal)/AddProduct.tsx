import React, { useState, useEffect, useContext } from "react"; // Add useEffect import
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Camera, Images } from "phosphor-react-native";
import { ThemeContext } from "@/providers/ThemeProvider";
import * as Haptics from "expo-haptics";

// Define the type for route parameters
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

const AddProduct = () => {
  const { colors } = useContext(ThemeContext);
  // Use ProductParams for useLocalSearchParams
  const params = useLocalSearchParams<ProductParams>();
  // console.log("Params:", params); // Log the params object for debuggi
  const { userProfile } = useUserProfile();
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);
  const addProduct = useMutation(api.products.addProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for user profile and navigate back if not loaded
  useEffect(() => {
    if (!userProfile?._id) {
      Alert.alert("Error", "User profile not loaded. Please try again.");
      router.back();
    }
  }, [userProfile]); // Run when userProfile changes

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
    userId: userProfile?._id as Id<"users">, // Safe to use now
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

  const handleBack = () => {
    Alert.alert(
      "Discard Changes",
      "Are you sure you want to go back? All changes will be discarded.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Discard", style: "destructive", onPress: () => router.back() },
      ]
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (
        !formData.identifiedProduct ||
        !formData.productCategory ||
        !formData.verbalDescription ||
        !formData.size ||
        !formData.condition ||
        !formData.estimatedCost ||
        !formData.imageUri
      ) {
        Alert.alert("Error", "Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      // Upload image
      const uploadUrl = await generateUploadUrl();
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": "image/jpeg" },
        body: await fetch(formData.imageUri).then((res) => res.blob()),
      });
      const { storageId } = await response.json();

      // Add product to Convex
      await addProduct({
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
      });

      Alert.alert("Success", "Product added successfully!");
      router.back();
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", "Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render nothing while userProfile is loading
  if (!userProfile?._id) {
    return null;
  }
  const CreateIcon = () => {
    return (
      <View
        className={`rounded-full p-2 absolute w-20 h-20 items-center justify-center`}
        style={{
          backgroundColor: colors.brand.default,
        }}
      ></View>
    );
  };

  const handleOption = (source: "camera" | "gallery") => {
    Haptics.selectionAsync();
    router.push({
      pathname: "/create",
      params: { source },
    });
  };
  return (
    <ScrollView className='flex-1 bg-white dark:bg-slate-900'>
      <View className='relative'>
        <Pressable
          onPress={handleBack}
          className='absolute top-14 left-4 z-10 bg-white dark:bg-slate-800 rounded-full p-2'
        >
          <Text className='text-lg'>←</Text>
        </Pressable>
        <Image
          source={{
            uri: formData.imageUri || "https://via.placeholder.com/150",
          }}
          className='w-full h-72 bg-gray-200'
        />
        {/* Sell an Item and Upload Image Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.sellButton}
            onPress={() => handleOption("camera")}
          >
            <Camera size={24} color={colors.brand.default} weight='duotone' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleOption("gallery")}
          >
            <Images size={24} color={colors.brand.default} weight='duotone' />
          </TouchableOpacity>
        </View>
      </View>

      <View className='p-6'>
        <Text className='text-2xl font-bold mb-6 dark:text-white'>
          Product Details
        </Text>

        <View className='space-y-4'>
          <View>
            <Text className='text-sm mb-1 dark:text-white'>Brand</Text>
            <TextInput
              value={formData.brand}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, brand: text }))
              }
              className='border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:text-white'
              placeholder='Enter brand name'
            />
          </View>

          <View>
            <Text className='text-sm mb-1 dark:text-white'>Product Name</Text>
            <TextInput
              value={formData.identifiedProduct}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, identifiedProduct: text }))
              }
              className='border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:text-white'
              placeholder='Enter product name'
            />
          </View>

          <View>
            <Text className='text-sm mb-1 dark:text-white'>Size</Text>
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
                borderColor: "#d1d5db",
                padding: 12,
              }}
            />
          </View>

          <View>
            <Text className='text-sm mb-1 dark:text-white'>Category</Text>
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
                borderColor: "#d1d5db",
                padding: 12,
              }}
            />
          </View>

          <View>
            <Text className='text-sm mb-1 dark:text-white'>Condition</Text>
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
                borderColor: "#d1d5db",
                padding: 12,
              }}
            />
          </View>

          <View>
            <Text className='text-sm mb-1 dark:text-white'>Estimated Cost</Text>
            <TextInput
              value={formData.estimatedCost}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, estimatedCost: text }))
              }
              keyboardType='numeric'
              className='border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:text-white'
              placeholder='Enter estimated cost'
            />
          </View>

          <View>
            <Text className='text-sm mb-1 dark:text-white'>Materials Used</Text>
            <TextInput
              value={formData.fabricsUsed}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, fabricsUsed: text }))
              }
              multiline
              numberOfLines={3}
              className='border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:text-white'
              placeholder='Enter materials used'
            />
          </View>

          <View>
            <Text className='text-sm mb-1 dark:text-white'>
              Feature Highlights
            </Text>
            <TextInput
              value={formData.featureHighlights}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, featureHighlights: text }))
              }
              multiline
              numberOfLines={3}
              className='border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:text-white'
              placeholder='Enter feature highlights'
            />
          </View>

          <View>
            <Text className='text-sm mb-1 dark:text-white'>Description</Text>
            <TextInput
              value={formData.verbalDescription}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, verbalDescription: text }))
              }
              multiline
              numberOfLines={4}
              className='border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:text-white'
              placeholder='Enter product description'
            />
          </View>

          <Pressable
            onPress={handleSubmit}
            disabled={isSubmitting}
            className={`rounded-lg p-4 mt-6 ${
              isSubmitting ? "bg-blue-300" : "bg-blue-500"
            }`}
          >
            <Text className='text-white text-center font-semibold'>
              {isSubmitting ? "Adding..." : "Add Product"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddProduct;
const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 70, // Position above the tab bar (adjust based on tab bar height)
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10, // Space between buttons
  },
  sellButton: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  uploadButton: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
