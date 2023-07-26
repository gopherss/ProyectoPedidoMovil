import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/base'
import { Text } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import globalStyles from '../styles/global';
import Lottie from 'lottie-react-native';

import { useNavigation } from '@react-navigation/native';

const NuevaOrden = () => {

    const navigation = useNavigation();

    return (
        <>
            <View style={globalStyles.contenedor}>
                <View style={[globalStyles.contenido, styles.contenido]}>
                    <Lottie source={require('../../assets/animation_principal.json')} autoPlay />

                    <Button
                        radius={'xl'}
                        ViewComponent={LinearGradient}
                        linearGradientProps={globalStyles.botonPrincipal}
                        onPress={_ => navigation.navigate('Menu')}
                    >
                        <Text style={globalStyles.botonTexto}> Agregar Nuevo Pedido </Text>
                        &#x1f6cd;
                    </Button>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    contenido: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        position: 'relative',
        marginBottom: 200
    }
});

export default NuevaOrden;