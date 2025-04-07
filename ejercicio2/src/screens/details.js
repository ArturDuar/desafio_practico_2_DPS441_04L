import Platillos from '../data/platillos'
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';

export default function Details({navigation, route}) {

  const platillo = Platillos.find(platillo => platillo.id == route.params.id);

  return(

    <>

      <ImageBackground source={{uri:platillo.foto.src}} style={styles.container} resizeMode="cover">

        <View style={styles.cardInfo} key={platillo.id}>
          <Text style={styles.title}>{platillo.nombre}</Text>
          <Text style={styles.infoTitle}>{"\n"}Descripción general:</Text>
          <Text>
            Creado/a en {platillo.region} con un coste unitario de ${platillo.precio} c/u,
            compuesto por {platillo.ingredientes.join(", ")} y está categorizado como {platillo.categoria}.
          </Text>

          <Text style={styles.infoTitle}>{"\n"}Descripción:</Text>
          <Text>{platillo.descripcion + "\n"}</Text>
          <Button title="Regresar" onPress={() => navigation.goBack()}/>
        </View>
        
      </ImageBackground>  

    </>

  );

}

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  cardInfo:{
    width: '100%',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#FFFFFFCC'
  },
  title:{
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  },
  infoTitle:{
    fontWeight: 'bold'
  }
});