// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken =
  "pk.eyJ1IjoidGVhenBzZWciLCJhIjoiY2xyMGh6bGx5MGRyazJrbnhxbHowNGRwciJ9.7QK0uI2QU-DPctyeBlWwsQ";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  zoom: 15,
  center: emissionData.location,
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

map.on("style.load", () => {
  map.setFog({}); // Set the default atmosphere style
});

// The following values can be changed to control rotation speed:

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: emissionData.location,
      },
      properties: {
        title: "Mapbox",
        description: `Thiết bị: ${emissionData.id}`,
      },
    },
    // {
    //   type: "Feature",
    //   geometry: {
    //     type: "Point",
    //     coordinates: [-122.414, 37.776],
    //   },
    //   properties: {
    //     title: "Mapbox",
    //     description: "San Francisco, California",
    //   },
    // },
  ],
};

// add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement("div");
  el.className = "marker";

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `
          <p>${feature.properties.description}</p>
          `
        )
    )
    .addTo(map);
}

// At low zooms, complete a revolution every two minutes.
const secondsPerRevolution = 240;
// Above zoom level 5, do not rotate.
const maxSpinZoom = 5;
// Rotate at intermediate speeds between zoom levels 3 and 5.
const slowSpinZoom = 3;

let userInteracting = false;
const spinEnabled = true;

function spinGlobe() {
  const zoom = map.getZoom();
  if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
    let distancePerSecond = 360 / secondsPerRevolution;
    if (zoom > slowSpinZoom) {
      // Slow spinning at higher zooms
      const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
      distancePerSecond *= zoomDif;
    }
    const center = map.getCenter();
    center.lng -= distancePerSecond;
    // Smoothly animate the map over one second.
    // When this animation is complete, it calls a 'moveend' event.
    map.easeTo({ center, duration: 1000, easing: (n) => n });
  }
}

// Pause spinning on interaction
map.on("mousedown", () => {
  userInteracting = true;
});
map.on("dragstart", () => {
  userInteracting = true;
});

// When animation is complete, start spinning if there is no ongoing interaction
map.on("moveend", () => {
  spinGlobe();
});

spinGlobe();
