import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";

type Product = {
  brand: string;
  identifiedProduct: string;
  size: string;
  condition: string;
  estimatedCost: string;
  fabricsUsed: string;
  featureHighlights: string;
  productCategory: string;
  verbalDescription: string;
  productDescription: string;
  imageUri?: string; // Added for image URI
};

const AddProduct = () => {
  const params = useLocalSearchParams<Product>(); // Retrieve navigation params

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
    productDescription: params.productDescription || "",
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

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
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
          source={{ uri: params.imageUri || "https://via.placeholder.com/150" }} // Use passed imageUri or fallback
          className='w-full h-72 bg-gray-200'
        />
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
            className='bg-blue-500 rounded-lg p-4 mt-6'
          >
            <Text className='text-white text-center font-semibold'>
              Add Product
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddProduct;
