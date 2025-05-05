import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import axios from 'axios';

export default function SantoScreen() {
  const [santo, setSanto] = useState({ nombre: '', descripcion: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSanto = async () => {
      try {
        // Aquí usaremos una API mock por ahora, ya que necesitaremos implementar
        // la lógica real con una API de santos católicos
        setSanto({
          nombre: 'San José',
          descripcion: 'San José, el padre adoptivo de Jesús, es uno de los santos más venerados en la Iglesia Católica. Es conocido por su humildad, su fe inquebrantable y su dedicación a la Sagrada Familia.'
        });
        setLoading(false);
      } catch (err) {
        setError('No se pudo cargar el santo del día');
        setLoading(false);
      }
    };

    fetchSanto();
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
      <View style={styles.header}>
        <Text style={styles.title}>Santo del Día</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.santoNombre}>{santo.nombre}</Text>
        <Text style={styles.santoDescripcion}>{santo.descripcion}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
  },
  content: {
    padding: 20,
  },
  santoNombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  santoDescripcion: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'justify',
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
    textAlign: 'center',
    padding: 20,
  },
}); 