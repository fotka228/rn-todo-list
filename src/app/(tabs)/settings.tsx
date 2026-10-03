import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useTodos } from '../../context/TodoContext';

export default function SettingsScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const { clearCompleted, clearAll } = useTodos();

  const handleClearCompleted = () => {
    Alert.alert(
      'Очистити виконані',
      'Ви впевнені, що хочете видалити всі виконані завдання?',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Видалити', style: 'destructive', onPress: clearCompleted },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Видалити всі',
      'Ви впевнені, що хочете видалити ВСІ завдання? Цю дію не можна скасувати.',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Видалити все', style: 'destructive', onPress: clearAll },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          Налаштування ⚙️
        </Text>

        {/* Блок зміни теми */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name={isDarkMode ? 'moon-outline' : 'sunny-outline'}
                size={24}
                color={colors.primary}
              />
              <Text style={[styles.rowText, { color: colors.text }]}>
                {isDarkMode ? 'Темна тема' : 'Світла тема'}
              </Text>
            </View>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>
        </View>

        {/* Блок масових дій */}
        <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>
          Керування завданнями
        </Text>
        <View
          style={[
            styles.section,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleClearCompleted}
          >
            <Ionicons name="checkmark-done-outline" size={22} color="#f59e0b" />
            <Text style={[styles.actionBtnText, { color: colors.text }]}>
              Очистити виконані завдання
            </Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.actionBtn} onPress={handleClearAll}>
            <Ionicons name="trash-outline" size={22} color={colors.danger} />
            <Text style={[styles.actionBtnText, { color: colors.danger }]}>
              Видалити всі завдання
            </Text>
          </TouchableOpacity>
        </View>

        {/* Блок інформації про додаток */}
        <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>
          Про додаток
        </Text>
        <View
          style={[
            styles.section,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.row}>
            <Text style={[styles.rowText, { color: colors.text }]}>Версія</Text>
            <Text style={{ color: colors.textMuted }}>v2.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
    textTransform: 'uppercase',
  },
  section: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowText: { fontSize: 16, marginLeft: 12, fontWeight: '500' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  actionBtnText: { fontSize: 16, marginLeft: 12, fontWeight: '500' },
  divider: { height: 1, marginVertical: 8 },
});