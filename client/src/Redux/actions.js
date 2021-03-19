import axios from 'axios'
import {GET_DOGS} from './constants'
import swal from 'sweetalert'
export function getDogs() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/dogs`)
            .then((res) => res.data )
            .then ( data => {
                dispatch({ type: GET_DOGS, payload:data})
            })
            .catch( () => swal ( "Oops" ,  "Hubo un error, por favor intentelo mas tarde!" ,  "error" ) )
    }
}
