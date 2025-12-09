#include <iostream>
#include <queue>
using namespace std;

int main() {
    const int rows = 5, cols = 5;
    int flood[rows][cols] = {0};    // 0 = dry, 1 = flooded
    int visited[rows][cols] = {0};  // keep track of visited cells

    // Initial flooded cell (source of flood)
    flood[2][2] = 1;
    visited[2][2] = 1;

    queue<pair<int,int>> q; // queue for BFS
    q.push({2,2});

    int dr[] = {-1,1,0,0}; // directions: up, down, left, right
    int dc[] = {0,0,-1,1};

    cout << "Flood spread simulation (BFS):\n";

    while(!q.empty()){
        pair<int,int> cell = q.front(); q.pop();
        int r = cell.first, c = cell.second;

        // Print which cell is flooded
        cout << "Flood reached cell (" << r << "," << c << ")\n";

        // Explore all 4 neighbors
        for(int i=0;i<4;i++){
            int nr = r + dr[i];
            int nc = c + dc[i];

            // Check bounds and if not visited
            if(nr>=0 && nr<rows && nc>=0 && nc<cols && !visited[nr][nc]){
                visited[nr][nc] = 1;  // mark as visited
                flood[nr][nc] = 1;    // mark as flooded
                q.push({nr,nc});      // add neighbor to queue
            }
        }
    }

    // Print final flood map
    cout << "\nFinal flood map:\n";
    for(int i=0;i<rows;i++){
        for(int j=0;j<cols;j++){
            cout << flood[i][j] << " ";
        }
        cout << "\n";
    }

    return 0;
}
