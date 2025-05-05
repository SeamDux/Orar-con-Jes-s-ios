import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { Stack } from 'expo-router';
import { Evangelio, getEvangelioDelDia } from '../data/evangelios';

export default function EvangelioScreen() {
  const [evangelio, setEvangelio] = useState<Evangelio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvangelio = async () => {
      try {
        const today = new Date();
        const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
        const evangelioDelDia = getEvangelioDelDia(dayOfYear);
        
        // Actualizamos la fecha con el formato correcto
        evangelioDelDia.fecha = today.toLocaleDateString('es-ES', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        setEvangelio(evangelioDelDia);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gospel:', err);
        setError('No se pudo cargar el evangelio del día');
        setLoading(false);
      }
    };

    fetchEvangelio();
  }, []);

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Evangelio del Día',
        }}
      />
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : evangelio ? (
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.fecha}>{evangelio.fecha}</Text>
            <Text style={styles.titulo}>{evangelio.titulo}</Text>
            <Text style={styles.cita}>{evangelio.cita}</Text>
            <Text style={styles.contenido}>{evangelio.contenido}</Text>
            <View style={styles.conclusionContainer}>
              <Text style={styles.conclusion}>Palabra del Señor</Text>
              <Text style={styles.respuesta}>Gloria a ti, Señor Jesús</Text>
            </View>
          </View>
        </ScrollView>
      ) : null}
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
  fecha: {
    fontSize: 16,
    color: Colors.secondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  cita: {
    fontSize: 18,
    color: Colors.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  contenido: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'justify',
    marginBottom: 20,
  },
  conclusionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  conclusion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  respuesta: {
    fontSize: 18,
    fontStyle: 'italic',
    color: Colors.secondary,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
    textAlign: 'center',
    padding: 20,
  },
}); 