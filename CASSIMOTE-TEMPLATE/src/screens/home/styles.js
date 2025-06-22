import { StyleSheet, Platform, StatusBar } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
    alignItems: 'center',
  },
  content: {
    flex:1,
    width: '90%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 12,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
   recipeCard: {
    backgroundColor: '#fff',
    width:300, 
    height:200, 
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  categoryCardDynamic: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: "48%",
    height:140,
    marginBottom:30
  },
  categoryTitleDynamic: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeNameDynamic: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
   featuredImage: {
    width: '100%',
    height: "100%", // en lugar de 100%
    borderRadius: 10,
    marginBottom: 5,
    resizeMode: 'cover', // asegura que la imagen se recorte bien
  },
  featuredImageLastThree:{
    width: '100%',
    height: "100%", // en lugar de 100%
    borderRadius: 10,
  }

});
