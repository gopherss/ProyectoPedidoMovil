import React, { useEffect, useContext } from 'react';
import { ScrollView, Alert, StyleSheet, View  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Estilos
import { Text, Button, ListItem, Avatar, Icon } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient';
import globalStyles from '../styles/global';

//Contexto
import PedidoContext from '../context/pedidos/pedidosContext';


const ResumenPedido = (_) => {

    const navigation = useNavigation();

    //Pedido 
    const { pedido, total, mostrarResumen } = useContext(PedidoContext);

    useEffect(() => {
        calcularTotal();
    }, [pedido]);


    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);
        mostrarResumen(nuevoTotal)
    }

    return (
        <>
            <ScrollView>
                <View style={globalStyles.contenedor}>
                    <View style={globalStyles.contenido}>
                        {pedido.map((platillo, i) => {
                            const { cantidad, nombre, imagen, _id, precio } = platillo;
                            const { url } = imagen;
                            return (
                                <ListItem key={_id + i}
                                    linearGradientProps={styles.colorPedido}
                                    ViewComponent={LinearGradient}
                                >
                                    <Avatar
                                        size={110}
                                        source={{ uri: url }}
                                    />
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.textoNombre}>
                                            {nombre}
                                        </ListItem.Title>
                                        <ListItem.Subtitle style={styles.textoDetalle}>
                                            Cantidad: {cantidad}
                                        </ListItem.Subtitle>
                                        <ListItem.Subtitle style={styles.textoDetalle}>
                                            Precio: S/. {precio}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            );
                        })}

                        <Text style={globalStyles.textoPrecio}>Total a Pagar </Text>
                        <Text style={styles.textoTotal}>
                            S/.{total}
                        </Text>

                        <Button
                            radius={'xl'}
                            ViewComponent={LinearGradient}
                            linearGradientProps={styles.masProductos}
                            onPress={_ => navigation.navigate('Menu')}
                        >
                            <Text style={styles.textoMasProductos}> Más Productos</Text>
                            <Icon name='add' color='#FFF' />
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    textoNombre: {
        color: '#212121', fontWeight: 'bold'
    },
    textoDetalle: {
        color: '#263238'
    },
    colorPedido: {
        colors: ['#b5c6e0', '#ebf4f5'],
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 },
    },
    masProductos: {
        colors: ['#0061ff', '#60efff'],
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 },
        paddingVertical: 13,
    },
    textoTotal: {
        textAlign: 'center',
        color: '#0974f1',
        fontWeight: 'bold',
        fontSize: 50,
        marginVertical: 10,
    },
    textoMasProductos: { 
        color: '#FFF', 
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default ResumenPedido;
