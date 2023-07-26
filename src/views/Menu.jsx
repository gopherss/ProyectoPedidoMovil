import React, { useEffect, Fragment, useContext } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Text, Avatar } from '@rneui/themed';

//Estilos
import globalStyles from '../styles/global';

//Context
import MongoDBContext from '../context/database/mongoDBContext';
import PedidoContext from '../context/pedidos/pedidosContext';

const Menu = () => {

    const { menu, obtenerProductos, isLoading } = useContext(MongoDBContext);
    const { seleccionarPlatillo } = useContext(PedidoContext);
    const navigation = useNavigation()

    useEffect(() => {
        obtenerProductos();
    }, []);

    const mostrarHeading = (categoria, i) => {
        if (i > 0) {
            const categoriaAnterior = menu[i - 1].categoria;
            if (categoriaAnterior !== categoria) {
                return (
                    <Text style={styles.categoriaTitulo}>{categoria}</Text>
                )
            }
        } else {
            return (
                <Text style={styles.categoriaTitulo}>{categoria}</Text>
            )
        }
    }

    return (
        <>
            <ScrollView>
                <View style={globalStyles.contenedor}>
                    <View>
                        {isLoading ? (
                            <ActivityIndicator
                                size={'large'}
                                color={'#00ff00'}
                                animating

                            />
                        ) : (
                            <>
                                {
                                    menu.map((platillo, i) => {
                                        const { imagen, nombre, descripcion, categoria, _id, precio } = platillo;
                                        const { url } = imagen;

                                        return (
                                            <Fragment key={_id}>
                                                {mostrarHeading(categoria, i)}
                                                <ListItem bottomDivider onPress={_ => {
                                                    const { disponible, ...platillo2 } = platillo;
                                                    seleccionarPlatillo(platillo2);
                                                    navigation.navigate('DetallePlatillo')
                                                }}>
                                                    <Avatar
                                                        rounded
                                                        source={{ uri: url }}
                                                        size={110}
                                                    />
                                                    <ListItem.Content>
                                                        <ListItem.Title>
                                                            <Text h4>{nombre}</Text>
                                                        </ListItem.Title>
                                                        <ListItem.Subtitle style={globalStyles.textoDescripcion}>
                                                            {descripcion}
                                                        </ListItem.Subtitle>
                                                        <ListItem.Subtitle style={globalStyles.textoPrecio}>
                                                            S/. {precio}
                                                        </ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                            </Fragment>
                                        );
                                    })
                                }

                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    categoriaTitulo: {
        backgroundColor: '#1e90ff',
        color: '#FFFFFF',
        textAlign: 'center',
        paddingVertical: 10,
        marginBottom: 5,
        textTransform: 'uppercase',
        fontSize: 25
    }
});


export default Menu;

