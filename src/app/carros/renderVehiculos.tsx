import {fetchVehiculos} from '../vehiculos/fetchVehiculo' 
import Vehiculos from './vehiculos'
export const RenderVehiculos = async function RenderVehiculos(params: any) {
    const carro = await fetchVehiculos();
    return <Vehiculos carro={carro} />;
} as unknown as () => JSX.Element;
  