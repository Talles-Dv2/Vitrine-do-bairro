import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../hooks/useProducts';

export default function ProductFormScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [merchant, setMerchant] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const { addProduct } = useProducts();

  const handleSave = async () => {
    if (!name.trim() || !merchant.trim() || !price.trim()) {
      setError('Preencha os campos obrigatórios (*)!');
      return;
    }

    const numericPrice = parseFloat(price.replace(',', '.'));
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError('Insira um preço válido maior que zero.');
      return;
    }

    setError('');
    await addProduct({
      name: name.trim(),
      merchant: merchant.trim(),
      price: numericPrice,
      category: category.trim() || 'Geral',
      description: description.trim(),
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Cadastrar Produto</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.label}>Nome do Produto *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Pão Francês, Leite, Frutas"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Comerciante do Bairro *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Padaria Central, Mercado Silva"
          value={merchant}
          onChangeText={setMerchant}
        />

        <Text style={styles.label}>Preço Estimado (R$) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 8.50"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Padaria, Hortifruti, Mercearia"
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ex: Marca preferida ou observações (opcional)"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Produto</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#004E64', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#2D2D2D', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: { color: '#E74C3C', marginBottom: 12, fontWeight: 'bold' },
  saveButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});