import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ProductStatus from "@/app/components/ProductStatus";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/providers/ThemeProvider";

const Page = () => {
  const { colors } = useContext(ThemeContext);
  // const { userProfile } = useUserProfile();
  const userProfile = {
    _creationTime: 1745075425708.771,
    _id: "jd777hjdbxa16v8yhn33xsr52s7ebzm8",
    clerkId: "user_2vx8aDFqJO7hHUmklYe4DenhCHg",
    email: "ayushbhusal00@gmail.com",
    first_name: "Ayush",
    imageUrl:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydng4YUMxdDYxbmxBRGJuRlU5S0N0NWZQekkifQ",
    last_name: "Bhusal",
    username: "Ayush Bhusal",
  };
  // const myProducts = useQuery(api.products.getMyProducts, {
  //   userId: userProfile?._id as Id<"users">,
  // });

  const myProducts = [
    {
      _creationTime: 1745285769539.4995,
      _id: "j97fn7w49vc5zxz718e1yejkv17egg6k",
      approved: false,
      brand: "Adidas",
      category: "Footwear",
      condition: "New",
      description:
        "Low-profile, lace-up sneaker with a white leather upper, suede overlays at the toe and heel, black Adidas three-stripe branding on the sides, and gold 'adidas JAPAN' lettering. Features perforations for breathability and a vintage-inspired gum rubber sole.",
      fabrics: "Leather, Suede, Rubber, Cotton (Laces)",
      highlights:
        "Classic Adidas design with suede accents, perforated leather upper for breathability, iconic three-stripe branding, and 'Japan' detailing for a unique look. Features a gum rubber sole for a vintage aesthetic and traction.",
      imageUrls: [
        "https://combative-vulture-199.convex.cloud/api/storage/bbe96b31-c2b3-49b5-afbc-1e64c478a4cd",
      ],
      images: ["kg22regs2mpjvhc9fjemevpnss7eh0ww"],
      price: 14000,
      size: "Regular",
      title: "Adidas Japan Sneakers",
      userId: "jd777hjdbxa16v8yhn33xsr52s7ebzm8",
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
      sold: true,
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
      sold: true,
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

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background.primary, flex: 1 }}
    >
      <View className='px-5'>
        <Text
          className={`text-md font-regular mb-4`}
          style={{ color: colors.text.secondary }}
        >
          Your Listings
        </Text>
      </View>
      <FlatList
        data={myProducts}
        renderItem={({ item }) => {
          return item && typeof item.brand === "string" ? (
            <View
              style={{
                backgroundColor: colors.background.secondary,
                borderColor: colors.background.border,
              }}
              className={`rounded-lg px-5`}
            >
              <ProductStatus item={item as any} />
            </View>
          ) : null;
        }}
        ListEmptyComponent={() => {
          return <Text className='px-5'>No products</Text>;
        }}
      />
    </SafeAreaView>
  );
};

export default Page;
