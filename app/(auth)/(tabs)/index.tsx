import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "expo-router";
import ProductFeed from "@/components/ProductFeed";
import { BellRinging, Faders, ShoppingCart } from "phosphor-react-native";
// import { handleInitiatePayment } from "@/utils/InitiatePayment";

const Page = () => {
  //Undo this action
  // const stories = useQuery(api.stories.list);
  const stories = [
    {
      storyImageUrls: [
        "https://combative-vulture-199.convex.cloud/api/storage/e80c22a6-c72b-44ad-b5ee-31cc33418709",
        "https://combative-vulture-199.convex.cloud/api/storage/aa3bdcb6-6aae-4061-804f-b771de77fd0f",
        "https://combative-vulture-199.convex.cloud/api/storage/f7657ad6-5ee0-4a76-a1f1-7c265731ea09",
      ],
      userId: "jd7djj0dewg8f1347mj877d7wd7eamyk",
      userImageUrl: "https://images.unsplash.com/photo-1542996966-2e31c00bae31",
    },
    {
      storyImageUrls: [
        "https://combative-vulture-199.convex.cloud/api/storage/6a6cf286-b8a6-4da4-a255-77e16bfefdee",
        "https://combative-vulture-199.convex.cloud/api/storage/64969e7b-0288-4d31-a393-e347bcf6da5c",
      ],
      userId: "jd780nh78zyq5rs10tq5csqpt17ea0eh",
      userImageUrl:
        "https://plus.unsplash.com/premium_photo-1727265736334-16827679f453",
    },
  ];
  // const approvedProducts = useQuery(api.products.getApprovedAndNotSoldProducts);
  const approvedProducts = [
    {
      _creationTime: 1745285752835.5688,
      _id: "j977z4ydn48aswb39y986m1jrn7egpc6",
      approved: true,
      brand: "Reebok",
      category: "Footwear",
      condition: "New",
      description:
        "A classic mid-top basketball shoe featuring a white leather upper, a yellow toe cap, and a gum rubber outsole. The design incorporates Reebok's vector logo and signature hexagonal cushioning.",
      fabrics:
        "Leather (upper), Rubber (outsole), Synthetic materials (lining and details), Textile (laces)",
      highlights:
        "The shoe's key features include its iconic design, the contrasting yellow toe cap, Reebok's hexagonal cushioning for shock absorption, and the durable gum rubber outsole for traction on and off the court. ",
      imageUrls: [
        "https://combative-vulture-199.convex.cloud/api/storage/d1139fbe-5b92-45cd-adb2-28f985596e74",
      ],
      images: ["kg26tfz0pjk3k5m5psgnscsz6x7ehb08"],
      price: 18000,
      size: "Regular",
      title: "Reebok Question Mid Yellow Toe",
      userId: "jd75bzy14qcdncbd2c714nrcrn7eayca",
    },
    {
      _creationTime: 1745285801334.8052,
      _id: "j971m8r05nred768fk56j7ak217egt8q",
      approved: true,
      brand: "Guess",
      category: "Bags",
      condition: "New",
      description:
        "A black bucket bag crafted from faux leather. It has a structured silhouette and features a top handle. The design is accented by a chunky gold chain strap and a magnetic flap closure with a gold-tone 'G' logo detail. The bag is stylish and versatile, suitable for both casual and formal occasions.",
      fabrics: "Faux leather, metal (gold-tone), fabric lining",
      highlights:
        "Gold chain strap, bucket design, magnetic flap closure, 'G' logo detail.",
      imageUrls: [
        "https://combative-vulture-199.convex.cloud/api/storage/9d43cac3-5dd7-4549-a8b4-b894499b4d42",
      ],
      images: ["kg2fz413bxcv2c51m2kppptf7h7egpqq"],
      price: 12000,
      size: "Regular",
      title: "Black Bucket Bag with Chain",
      userId: "jd7djj0dewg8f1347mj877d7wd7eamyk",
    },
    {
      _creationTime: 1745285828639.9468,
      _id: "j97eppajpw7wfg39p37swkbryh7ege1g",
      approved: true,
      brand: "Ralph Lauren (Likely)",
      category: "Dress",
      condition: "New",
      description:
        "A strapless, knee-length dress with a pink and white gingham pattern. The dress appears to have a structured bodice and a flared skirt. An embellished belt with charms and what seems to be a scarf accentuates the waist. The dress is made from woven fabric.",
      fabrics:
        "Cotton, possible lining of polyester or similar synthetic, metal charms, silk scarf.",
      highlights:
        "The strapless design, the classic gingham pattern, the embellished belt with beach-themed charms, and the flattering silhouette are the highlights of this dress.",
      imageUrls: [
        "https://combative-vulture-199.convex.cloud/api/storage/5b9f04dc-892d-4476-a6d3-732ca9d7e322",
      ],
      images: ["kg26p8q39xkbx7kr599ghqsjmd7eg202"],
      price: 25000,
      size: "S",
      sold: false,
      title: "Strapless Gingham Dress",
      userId: "jd777hjdbxa16v8yhn33xsr52s7ebzm8",
    },
    {
      _creationTime: 1745384911903.5269,
      _id: "j97b0kr4wtr08epcza5s9v73057ek8wt",
      approved: true,
      brand: "Dopper",
      category: "Accessories",
      condition: "New",
      description:
        "A reusable insulated water bottle with a two-tone design. The body of the bottle appears to be a caramel or brown color, while the top section and cap are white and yellow respectively. It appears to be made of a durable plastic material.",
      fabrics:
        "Plastic (Likely Tritan or similar BPA-free plastic), Silicone (for seals)",
      highlights:
        "Insulated design, two-tone color scheme, features the 'Dopper' logo on the body, reusable and eco-friendly, cup portion serves as drinking vessel.",
      imageUrls: [
        "https://combative-vulture-199.convex.cloud/api/storage/e6cc1205-c2d3-4842-8f3f-3645c079ed48",
      ],
      images: ["kg2cnjsyrq4kb3zkqsgd7w7v8n7ej43c"],
      price: 2000,
      size: "Regular",
      sold: false,
      title: "Dopper Insulated Water Bottle",
      userId: "jd777hjdbxa16v8yhn33xsr52s7ebzm8",
    },
    {
      _creationTime: 1745490729621.3003,
      _id: "j97d3g22r8yerqm9hakda782f97empge",
      approved: true,
      brand: "Gucci (Likely)",
      category: "Footwear",
      condition: "New",
      description:
        "A pair of black leather ankle boots featuring a Chelsea boot style with elastic side panels. The boots have a chunky lug sole and a webbing detail at the top of the shaft in red and green stripes. They also have pull tabs at the back.",
      fabrics:
        "Leather (Outer), Elastic (Side Panels), Rubber (Sole), Webbing (Red and Green Stripes)",
      highlights:
        "Chunky lug sole, elastic side panels, red and green signature web detail, pull tabs.",
      imageUrls: [
        "https://combative-vulture-199.convex.cloud/api/storage/67c90b4b-6287-43b7-82b3-827da754f623",
      ],
      images: ["kg20g4p7699qd25vkb3mq00fvn7em3zb"],
      price: 165000,
      size: "Regular",
      sold: false,
      title: "Black Leather Ankle Boots with Webbing",
      userId: "jd777hjdbxa16v8yhn33xsr52s7ebzm8",
    },
  ];
  const router = useRouter();

  if (!stories) {
    return (
      <SafeAreaView className='flex-1'>
        <Text>Loading stories...</Text>
      </SafeAreaView>
    );
  }

  if (stories.length === 0) {
    return (
      <SafeAreaView className='flex-1'>
        <Text>No stories available</Text>
      </SafeAreaView>
    );
  }

  const renderStoriesSection = () => (
    <View>
      <View className='flex-row justify-between items-center px-6 py-4'>
        <View className='flex-row items-center gap-6'>
          <Image
            source={require("@/assets/images/placeholder.jpg")}
            style={{
              width: 52,
              height: 52,
              borderRadius: 99,
            }}
          />
          <Text className='text-xl font-bold'>Hi, Ayush</Text>
        </View>
        <View className='flex-row gap-4'>
          <Pressable
            onPress={() => {
              router.replace("/cart");
            }}
            style={{
              padding: 8,
              borderRadius: 12,
              backgroundColor: "#FFFFFF",
            }}
          >
            <BellRinging size={32} color='#000' />
          </Pressable>
          <Pressable
            onPress={() => {
              router.replace("/cart");
            }}
            style={{
              padding: 8,
              borderRadius: 12,
              backgroundColor: "#FFFFFF",
            }}
          >
            <ShoppingCart size={32} color='#000' />
          </Pressable>
        </View>
      </View>
      <View className='flex-row gap-4  mx-5 mb-6'>
        <TextInput
          placeholder='Search for products'
          placeholderTextColor='#00000060'
          className='flex-row items-center flex-1 gap-4 p-4 bg-neutral-200 rounded-lg'
          style={{
            marginHorizontal: 12,
          }}
        />
        <TouchableOpacity
          className='bg-neutral-200 rounded-lg p-4'
          onPress={() => {
            console.log("Enable Filters");
          }}
        >
          <Faders size={24} />
        </TouchableOpacity>
      </View>

      {/* Undo this action */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 12,
          borderBottomColor: "#00000010",
          borderBottomWidth: 1,
        }}
      >
        <View className='flex-row gap-4 w-full pl-5'>
          {stories.map((item, index) => (
            <TouchableOpacity
              key={item.userId}
              onPress={() => {
                router.push({
                  pathname: "/StoriesViewer",
                  params: {
                    userId: item.userId,
                    storyImageUrls: JSON.stringify(item.storyImageUrls),
                    userImageUrl: item.userImageUrl || "",
                  },
                });
              }}
              className='relative flex-row items-center gap-4 mb-4'
            >
              <View className='relative'>
                {item.storyImageUrls?.[0] ? (
                  <Image
                    source={{ uri: item.storyImageUrls[0] }}
                    className='rounded-lg shadow-md border border-1 border-neutral-200'
                    style={{
                      width: 100,
                      height: 140,
                    }}
                  />
                ) : (
                  <Text>No Story Image</Text>
                )}
                <Text
                  numberOfLines={1}
                  className='absolute bottom-2 left-2 text-white text-sm font-semibold'
                  style={{ zIndex: 2 }}
                >
                  {item.userId}
                </Text>
                {item.userImageUrl ? (
                  <Image
                    source={{ uri: item.userImageUrl }}
                    className='rounded-lg shadow-md border border-1 border-purple-200'
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 99,
                      position: "absolute",
                      top: 10,
                      left: 10,
                    }}
                  />
                ) : (
                  <Text className='absolute top-10 left-10 text-xs'>
                    No User Image
                  </Text>
                )}
                <LinearGradient
                  colors={["#00000000", "#00000070"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 0, y: 1 }}
                  style={{
                    position: "absolute",
                    borderRadius: 10,
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView className='flex-1'>
      <FlatList
        data={approvedProducts}
        renderItem={({ item }) =>
          item && typeof item.brand === "string" ? (
            <ProductFeed item={item as any} />
          ) : null
        }
        ListHeaderComponent={renderStoriesSection} // Stories section as header
        ListEmptyComponent={() => <Text>No products</Text>}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: "#ccc",
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Page;
