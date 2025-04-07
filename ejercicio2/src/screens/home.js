import Platillos from '../data/platillos'
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, Button, useWindowDimensions } from 'react-native';

export default function Home({ navigation }) {
  
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <>
      <ImageBackground source={require("../img/background.jpg")} style={styles.container} resizeMode="cover">
        <Text style={styles.title}>Platillos Tipicos</Text>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            isLandscape ? styles.scrollContentLandscape : styles.scrollContentPortrait
          ]}
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          {
            Platillos.map(platillo => (
              <View
                style={[
                  styles.platillo,
                  isLandscape ? styles.platilloLandscape : styles.platilloPortrait
                ]}
                key={platillo.id}
              >
                <Image style={styles.imageFood} source={{ uri: platillo.foto.src }} />
                <Text style={styles.nameFood}>{platillo.nombre}</Text>
                <Text>{platillo.region + " - $ " + parseFloat(platillo.precio).toFixed() + " c/u \n"}</Text>
                <Button title="Detalles" onPress={() => navigation.navigate('Details', { id: platillo.id })} />
              </View>
            ))
          }
        </ScrollView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  scrollContentPortrait: {
    // for single column, center items
    justifyContent: 'center',
  },
  scrollContentLandscape: {
    // for two columns
    justifyContent: 'space-between',
  },
  scrollContainer: {},
  title: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  platillo: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFFFFF80',
  },
  platilloPortrait: {
    width: 340,
  },
  platilloLandscape: {
    width: '48%',
  },
  imageFood: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  nameFood: {
    fontSize: 25,
    fontWeight: 'bold',
  }
});
