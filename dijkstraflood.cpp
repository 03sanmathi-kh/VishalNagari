#include <iostream>
#include <queue>
using namespace std;

// Cell structure for priority queue
struct Cell {
    int r, c;
    double cost; // represents flood arrival "time" or difficulty
    bool operator>(const Cell &other) const {
        return cost > other.cost; // min-heap based on cost
    }
};

int main() {
    const int rows = 5, cols = 5;
    
    // Elevation map of the area (higher value = harder for flood to reach)
    double elevation[rows][cols] = {
        {1,2,2,3,4},
        {2,3,3,4,5},
        {2,1,1,2,3},
        {3,2,2,3,4},
        {4,3,3,4,5}
    };

    // Initialize flood arrival times with a large value
    double floodTime[rows][cols];
    for(int i=0;i<rows;i++)
        for(int j=0;j<cols;j++)
            floodTime[i][j] = 1e9;

    // Priority queue to process cells with lowest flood arrival time first
    priority_queue<Cell, vector<Cell>, greater<Cell>> pq;

    // Starting flooded cell
    floodTime[2][2] = 0;
    pq.push({2,2,0});

    int dr[] = {-1,1,0,0}; // directions
    int dc[] = {0,0,-1,1};

    cout << "Flood spread simulation (Dijkstra weighted):\n";

    while(!pq.empty()) {
        Cell cur = pq.top(); pq.pop();
        int r = cur.r, c = cur.c;

        // Skip if already processed with smaller cost
        if(cur.cost > floodTime[r][c]) continue;

        cout << "Flood reached cell (" << r << "," << c << ") at time " << cur.cost << "\n";

        // Check all 4 neighbors
        for(int i=0;i<4;i++){
            int nr = r + dr[i], nc = c + dc[i];
            if(nr>=0 && nr<rows && nc>=0 && nc<cols){
                // Calculate new cost: elevation difference + 1
                double newCost = floodTime[r][c] + (elevation[nr][nc] - elevation[r][c] + 1);
                // Update if new cost is smaller
                if(newCost < floodTime[nr][nc]){
                    floodTime[nr][nc] = newCost;
                    pq.push({nr,nc,newCost});
                }
            }
        }
    }

    // Print final flood arrival times for all cells
    cout << "\nFinal flood arrival times:\n";
    for(int i=0;i<rows;i++){
        for(int j=0;j<cols;j++){
            cout << floodTime[i][j] << "\t";
        }
        cout << "\n";
    }

    return 0;
}
