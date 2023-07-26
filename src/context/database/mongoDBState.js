import React, { useReducer, useState } from 'react';

import MongoDBContext from './mongoDBContext';
import MongoDBReducer from './mongoDBReducer';
import { OBTENER_PRODUCTOS_EXITO } from '../../types/index';

import { sortBy } from 'lodash';
import axios from 'axios';

const MongoDBState = props => {

    const [isLoading, setLoading] = useState(true);

    //State Incial
    const initialState = {
        menu: []
    };

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(MongoDBReducer, initialState);

    //Consultar API  NodeJS
    const obtenerProductos = async (_) => {
        try {
            const URL = 'https://restaurante.fly.dev/obtener-producto-disponible',
                response = await axios.get(URL),
                ordenCategoria = await sortBy(response.data, 'categoria');
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: ordenCategoria
            });

        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }


    return (
        <MongoDBContext.Provider
            value={{
                menu: state.menu,
                obtenerProductos,
                isLoading
            }}
        >
            {props.children}
        </MongoDBContext.Provider>
    );
}


export default MongoDBState;
