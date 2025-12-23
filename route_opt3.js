/* =========================================================
   Transport Route Optimization System
   Module 3 – Vishalnagari Agriculture Logistics

   Features Implemented:
   1. Source–Destination Route Selection
   2. Shortest Route Finder (Dijkstra’s Algorithm)
   3. Route Comparison Table
   ========================================================= */

/* Dataset derived directly from CSV */
const routeData = [
  { from: "Depot", to: "Warehouse A", distance: 12, traffic: 1 },
  { from: "Depot", to: "Warehouse B", distance: 15, traffic: 2 },
  { from: "Warehouse A", to: "Delivery Point 1", distance: 8, traffic: 1 },
  { from: "Warehouse A", to: "Delivery Point 2", distance: 10, traffic: 2 },
  { from: "Warehouse B", to: "Delivery Point 2", distance: 7, traffic: 1 },
  { from: "Warehouse B", to: "Delivery Point 3", distance: 12, traffic: 3 },
  { from: "Delivery Point 1", to: "Delivery Point 4", distance: 5, traffic: 2 },
  { from: "Delivery Point 2", to: "Delivery Point 4", distance: 6, traffic: 1 },
  { from: "Delivery Point 3", to: "Delivery Point 4", distance: 8, traffic: 2 },
  { from: "Depot", to: "Delivery Point 5", distance: 20, traffic: 3 },
  { from: "Warehouse A", to: "Delivery Point 5", distance: 15, traffic: 2 },
  { from: "Warehouse B", to: "Delivery Point 5", distance: 10, traffic: 1 },
  { from: "Delivery Point 4", to: "Delivery Point 5", distance: 7, traffic: 1 }
];

/* Build graph with weighted edges */
function buildGraph() {
  const graph = {};

  routeData.forEach(edge => {
    if (!graph[edge.from]) graph[edge.from] = [];
    graph[edge.from].push({
      node: edge.to,
      cost: edge.distance * edge.traffic,
      distance: edge.distance,
      traffic: edge.traffic
    });
  });

  return graph;
}

/* Dijkstra’s Algorithm */
function dijkstra(graph, start) {
  const distances = {};
  const previous = {};
  const visited = new Set();

  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
  });

  distances[start] = 0;

  while (true) {
    let closestNode = null;
    let smallestDistance = Infinity;

    for (let node in distances) {
      if (!visited.has(node) && distances[node] < smallestDistance) {
        smallestDistance = distances[node];
        closestNode = node;
      }
    }

    if (closestNode === null) break;

    visited.add(closestNode);

    if (!graph[closestNode]) continue;

    graph[closestNode].forEach(neighbor => {
      const newDistance = distances[closestNode] + neighbor.cost;
      if (newDistance < distances[neighbor.node]) {
        distances[neighbor.node] = newDistance;
        previous[neighbor.node] = closestNode;
      }
    });
  }

  return { distances, previous };
}

/* Get path from source to destination */
function getPath(previous, destination) {
  const path = [];
  let current = destination;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return path;
}

/* Main function: Source → Destination Optimization */
function optimizeRoute() {
  const source = document.getElementById("source").value;
  const destination = document.getElementById("destination").value;

  if (source === "" || destination === "") {
    alert("Please select both source and destination.");
    return;
  }

  const graph = buildGraph();
  const result = dijkstra(graph, source);

  if (!result.distances[destination] || result.distances[destination] === Infinity) {
    document.getElementById("routeOutput").innerText =
      "No available route between selected locations.";
    return;
  }

  const path = getPath(result.previous, destination);
  displayRouteComparison(path, result.distances[destination]);
}

/* Route Comparison Table */
function displayRouteComparison(path, totalCost) {
  let totalDistance = 0;
  let totalTraffic = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const edge = routeData.find(
      e => e.from === path[i] && e.to === path[i + 1]
    );
    if (edge) {
      totalDistance += edge.distance;
      totalTraffic += edge.traffic;
    }
  }

  const output = document.getElementById("routeOutput");
  output.innerHTML = `
    <b>Optimal Route:</b><br>
    ${path.join(" → ")}<br><br>

    <table border="1" cellpadding="6" style="border-collapse:collapse;">
      <tr>
        <th>Total Distance (km)</th>
        <th>Total Traffic Impact</th>
        <th>Overall Cost</th>
      </tr>
      <tr style="background:#CDE3B0;font-weight:bold;">
        <td>${totalDistance}</td>
        <td>${totalTraffic}</td>
        <td>${totalCost}</td>
      </tr>
    </table>
  `;
}
