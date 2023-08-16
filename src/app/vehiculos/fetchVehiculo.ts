import URL from '../utils/url' 

export const fetchVehiculos = async () => {
    try {
        const response = await fetch(`${URL}/veh/vehiculo/no_eliminados/30`, {cache: 'no-store'});
        
        const data = await response.json();
        console.log("vehiculos")
        return data;
    } catch (error) {
        console.error(error);
    }
};