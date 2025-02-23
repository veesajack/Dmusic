import { StyleSheet, Text, View, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Recently Played</Text>
        {/* Song list will go here */}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Featured Playlists</Text>
        {/* Playlist list will go here */}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Popular Artists</Text>
        {/* Artist list will go here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  section: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
});
