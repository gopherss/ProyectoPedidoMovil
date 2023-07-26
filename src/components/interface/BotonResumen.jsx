import React from 'react';
import { Button, Icon } from '@rneui/base';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const BotonResumen = () => {
    const navigation = useNavigation();

    return (
        <Button
            onPress={_ => navigation.navigate('ResumenPedido')}
            ViewComponent={LinearGradient}
            linearGradientProps={{
                colors: ['#40c9ff', '#e81cff'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
            }}
            style={{ marginRight: 5 }}
        >
            Pedido
            <Icon name="shop" color="white" />
        </Button>
    );
}

export default BotonResumen;
