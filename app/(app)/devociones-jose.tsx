import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { Stack, useRouter } from 'expo-router';

interface Devocion {
  id: string;
  titulo: string;
  texto: string;
  ruta?: string;
}

const devociones: Devocion[] = [
  {
    id: 'oracion',
    titulo: 'Oración a San José',
    texto: '[TITULO]Oración a San José[/TITULO]\n\nSan José, mi padre y señor, tú que fuiste guardián fiel del Hijo de Dios y Madre Santísima; la Virgen María, alcánzame del Señor la gracia de un espíritu recto y de un corazón puro y casto para servir siempre mejor a Jesús y María. Amén.\n\n[TITULO]Oración del Papa León XIII[/TITULO]\n\nA ti, bienaventurado San José, acudimos en nuestra tribulación; y después de invocar el auxilio de tu Santísima Esposa solicitamos también confiados tu patrocinio. Por aquella caridad que con la Inmaculada Virgen María, Madre de Dios, te tuvo unido, y por el paterno amor con que abrazaste al Niño Jesús, humildemente te suplicamos vuelvas benigno los ojos a la herencia que con su Sangre adquirió Jesucristo, y con tu poder y auxilio socorras nuestras necesidades.\n\nProtege, Providentísimo Custodio de la Sagrada Familia la escogida descendencia de Jesucristo; aleja de nosotros toda mancha de error y corrupción; asístenos propicio, desde el cielo, fortísimo libertador nuestro, en esta lucha con el poder de las tinieblas; y, como en otro tiempo libraste al Niño Jesús del inminente peligro de la vida, así, ahora, defiende a la Iglesia Santa de Dios de las asechanzas de sus enemigos y de toda adversidad, y a cada uno de nosotros protégenos con tu perpetuo patrocinio, para que, a tu ejemplo y sostenidos por tu auxilio, podamos santamente vivir y piadosamente morir y alcanzar en el cielo la eterna felicidad. Amén.'
  },
  {
    id: 'letanias',
    titulo: 'Letanías de San José',
    texto: '[TITULO]Letanía de San José[/TITULO]\n\nSeñor, ten piedad. Señor, ten piedad.\nCristo, ten piedad. Cristo, ten piedad.\nCristo, óyenos. Cristo, óyenos.\nCristo, escúchanos. Cristo, escúchanos.\nDios Padre celestial, Ten piedad de nosotros.\nDios Hijo Redentor del mundo,\nDios Espíritu Santo,\nSanta Trinidad, un solo Dios,\nSanta María, Ruega por nosotros\nSan José,\nEsposo de la Madre de Dios,\nCustodio de la Virgen,\nPadre Adoptivo del Hijo de Dios,\nSolícito defensor de Cristo,\nJefe de la Sagrada Familia,\nJosé justo\nJosé casto\nJosé prudente\nJosé fuerte\nJosé obediente\nJosé fiel\nJosé pobre\nJosé paciente\nModelo de los trabajadores\nEjemplo de amor al hogar\nAmparo de las familias,\nConsuelo de los que sufren,\nEsperanza de los enfermos,\nAbogado de los moribundos,\nProtector de la Santa Iglesia,\n\nCordero de Dios, que quitas el pecado del mundo.\nPerdónanos, Señor.\nCordero de Dios, que quitas el pecado del mundo.\nEscúchanos, Señor.\nCordero de Dios, que quitas el pecado del mundo.\nTen misericordia de nosotros.\n\n[TITULO]Oración[/TITULO]\n\nOh Dios, que has querido elegir a San José para esposo de tu Madre Santísima: te rogamos nos concedas que, pues le veneramos como protector en la tierra, merezcamos tenerle por intercesor en el cielo: Tú que vives y reinas por los siglos de los siglos. Amén.\n\nV. San José, haz que vivamos una vida inocente,\nR. Asegurada siempre bajo tu patrocinio.'
  },
  {
    id: 'siete-domingos',
    titulo: 'Siete Domingos de San José',
    ruta: '/devociones-jose/siete-domingos',
    texto: ''
  }
];

export default function DevocionesJoseScreen() {
  const [devocionSeleccionada, setDevocionSeleccionada] = useState<Devocion | null>(null);
  const router = useRouter();

  const renderTextoConTitulos = (texto: string) => {
    const partes = texto.split(/\[TITULO\](.*?)\[\/TITULO\]/g);
    return (
      <>
        {partes.map((parte, index) => {
          if (index % 2 === 1) {
            // Es un título
            return <Text key={index} style={styles.subtitulo}>{parte}</Text>;
          }
          // Es texto normal
          return <Text key={index} style={styles.devocionTexto}>{parte}</Text>;
        })}
      </>
    );
  };

  const handleDevocionPress = (devocion: Devocion) => {
    if (devocion.ruta) {
      router.push(devocion.ruta);
    } else {
      setDevocionSeleccionada(devocion);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: devocionSeleccionada ? devocionSeleccionada.titulo : 'Devociones a San José',
          headerStyle: {
            backgroundColor: Colors.primary
          },
          headerTintColor: Colors.white
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {devocionSeleccionada ? (
            <View style={styles.devocionDetalle}>
              <Text style={styles.devocionTitulo}>{devocionSeleccionada.titulo}</Text>
              {renderTextoConTitulos(devocionSeleccionada.texto)}
              <TouchableOpacity 
                style={styles.botonVolver}
                onPress={() => setDevocionSeleccionada(null)}
              >
                <Text style={styles.botonVolverTexto}>Volver al listado</Text>
              </TouchableOpacity>
            </View>
          ) : (
            devociones.map((devocion) => (
              <TouchableOpacity 
                key={devocion.id}
                style={styles.devocionItem}
                onPress={() => handleDevocionPress(devocion)}
              >
                <Text style={styles.devocionItemTitulo}>{devocion.titulo}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  devocionItem: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  devocionItemTitulo: {
    fontSize: 22,
    color: Colors.primary,
    textAlign: 'center',
  },
  devocionDetalle: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
  },
  devocionTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  devocionTexto: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'justify',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  botonVolver: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonVolverTexto: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.primary,
    textAlign: 'center',
    marginVertical: 15,
  },
}); 