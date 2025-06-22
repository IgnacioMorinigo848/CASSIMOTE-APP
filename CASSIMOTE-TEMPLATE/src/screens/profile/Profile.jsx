import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity,ScrollView,ActivityIndicator } from "react-native";
import BottomBar from "../../components/BottonBar";
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useState, useEffect, useContext } from "react";
import getInitials from "../../helper/getInitials";
import ProfileRecipeCard from "../../components/ProfileRecipeCard";
import SesionCloseComponent from "./SesionCloseComponent";
import { AuthContext } from '../../context/AuthContext';
import useProfileData from "../../api/RECIPE-SERVICE/profile/profile";
import useGetProfileData from "../../api/RECIPE-SERVICE/profile/getProfileData";

export default function Profile({ navigation }) {

  const [visible,setVisible] = useState(false);
  const { token,logout } = useContext(AuthContext);
  const { data, loading, error } = useProfileData(token);
  const {dataProfile,loadingProfile, errorProfile} = useGetProfileData(token)

  useEffect(() => {
    if (!loading && data || !loadingProfile && dataProfile) console.log("🟢 HOME DATA:", data);
    if (!loading && error || !loadingProfile && errorProfile) console.error("🔴 ERROR AL CARGAR HOME:", error);
  }, [loading, data, error,dataProfile]);

  if (loading || !dataProfile) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  if (error || errorProfile) return <Text style={{ color: 'red', textAlign: 'center' }}>Error: {error.message}</Text>;

  const handleSesionClose = () =>{
    logout();
    navigation.navigate("signIn")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.profileBarContent}>
          <Text style={styles.profile}>Perfil</Text>
        </View>
        <View style={styles.buttonContent}>
          <TouchableOpacity onPress={()=>navigation.navigate("editProfile",{image:dataProfile.profileImage})}><FontAwesome5 name="pen-nib" size={20} color="black" style={styles.icon} /></TouchableOpacity>
          <TouchableOpacity onPress={()=>{setVisible(!visible)}}><Feather name="power" size={20} color="black" style={styles.icon} /></TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileContent}>
          <View style={styles.imageContent}>
            {dataProfile?.profileImage ? (
              <Image style={styles.image} source={{uri:dataProfile.profileImage}} />
            ) : (
              <Text style={styles.initialsText}>{getInitials(dataProfile.nickName)}</Text>
            )}
          </View>
          <View style={styles.dataContent}>
            <Text style={styles.nickNameText}>{dataProfile.nickName}</Text>
            <Text style={styles.emailText}>{dataProfile.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.preferencesContainer}>
        <TouchableOpacity style={styles.preferencesButton} onPress={() => navigation.navigate("editPreferences",{image:dataProfile.profileImage})}>
          <Text>Mis Preferencias</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recipeContainer}>
        <View style={styles.recipeTextContainer}>
          <Text style={styles.recipeText}>Mis Recetas</Text>
        </View>
        <TouchableOpacity style={styles.createRecipeButton} onPress={()=>navigation.navigate("createRecipe")}><Text style={styles.buttonTextCreateRecipe}>Crear Mi Receta</Text></TouchableOpacity>
         <ScrollView contentContainerStyle={styles.scrollContainer}>
          {data.map((recipe,index) =>(
          <ProfileRecipeCard key={index} recipe={recipe} nickName={true} />
          ))}
        </ScrollView>
      </View>
      <SesionCloseComponent visible={visible} setVisible={setVisible} handleSesionClose={()=>handleSesionClose()}/>
      <BottomBar/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topBarContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#7F7F7F"
  },
  profileBarContent: {},
  profile: {
    color: "#000",
    fontSize: 30,
    fontWeight: '900'
  },
  buttonContent: {
    flexDirection: "row",
    gap: 15,
  },
  icon: {
    marginLeft: 10,
  },
  profileContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10
  },
  imageContent: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  initialsText: {
    color: '#AF47D2',
    fontSize: 18,
    fontWeight: 'bold'
  },
  dataContent: {
    justifyContent: "center",
  },
  nickNameText: {
    fontWeight: '500',
    fontSize: 18
  },
  emailText: {
    fontSize: 14
  },
  preferencesContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 40
  },
  preferencesButton: {
    borderWidth: 2,
    padding: 10,
    width: "90%",
    borderColor: "#7F7F7F",
    borderRadius: 17,
    alignItems: "center"
  },
  recipeContainer:{
    flex:1,
    alignItems:"center"

  },
  recipeTextContainer: {
    alignItems: "right",
    width:"100%",
    padding:20,
  },
  recipeText: {
    fontSize: 18,
    width:103,
    fontWeight:900,
    color: '#000',
    borderBottomWidth:1,
    borderBottomColor:"#AF47D2",
  },
  createRecipeButton:{
    width:"90%",
    alignItems:"center",
    padding:10,
    backgroundColor:"#D9D9D9",
    borderRadius: 17,
    marginBottom:10,
  },
  buttonTextCreateRecipe:{
    fontWeight:300,
    fontSize:15
  },
    scrollContainer: {
    width:"100%",
    paddingBottom:110
  }
});
