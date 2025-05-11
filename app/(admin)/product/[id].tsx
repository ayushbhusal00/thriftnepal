import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React, { useContext } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  CalendarBlank,
  Check,
  Cross,
  Heart,
  Hourglass,
  HouseSimple,
  PencilSimpleLine,
  Ruler,
  TrashSimple,
  X,
} from "phosphor-react-native";
import { ThemeContext } from "@/providers/ThemeProvider";

import { useCart } from "@/utils/Store";

const Page = () => {
  const { colors } = useContext(ThemeContext);
  const addCart = useCart((state) => state.addCart);
  const removeFromCart = useCart((state) => state.removeCart);
  const cart = useCart((state) => state.cart);
  const { id } = useLocalSearchParams(); // Extracts the `id` from the route
  const product = useQuery(api.products.getProductById, {
    productId: id as Id<"products">,
  });

  const isInCart = product && cart.some((item) => item._id === product._id);

  const addItemToCart = () => {
    if (product && product._id) {
      addCart({
        ...product,
        _id: product._id,
        approved: product.approved || false,
        sold: product.sold || false,
      });
    }
  };

  const removeItemFromCart = () => {
    if (product && product._id) {
      removeFromCart(product._id);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: colors.background.secondary,
        paddingHorizontal: 20,
        paddingVertical: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flex: 1,
      }}
    >
      <View
        style={{
          marginBottom: 16,
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 16,
          marginTop: Platform.OS === "ios" ? 60 : StatusBar.currentHeight,
        }}
      >
        <TouchableOpacity onPress={() => router.dismissTo("/")}>
          <HouseSimple color={colors.brand.default} weight='fill' />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.text.secondary,
          }}
          className={`text-subhead-1`}
        >
          /
        </Text>
        <TouchableOpacity onPress={() => router.navigate("/")}>
          <Text
            style={{
              color: colors.text.secondary,
            }}
            className={`text-subhead-1`}
          >
            Product
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: colors.text.secondary,
          }}
          className={`text-subhead-1`}
        >
          /
        </Text>
        <Text
          style={{
            color: colors.text.secondary,
          }}
          className={`text-subhead-1`}
        >
          {product?.title}
        </Text>
      </View>
      <View>
        <Image
          source={{ uri: product?.imageUrls[0] }}
          style={{
            width: "100%",
            height: Dimensions.get("window").width * 0.75,
            padding: 20,
            overflow: "hidden",
            borderRadius: 10,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingBottom: 20,
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Image
            source={{ uri: product?.imageUrls[0] }}
            style={{
              width: 100,
              height: 100,
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.brand.default,
            }}
          />
          <Image
            source={{ uri: product?.imageUrls[0] }}
            style={{
              width: 100,
              height: 100,
              padding: 10,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: colors.background.border,
            }}
          />
        </View>
      </View>
      <View className='my-5 flex-col gap-4'>
        <View
          style={{
            backgroundColor: colors.accent.interactive,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 10,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              color: colors.accent.text,
            }}
            className={`text-paragraph-1`}
          >
            {product?.brand} | {product?.category}
          </Text>
        </View>
        <View className='flex-col gap-2 justify-between'>
          <Text
            style={{ color: colors.text.primary }}
            numberOfLines={2}
            className={`text-3xl font-medium`}
          >
            {product?.title}
          </Text>
        </View>
        <View className='flex-col gap-2 justify-between'>
          <Text
            style={{ color: colors.text.secondary }}
            className={`text-xl font-medium`}
          >
            ₹ {product?.price}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 4,
          marginBottom: 20,
          padding: 16,
          borderColor: colors.background.border,
          borderWidth: 0.5,
          borderRadius: 10,
          backgroundColor: colors.background.secondary,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 4,
            flex: 1,
          }}
        >
          <View
            style={{
              marginRight: 10,
              padding: 10,
              borderRadius: 10,
              borderColor: colors.background.border,
              borderWidth: 0.5,
              backgroundColor: colors.background.primary,
            }}
          >
            <Ruler size={24} color={colors.text.secondary} weight='regular' />
          </View>
          <View style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Text
              style={{
                color: colors.text.secondary,
                fontSize: 14,
              }}
              className={`text-paragraph-1`}
            >
              Size:
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: colors.text.primary,
              }}
              className={`text-paragraph-1`}
            >
              {product?.size}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 4,
            flex: 1,
          }}
        >
          <View
            style={{
              marginRight: 10,
              padding: 10,
              borderRadius: 10,
              borderColor: colors.background.border,
              borderWidth: 0.5,
              backgroundColor: colors.background.primary,
            }}
          >
            <CalendarBlank
              size={24}
              color={colors.text.secondary}
              weight='regular'
            />
          </View>
          <View style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
              }}
              className={`text-paragraph-1`}
            >
              Posted on:
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: colors.text.primary,
              }}
              className={`text-paragraph-1`}
            >
              {product?._creationTime
                ? new Date(product._creationTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : null}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        style={{
          backgroundColor: colors.brand.default,
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 10,
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          shadowColor: colors.brand.default,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 2,
          borderWidth: 0.5,
          borderColor: colors.brand.text,
        }}
        onPress={isInCart ? removeItemFromCart : addItemToCart}
      >
        <Text
          style={{
            color: colors.text.onColor,
            fontWeight: 700,
          }}
          className={`text-paragraph-1`}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </Text>
      </Pressable>

      <View
        style={{
          padding: 20,
          flexDirection: "column",
          gap: 16,
          backgroundColor: colors.background.primary,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          borderWidth: 0.5,
          borderColor: colors.background.border,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: colors.text.secondary,
              marginBottom: 8,
            }}
          >
            Product Description:
          </Text>
          <X size={24} color={colors.text.secondary} weight='regular' />
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.text.secondary,
              marginBottom: 8,
            }}
          >
            Overview:
          </Text>
          <Text
            style={{
              color: colors.text.primary,
              marginBottom: 8,
            }}
            className='text-paragraph-1 leading-snug'
          >
            {product?.description}
          </Text>
        </View>

        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.text.secondary,
              marginBottom: 8,
            }}
          >
            Highlights:
          </Text>
          <Text
            style={{
              color: colors.text.primary,
              marginBottom: 8,
            }}
            className='text-paragraph-1 leading-snug'
          >
            {product?.highlights}
          </Text>
        </View>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.text.secondary,
              marginBottom: 8,
            }}
          >
            Material:
          </Text>
          <Text
            style={{
              color: colors.text.primary,
              marginBottom: 8,
            }}
            className='text-paragraph-1 leading-snug'
          >
            {product?.fabrics}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Page;
