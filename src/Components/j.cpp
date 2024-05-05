
class Solution {
public:
    vector<int> resultArray(vector<int>& nums) {
        int n = nums.size();
        Node* a1Root = nullptr;
        Node* a2Root = nullptr;

        a1Root = insert(a1Root, nums[0]);
        a2Root = insert(a2Root, nums[1]);

        vector<int> a1, a2;
        a1.push_back(nums[0]);
        a2.push_back(nums[1]);

        for (int i = 2; i < n; i++) {
            int gr1 = greaterCount(a1Root, nums[i]);
            int gr2 = greaterCount(a2Root, nums[i]);

            if (gr1 > gr2 || (gr1 == gr2 && a1.size() <= a2.size())) {
                a1Root = insert(a1Root, nums[i]);
                a1.push_back(nums[i]);
            } else {
                a2Root = insert(a2Root, nums[i]);
                a2.push_back(nums[i]);
            }
        }

        vector<int> result(n);
        int idx = 0;
        for (int num : a1) {
            result[idx++] = num;
        }
        for (int num : a2) {
            result[idx++] = num;
        }

        return result;
    }

private:
    struct Node {
        int val;
        int count;
        Node* left;
        Node* right;

        Node(int val) : val(val), count(1), left(nullptr), right(nullptr) {}
    };

    Node* insert(Node* root, int val) {
        if (root == nullptr) return new Node(val);
        if (val <= root->val) {
            root->left = insert(root->left, val);
        } else {
            root->right = insert(root->right, val);
        }
        root->count++;
        return root;
    }

    int greaterCount(Node* root, int val) {
        if (root == nullptr) return 0;
        if (root->val <= val) {
            return greaterCount(root->right, val);
        }
        return (root->right != nullptr ? root->right->count : 0) + 1 + greaterCount(root->left, val);
    }
};