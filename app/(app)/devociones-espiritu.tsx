import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { Stack } from 'expo-router';

type Devocion = {
  id: string;
  titulo: string;
  texto: string;
};

const devociones: Devocion[] = [
  {
    id: 'ven-espiritu-santo',
    titulo: 'Ven, Espíritu Santo',
    texto: '[TITULO]Antes[/TITULO]\nV. Ven, Espíritu Santo, llena los corazones de tus fieles y enciende en ellos el fuego de tu amor. Envía tu Espíritu y serán creadas todas las cosas.\nR. Y renovarás la faz de la tierra.\n\n[TITULO]Oremos[/TITULO]\n¡Oh, Dios, que has instruido los corazones de tus fieles con la luz del Espíritu Santo!, concédenos que sintamos rectamente con el mismo Espíritu y gocemos siempre de su divino consuelo. Por Jesucristo Nuestro Señor. Amén.\n\n[TITULO]Después[/TITULO]\nV. Te damos gracias, Dios todopoderoso, por todos tus beneficios. Que vives y reinas por los siglos de los siglos.\nR. Amén.'
  },
  {
    id: 'ven-espiritu-santo-creador',
    titulo: 'Ven, Espíritu Santo Creador',
    texto: '[TITULO](Secuencia de Pentecostés)[/TITULO]\nVen, Espíritu Santo,\ny envía desde el cielo\nun rayo de tu luz.\n\nVen, padre de los pobres;\nven dador de gracias,\nven luz de los corazones.\n\nConsolador magnífico,\ndulce huésped del alma,\nsu dulce refrigerio.\n\nDescanso en la fatiga,\nbrisa en el estío,\nconsuelo en el llanto.\n\n¡Oh luz santísima!,\nllena lo más íntimo\nde los corazones de tus fieles.\n\nSin tu ayuda,\nnada hay en el hombre,\nnada que sea bueno.\n\nLava lo que está manchado,\nriega lo que está árido,\nsana lo que está enfermo.\n\nDoblega lo que está rígido,\ncalienta lo que está frío,\nendereza lo que está extraviado.\n\nConcede a tus fieles\nque en Ti confían\ntus siete sagrados dones.\n\nDales el mérito de la virtud,\ndales el puerto de salvación,\ndales la felicidad eterna.'
  },
  {
    id: 'ven-espiritu-creador',
    titulo: 'Ven, Espíritu Creador',
    texto: 'Ven, Espíritu Creador,\nvisita las mentes de los tuyos;\nllena de gracia celestial\nlos corazones que Tú creaste.\n\nTú, llamado el Consolador\nDon del Dios Altísimo,\nFuente viva, fuego, caridad\ny espiritual unción.\n\nTú, con tus siete dones,\neres fuerza de la diestra de Dios.\nTú, el prometido por el Padre;\ntu palabra enriquece nuestros labios.\n\nEnciende la luz en nuestros sentidos,\ninfunde tu amor en nuestros pechos,\ny a la debilidad de nuestra carne\nvigorizando con perpetua fuerza.\n\nAl enemigo ahuyéntalo bien lejos,\ndanos la paz cuanto antes;\nyendo Tú como guía\nsortearemos todos los peligros.\n\nQue por Ti conozcamos al Padre,\nconozcamos igualmente al Hijo\ny en Ti, Espíritu de ambos,\ncreamos en todo tiempo.\n\nV. Envía tu espíritu y todo será creado.\nR. Y se renovará la faz de la tierra.'
  },
  {
    id: 'letanias-espiritu',
    titulo: 'Letanía del Espíritu Santo',
    texto: 'Señor, Tened piedad de nosotros.\nJesucristo,\nSeñor,\nDios, Padre celestial,\nDios, Hijo, Redentor del mundo,\nDios, Espíritu Santo,\nTrinidad Santa, que sois un solo Dios,\nDivina Esencia, Dios verdadero y único,\nEspíritu de verdad y de sabiduría,\nEspíritu de santidad y de justicia,\nEspíritu de entendimiento y de consejo,\nEspíritu de caridad y de gozo,\nEspíritu de paz y de paciencia,\nEspíritu de longanimidad y mansedumbre,\nEspíritu de benignidad y de bondad,\nAmor substancial del Padre y del Hijo,\nAmor y vida de las almas santas,\nFuego siempre ardiendo,\nAgua viva que apagas la sed de los corazones,\nDe todo mal, Líbranos Espíritu Santo.\nDe toda impureza de alma y cuerpo,\nDe toda gula y sensualidad,\nDe todo afecto a los bienes terrenos,\nDe todo afecto a cosas y a criaturas,\nDe toda hipocresía y fingimiento,\nDe toda imperfección y faltas deliberadas,\nDel amor propio y juicio propio,\nDe la propia voluntad,\nDe la murmuración,\nDe la doblez a nuestros prójimos,\nDe nuestras pasiones y apetitos desordenados,\nDe no estar atentos\nvuestra inspiración Santa, Líbranos Espíritu Santo.\nDel desprecio a las cosas pequeñas,\nDe la glotonería y malicia,\nDe todo regalo y comodidad,\nDe querer buscar o desear algo que no sea Vos,\nDe todo lo que te desagrade,\nDe todo pecado e imperfección y de todo mal,\n\nPadre amantísimo, Perdónanos.\n\nDivino Verbo, Ten misericordia de nosotros.\n\nSanto y Divino Espíritu, No nos dejes hasta ponernos en la posesión de la Divina Esencia, Cielo de los cielos.\n\nCordero de Dios, que borras los pecados del mundo, Envíadnos al divino Consolador.\n\nCordero de Dios, que borras los pecados del mundo, Llenadnos de los dones de vuestro espíritu.\n\nCordero de Dios, que borras los pecados del mundo, Haced que crezcan en nosotros los frutos del Espíritu Santo.\n\nVen, ¡oh Santo Espíritu!, llena los corazones de tus fieles y enciende en ellos el fuego de tu amor.\n\nV. Envía tu espíritu y todo será creado.\nR. Y se renovará la faz de la tierra.\n\n[TITULO]Oremos[/TITULO]\n¡Oh Dios!, que habéis instruido los corazones de los fieles con la luz del Espíritu Santo,\nconcedednos, según el mismo Espíritu,\nconocer las cosas rectas\ny gozar siempre de sus divinos consuelos.\nPor Jesucristo, Señor nuestro. Amén.'
  },
  {
    id: 'dones-espiritu',
    titulo: 'Los dones del Espíritu Santo',
    texto: 'Los siete dones del Espíritu Santo pertenecen en plenitud a Cristo, Hijo de David. Completan y llevan a la perfección las virtudes de quienes los reciben. Hacen a los fieles dóciles para obedecer con prontitud a las inspiraciones divinas.\n\n[TITULO]Don de sabiduría[/TITULO]\nNos hace comprender la maravilla insondable de Dios y nos impulsa a buscarle sobre todas las cosas y en medio de nuestro trabajo y de nuestras obligaciones.\n\n[TITULO]Don de inteligencia[/TITULO]\nNos descubre con mayor claridad las riquezas de la fe.\n\n[TITULO]Don de consejo[/TITULO]\nNos señala los caminos de la santidad, el querer de Dios en nuestra vida diaria, nos anima a seguir la solución que más concuerda con la gloria de Dios y el bien de los demás.\n\n[TITULO]Don de fortaleza[/TITULO]\nNos alienta continuamente y nos ayuda a superar las dificultades que sin duda encontramos en nuestro caminar hacia Dios.\n\n[TITULO]Don de ciencia[/TITULO]\nNos lleva a juzgar con rectitud las cosas creadas y a mantener nuestro corazón en Dios y en lo creado en la medida en que nos lleve a Él.\n\n[TITULO]Don de piedad[/TITULO]\nNos mueve a tratar a Dios con la confianza con la que un hijo trata a su Padre.\n\n[TITULO]Don de temor de Dios[/TITULO]\nNos induce a huir de las ocasiones de pecar, a no ceder a la tentación, a evitar todo mal que pueda contristar al Espíritu Santo, a temer radicalmente separarnos de Aquel a quien amamos y constituye nuestra razón de ser y de vivir.'
  },
  {
    id: 'frutos-espiritu',
    titulo: 'Los Frutos del Espíritu Santo',
    texto: 'Los frutos del Espíritu Santo son los efectos visibles que produce el Espíritu Santo en la vida del cristiano. San Pablo los enumera en su carta a los Gálatas (5,22-23):\n\n1. Caridad (Amor): Es el amor de Dios derramado en nuestros corazones, que nos impulsa a amar a Dios sobre todas las cosas y al prójimo como a nosotros mismos. Es el primero y más importante de los frutos.\n\n2. Gozo (Alegría): Es la alegría espiritual que nace de saberse amado por Dios. No depende de circunstancias externas, sino que permanece incluso en medio de las tribulaciones.\n\n3. Paz: Es la tranquilidad interior que surge de la buena conciencia y de la amistad con Dios. Esta paz trasciende todos los problemas y dificultades.\n\n4. Paciencia: Es la capacidad de soportar las contrariedades con fortaleza y sin turbación. Nos ayuda a no desanimarnos ante las pruebas y a perseverar en el bien.\n\n5. Benignidad (Amabilidad): Es la disposición a hacer el bien a todos, mostrando dulzura y bondad en el trato con los demás.\n\n6. Bondad: Es la inclinación constante hacia el bien, que nos lleva a desear y procurar lo mejor para todos.\n\n7. Longanimidad (Generosidad): Es la magnanimidad de corazón que sabe dar con abundancia y perdonar sin límites, imitando la generosidad divina.\n\n8. Mansedumbre: Es el dominio sereno de sí mismo que evita la irritación, la ira y toda clase de violencia. Se manifiesta en un trato apacible y comprensivo.\n\n9. Fe (Fidelidad): Es la lealtad en las promesas y compromisos. Implica ser fieles a Dios, a nuestras palabras y a nuestros deberes.\n\n10. Modestia: Es el sentido del equilibrio y la justa medida en el comportamiento, el vestir y el hablar, que evita tanto la ostentación como la afectación.\n\n11. Continencia (Dominio de sí): Es el control de los apetitos y pasiones según los dictados de la razón iluminada por la fe. Supone el gobierno de nuestros impulsos.\n\n12. Castidad: Es la integración correcta de la sexualidad en la persona, que conduce a la armonía interior y al respeto por uno mismo y por los demás.\n\nSeñor Jesús, que enviaste al Espíritu Santo para que santificara a tu Iglesia, concédenos vivir según el Espíritu, manifestando sus frutos en nuestra vida diaria. Que nuestra conducta revele que somos habitados por tu Espíritu. Amén.'
  }
];

export default function DevocionesEspirituScreen() {
  const [devocionSeleccionada, setDevocionSeleccionada] = useState<Devocion | null>(null);

  const renderTextoConTitulos = (texto: string) => {
    if (!texto.includes('[TITULO]')) {
      return <Text style={styles.oracionTexto}>{texto}</Text>;
    }

    const partes = texto.split(/\[TITULO\](.*?)\[\/TITULO\]/g);
    return (
      <>
        {partes.map((parte, index) => {
          // Los índices pares son texto normal, los impares son títulos
          if (index % 2 === 0) {
            return parte ? <Text key={index} style={styles.oracionTexto}>{parte}</Text> : null;
          } else {
            return <Text key={index} style={styles.tituloSeccion}>{parte}</Text>;
          }
        })}
      </>
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: devocionSeleccionada ? devocionSeleccionada.titulo : 'Devociones al Espíritu Santo',
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
                onPress={() => setDevocionSeleccionada(devocion)}
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
  oracionTexto: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'justify',
    marginBottom: 20,
    color: '#000000',
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
    color: Colors.primary,
    marginVertical: 10,
    textAlign: 'center',
  },
  tituloSeccion: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#CC0000',
    marginVertical: 10,
    textAlign: 'center',
  },
}); 