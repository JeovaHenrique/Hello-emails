import React, { useEffect, useState } from "react"
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity } from "react-native"
import { StatusBar } from "expo-status-bar"
import { FontAwesome5 } from '@expo/vector-icons'

export default function CaixadeEntrada({navigation}) {
    const [emails, setEmails] = useState([])

    useEffect(() => {
        async function getData() {
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails')
            const emails = await response.json()
            setEmails(emails)
        }
        getData()
    },[])


    function renderItem({item}) {
        return <TouchableOpacity style={styles.mensagem} onPress={() => navigation.navigate('Email', {id: item.id})}>
            <View style={styles.mensagemTexto}>
                <Image style={styles.img} source={{uri: item.picture}}/>
                <View style={styles.text}>
                    <Text style={styles.nome}>{item.to}</Text>
                    <Text style={styles.nome}>{item.tittle}</Text>
                        <Text>{item.summary}</Text>
                </View>
            </View>
            <View style={styles.timeFavorite}>
                <Text style={styles.time}>{item.time}</Text>
                {item.star ? <FontAwesome5 name="star" color='yellow' /> : <FontAwesome5 name="star" color='black' />}
            </View>
        </TouchableOpacity>
    }
    return (
        <View style={styles.container}>
            <StatusBar style= 'auto'/>
            <View style={styles.mensagemContainer}>
                <FlatList
                    data={emails}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E90FF',
    },
    mensagemContainer: {
        flex: 1,
        marginTop: 20,
    },
    mensagem: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        
    },
    text: {
        padding: 5,
        justifyContent: 'flex-start',
    },
    img: {
        height: 56, 
        width: 56,
        borderRadius: 28,
        margin: 5,
    },
    nome: {
        fontWeight: 'bold',
    },
    timeFavorite: {
        alignItems: 'flex-end',
        padding: 10,
    },
    mensagemTexto: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    time: {
        color: '#fff'
    }

})
