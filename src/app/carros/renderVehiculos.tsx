import {fetchVehiculos} from '../vehiculos/fetchVehiculo' 
import Vehiculos from './vehiculos'
export const RenderVehiculos = async function RenderVehiculos(params: any) {
    const vehiculos = await fetchVehiculos();
    return <Vehiculos carro={vehiculos.carro} />;
} as unknown as () => JSX.Element;
  