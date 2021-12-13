import React, { useEffect, useState } from "react"
import { StyleSheet, View, FlatList, Text, Image} from "react-native"
import { StatusBar } from "expo-status-bar"
import { WebView } from 'react-native-webview'

export default function Email({route}) {
    const {id} = route.params

    const [email, setEmail] = useState([])

    useEffect(() => {
        async function getData() {
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails/' + id)
            const email = await response.json()
            setEmail(email)
        }
        getData()
    },[])

    function renderItem({item}) {
        return <View>
            <View>
                <Text>{item.tittle}</Text>
                {item.star ? <FontAwesome5 name="star" color='yellow'/> : <FontAwesome5 name="star" color='black'/>}
            </View>
            <View>
                <Image style={styles.img} source={{uri: item.picture}}/>
                <View style={styles.text}>
                    <Text style={styles.nome}>{item.to}</Text>
                    <Text style={styles.nome}>{item.from}</Text>
                </View>
                <Text style={styles.time}>{item.time}</Text>
            </View>
            <WebView>
                {item.body}
            </WebView>
        </View>
    }

    return (
        <View style={styles.container} >
            <StatusBar style='auto'/>
            <View style={styles.emailContainer}>
            <Text style={styles.localEmail}>Caixa de Entrada</Text>
                <FlatList
                    data={email}
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
    emailContainer: {
        flex: 1,
        margin: 5,
    },
    nome: {
        fontWeight: 'bold',
    },
    time: {
        color: '#fff'
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

})