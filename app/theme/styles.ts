import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerImage: {
    height: 220,
    position: "relative",
  },

  restaurantImage: {
    width: "100%",
    height: "100%",
  },

  headerOverlay: {
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 50,
  },

  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  categoryTabActive: {
    borderBottomColor: "#ff5200",
  },

  categoryTabText: {
    fontSize: 14,
    color: "#777",
    fontWeight: "500",
  },

  categoryTabTextActive: {
    color: "#ff5200",
  },

  menuItem: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },

  menuItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  menuItemInfo: {
    flex: 1,
    paddingRight: 10,
  },

  menuItemName: {
    fontSize: 16,
    fontWeight: "600",
  },

  menuItemDescription: {
    fontSize: 13,
    color: "#666",
    marginVertical: 4,
  },

  menuItemPrice: {
    fontSize: 15,
    fontWeight: "600",
  },

  menuItemImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },

  addButton: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#ff5200",
    borderRadius: 6,
    paddingVertical: 4,
    alignItems: "center",
  },

  addButtonText: {
    color: "#ff5200",
    fontWeight: "600",
  },

  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ff5200",
    borderRadius: 6,
    marginTop: 6,
    paddingHorizontal: 8,
  },

  floatingCart: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#ff5200",
    height: 52,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  floatingCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  cartBadge: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    borderRadius: 10,
  },
});
