import { StyleSheet } from "react-native";

// define your styles
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  image: {
    flex: 2,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rightContainer: {
    padding: 10,
    flex: 3,
  },
  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: "normal",
    textDecorationLine: "line-through",
    marginLeft: 5,
  },
});

export default styles;
