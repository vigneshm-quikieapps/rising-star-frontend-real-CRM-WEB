import axios from 'axios';
import API from '../helper/config';

export default async function getClassDefinition(id) {
    const api = `${API.ClassDefinitionApi}${id}`;

    try{
        const classDefinition = await axios.get(api);
        //console.log(classDefinition);
        return classDefinition;
    } catch(error) {
        console.error(error);
    }
};
