// Map Tracker Component
class MapTracker {
  constructor(containerId, apiKey) {
    this.container = document.getElementById(containerId);
    this.apiKey = apiKey;
    this.vehicles = [];
    this.map = null;
    this.markers = {};
    this.routePolylines = {};
    
    this.initMap();
    this.startTracking();
  }

  initMap() {
    // Load Mapbox GL JS
    const script = document.createElement('script');
    script.src = `https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js`;
    script.onload = () => this.setupMap();
    document.head.appendChild(script);
    
    const link = document.createElement('link');
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  setupMap() {
    mapboxgl.accessToken = this.apiKey;
    this.map = new mapboxgl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [77.1025, 28.7041], // Default to New Delhi
      zoom: 12
    });
    
    // Add navigation controls
    this.map.addControl(new mapboxgl.NavigationControl());
    
    // Add geolocate control
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
  }

  startTracking() {
    // Simulate real-time updates (replace with actual API calls)
    setInterval(() => {
      this.updateVehiclePositions();
    }, 5000);
  }

  updateVehiclePositions() {
    // In a real implementation, this would fetch from your API
    const newPositions = [
      { id: 'truck1', lat: 28.7041 + Math.random() * 0.01, lng: 77.1025 + Math.random() * 0.01 },
      { id: 'truck2', lat: 28.7041 + Math.random() * 0.01, lng: 77.1025 + Math.random() * 0.01 },
      { id: 'van1', lat: 28.7041 + Math.random() * 0.01, lng: 77.1025 + Math.random() * 0.01 }
    ];
    
    newPositions.forEach(vehicle => {
      this.updateVehicleMarker(vehicle);
    });
  }

  updateVehicleMarker(vehicle) {
    if (!this.markers[vehicle.id]) {
      // Create new marker
      const el = document.createElement('div');
      el.className = 'vehicle-marker';
      el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.backgroundSize = '100%';
      
      this.markers[vehicle.id] = new mapboxgl.Marker(el)
        .setLngLat([vehicle.lng, vehicle.lat])
        .addTo(this.map);
    } else {
      // Update existing marker position
      this.markers[vehicle.id].setLngLat([vehicle.lng, vehicle.lat]);
    }
  }

  addRoute(routeId, coordinates) {
    if (this.routePolylines[routeId]) {
      this.routePolylines[routeId].remove();
    }
    
    this.routePolylines[routeId] = new mapboxgl.Polyline({
      map: this.map,
      polyline: {
        coordinates: coordinates,
        color: '#3bb2d0',
        width: 4
      }
    });
  }
}

// Export for use in other files
export default MapTracker;