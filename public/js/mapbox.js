/* eslint-disable */

export const displaymap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2lxYmFsMDEiLCJhIjoiY2wyamoxNHE0MHM0eDNubzdyY2ZqeHRkeiJ9.plR_6jIIVzVI9FzpMnU5Kw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kiqbal01/cl2jk86gi002414qq0aw3whmn',
    scrollZoom: false
    //   center: [-118.113491, 34.111745],
    //   zoom: 10,
    //   interactive: false
  });
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create Marker
    const el = document.createElement('div');
    el.className = 'marker';
    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });
  map.fitBounds(bounds, {
    padding: {
      top: 150,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
