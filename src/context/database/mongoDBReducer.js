import { OBTENER_PRODUCTOS_EXITO, GUARDAR_PEDIDO } from '../../types/index';

export default (state, action) => {

    switch (action.type) {
        case OBTENER_PRODUCTOS_EXITO:
            return {
                ...state,
                menu: action.payload
            }
        case GUARDAR_PEDIDO:
            return {
                ...state,
            }
        default:
            return state;
    }

}