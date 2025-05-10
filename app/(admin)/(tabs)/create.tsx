import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";

export default function Page() {
  const router = useRouter();
  const { colors } = useContext(ThemeContext);

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
          onPress={() => router.push("../(admin)/(modal)/AddProduct")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Sell new product
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
