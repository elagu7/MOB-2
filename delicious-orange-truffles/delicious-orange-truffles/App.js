import { SafeAreaView, StyleSheet, TextInput, Button, View, ScrollView, Text } from 'react-native';
import HabitCard from './components/HabitCard'; 
import { useState, useEffect } from 'react';

export default function App() {
    const [habits, setHabits] = useState([
        { id: 1, name: 'Habito 1' },
        { id: 2, name: 'Habito 2' }
    ]);

    const [newHabit, setNewHabit] = useState('');  // Step 1: Store new habit input
    const [seconds, setSeconds] = useState(0); // Estado para el temporizador

    // Incrementar el temporizador cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, []);

    // Function to delete a habit
    function handleHabitDeletion(habitName) {
        setHabits(habits.filter(habit => habit.name !== habitName));
    }

    // Function to add a new habit
    function handleAddHabit() {
        if (newHabit.trim() !== '') {
            setHabits([...habits, { id: Date.now(), name: newHabit }]);  // Add new habit to the list
            setNewHabit('');  // Clear the text input after adding
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Mostrar el temporizador */}
            <Text style={styles.timer}>Tiempo en la app: {seconds} segundos</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su hábito"
                    value={newHabit}
                    onChangeText={setNewHabit}  // Update the state as the user types
                />
                <Button title="Add" onPress={handleAddHabit} />
            </View>

            <ScrollView style={styles.inputContainer}>
            {/* Render the habit cards */}
            {habits.map(habit => (
                <HabitCard
                    key={habit.id}
                    name={habit.name}
                    onDelete={handleHabitDeletion}
                />
            ))}
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    timer: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});
