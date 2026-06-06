// import { Map, Marker } from "@vis.gl/react-google-maps";

export default function MapSection() {
  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">
            Our Location
          </h2>
        </div>

        <div className="card">
          <div className="h-[400px] w-full rounded-xl overflow-hidden">

            <Map
              defaultCenter={{ lat: 30.3753, lng: 69.3451 }} // Pakistan
              defaultZoom={5}
              style={{ width: "100%", height: "100%" }}
            >
              <Marker position={{ lat: 30.3753, lng: 69.3451 }} />
            </Map>

          </div>
        </div>

      </div>
    </section>
  );
}