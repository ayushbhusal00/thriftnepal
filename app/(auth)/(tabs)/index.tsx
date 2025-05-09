import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import PagerView from "react-native-pager-view";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "expo-router";
import ProductFeed from "@/app/components/ProductFeed";
import SkeletalLoader from "@/app/components/SkeletalLoader";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext, useState, useCallback } from "react";
import { useCart } from "@/utils/Store";
import {
  Copy,
  CurrencyDollar,
  Hamburger,
  Info,
  List,
  MapPin,
  MapPinSimpleLine,
} from "phosphor-react-native";
import Constants from "expo-constants";
import { Id } from "@/convex/_generated/dataModel";

const PAGE_SIZE = 5;

interface Product {
  _id: Id<"products">;
  brand: string;
  title: string;
  category: string;
  description: string;
  size: string;
  condition: string;
  price: number;
  images: string[];
  userId: Id<"users">;
  approved: boolean;
}

interface Story {
  userId: Id<"users">;
  storyImageUrls: string[];
  userImageUrl?: string;
}

const Page = () => {
  const { colors, theme } = useContext(ThemeContext);
  const router = useRouter();
  const cartCount = useCart((state) => state.cartCount);
  const [cursor, setCursor] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activePage, setActivePage] = useState(0); // Track active carousel page

  const stories = useQuery(api.stories.list) as Story[] | undefined;
  const paginatedProducts = useQuery(
    api.products.getApprovedAndNotSoldProducts,
    {
      cursor,
      pageSize: PAGE_SIZE,
    }
  ) as
    | { products: Product[]; nextCursor: string | null; isDone: boolean }
    | undefined;

  const loadMoreProducts = useCallback(() => {
    if (!paginatedProducts || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    if (paginatedProducts.products) {
      setAllProducts((prev) => [...prev, ...paginatedProducts.products]);
      setCursor(paginatedProducts.nextCursor);
      setHasMore(!paginatedProducts.isDone);
    }
    setIsLoadingMore(false);
  }, [paginatedProducts, isLoadingMore, hasMore]);

  // Handling loading state
  if (!stories) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.background.primary }}
      >
        <ActivityIndicator
          size='large'
          color={colors.brand.default}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      </SafeAreaView>
    );
  }

  // Handling empty stories state
  if (stories.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text>No stories available</Text>
      </SafeAreaView>
    );
  }

  const statusBarHeight = Constants.statusBarHeight;

  // Rendering header section with location, coupon, search, and discount
  const renderHeader = () => (
    <View style={{ flexDirection: "column" }}>
      {/* Header top section with location and coupon */}
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            backgroundColor: colors.brand.default,
            paddingTop: statusBarHeight,
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              padding: 12,
              paddingHorizontal: 24,
              alignItems: "center",
            }}
          >
            {/* Location display */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
              }}
            >
              <MapPinSimpleLine
                size={32}
                color={colors.text.onColor}
                weight='fill'
              />
              <Text
                style={{
                  color: colors.text.onColor,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Kathmandu
              </Text>
            </View>
            {/* Coupon display */}
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: colors.text.onColor,
                borderRadius: 12,
                paddingHorizontal: 8,
                gap: 4,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.background.primary,
                position: "relative",
              }}
            >
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 20,
                  fontWeight: "600",
                  paddingRight: 30,
                }}
              >
                3
              </Text>
              <Image
                source={require("@/assets/images/coupon.png")}
                style={{
                  width: 32,
                  height: 32,
                  resizeMode: "contain",
                  position: "absolute",
                  right: 0,
                  backgroundColor: colors.background.primary,
                  borderRadius: 99,
                }}
              />
            </View>
          </View>

          {/* Search bar section */}
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
            >
              {/* Menu button */}
              <Pressable
                onPress={() => router.replace("./Profile")}
                style={{
                  backgroundColor:
                    theme === "light"
                      ? colors.background.primary
                      : colors.background.contrast,
                  borderRadius: 12,
                  padding: 10,
                  shadowColor: colors.background.contrast,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 0.5,
                }}
              >
                <List
                  size={24}
                  color={
                    theme === "light"
                      ? colors.text.primary
                      : colors.text.onColor
                  }
                  weight='regular'
                />
              </Pressable>
              {/* Search input */}
              <TextInput
                placeholder='Search for products'
                placeholderTextColor={colors.text.secondary}
                style={{
                  fontFamily: "dmsans",
                  padding: 16,
                  borderRadius: 12,
                  flex: 1,
                  color: colors.text.primary,
                  backgroundColor:
                    theme === "dark"
                      ? colors.background.contrast
                      : colors.background.primary,
                }}
                onFocus={(props) => {
                  props.target.setNativeProps({
                    style: {
                      borderColor: colors.accent.default,
                      boxShadow: `0 0 0 2px ${colors.accent.default} inset`,
                    },
                  });
                }}
                onBlur={(props) => {
                  props.target.setNativeProps({
                    style: { boxShadow: "none" },
                  });
                }}
              />
            </View>
          </View>

          {/* Discount section */}
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              padding: 12,
              paddingHorizontal: 24,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "yellow",
                fontFamily: "dmsans",
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              -500
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.text.onColor,
                  fontSize: 16,
                  fontWeight: "700",
                  fontStyle: "italic",
                  fontFamily: "dmsans",
                }}
              >
                First Time Discount
              </Text>
              <Text style={{ color: colors.text.onColor }}>
                Get upto Rs. 500 off
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: colors.text.onColor,
                borderRadius: 12,
                paddingHorizontal: 8,
                gap: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Copy size={16} color={colors.text.onColor} weight='regular' />
              <Text style={{ color: colors.text.onColor }}>WOW500</Text>
            </View>
          </View>
        </View>
        <ScrollView
          snapToAlignment='center'
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            gap: 12,
          }}
        >
          <Text
            style={{
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
              backgroundColor: colors.background.contrast,
              color: colors.text.onColor,
            }}
          >
            ALL ITEMS
          </Text>
          <Text
            style={{
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            PRADA
          </Text>
          <Text
            style={{
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            GUCCI
          </Text>
          <Text
            style={{
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            Adidas
          </Text>
          <Text
            style={{
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            Victoria Secret
          </Text>
          <Text
            style={{
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            MAISON
          </Text>
          <Text
            style={{
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            CHANNEL
          </Text>
        </ScrollView>
      </View>

      {/* Pager section for featured content with pagination dots */}
      <View
        style={{
          height: 150,
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 12,
          backgroundColor: colors.accent.interactive,
          overflow: "hidden",
        }}
      >
        <PagerView
          style={{ flex: 1, height: "100%" }}
          initialPage={0}
          onPageSelected={(e) => setActivePage(e.nativeEvent.position)}
        >
          <Image
            source={require("@/assets/images/banner/electric.jpg")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            key='1'
          />
          <Image
            source={require("@/assets/images/banner/fashion.jpg")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            key='2'
          />
          <Image
            source={require("@/assets/images/banner/prada.jpg")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            key='3'
          />
        </PagerView>
        {/* Pagination dots */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 10,
            width: "100%",
          }}
        >
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={{
                width: activePage === index ? 12 : 8,
                height: activePage === index ? 12 : 8,
                borderRadius: 6,
                backgroundColor:
                  activePage === index
                    ? colors.brand.default
                    : colors.text.secondary,
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    // Main container with SafeAreaView
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      {/* Scrollable content including header and products */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        onMomentumScrollEnd={() => {
          if (hasMore && !isLoadingMore) loadMoreProducts();
        }}
      >
        {/* Header */}
        {renderHeader()}

        {/* Product feed */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          {allProducts.length > 0 ? (
            allProducts.map((item) =>
              item && typeof item.brand === "string" ? (
                <View
                  key={item._id}
                  style={{
                    width: "50%",
                    padding: 10,
                    paddingVertical: 24,
                  }}
                >
                  <ProductFeed item={item as any} />
                </View>
              ) : null
            )
          ) : isLoadingMore || !paginatedProducts ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: 20,
              }}
            >
              <ActivityIndicator size='large' color={colors.brand.default} />
              <Text style={{ color: colors.text.primary, marginTop: 10 }}>
                Loading products
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: 20,
              }}
            >
              <Image
                source={require("@/assets/images/items.png")}
                style={{ width: 120, height: 120 }}
              />
              <Text
                className='text-h4'
                style={{ color: colors.text.secondary, marginTop: 10 }}
              >
                No products found
              </Text>
            </View>
          )}
        </View>

        {/* Loading indicator for more products */}
        {isLoadingMore && hasMore && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <ActivityIndicator size='large' color={colors.brand.default} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Page;
