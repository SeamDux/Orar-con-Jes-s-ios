import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import axios from 'axios';

interface Evangelio {
  fecha: string;
  titulo: string;
  cita: string;
  contenido: string;
}

export default function EvangelioScreen() {
  const [evangelio, setEvangelio] = useState<Evangelio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvangelio = async () => {
      try {
        // Primero obtenemos la fecha actual en formato YYYY-MM-DD
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        
        // Usamos la API de la Biblia Católica
        const response = await axios.get(`https://api.biblia.com/v1/bible/content/LEB.txt?passage=Jn3:16&key=fd37d8f28e95d3be8cb4fbc37e15e18e`);
        
        setEvangelio({
          fecha: today.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          titulo: 'Evangelio del Día',
          cita: 'Juan 3:16',
          contenido: response.data || 'Porque tanto amó Dios al mundo que dio a su Hijo unigénito, para que todo el que cree en él no se pierda, sino que tenga vida eterna.'
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gospel:', err);
        // Si falla la API, mostramos un evangelio por defecto
        setEvangelio({
          fecha: new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          titulo: 'Evangelio del Día',
          cita: 'Juan 3:16',
          contenido: 'Porque tanto amó Dios al mundo que dio a su Hijo unigénito, para que todo el que cree en él no se pierda, sino que tenga vida eterna.'
        });
        setLoading(false);
      }
    };

    fetchEvangelio();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {evangelio && (
          <>
            <Text style={styles.fecha}>{evangelio.fecha}</Text>
            <Text style={styles.titulo}>{evangelio.titulo}</Text>
            <Text style={styles.cita}>{evangelio.cita}</Text>
            <Text style={styles.contenido}>{evangelio.contenido}</Text>
            <View style={styles.conclusionContainer}>
              <Text style={styles.conclusion}>Palabra del Señor</Text>
              <Text style={styles.respuesta}>Gloria a ti, Señor Jesús</Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
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