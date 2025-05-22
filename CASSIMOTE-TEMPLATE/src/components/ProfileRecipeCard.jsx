import { View,StyleSheet, Text,Image,TouchableOpacity  } from "react-native";
import StarRating from "./StarRating";

export default function ProfileRecipeCard({nickName=true}){
    return(
        <TouchableOpacity style={styles.container}>
            <View style={styles.imageContent}>
                <Image style={styles.image} source={require("../assets/welcomeBackground.png")}/>
            </View>
            <View style={styles.contentData}>
                {nickName && (
                <Text style={styles.text}>NickName</Text>
                )}
                <Text style={styles.text}>Nombre de Receta</Text>
                <StarRating size={18} rating={3.4}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    width:"95%",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
    borderWidth:3,
    borderColor:"#CAC6C6",
    marginTop:10
  },
  imageContent: {
    width: 100,
    height: 100,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentData: {
    flex: 1,
    justifyContent: "center",
    gap:15
  },
 text: {
    fontWeight: 400,
    fontSize: 18,
    color: "#444",
  },
});