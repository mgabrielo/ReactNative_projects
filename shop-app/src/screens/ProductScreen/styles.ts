import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "normal",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: "normal",
    textDecorationLine: "line-through",
    marginLeft: 5,
  },
  description: {
    marginVertical: 10,
    lineHeight: 20,
  },
  root: {
    padding: 10,
    backgroundColor: "white",
    marginTop: 5,
    marginVertical: 5,
  },
  image: {
    marginVertical: 10,
    resizeMode: "contain",
    height: 250,
    padding: 20,
  },
});

export default styles;
