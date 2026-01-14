import SinnohMap from '../../../assets/shinnoh_map.jpg';

const Map = () => {
    return (
        <div className="h-full w-full flex items-center justify-center bg-zinc-900 rounded relative overflow-hidden border border-blue-900">
            <img
                src={SinnohMap}
                alt="Sinnoh Map"
                className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-blue-500/10 pointer-events-none"></div>
        </div>
    );
};
export default Map;
