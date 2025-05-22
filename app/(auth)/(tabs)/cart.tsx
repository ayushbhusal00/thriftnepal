import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext, useMemo } from "react";

import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "expo-router";
import { handleInitiatePayment } from "@/utils/InitiatePayment";
import { ThemeContext } from "@/providers/ThemeProvider";
import ProductList from "@/app/components/ProductList";
import { useCart } from "@/utils/Store";
import Checkbox from "expo-checkbox";
import { X } from "phosphor-react-native";

const Page = () => {
  const { colors, theme } = useContext(ThemeContext);
  const cart = useCart((state) => state.cart);
  const selectedItems = useCart((state) => state.selectedItems);
  const toggleItemSelection = useCart((state) => state.toggleItemSelection);
  const selectAllItems = useCart((state) => state.selectAllItems);
  const deselectAllItems = useCart((state) => state.deselectAllItems);
  const removeSelectedItems = useCart((state) => state.removeSelectedItems);
  const cartCount = cart.length;
  const screenHeight = Dimensions.get("window").height;

  const router = useRouter();

  const selectedItemsTotal = useMemo(() => {
    return cart
      .filter((item) => selectedItems.includes(item._id))
      .reduce((acc, item) => acc + item.price, 0);
  }, [cart, selectedItems]);

  const handleSelectAll = (value: boolean) => {
    if (value) {
      selectAllItems();
    } else {
      deselectAllItems();
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background.primary,
        }}
      >
        <View
          style={{
            flex: 1,
            margin: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <FlatList
            data={cart}
            renderItem={({ item }) => {
              return item && typeof item.brand === "string" ? (
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                  }}
                >
                  <ProductList
                    icon='Trash'
                    item={{
                      ...item,
                      _id: item._id as Id<"products">,
                      userId: item.userId as Id<"users">,
                      brand: item.brand || "",
                    }}
                    isSelected={selectedItems.includes(item._id)}
                    onSelect={() => toggleItemSelection(item._id)}
                  />
                </View>
              ) : (
                <View />
              );
            }}
            ListHeaderComponent={() => {
              return (
                cartCount > 0 && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <TouchableOpacity
                      onPress={removeSelectedItems}
                      style={{
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <X size={20} color={colors.text.secondary} />
                      <Text style={{ color: colors.text.secondary }}>
                        Delete Selected ({selectedItems.length})
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        flexDirection: "row",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: colors.text.primary }}>
                        Select all:
                      </Text>
                      <Checkbox
                        value={selectedItems.length === cart.length}
                        onValueChange={handleSelectAll}
                        color={colors.brand.default}
                      />
                    </View>
                  </View>
                )
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 16,
                    minHeight: 420,
                  }}
                >
                  <Text className='text-h2 font-dmsans text-center'>
                    Make your first order
                  </Text>
                  <Text
                    className='text-paragraph-1 font-dmsans text-center'
                    style={{ color: colors.text.secondary }}
                  >
                    Perhaps you will be inspired by our discounts and
                    recommendations
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 12,
                      marginTop: 16,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        router.push("/");
                      }}
                      style={{
                        flexDirection: "row",
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 16,
                        backgroundColor: colors.background.secondary,
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.text.primary,
                        }}
                        className='text-paragraph-1 font-dmsans'
                      >
                        To the main page
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        router.push("/");
                      }}
                      style={{
                        flexDirection: "row",
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 16,
                        backgroundColor: colors.brand.default,
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.text.onColor,
                        }}
                        className='text-paragraph-1 font-dmsans'
                      >
                        Continue Shopping
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 100, width: "100%" }}
          />
        </View>
        {cartCount !== 0 && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              shadowOpacity: 0.1,
              shadowRadius: 1,
              shadowOffset: { width: 0, height: -1 },
              shadowColor: colors.background.border,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderWidth: 0.25,
              borderTopStartRadius: 16,
              borderTopEndRadius: 16,
              backgroundColor: colors.background.primary,
              borderColor: colors.background.border,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                gap: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: colors.text.primary }}
                  className='text-paragraph-1 font-dmsans'
                >
                  Selected Items: {selectedItems.length}
                </Text>
                <Text
                  style={{ color: colors.text.primary }}
                  className='text-paragraph-1 font-dmsans'
                >
                  Total: ₹ {selectedItemsTotal}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleInitiatePayment({
                    amount: selectedItemsTotal.toString(),
                  });
                }}
                disabled={selectedItems.length === 0}
                style={{
                  flexDirection: "row",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 16,
                  backgroundColor:
                    selectedItems.length === 0
                      ? colors.background.subtle
                      : colors.brand.default,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  opacity: selectedItems.length === 0 ? 0.5 : 1,
                }}
              >
                <Text
                  style={{
                    color:
                      selectedItems.length === 0
                        ? colors.text.secondary
                        : colors.text.onColor,
                  }}
                  className='text-paragraph-1 font-dmsans'
                >
                  Continue to Payment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Page;
