import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { ThemeContext } from "@/providers/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";

interface BreadcrumbProps {
  items: {
    label: string;
    path?: `/${string}`;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { colors, theme } = useContext(ThemeContext);
  const router = useRouter();
  const pathname = usePathname();

  const handlePress = (path?: `/${string}`) => {
    if (path) {
      router.push(path as any);
    }
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <AntDesign
              name='right'
              size={12}
              color={colors.text.secondary}
              style={styles.separator}
            />
          )}
          <TouchableOpacity
            onPress={() => handlePress(item.path)}
            disabled={!item.path}
            style={[styles.item, !item.path && styles.currentItem]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: item.path
                    ? colors.text.secondary
                    : colors.text.primary,
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  item: {
    paddingHorizontal: 4,
  },
  currentItem: {
    opacity: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  separator: {
    marginHorizontal: 4,
  },
});

export default Breadcrumb;
