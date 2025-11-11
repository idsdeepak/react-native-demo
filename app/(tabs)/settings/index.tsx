import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Tab() {
    
    useEffect(()=>{
        const getUsers = async () => {
            const usersData = await AsyncStorage.getItem('users');
            const users = usersData ? JSON.parse(usersData) : [];
            console.log(users);
        }
        getUsers();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Comming Soon</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
