// const URL = "https://2wea912yue.execute-api.us-east-1.amazonaws.com/veh/vehiculo/"
import URL from '../utils/url' 
export const fetchVehiculos = async () => {
    try {
        const response = await fetch(`${URL}no_eliminados/30`, {cache: 'no-store'});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};