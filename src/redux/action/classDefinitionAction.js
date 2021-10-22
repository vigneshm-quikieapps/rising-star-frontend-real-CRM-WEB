import {GET_CLASS_DEFINITION_SAGA} from '../types';

export default function getClassDefinition(id){
    return {type: GET_CLASS_DEFINITION_SAGA, payload: id};
}
