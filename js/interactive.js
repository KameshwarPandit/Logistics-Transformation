// Interactive functions for logistics transformation

// Initialize animated network visualization
function initNetworkVisualization() {
  const container = document.querySelector('.network-visualization');
  
  // Create SVG element for visualization
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  container.appendChild(svg);
  
  // Create sample logistics nodes and routes with additional data
  const nodes = [
    { id: 'warehouse', x: 50, y: 50, label: 'Warehouse', type: 'storage', capacity: 10000 },
    { id: 'store1', x: 150, y: 150, label: 'Store 1', type: 'retail', demand: 2000 },
    { id: 'store2', x: 250, y: 50, label: 'Store 2', type: 'retail', demand: 1500 },
    { id: 'store3', x: 350, y: 150, label: 'Store 3', type: 'retail', demand: 2500 }
  ];
  
  const routes = [
    { source: 'warehouse', target: 'store1', distance: 120, traffic: 'medium', emissions: 45 },
    { source: 'warehouse', target: 'store2', distance: 90, traffic: 'low', emissions: 30 },
    { source: 'store1', target: 'store3', distance: 80, traffic: 'high', emissions: 35 },
    { source: 'store2', target: 'store3', distance: 110, traffic: 'medium', emissions: 40 }
  ];
  
  // Initialize carbon footprint tracker
  let totalEmissions = 0;
  
  // Add optimization controls
  const controls = document.createElement('div');
  controls.className = 'optimization-controls';
  container.appendChild(controls);
  
  const optimizeBtn = document.createElement('button');
  optimizeBtn.textContent = 'Optimize Routes';
  optimizeBtn.addEventListener('click', optimizeRoutes);
  controls.appendChild(optimizeBtn);
  
  const emissionsDisplay = document.createElement('div');
  emissionsDisplay.className = 'emissions-display';
  controls.appendChild(emissionsDisplay);
  
  // Draw nodes
  nodes.forEach(node => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', '10');
    circle.setAttribute('fill', '#4CAF50');
    svg.appendChild(circle);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', node.x + 15);
    text.setAttribute('y', node.y + 5);
    text.textContent = node.label;
    text.setAttribute('font-size', '12');
    svg.appendChild(text);
  });
  
  // Draw routes
  routes.forEach(route => {
    const sourceNode = nodes.find(n => n.id === route.source);
    const targetNode = nodes.find(n => n.id === route.target);
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', sourceNode.x);
    line.setAttribute('y1', sourceNode.y);
    line.setAttribute('x2', targetNode.x);
    line.setAttribute('y2', targetNode.y);
    line.setAttribute('stroke', '#2196F3');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('class', 'route-line');
    line.dataset.source = route.source;
    line.dataset.target = route.target;
    svg.appendChild(line);
    
    // Add route info label
    const midX = (sourceNode.x + targetNode.x) / 2;
    const midY = (sourceNode.y + targetNode.y) / 2;
    
    const routeInfo = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    routeInfo.setAttribute('x', midX);
    routeInfo.setAttribute('y', midY - 10);
    routeInfo.textContent = `${route.distance} km | ${route.emissions} kg CO2`;
    routeInfo.setAttribute('font-size', '10');
    routeInfo.setAttribute('text-anchor', 'middle');
    routeInfo.setAttribute('class', 'route-info');
    svg.appendChild(routeInfo);
    
    // Update total emissions
    totalEmissions += route.emissions;
  });
  
  // Update emissions display
  emissionsDisplay.textContent = `Total Carbon Footprint: ${totalEmissions} kg CO2`;
  
  // Route optimization function
  function optimizeRoutes() {
    // Clear existing routes
    document.querySelectorAll('.route-line, .route-info').forEach(el => el.remove());
    totalEmissions = 0;
    
    // Simple optimization algorithm - prioritize shortest distance with lowest traffic
    const optimizedRoutes = [...routes]
      .sort((a, b) => {
        // Prioritize routes with lower traffic
        const trafficPriority = {high: 3, medium: 2, low: 1};
        if (trafficPriority[a.traffic] !== trafficPriority[b.traffic]) {
          return trafficPriority[a.traffic] - trafficPriority[b.traffic];
        }
        // Then by distance
        return a.distance - b.distance;
      })
      .filter(route => {
        // Only keep most efficient routes
        return route.traffic !== 'high' || route.distance < 100;
      });
    
    // Redraw optimized routes
    optimizedRoutes.forEach(route => {
      const sourceNode = nodes.find(n => n.id === route.source);
      const targetNode = nodes.find(n => n.id === route.target);
      
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', sourceNode.x);
      line.setAttribute('y1', sourceNode.y);
      line.setAttribute('x2', targetNode.x);
      line.setAttribute('y2', targetNode.y);
      line.setAttribute('stroke', '#4CAF50'); // Green for optimized routes
      line.setAttribute('stroke-width', '3'); // Thicker for optimized routes
      line.setAttribute('class', 'route-line optimized');
      svg.appendChild(line);
      
      const routeInfo = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      routeInfo.setAttribute('x', (sourceNode.x + targetNode.x) / 2);
      routeInfo.setAttribute('y', (sourceNode.y + targetNode.y) / 2 - 10);
      routeInfo.textContent = `${route.distance} km | ${route.emissions} kg CO2`;
      routeInfo.setAttribute('font-size', '10');
      routeInfo.setAttribute('text-anchor', 'middle');
      routeInfo.setAttribute('class', 'route-info optimized');
      svg.appendChild(routeInfo);
      
      totalEmissions += route.emissions;
    });
    
    // Update emissions display with optimized value
    emissionsDisplay.textContent = `Optimized Carbon Footprint: ${totalEmissions} kg CO2 (${Math.round((routes.reduce((sum, r) => sum + r.emissions, 0) - totalEmissions) / routes.reduce((sum, r) => sum + r.emissions, 0) * 100)}% reduction)`;
  }
}

// Initialize interactive charts
function initCharts() {
  // Chart initialization logic will go here
}

// Carbon footprint calculator
function calculateCarbonFootprint(distance, vehicleType) {
  const emissionFactors = {
    truck: 0.161, // kg CO2 per km
    van: 0.104,
    ship: 0.040,
    train: 0.032,
    plane: 0.230
  };
  
  if (!emissionFactors[vehicleType]) {
    return 0;
  }
  
  return (distance * emissionFactors[vehicleType]).toFixed(2);
}

// Initialize demo simulation
function initSimulation() {
  const container = document.querySelector('#simulation-controls');
  
  // Create simulation controls
  const controls = document.createElement('div');
  controls.className = 'simulation-panel';
  
  // Add demand slider
  const demandLabel = document.createElement('label');
  demandLabel.textContent = 'Demand Level: ';
  const demandSlider = document.createElement('input');
  demandSlider.type = 'range';
  demandSlider.min = '1';
  demandSlider.max = '10';
  demandSlider.value = '5';
  
  // Add vehicle selector
  const vehicleLabel = document.createElement('label');
  vehicleLabel.textContent = 'Vehicle Type: ';
  const vehicleSelect = document.createElement('select');
  ['Truck', 'Van', 'Ship', 'Train', 'Plane'].forEach(type => {
    const option = document.createElement('option');
    option.value = type.toLowerCase();
    option.textContent = type;
    vehicleSelect.appendChild(option);
  });
  
  // Add simulation button
  const simulateBtn = document.createElement('button');
  simulateBtn.textContent = 'Run Simulation';
  simulateBtn.addEventListener('click', () => {
    const distance = 100; // Sample distance
    const emissions = calculateCarbonFootprint(distance, vehicleSelect.value);
    alert(`Estimated emissions: ${emissions} kg CO2 for ${distance} km`);
  });
  
  // Append all controls
  controls.appendChild(demandLabel);
  controls.appendChild(demandSlider);
  controls.appendChild(document.createElement('br'));
  controls.appendChild(vehicleLabel);
  controls.appendChild(vehicleSelect);
  controls.appendChild(document.createElement('br'));
  controls.appendChild(simulateBtn);
  
  container.appendChild(controls);
}

// Initialize all interactive elements
document.addEventListener('DOMContentLoaded', () => {
  initNetworkVisualization();
  initCharts();
  initSimulation();
});