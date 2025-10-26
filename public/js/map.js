const locations = JSON.parse(
  document.getElementById('map').dataset.locations,
);

var map = L.map('map', { zoomControl: false });

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const points = [];
const markers = [];

locations.forEach((loc) => {
  const coords = [loc.coordinates[1], loc.coordinates[0]];
  points.push(coords);

  const marker = L.marker(coords, {
    icon: L.divIcon({
      className: 'marker', // نفس اللي جوناس استخدمه
      iconSize: [32, 40],
      iconAnchor: [16, 40],
    }),
  })
    .addTo(map)
    .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
      autoClose: false,
      closeOnClick: false,
      offset: [0, -30], // ✅ يحرك الـ popup لفوق
    });

  markers.push(marker);
});

const bounds = L.latLngBounds(points).pad(0.5);
map.fitBounds(bounds);

// ✅ Open ALL popups automatically
markers.forEach((m) => m.openPopup());

map.scrollWheelZoom.disable();
