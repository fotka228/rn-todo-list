import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useTodos } from '../../context/TodoContext';

export default function TasksScreen() {
  const { colors } = useTheme();
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (inputText.trim()) {
      addTodo(inputText);
      setInputText('');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Мої Завдання 📝
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Що потрібно зробити?"
            placeholderTextColor={colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: colors.primary }]}
            onPress={handleAdd}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                Список завдань порожній. Додайте перше завдання!
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.todoCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <TouchableOpacity
                onPress={() => toggleTodo(item.id)}
                style={styles.todoContent}
              >
                <Ionicons
                  name={
                    item.completed
                      ? 'checkmark-circle'
                      : 'ellipse-outline'
                  }
                  size={24}
                  color={item.completed ? colors.success : colors.textMuted}
                />
                <Text
                  style={[
                    styles.todoText,
                    { color: colors.text },
                    item.completed && [
                      styles.completedText,
                      { color: colors.textMuted },
                    ],
                  ]}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Ionicons name="trash-outline" size={22} color={colors.danger} />
              </TouchableOpacity>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 16 },
  title: { fontSize: 26, fontWeight: 'bold' },
  form: { flexDirection: 'row', marginBottom: 20 },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    fontSize: 16,
  },
  addBtn: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: { paddingBottom: 20 },
  todoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  todoContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  todoText: { fontSize: 16, marginLeft: 12, flex: 1 },
  completedText: { textDecorationLine: 'line-through' },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { fontSize: 16, textAlign: 'center' },
});