#include <bits/stdc++.h>
using namespace std;

/* 
   I used three algorithms:
   1. Sparse Table  -> find MAX demand quickly in a range
   2. Segment Tree  -> find SUM of scrap quickly in a range
   3. Dynamic Programming -> compute minimum monthly cost
*/


// 1. Sparse Table (Range Max) 
vector<vector<int>> buildSparseTable(vector<int>& arr) {
    int n = arr.size();
    int k = log2(n) + 1;

    vector<vector<int>> st(k, vector<int>(n));

    // Level 0 stores the original values
    for (int i = 0; i < n; i++) st[0][i] = arr[i];

    // Build higher levels for fast max query
    for (int j = 1; j < k; j++) {
        for (int i = 0; i + (1 << j) <= n; i++) {
            st[j][i] = max(st[j-1][i],
                           st[j-1][i + (1 << (j-1))]);
        }
    }
    return st;
}

// Query max in range [L, R]
int rangeMax(vector<vector<int>>& st, int L, int R) {
    int len = R - L + 1;
    int j = log2(len);
    return max(st[j][L], st[j][R - (1 << j) + 1]);
}



// - 2. Segment Tree (Range Sum) 
vector<int> segtree;

// Build segment tree for scrap sum
void buildSegTree(vector<int>& arr, int idx, int l, int r) {
    if (l == r) {               // Leaf node
        segtree[idx] = arr[l];
        return;
    }
    int mid = (l + r) / 2;
    buildSegTree(arr, idx*2, l, mid);
    buildSegTree(arr, idx*2+1, mid+1, r);

    segtree[idx] = segtree[idx*2] + segtree[idx*2+1];
}

// Query sum in range [L, R]
int querySeg(int idx, int l, int r, int L, int R) {
    if (R < l || L > r) return 0;          // No overlap
    if (L <= l && r <= R) return segtree[idx];  // Total overlap

    int mid = (l + r) / 2;
    return querySeg(idx*2, l, mid, L, R) +
           querySeg(idx*2+1, mid+1, r, L, R);
}



// 3. Dynamic Programming -
int main() {

    int months = 7;   // We treat each entry as one month

    // Monthly data
    vector<int> demand = {10, 20, 15, 25, 18, 30, 22};
    vector<int> scrap  = {5, 8, 6, 10, 7, 9, 6};
    vector<int> cost   = {3, 2, 4, 5, 3, 2, 4};

    // Build helpers for range queries
    auto st = buildSparseTable(demand);
    segtree.assign(4 * months, 0);
    buildSegTree(scrap, 1, 0, months - 1);

    // DP array: dp[i] = minimum cost till month i
    vector<int> dp(months + 1, 1e9);
    dp[0] = 0;

    // Try ending production at month i
    for (int i = 1; i <= months; i++) {
        for (int j = 0; j < i; j++) {

            // Get forecasted demand (max in range)
            int maxDemand = rangeMax(st, j, i - 1);

            // Get available scrap (sum in range)
            int scrapSum = querySeg(1, 0, months - 1, j, i - 1);

            // Production needed
            int production = max(0, maxDemand - scrapSum);

            // Cost of production in month i
            int c = production * cost[i - 1];

            // DP update
            dp[i] = min(dp[i], dp[j] + c);
        }
    }

    cout << "Optimal Monthly Cost = " << dp[months] << endl;
    return 0;
}
