import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Image } from "react-native";

const Page = () => {
  // Uncomment to use real user profile hook
  // const { userProfile } = useUserProfile();

  // Mock user profile data
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

  // Uncomment to use real query
  // const getTransactionsByUserId = useQuery(
  //   api.transactions.getTransactionsByUserId,
  //   { userId: userProfile?._id }
  // );

  // Mock transaction data
  const getTransactionsByUserId = [
    {
      _creationTime: 1745506376634.7358,
      _id: "jn7735grsd633mpm7fdy4bgj3h7emz4x",
      cartItems: ["j97b0kr4wtr08epcza5s9v73057ek8wt"],
      status: "success",
      transaction_uuid: "0rvj9pjch",
      userId: "jd777hjdbxa16v8yhn33xsr52s7ebzm8",
    },
    {
      _creationTime: 1745507993074.22,
      _id: "jn7dyyap0njwvmzezcht6133m17en2bg",
      cartItems: ["j971m8r05nred768fk56j7ak217egt8q"],
      status: "pending",
      transaction_uuid: "aln7o5mep",
      userId: "jd777hjdbxa16v8yhn33xsr52s7ebzm8",
    },
  ];

  // Mock cart items data
  const getCartItemsById = [
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
  ];

  // Filter cart items that are part of transactions
  const transactionCartItemIds = getTransactionsByUserId.flatMap(
    (transaction) => transaction.cartItems
  );
  const filteredCartItems = getCartItemsById.filter((item) =>
    transactionCartItemIds.includes(item._id)
  );

  return (
    <View className='m-6'>
      {filteredCartItems.length > 0 ? (
        filteredCartItems.map((item) => (
          <View
            key={item._id}
            className='flex-row gap-4 bg-white p-6 mb-4 rounded-lg shadow'
          >
            <Image
              source={{ uri: item.imageUrls[0] }}
              alt={item.title}
              className='w-32 h-32 object-contain rounded-lg'
            />
            <View className='flex-1 flex-col'>
              <Text className='text-lg font-semibold'>{item.title}</Text>
              <Text className='text-gray-600'>{item.brand}</Text>
              <Text className='text-gray-600'>Price: ${item.price / 100}</Text>
              <Text className='text-gray-600'>
                Status:{" "}
                {
                  getTransactionsByUserId.find((t) =>
                    t.cartItems.includes(item._id)
                  )?.status
                }
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text className='text-center p-6'>No items found</Text>
      )}
    </View>
  );
};

export default Page;
