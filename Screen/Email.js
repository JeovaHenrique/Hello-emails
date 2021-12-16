import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import { WebView } from 'react-native-webview'
import { FontAwesome5 } from '@expo/vector-icons'

export default function Email({ route }) {
    const { id } = route.params

    const [email, setEmail] = useState([])

    useEffect(() => {
        async function getData() {
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails/' + id)
            const email = await response.json()
            setEmail(email)
        }
        getData()
    }, [])


    return (
        <View style={styles.container}>
            <StatusBar style= 'auto'/>
            <View style={styles.emailContainer}>
                <Text>{email.tittle}</Text>
                {email.star ? <FontAwesome5 name="star" color='yellow' /> : <FontAwesome5 name="star" color='black' />}
            </View>
            <View style={styles.email}>
                <Image style={styles.img} source={{ uri: email.picture }} />
                <View style={styles.text}>
                    <Text style={styles.name}>{email.from}</Text>
                    <Text style={styles.namee}>{email.to}</Text>
                </View>
                <Text style={styles.time}>{email.time}</Text>
            </View>
            <WebView style={styles.caixaDeEmail} source={{html: `<div style="font-size: 50px;">${email.body}</div>`}}/>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
    },
    emailContainer: {
        marginTop:20,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    email: {
        marginTop:20,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    name: {
        fontWeight: 'bold',
    },
    time: {
        color: '#fff',
        alignItems: 'stretch',
        paddingLeft: 5,
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
    caixaDeEmail: {
        flex: 1,
        backgroundColor: '#87CEFA',
    },

})