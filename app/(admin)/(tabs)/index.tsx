import { useRouter } from "expo-router";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import Breadcrumb from "@/app/components/Breadcrumb";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function Page() {
  const router = useRouter();
  const { colors, theme } = useContext(ThemeContext);
  const { userProfile } = useUserProfile();

  // Fetch all products for this user
  const myProducts = useQuery(api.products.getMyProducts, {
    userId: userProfile?._id as Id<"users">,
  });
  // Filter sold items
  const soldItems = (myProducts || []).filter((item) => item.sold);

  // Mock actions required
  const actionsRequired = [
    {
      id: 1,
      title: "Ship order #1234",
      description: "Order placed on May 10, 2024",
    },
    {
      id: 2,
      title: "Respond to buyer message",
      description: "Message from user Ayush",
    },
  ];

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          theme === "light"
            ? colors.background.secondary
            : colors.background.primary,
        flex: 1,
      }}
    >
      <Breadcrumb
        items={[
          { label: "Home", path: "/(admin)/(tabs)" },
          { label: "Dashboard" },
        ]}
      />
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 8, gap: 24 }}>
          <Text
            className='text-2xl font-dmsans'
            style={{ color: colors.text.primary, marginBottom: 8 }}
          >
            Dashboard
          </Text>

          {/* Sold Items Section */}
          <View
            style={{
              backgroundColor: colors.background.primary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              shadowColor: colors.text.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text
              style={{
                color: colors.text.secondary,
                fontWeight: "600",
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              Sold Items ({soldItems.length})
            </Text>
            {soldItems.length === 0 ? (
              <Text style={{ color: colors.text.secondary }}>
                No items sold yet.
              </Text>
            ) : (
              <FlatList
                data={soldItems.slice(0, 3)}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/(admin)/product/[id]",
                        params: { id: item._id },
                      })
                    }
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      source={{ uri: item.imageUrls[0] }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        marginRight: 8,
                        backgroundColor: colors.background.border,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: colors.text.primary,
                          fontWeight: "600",
                        }}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{ color: colors.text.secondary, fontSize: 13 }}
                        numberOfLines={1}
                      >
                        {item.brand} | ₹{item.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => null}
              />
            )}
            {soldItems.length > 3 && (
              <TouchableOpacity
                onPress={() => router.push("/(admin)/(tabs)/listings")}
              >
                <Text style={{ color: colors.brand.default, marginTop: 8 }}>
                  View all sold items
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Actions Required Section */}
          <View
            style={{
              backgroundColor: colors.background.primary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              shadowColor: colors.text.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text
              style={{
                color: colors.text.secondary,
                fontWeight: "600",
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              Actions Required ({actionsRequired.length})
            </Text>
            {actionsRequired.length === 0 ? (
              <Text style={{ color: colors.text.secondary }}>
                No actions required.
              </Text>
            ) : (
              actionsRequired.map((action) => (
                <View
                  key={action.id}
                  style={{
                    marginBottom: 10,
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: colors.background.secondary,
                  }}
                >
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontWeight: "600",
                    }}
                  >
                    {action.title}
                  </Text>
                  <Text style={{ color: colors.text.secondary, fontSize: 13 }}>
                    {action.description}
                  </Text>
                </View>
              ))
            )}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.brand.default,
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
              marginBottom: 20,
            }}
            onPress={() => router.push("/(admin)/(modal)/AddProduct")}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Sell new product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
