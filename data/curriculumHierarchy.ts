/**
 * ============================================================================
 * Lovely Professional University (LPU) Enterprise Curriculum Hierarchy Data Store
 * ============================================================================
 * 
 * Normalized 6-Tier Academic Taxonomy:
 * 1. FacultyCategory (6 core domains)
 * 2. DegreeCourse (B.Tech, M.Tech, MBA, BCA, B.Pharm, Ph.D., etc.)
 * 3. SpecializationBranch (8 B.Tech branches + other faculty specializations)
 * 4. AcademicYear (1st to 4th Year)
 * 5. Subject (CSE205, ECE213, MEC107, CHE110, etc.)
 * 6. Chapter & QuizQuestion (Structured CBT & Diagnostic Banks)
 */

import {
  UniversityTaxonomy,
  FacultyCategory,
  FacultyDomain,
  DegreeCourse,
  SpecializationBranch,
  AcademicYear,
  Subject,
  Chapter,
  QuizQuestion,
  AcademicYearNumber
} from "@/types/curriculum";

export * from "@/types/curriculum";

// ────────────────────────────────────────────────────────────────────────────
// CSE205 Data Structures and Algorithms — Rich Question Bank (Tier 6)
// ────────────────────────────────────────────────────────────────────────────

const cse205Chapter1Questions: QuizQuestion[] = [
  {
    id: "q-cse205-ch1-01",
    question: "In C/C++, how is the physical memory address of an element at index 'i' calculated in a 1D contiguous array with base address 'Base' and element size 'Size' in bytes?",
    codeSnippet: "int arr[100]; // Base: 0x1000, sizeof(int) = 4 bytes\n// Target: address of arr[i]",
    options: [
      "Address = Base + (i * Size)",
      "Address = Base + (i / Size)",
      "Address = (Base + i) * Size",
      "Address = Base * (i + Size)"
    ],
    correctAnswerIndex: 0,
    explanation: "In contiguous memory allocation, array elements are stored sequentially in physical RAM. The address offset from the base address is the 0-based index multiplied by the element byte size (Size). Thus: Address(arr[i]) = Base + (i * Size).",
    difficulty: "Easy"
  },
  {
    id: "q-cse205-ch1-02",
    question: "What is the worst-case time complexity of searching for an arbitrary element in an unsorted Singly Linked List of n nodes?",
    codeSnippet: "struct Node {\n    int data;\n    Node* next;\n};",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    correctAnswerIndex: 2,
    explanation: "Because singly linked list nodes are scattered across heap memory connected via pointers, they do not support O(1) random indexing. Finding an element in an unsorted list requires sequential traversal from the head node to the tail, incurring O(n) worst-case time.",
    difficulty: "Easy"
  },
  {
    id: "q-cse205-ch1-03",
    question: "Compared to a Singly Linked List of n nodes, what is the exact extra pointer memory overhead incurred by a Doubly Linked List of the same length on a 64-bit operating system?",
    codeSnippet: "struct DNode {\n    int data;\n    DNode* prev; // extra pointer\n    DNode* next;\n};",
    options: [
      "0 extra bytes",
      "4n extra bytes",
      "8n extra bytes",
      "16n extra bytes"
    ],
    correctAnswerIndex: 2,
    explanation: "On 64-bit architectures, every memory pointer address occupies 8 bytes (64 bits). A doubly linked list node includes one additional 'prev' pointer per node relative to a singly linked list, amounting to exactly 8 * n additional bytes for n nodes.",
    difficulty: "Easy"
  },
  {
    id: "q-cse205-ch1-04",
    question: "What is the best-case time complexity of the Linear Search algorithm over an array containing n elements?",
    codeSnippet: "int linearSearch(int arr[], int n, int key) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == key) return i;\n    }\n    return -1;\n}",
    options: [
      "O(n)",
      "O(1)",
      "O(log n)",
      "O(n / 2)"
    ],
    correctAnswerIndex: 1,
    explanation: "The best-case scenario occurs when the search target is located at the very first element (index 0). The loop executes a single comparison and immediately returns, completing in O(1) constant time.",
    difficulty: "Easy"
  },
  {
    id: "q-cse205-ch1-05",
    question: "Given a pointer directly to the head of a non-empty singly linked list, what is the time complexity to delete the head node and update the list's entry pointer?",
    codeSnippet: "void deleteHead(Node*& head) {\n    if (!head) return;\n    Node* temp = head;\n    head = head->next;\n    delete temp;\n}",
    options: [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n^2)"
    ],
    correctAnswerIndex: 2,
    explanation: "Deleting the head node only requires saving the current head in a temporary pointer, moving head to head->next, and deallocating memory. No traversal over the remaining n-1 nodes is needed, executing strictly in O(1) time.",
    difficulty: "Easy"
  },
  {
    id: "q-cse205-ch1-06",
    question: "In a standard Circular Singly Linked List, which condition indicates that a forward traversal starting from 'head' has completed a full revolution?",
    codeSnippet: "Node* curr = head;\ndo {\n    // process node curr\n    curr = curr->next;\n} while (/* loop condition */);",
    options: [
      "curr == NULL",
      "curr->next == NULL",
      "curr == head",
      "curr->next == head"
    ],
    correctAnswerIndex: 2,
    explanation: "In a circular linked list, the final node's next pointer points directly back to the head node rather than NULL. A loop initialized at head will revisit the starting node when curr == head after traversing every node.",
    difficulty: "Easy"
  },
  {
    id: "q-cse205-ch1-07",
    question: "For a 2D array 'int A[4][5]' stored in Row-Major order starting at base address 2000 with 4-byte integers, what is the exact memory address of element A[2][3] (assuming 0-based indexing)?",
    codeSnippet: "// Dimensions: Rows = 4, Columns = 5\n// Base Address = 2000, sizeof(int) = 4 bytes\n// Target: Address of A[2][3]",
    options: [
      "2040",
      "2052",
      "2068",
      "2048"
    ],
    correctAnswerIndex: 1,
    explanation: "In row-major order: Address(A[i][j]) = Base + ((i * total_cols) + j) * size. Substituting values: 2000 + ((2 * 5) + 3) * 4 = 2000 + (10 + 3) * 4 = 2000 + (13 * 4) = 2000 + 52 = 2052.",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch1-08",
    question: "Trace the following C++ function when given the head of a linked list: 10 -> 20 -> 30 -> NULL. What is the returned structure?",
    codeSnippet: "Node* reverseList(Node* head) {\n    Node *prev = nullptr, *curr = head, *nxt = nullptr;\n    while (curr) {\n        nxt = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}",
    options: [
      "Pointer to node 10 with list: 10 -> NULL",
      "Pointer to node 30 with list: 30 -> 20 -> 10 -> NULL",
      "Pointer to nullptr with orphaned nodes",
      "A circular cycle between 20 and 30"
    ],
    correctAnswerIndex: 1,
    explanation: "This is the classic 3-pointer in-place reversal algorithm. In iteration 1, 10->next becomes null; in iteration 2, 20->next becomes 10; in iteration 3, 30->next becomes 20. The loop terminates when curr == nullptr, returning prev which points to the new head 30.",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch1-09",
    question: "In Floyd's Cycle-Finding Algorithm (Tortoise & Hare), where slow moves 1 step and fast moves 2 steps, what is the maximum number of steps fast takes to meet slow after slow enters a cycle of length C?",
    codeSnippet: "Node *slow = head, *fast = head;\nwhile (fast && fast->next) {\n    slow = slow->next;\n    fast = fast->next->next;\n    if (slow == fast) return true; // Cycle detected\n}",
    options: [
      "At most C steps",
      "Exactly 2C steps",
      "O(C^2) steps",
      "O(log C) steps"
    ],
    correctAnswerIndex: 0,
    explanation: "Once both pointers are inside the loop of length C, the relative distance between fast and slow decreases by exactly (2 - 1) = 1 node on every iteration. Therefore, fast is guaranteed to catch slow in at most C steps.",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch1-10",
    question: "To find the k-th node from the end of a singly linked list in a single pass using two pointers, how many steps ahead must the 'first' pointer advance before the 'second' pointer starts moving?",
    codeSnippet: "Node* getNthFromEnd(Node* head, int k) {\n    Node *first = head, *second = head;\n    for (int i = 0; i < k; i++) {\n        if (!first) return nullptr;\n        first = first->next;\n    }\n    while (first) {\n        first = first->next;\n        second = second->next;\n    }\n    return second;\n}",
    options: [
      "exactly k steps",
      "exactly k - 1 steps",
      "exactly 2k steps",
      "exactly n - k steps"
    ],
    correctAnswerIndex: 0,
    explanation: "Advancing the 'first' pointer k steps creates a fixed gap of k nodes between 'first' and 'second'. When 'first' reaches nullptr (past the n-th node), 'second' will be positioned at node (n - k + 1), which is exactly the k-th node from the end.",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch1-11",
    question: "What happens if we execute the standard O(1) node deletion trick (copying next node's data) when 'ptr' is the last (tail) node of a singly linked list?",
    codeSnippet: "void deleteNodeWithoutHead(Node* ptr) {\n    ptr->data = ptr->next->data;\n    Node* temp = ptr->next;\n    ptr->next = ptr->next->next;\n    delete temp;\n}",
    options: [
      "Deletes the tail node cleanly in O(1)",
      "Triggers undefined behavior / Segmentation fault due to dereferencing NULL (ptr->next->data)",
      "Converts the list into a circular linked list",
      "Leaves the list unmodified"
    ],
    correctAnswerIndex: 1,
    explanation: "The O(1) deletion technique works by overwriting ptr's payload with ptr->next->data. If ptr is the tail node, ptr->next is nullptr; attempting to evaluate ptr->next->data dereferences a null pointer, causing an immediate segmentation fault. Deleting the tail node fundamentally requires traversal from head.",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch1-12",
    question: "What is the tight asymptotic time complexity of the following nested loop construct?",
    codeSnippet: "void compute(int n) {\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j < n; j *= 2) {\n            printf(\"*\");\n        }\n    }\n}",
    options: [
      "Theta(n)",
      "Theta(n log n)",
      "Theta(n^2)",
      "Theta(log n)"
    ],
    correctAnswerIndex: 1,
    explanation: "The outer loop executes n times. The inner loop doubles j on each iteration (j = 1, 2, 4, 8, ...), running ceil(log2(n)) times for each outer pass. The total operations executed are n * log2(n) = Theta(n log n).",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch1-13",
    question: "When merging two sorted Singly Linked Lists of lengths m and n into a single sorted list in-place, what is the minimum auxiliary space complexity achievable?",
    codeSnippet: "Node* mergeTwoLists(Node* l1, Node* l2) {\n    Node dummy(0);\n    Node* tail = &dummy;\n    while (l1 && l2) {\n        if (l1->data <= l2->data) { tail->next = l1; l1 = l1->next; }\n        else { tail->next = l2; l2 = l2->next; }\n        tail = tail->next;\n    }\n    tail->next = l1 ? l1 : l2;\n    return dummy.next;\n}",
    options: [
      "O(m + n)",
      "O(max(m, n))",
      "O(1)",
      "O(log(m + n))"
    ],
    correctAnswerIndex: 2,
    explanation: "By rearranging existing node pointers in-place using a dummy stack-allocated head tracker, no new heap nodes or auxiliary dynamic arrays are created. This achieves an optimal auxiliary space complexity of O(1).",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch1-14",
    question: "In a dynamic array (like std::vector in C++ or ArrayList in Java) that doubles its capacity upon becoming full, what is the amortized time complexity of n successive push_back insertions?",
    codeSnippet: "vector<int> v;\nfor (int i = 0; i < n; i++) {\n    v.push_back(i); // capacity doubles when full (1, 2, 4, 8, 16...)\n}",
    options: [
      "O(1) amortized per insertion, O(n) total time",
      "O(n) amortized per insertion, O(n^2) total time",
      "O(log n) amortized per insertion, O(n log n) total time",
      "O(n) worst-case on every single insertion"
    ],
    correctAnswerIndex: 0,
    explanation: "Although resizing takes O(k) copying work when capacity doubles at powers of 2, the sum of all copy operations is bounded by 1 + 2 + 4 + ... + n < 2n. Spreading 2n total operations across n insertions yields an average amortized cost of O(1) per push_back.",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch1-15",
    question: "Which of the following code snippets correctly swaps the 'next' and 'prev' pointers of a Doubly Linked List node during in-place reversal?",
    codeSnippet: "void swapPointers(DNode* curr) {\n    DNode* temp = curr->prev;\n    curr->prev = curr->next;\n    curr->next = temp;\n}",
    options: [
      "The snippet correctly swaps prev and next in O(1) using a temporary pointer",
      "It causes a cyclical dangling pointer bug",
      "It only swaps node data payloads, leaving pointers untouched",
      "It causes a null pointer dereference on curr->prev"
    ],
    correctAnswerIndex: 0,
    explanation: "Reversing a doubly linked list requires inverting both direction pointers for every node. Storing curr->prev in temp, assigning curr->prev = curr->next, and setting curr->next = temp correctly swaps the bidirectional links in O(1).",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch1-16",
    question: "What is the primary architectural benefit of utilizing a Sentinel (Dummy Head) node in linked list implementations?",
    codeSnippet: "Node* dummy = new Node(-1);\ndummy->next = head;\n// All insertions and deletions now operate on dummy->next",
    options: [
      "Improves search time from O(n) to O(log n)",
      "Eliminates edge-case conditional branches for insertions and deletions at index 0 (the head)",
      "Enables automatic thread safety and lock-free concurrency",
      "Reduces total heap memory fragmentation by 50%"
    ],
    correctAnswerIndex: 1,
    explanation: "A sentinel/dummy node ensures that every real element node (including the very first node) always has a valid non-null predecessor node, eliminating duplicate 'if (head == NULL)' or 'if (curr == head)' edge-case boundary checks.",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch1-17",
    question: "In Floyd's Cycle Detection Algorithm, after slow and fast collide at meeting node M, slow is reset to head while fast remains at M. If both now advance at 1 node per step, where will they meet?",
    codeSnippet: "// Proof:\n// L1 = distance(head -> loop_entry)\n// L2 = distance(loop_entry -> meeting_point M)\n// C  = cycle length\n// 2*(L1 + L2) = L1 + k*C + L2  ==>  L1 = k*C - L2",
    options: [
      "At the tail-most node of the cycle",
      "Exactly at the entry (starting) node of the cycle",
      "At the exact midpoint of the cycle",
      "They will never collide again"
    ],
    correctAnswerIndex: 1,
    explanation: "By mathematical derivation, L1 = (k*C - L2). Advancing pointer 1 from head (covering L1) and pointer 2 from meeting point M (covering k*C - L2) at identical speed of 1 step/iteration means both pointers will traverse congruent distance and collide precisely at the loop entry node.",
    difficulty: "Hard"
  },
  {
    id: "q-cse205-ch1-18",
    question: "What is the exact asymptotic complexity Theta of the recurrence relation: T(n) = 2T(n/2) + n * log2(n), with base case T(1) = 1?",
    codeSnippet: "// Master Theorem extended form:\n// a = 2, b = 2  =>  n^(log_b a) = n^(log_2 2) = n^1 = n\n// f(n) = n * log^1(n)",
    options: [
      "Theta(n log n)",
      "Theta(n log^2 n)",
      "Theta(n^2)",
      "Theta(n^2 log n)"
    ],
    correctAnswerIndex: 1,
    explanation: "Here a = 2, b = 2, so n^(log_b a) = n^1 = n. The work function is f(n) = n * (log n)^k where k = 1. By Case 2 of the Master Theorem (when f(n) = Theta(n^(log_b a) * log^k n)), the overall complexity evaluates to T(n) = Theta(n^(log_b a) * log^(k+1) n) = Theta(n log^2 n).",
    difficulty: "Hard"
  },
  {
    id: "q-cse205-ch1-19",
    question: "An XOR Linked List compresses a Doubly Linked List by storing 'npx = (uintptr_t)prev ^ (uintptr_t)next' in each node. Given pointer to 'curr' and preceding node 'prev', how is pointer to 'next' computed?",
    codeSnippet: "struct XORNode {\n    int data;\n    uintptr_t npx; // bitwise XOR of prev and next pointers\n};\nXORNode* getNextNode(XORNode* curr, XORNode* prev) {\n    return /* expression here */;\n}",
    options: [
      "(XORNode*)((uintptr_t)prev ^ curr->npx)",
      "(XORNode*)((uintptr_t)prev & curr->npx)",
      "(XORNode*)((uintptr_t)prev | curr->npx)",
      "(XORNode*)(~(uintptr_t)prev)"
    ],
    correctAnswerIndex: 0,
    explanation: "Bitwise XOR possesses the identity property: if A ^ B = C, then A ^ C = B. Because npx = prev ^ next, computing (uintptr_t)prev ^ curr->npx expands to prev ^ (prev ^ next) = (prev ^ prev) ^ next = 0 ^ next = next.",
    difficulty: "Hard"
  },
  {
    id: "q-cse205-ch1-20",
    question: "In the K-Group Linked List Reversal algorithm (reversing every k consecutive nodes in-place), what is the optimal time and auxiliary space complexity achievable iteratively?",
    codeSnippet: "// Example with k = 3:\n// Input:  1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8\n// Output: 3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 7 -> 8 (residual 2 nodes untouched)",
    options: [
      "O(n) time and O(1) auxiliary space",
      "O(n log k) time and O(k) auxiliary space",
      "O(n^2) time and O(1) auxiliary space",
      "O(n) time and O(n) auxiliary space"
    ],
    correctAnswerIndex: 0,
    explanation: "An optimal iterative K-group reversal verifies k nodes exist in O(k), reverses those k nodes in-place using 3 pointers in O(k), and relinks boundaries without heap allocations or recursion. Each node is touched a constant number of times (at most 2), yielding O(n) time and strictly O(1) auxiliary memory.",
    difficulty: "Hard"
  }
];

const cse205Chapter2Questions: QuizQuestion[] = [
  {
    id: "q-cse205-ch2-01",
    question: "Which data structure is primarily utilized by compilers and runtime engines to evaluate arithmetic Postfix (Reverse Polish) expressions?",
    codeSnippet: "Input expression: '5 3 + 2 *' -> Output: 16",
    options: [
      "Queue (FIFO)",
      "Stack (LIFO)",
      "Binary Search Tree",
      "Hash Table"
    ],
    correctAnswerIndex: 1,
    explanation: "Postfix expressions are evaluated using a Stack. Operands are pushed onto the stack, and encountering an operator causes the top two operands to be popped, computed, and the result pushed back.",
    difficulty: "Easy"
  },
  {
    id: "q-cse205-ch2-02",
    question: "For a circular queue of fixed capacity N implemented using an array, what is the exact condition that signifies the queue is FULL when front and rear indices are used?",
    codeSnippet: "bool isQueueFull(int front, int rear, int N) {\n    return (/* condition here */);\n}",
    options: [
      "rear == N - 1",
      "(rear + 1) % N == front",
      "(front + 1) % N == rear",
      "rear == front"
    ],
    correctAnswerIndex: 1,
    explanation: "In a circular queue of capacity N, one slot is kept unoccupied to differentiate between full and empty conditions. The queue is full when incrementing 'rear' circularly lands on 'front': (rear + 1) % N == front.",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch2-03",
    question: "What is the maximum number of stack frames simultaneously resident in memory during recursive Fibonacci computation fib(n) without memoization?",
    codeSnippet: "int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}",
    options: [
      "O(1)",
      "O(n)",
      "O(2^n)",
      "O(n^2)"
    ],
    correctAnswerIndex: 1,
    explanation: "Although fib(n) performs O(2^n) total recursive calls, the call stack depth only grows to the maximum depth of the recursion tree, which is n. Thus, the auxiliary space on the call stack is O(n).",
    difficulty: "Medium"
  }
];

const cse205Chapter3Questions: QuizQuestion[] = [
  {
    id: "q-cse205-ch3-01",
    question: "If keys [20, 10, 30, 5, 15] are inserted into an initially empty Binary Search Tree (BST), what is the exact sequence printed by the Inorder traversal?",
    codeSnippet: "void inorder(TreeNode* root) {\n    if (!root) return;\n    inorder(root->left);\n    printf(\"%d \", root->val);\n    inorder(root->right);\n}",
    options: [
      "20 10 5 15 30",
      "5 10 15 20 30",
      "5 15 10 30 20",
      "30 20 15 10 5"
    ],
    correctAnswerIndex: 1,
    explanation: "An Inorder traversal (Left -> Root -> Right) on any valid Binary Search Tree visits nodes in strictly ascending sorted order: 5 10 15 20 30.",
    difficulty: "Easy"
  },
  {
    id: "q-cse205-ch3-02",
    question: "In an AVL tree with root having balance factor +2 after an insertion into the left subtree's right child (LR imbalance), which rotation sequence restores height balance?",
    codeSnippet: "      A (+2)             A\n     /                  /\n    B (-1)    ==>      C\n     \\\n      C",
    options: [
      "Single Left rotation at A",
      "Single Right rotation at A",
      "Left rotation at B followed by Right rotation at A",
      "Right rotation at B followed by Left rotation at A"
    ],
    correctAnswerIndex: 2,
    explanation: "The Left-Right (LR) imbalance requires a double rotation: first perform a Left rotation on child B (converting it into a Left-Left imbalance), followed by a Right rotation on root A.",
    difficulty: "Hard"
  },
  {
    id: "q-cse205-ch3-03",
    question: "In a 0-indexed binary array representation of a Max-Heap, what are the indices of the left child, right child, and parent of an element at index 'i'?",
    codeSnippet: "int arr[100]; // Heap array representation",
    options: [
      "Left: 2i + 1, Right: 2i + 2, Parent: (i - 1) / 2",
      "Left: 2i, Right: 2i + 1, Parent: i / 2",
      "Left: i + 1, Right: i + 2, Parent: i - 1",
      "Left: 2i - 1, Right: 2i, Parent: (i + 1) / 2"
    ],
    correctAnswerIndex: 0,
    explanation: "In a 0-indexed binary heap array: Left child is at (2i + 1), Right child is at (2i + 2), and Parent is at floor((i - 1) / 2).",
    difficulty: "Medium"
  }
];

const cse205Chapter4Questions: QuizQuestion[] = [
  {
    id: "q-cse205-ch4-01",
    question: "What is the worst-case time complexity of standard QuickSort on an array of n elements when the first or last element is chosen as pivot on an already sorted array?",
    codeSnippet: "int partition(int arr[], int low, int high) {\n    int pivot = arr[high]; // Last element as pivot\n    // ...\n}",
    options: [
      "O(n log n)",
      "O(n)",
      "O(n^2)",
      "O(log n)"
    ],
    correctAnswerIndex: 2,
    explanation: "When picking the boundary element as pivot on an already sorted or reverse-sorted array, the partition produces highly unbalanced subproblems of size (n - 1) and 0. This results in the recurrence T(n) = T(n-1) + O(n), yielding O(n^2) worst-case time.",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch4-02",
    question: "Which of the following shortest-path algorithms correctly computes single-source shortest paths on graphs with non-negative edge weights using a Min-Priority Queue in O((V + E) log V) time?",
    codeSnippet: "priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;",
    options: [
      "Breadth-First Search (BFS)",
      "Dijkstra's Algorithm",
      "Floyd-Warshall Algorithm",
      "Kruskal's Algorithm"
    ],
    correctAnswerIndex: 1,
    explanation: "Dijkstra's algorithm greedily extracts the minimum-distance vertex using a min-heap priority queue. With adjacency lists, relaxation of all edges takes O(E log V) and vertex extractions take O(V log V), achieving O((V + E) log V) total time.",
    difficulty: "Medium"
  },
  {
    id: "q-cse205-ch4-03",
    question: "In Kruskal's Minimum Spanning Tree algorithm, which data structure is used to detect cycles in near-constant amortized time O(alpha(V)) per edge inspection?",
    codeSnippet: "struct DSU {\n    vector<int> parent, rank;\n    // find and union operations\n};",
    options: [
      "Disjoint Set Union (DSU) / Union-Find with path compression and union by rank",
      "Adjacency Matrix with Depth-First Search",
      "Binary Search Tree",
      "Segment Tree"
    ],
    correctAnswerIndex: 0,
    explanation: "Kruskal's algorithm sorts edges by weight and uses Disjoint Set Union (DSU) with Path Compression and Union by Rank to check if two vertices belong to the same component in O(alpha(V)) time, where alpha is the inverse Ackermann function.",
    difficulty: "Hard"
  }
];

// Helper to normalize chapter objects with dual compatibility properties
function createChapter(
  id: string,
  number: number,
  title: string,
  description: string,
  questions: QuizQuestion[] = []
): Chapter {
  return {
    id,
    number,
    chapterNumber: number,
    title,
    description,
    questions,
    quizQuestions: questions,
    hasContent: questions.length > 0
  };
}

export const cse205Subject: Subject = {
  id: "sub-cse205",
  code: "CSE205",
  name: "Data Structures and Algorithms",
  credits: 4,
  semester: 3,
  hasContent: true,
  description: "Core algorithms, data representations, asymptotic complexity, tree structures, and graph computations.",
  chapters: [
    createChapter(
      "chap-cse205-ch1",
      1,
      "Arrays, Linked Lists & Asymptotic Complexity",
      "Linear data structures, contiguous vs pointer-based memory models, 2D row/column-major addressing, Singly/Doubly/Circular linked list operations, and Big-O/Omega/Theta analysis.",
      cse205Chapter1Questions
    ),
    createChapter(
      "chap-cse205-ch2",
      2,
      "Stacks, Queues & Recursion Mechanics",
      "LIFO/FIFO abstractions, expression parsing (Infix, Postfix, Prefix conversions), Circular Queue implementations, Double-Ended Queues (Deque), and Call Stack mechanics.",
      cse205Chapter2Questions
    ),
    createChapter(
      "chap-cse205-ch3",
      3,
      "Non-Linear Structures: Trees, BSTs & Binary Heaps",
      "Tree terminology, binary tree traversals (DFS: Inorder, Preorder, Postorder; BFS: Level-Order), Binary Search Tree search/insert/delete, self-balancing AVL tree rotations, and Min/Max Heap invariants.",
      cse205Chapter3Questions
    ),
    createChapter(
      "chap-cse205-ch4",
      4,
      "Graphs, Sorting & Searching Algorithms",
      "Graph representations (Adjacency Matrix vs Adjacency List), Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra's Shortest Path, Minimum Spanning Trees (Prim and Kruskal), and comparison-based sorting (QuickSort, MergeSort, HeapSort).",
      cse205Chapter4Questions
    )
  ]
};

// ────────────────────────────────────────────────────────────────────────────
// MEC212 Applied Thermodynamics & Thermal Engineering — Question Bank
// ────────────────────────────────────────────────────────────────────────────

const mec212Chapter1Questions: QuizQuestion[] = [
  {
    id: "q-mec212-ch1-01",
    question: "Which fundamental law of thermodynamics provides the physical foundation and theoretical framework for temperature measurement and thermometer calibration?",
    options: [
      "Zeroth Law of Thermodynamics",
      "First Law of Thermodynamics",
      "Second Law of Thermodynamics",
      "Third Law of Thermodynamics"
    ],
    correctAnswerIndex: 0,
    explanation: "The Zeroth Law states that if two thermodynamic systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes temperature as an authentic, measurable state function.",
    difficulty: "Easy"
  },
  {
    id: "q-mec212-ch1-02",
    question: "Which of the following thermodynamic properties is an intensive property (independent of the total mass and extent of the system)?",
    options: [
      "Total Volume (V)",
      "Internal Energy (U)",
      "Enthalpy (H)",
      "Specific Volume (v)"
    ],
    correctAnswerIndex: 3,
    explanation: "Specific volume (v = V/m) is an intensive property because it is normalized per unit mass and does not depend on system size. Total volume, internal energy, and total enthalpy scale with mass and are extensive properties.",
    difficulty: "Easy"
  },
  {
    id: "q-mec212-ch1-03",
    question: "For a closed system undergoing a quasi-static reversible isothermal expansion of an ideal gas from (P1, V1) to (P2, V2), what is the analytical expression for boundary work done W?",
    options: [
      "W = P1 * V1 * ln(V2 / V1)",
      "W = (P1 * V1 - P2 * V2) / (gamma - 1)",
      "W = P * (V2 - V1)",
      "W = 0"
    ],
    correctAnswerIndex: 0,
    explanation: "In an isothermal process (T = const), P = mRT / V. Evaluating boundary work: W = ∫ P dV = mRT ∫ (dV/V) = mRT ln(V2/V1) = P1 V1 ln(V2/V1).",
    difficulty: "Easy"
  },
  {
    id: "q-mec212-ch1-04",
    question: "When wet steam or refrigerant flows through an insulated throttling valve or porous orifice, which thermodynamic property remains identical between inlet and exit states?",
    options: [
      "Specific Entropy (s)",
      "Temperature (T)",
      "Specific Enthalpy (h)",
      "Pressure (P)"
    ],
    correctAnswerIndex: 2,
    explanation: "An ideal throttling process is adiabatic (q = 0), performs no shaft work (w = 0), and exhibits negligible kinetic/potential energy changes. Applying the Steady Flow Energy Equation (SFEE) gives h1 = h2 (isenthalpic process).",
    difficulty: "Easy"
  },
  {
    id: "q-mec212-ch1-05",
    question: "A reversible Carnot heat engine operates between a thermal source reservoir at 600 K and a sink reservoir at 300 K. What is its maximum theoretical thermal efficiency?",
    options: [
      "25%",
      "50%",
      "66.7%",
      "75%"
    ],
    correctAnswerIndex: 1,
    explanation: "The Carnot efficiency limit is given by eta = 1 - (T_L / T_H) = 1 - (300 / 600) = 1 - 0.5 = 0.50 (or 50%).",
    difficulty: "Easy"
  },
  {
    id: "q-mec212-ch1-06",
    question: "At the thermodynamic Critical Point of pure water (Pc = 22.064 MPa, Tc = 373.95 °C), what is the magnitude of the latent heat of vaporization (h_fg)?",
    options: [
      "2257 kJ/kg",
      "334 kJ/kg",
      "0 kJ/kg",
      "Infinity"
    ],
    correctAnswerIndex: 2,
    explanation: "At the critical point, the saturated liquid state and saturated dry vapor state merge seamlessly with identical specific volumes and enthalpies (hf = hg). Hence, the latent heat of vaporization h_fg = hg - hf = 0 kJ/kg.",
    difficulty: "Easy"
  },
  {
    id: "q-mec212-ch1-07",
    question: "Superheated steam enters an adiabatic steam turbine at h1 = 3200 kJ/kg with velocity V1 = 50 m/s, and exhausts at h2 = 2400 kJ/kg with velocity V2 = 100 m/s. Neglecting potential energy, what is the turbine power output per unit mass flow rate?",
    codeSnippet: "// Steady Flow Energy Equation (SFEE):\n// h1 + V1^2/2000 + q = h2 + V2^2/2000 + w  (where q = 0)",
    options: [
      "796.25 kJ/kg",
      "800.00 kJ/kg",
      "803.75 kJ/kg",
      "850.00 kJ/kg"
    ],
    correctAnswerIndex: 0,
    explanation: "Applying SFEE: w = (h1 - h2) + (V1^2 - V2^2)/2000 = (3200 - 2400) + (50^2 - 100^2)/2000 = 800 + (2500 - 10000)/2000 = 800 - 3.75 = 796.25 kJ/kg.",
    difficulty: "Medium"
  },
  {
    id: "q-mec212-ch1-08",
    question: "In a closed system polytropic expansion with index n = 1.3 and gas adiabatic index gamma = 1.4, boundary work is measured as W = 100 kJ. What is the total heat transfer Q during this process?",
    codeSnippet: "// Polytropic Heat Equation:\n// Q = [(gamma - n) / (gamma - 1)] * W",
    options: [
      "15 kJ",
      "25 kJ",
      "35 kJ",
      "50 kJ"
    ],
    correctAnswerIndex: 1,
    explanation: "The relation between polytropic heat and work is Q = [(gamma - n) / (gamma - 1)] * W = [(1.4 - 1.3) / (1.4 - 1.0)] * 100 = (0.1 / 0.4) * 100 = 0.25 * 100 = 25 kJ.",
    difficulty: "Medium"
  },
  {
    id: "q-mec212-ch1-09",
    question: "A proposed heat engine cycle receives 1000 kJ of heat from a reservoir at 500 K, rejects 600 kJ to a sink at 300 K, and produces 400 kJ of net work. According to the Clausius Inequality, how is this cycle classified?",
    codeSnippet: "// Clausius Cyclic Integral:\n// Integral = Q_in / T_H - Q_out / T_L = 1000/500 - 600/300",
    options: [
      "Reversible Cycle (Integral = 0)",
      "Irreversible Real Cycle (Integral < 0)",
      "Impossible Violation of 2nd Law (Integral > 0)",
      "Perpetual Motion Machine of 1st Kind"
    ],
    correctAnswerIndex: 0,
    explanation: "Evaluating cyclic integral: Integral(dQ/T) = Q_in/T_H - Q_out/T_L = 1000/500 - 600/300 = 2 - 2 = 0. Because the integral equals zero exactly, the proposed cycle is completely reversible.",
    difficulty: "Medium"
  },
  {
    id: "q-mec212-ch1-10",
    question: "At 10 bar pressure, saturated water enthalpy is hf = 762.8 kJ/kg and latent heat is hfg = 2015.3 kJ/kg. What is the specific enthalpy of wet steam possessing a dryness fraction x = 0.85?",
    codeSnippet: "// Enthalpy of wet steam: h = hf + x * hfg",
    options: [
      "2345.8 kJ/kg",
      "2475.8 kJ/kg",
      "2572.1 kJ/kg",
      "2778.1 kJ/kg"
    ],
    correctAnswerIndex: 1,
    explanation: "h = hf + x * hfg = 762.8 + (0.85 * 2015.3) = 762.8 + 1713.005 = 2475.81 kJ/kg.",
    difficulty: "Medium"
  },
  {
    id: "q-mec212-ch1-11",
    question: "A heat transfer of Q = 1200 kJ takes place directly from a thermal source at T1 = 600 K to a thermal sink at T2 = 300 K. What is the total entropy generation of the universe?",
    codeSnippet: "// Delta S_univ = Delta S_source + Delta S_sink = (-Q/T1) + (+Q/T2)",
    options: [
      "0 kJ/K",
      "+2 kJ/K",
      "+4 kJ/K",
      "-2 kJ/K"
    ],
    correctAnswerIndex: 1,
    explanation: "Delta S_source = -1200 / 600 = -2 kJ/K. Delta S_sink = +1200 / 300 = +4 kJ/K. S_gen = Delta S_univ = -2 + 4 = +2 kJ/K. Positive entropy generation confirms internal/external irreversibility.",
    difficulty: "Medium"
  },
  {
    id: "q-mec212-ch1-12",
    question: "For a steady-flow open compressor compressing an ideal gas from pressure P1 to P2, which compression process path achieves the minimum shaft work input?",
    codeSnippet: "// Open system reversible shaft work: w_rev = - integral(v dP)",
    options: [
      "Isentropic compression (P * v^gamma = C)",
      "Polytropic compression (P * v^n = C, where 1 < n < gamma)",
      "Isothermal compression (P * v = C)",
      "Isobaric compression (P = C)"
    ],
    correctAnswerIndex: 2,
    explanation: "Steady-flow work is given by w = -∫ v dP, representing the area to the left of the process curve on a P-v diagram. The isothermal process curve has the flattest trajectory, encompassing the minimal area against the pressure axis.",
    difficulty: "Medium"
  },
  {
    id: "q-mec212-ch1-13",
    question: "A reversible Carnot refrigerator operating between temperatures TL and TH has COP_ref = 4.0. If the exact same machine is operated as a Heat Pump between the same reservoirs, what is COP_HP?",
    options: [
      "3.0",
      "4.0",
      "5.0",
      "0.25"
    ],
    correctAnswerIndex: 2,
    explanation: "From first-principles thermodynamics: COP_HP = QH / W = (QL + W) / W = (QL / W) + 1 = COP_ref + 1. Therefore: COP_HP = 4.0 + 1 = 5.0.",
    difficulty: "Medium"
  },
  {
    id: "q-mec212-ch1-14",
    question: "An insulated rigid container is partitioned into two halves. One half holds an ideal gas at (P1, T1) and the second is evacuated. The partition ruptures and the gas expands freely into the vacuum. What are final T2 and work W?",
    options: [
      "T2 = T1, W = 0",
      "T2 < T1, W = P1 * V1",
      "T2 > T1, W = 0",
      "T2 = 0 K, W = m * cv * T1"
    ],
    correctAnswerIndex: 0,
    explanation: "In free unresisted expansion into vacuum, resisting force is zero (W = 0). The insulated container implies Q = 0. By the 1st Law, Delta U = Q - W = 0. For an ideal gas where u = f(T), Delta U = 0 implies T2 = T1.",
    difficulty: "Medium"
  },
  {
    id: "q-mec212-ch1-15",
    question: "According to the Gouy-Stodola Theorem, how is the destroyed exergy (irreversibility I) related to total entropy generation (S_gen) at ambient dead-state temperature T0?",
    options: [
      "I = S_gen / T0",
      "I = T0 * S_gen",
      "I = T0 / S_gen^2",
      "I = Delta H - T0 * S_gen"
    ],
    correctAnswerIndex: 1,
    explanation: "The Gouy-Stodola theorem states that the rate of available work loss (irreversibility or exergy destroyed) is directly proportional to entropy generation: I = T0 * S_gen, where T0 is ambient temperature in Kelvin.",
    difficulty: "Medium"
  },
  {
    id: "q-mec212-ch1-16",
    question: "The Joule-Thomson coefficient is defined as mu_JT = (dT/dP)_h. What physical phenomenon occurs when throttling a gas in the region where mu_JT > 0?",
    options: [
      "The gas heats up upon throttling",
      "The gas cools down upon throttling",
      "No temperature change is observed",
      "The gas solidifies instantly"
    ],
    correctAnswerIndex: 1,
    explanation: "Throttling always involves a pressure drop (dP < 0). When mu_JT = dT/dP > 0, the resulting temperature differential dT = mu_JT * dP < 0. Thus, a positive Joule-Thomson coefficient corresponds to throttling cooling (inside the inversion curve).",
    difficulty: "Medium"
  },
  {
    id: "q-mec212-ch1-17",
    question: "An ideal gas with gas constant R and temperature-dependent specific heat cp(T) = a + b*T undergoes a reversible adiabatic expansion from (T1, P1) to (T2, P2). What is the exact relation between (T, P)?",
    codeSnippet: "// Tds Entropy Relation:\n// ds = (cp/T) dT - (R/P) dP = 0\n// int[(a/T + b) dT] = int[R/P dP]",
    options: [
      "a * ln(T2/T1) + b * (T2 - T1) = R * ln(P2/P1)",
      "a * (T2 - T1) + (b/2) * (T2^2 - T1^2) = R * ln(P2/P1)",
      "(a/b) * ln(T2/T1) = R * (P2 - P1)",
      "(T2/T1)^((a+b)/R) = P2/P1"
    ],
    correctAnswerIndex: 0,
    explanation: "Using ds = (cp/T) dT - (R/P) dP = 0 for isentropic processes: ∫ (a/T + b) dT = ∫ (R/P) dP => a ln(T2/T1) + b(T2 - T1) = R ln(P2/P1).",
    difficulty: "Hard"
  },
  {
    id: "q-mec212-ch1-18",
    question: "Two identical finite bodies of constant heat capacity C are initially at temperatures T1 and T2 (T1 > T2). If a reversible engine extracts work until both reach common equilibrium Tf, what are Tf and maximum work W_max?",
    codeSnippet: "// Reversibility: Delta S_total = C * ln(Tf/T1) + C * ln(Tf/T2) = 0\n// Tf = sqrt(T1 * T2)",
    options: [
      "Tf = (T1 + T2)/2,  W_max = C * (T1 + T2 - 2*sqrt(T1*T2))",
      "Tf = sqrt(T1 * T2),  W_max = C * (T1 + T2 - 2*sqrt(T1*T2))",
      "Tf = sqrt(T1 * T2),  W_max = C * (T1 - T2)",
      "Tf = (2*T1*T2)/(T1 + T2),  W_max = C * sqrt(T1*T2)"
    ],
    correctAnswerIndex: 1,
    explanation: "For maximum work, Delta S_univ = 0 => C ln(Tf/T1) + C ln(Tf/T2) = 0 => Tf^2 = T1 * T2 => Tf = sqrt(T1 * T2). W_max = Q1 - Q2 = C(T1 - Tf) - C(Tf - T2) = C(T1 + T2 - 2*Tf) = C(T1 + T2 - 2*sqrt(T1*T2)).",
    difficulty: "Hard"
  },
  {
    id: "q-mec212-ch1-19",
    question: "Using the Maxwell thermodynamic relation (ds/dv)_T = (dP/dT)_v, derive the Clapeyron phase equilibrium equation for liquid-vapor phase transition at saturation temperature Tsat with latent heat hfg and volume change vfg.",
    codeSnippet: "// Phase Change: ds = s_g - s_f = hfg / Tsat\n// (ds/dv)_T = (s_g - s_f) / (v_g - v_f) = (dP/dT)_sat",
    options: [
      "(dP/dT)_sat = hfg / (Tsat * vfg)",
      "(dP/dT)_sat = (Tsat * hfg) / vfg",
      "(dP/dT)_sat = vfg / (Tsat * hfg)",
      "(dP/dT)_sat = hfg / (R * Tsat^2)"
    ],
    correctAnswerIndex: 0,
    explanation: "During two-phase coexistence at constant T and P: (ds/dv)_T = (sg - sf) / (vg - vf) = (hfg / Tsat) / vfg. Equating this to the Maxwell relation (dP/dT)_v yields the exact Clapeyron equation: (dP/dT)_sat = hfg / (Tsat * vfg).",
    difficulty: "Hard"
  },
  {
    id: "q-mec212-ch1-20",
    question: "In a convergent-divergent de Laval steam nozzle operating under choked sonic flow at the throat (Mach number M = 1), what is the critical throat pressure ratio P*/P0 for superheated steam with isentropic exponent k = 1.3?",
    codeSnippet: "// Critical Pressure Ratio Equation:\n// P* / P0 = [2 / (k + 1)]^(k / (k - 1))  for k = 1.3",
    options: [
      "P* / P0 = [2 / (k+1)]^(k/(k-1)) ≈ 0.546",
      "P* / P0 = [(k+1) / 2]^(k/(k-1)) ≈ 0.582",
      "P* / P0 = [2 / (k+1)]^((k-1)/k) ≈ 0.528",
      "P* / P0 = (1 / k)^(k/(k-1)) ≈ 0.450"
    ],
    correctAnswerIndex: 0,
    explanation: "From 1D isentropic gas dynamics, stagnation temperature is T0/T = 1 + [(k-1)/2] M^2. At sonic throat M = 1, T*/T0 = 2 / (k+1). Using isentropic pressure relation: P*/P0 = (T*/T0)^(k/(k-1)) = [2/(k+1)]^(k/(k-1)). For superheated steam with k = 1.3: P*/P0 = (2/2.3)^(1.3/0.3) ≈ 0.5457 ≈ 0.546.",
    difficulty: "Hard"
  }
];

export const mec212Subject: Subject = {
  id: "sub-mec212",
  code: "MEC212",
  name: "Thermodynamics & Applied Thermal Engineering",
  credits: 4,
  semester: 3,
  hasContent: true,
  description: "Classical and statistical thermodynamics, availability and exergy analysis, pure substance phase changes, gas power cycles, and steam power generation.",
  chapters: [
    createChapter(
      "chap-mec212-ch1",
      1,
      "First & Second Laws of Thermodynamics, Pure Substances & State Equations",
      "Thermodynamic systems, boundary work, Steady Flow Energy Equation (SFEE), Clausius inequality, entropy generation, exergy analysis, and pure substance P-v-T surfaces.",
      mec212Chapter1Questions
    ),
    createChapter(
      "chap-mec212-ch2",
      2,
      "Gas Power Cycles & Internal Combustion Engines",
      "Air standard Otto, Diesel, Dual, and Stirling cycles, mean effective pressure (MEP), valve timing diagrams, and IC engine performance metrics.",
      []
    ),
    createChapter(
      "chap-mec212-ch3",
      3,
      "Vapor Power Cycles & Steam Generators",
      "Rankine cycle with reheat and regeneration, supercritical boilers (Benson, Lamont), steam turbine staging, condenser vacuum efficiency, and cooling towers.",
      []
    ),
    createChapter(
      "chap-mec212-ch4",
      4,
      "Refrigeration, Psychrometrics & Gas Turbine Systems",
      "Vapor compression refrigeration systems (VCRS), COP analysis, psychrometric chart & HVAC air conditioning processes, open/closed Brayton cycles with intercooling.",
      []
    )
  ]
};


// ────────────────────────────────────────────────────────────────────────────
// Common B.Tech Foundation Year 1 (Shared Across Engineering Disciplines)
// ────────────────────────────────────────────────────────────────────────────

export const commonBTechYear1: AcademicYear = {
  year: 1,
  label: "Year 1 - Engineering Foundation & Basic Sciences",
  semesters: ["Semester 1 (Autumn)", "Semester 2 (Spring)"],
  hasContent: false,
  subjects: [
    {
      id: "sub-cse101",
      code: "CSE101",
      name: "Computer Programming (C / Python)",
      credits: 4,
      semester: 1,
      hasContent: false,
      chapters: []
    },
    {
      id: "sub-mth165",
      code: "MTH165",
      name: "Mathematics for Engineers - I",
      credits: 4,
      semester: 1,
      hasContent: false,
      chapters: []
    },
    {
      id: "sub-phy110",
      code: "PHY110",
      name: "Engineering Physics",
      credits: 4,
      semester: 1,
      hasContent: false,
      chapters: []
    },
    {
      id: "sub-cse111",
      code: "CSE111",
      name: "Internet & Basic Web Technologies",
      credits: 3,
      semester: 2,
      hasContent: false,
      chapters: []
    },
    {
      id: "sub-mth166",
      code: "MTH166",
      name: "Mathematics for Engineers - II",
      credits: 4,
      semester: 2,
      hasContent: false,
      chapters: []
    },
    {
      id: "sub-ece131",
      code: "ECE131",
      name: "Basic Electrical and Electronics Engineering",
      credits: 4,
      semester: 2,
      hasContent: false,
      chapters: []
    }
  ]
};

// ────────────────────────────────────────────────────────────────────────────
// 8 B.Tech Engineering Specializations under "Engineering & Technology"
// ────────────────────────────────────────────────────────────────────────────

// 1. Computer Science & Engineering (CSE)
export const btechCseBranch: SpecializationBranch = {
  id: "branch-btech-cse",
  code: "CSE",
  name: "Computer Science & Engineering (CSE)",
  shortName: "CSE",
  degreeCode: "B.Tech",
  facultyDomain: "Engineering & Technology",
  description: "Comprehensive software engineering, systems design, computational theory, and algorithm engineering.",
  hasContent: true,
  academicYears: [
    commonBTechYear1,
    {
      year: 2,
      label: "Year 2 - Core Computing, Data Structures & Systems",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      hasContent: true,
      subjects: [
        cse205Subject,
        {
          id: "sub-cse316",
          code: "CSE316",
          name: "Operating Systems",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse202",
          code: "CSE202",
          name: "Object Oriented Programming (C++)",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-mth401",
          code: "MTH401",
          name: "Discrete Mathematics",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse211",
          code: "CSE211",
          name: "Computer Organization and Architecture",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 3,
      label: "Year 3 - Advanced Algorithms, Databases & Networks",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-cse320",
          code: "CSE320",
          name: "Design and Analysis of Algorithms",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse310",
          code: "CSE310",
          name: "Database Management Systems",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse306",
          code: "CSE306",
          name: "Computer Networks",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse325",
          code: "CSE325",
          name: "Software Engineering & Agile Methodologies",
          credits: 3,
          semester: 6,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse408",
          code: "CSE408",
          name: "Theory of Computation & Automata",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Cloud Computing, AI & Capstone Projects",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-cse423",
          code: "CSE423",
          name: "Cloud Computing & DevOps",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse437",
          code: "CSE437",
          name: "Machine Learning & Neural Networks",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse412",
          code: "CSE412",
          name: "Information Security and Cyber Defense",
          credits: 3,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cap776",
          code: "CAP776",
          name: "Capstone Project & Industry Internship",
          credits: 12,
          semester: 8,
          hasContent: false,
          chapters: []
        }
      ]
    }
  ]
};
// Add backwards compatibility alias
btechCseBranch.years = btechCseBranch.academicYears;

// 2. Artificial Intelligence & Machine Learning (AI & ML)
export const btechAimlBranch: SpecializationBranch = {
  id: "branch-btech-aiml",
  code: "AI_ML",
  name: "Artificial Intelligence & Machine Learning (AI & ML)",
  shortName: "AI & ML",
  degreeCode: "B.Tech",
  facultyDomain: "Engineering & Technology",
  description: "Deep learning models, computer vision, natural language processing, LLMs, and agentic workflows.",
  hasContent: true,
  academicYears: [
    commonBTechYear1,
    {
      year: 2,
      label: "Year 2 - Mathematical Foundations & Data Structures",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      hasContent: true,
      subjects: [
        cse205Subject,
        {
          id: "sub-cse214",
          code: "CSE214",
          name: "Advanced Python for AI & Data Science",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-mth405",
          code: "MTH405",
          name: "Linear Algebra & Probability for Machine Learning",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse316-aiml",
          code: "CSE316",
          name: "Operating Systems",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 3,
      label: "Year 3 - Deep Learning, NLP & Computer Vision",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-cse343",
          code: "CSE343",
          name: "Deep Learning Architectures & PyTorch",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse344",
          code: "CSE344",
          name: "Natural Language Processing & LLMs",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse345",
          code: "CSE345",
          name: "Computer Vision & Image Processing",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse310-aiml",
          code: "CSE310",
          name: "Database Management & Vector DBs",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Generative AI, MLOps & Capstone",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-cse446",
          code: "CSE446",
          name: "Generative AI & Agentic Systems",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse448",
          code: "CSE448",
          name: "MLOps & Scalable AI Infrastructure",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cap776-aiml",
          code: "CAP776",
          name: "AI Capstone Project & Industry Internship",
          credits: 12,
          semester: 8,
          hasContent: false,
          chapters: []
        }
      ]
    }
  ]
};
btechAimlBranch.years = btechAimlBranch.academicYears;

// 3. Data Science
export const btechDataScienceBranch: SpecializationBranch = {
  id: "branch-btech-ds",
  code: "DATA_SCIENCE",
  name: "Data Science",
  shortName: "Data Science",
  degreeCode: "B.Tech",
  facultyDomain: "Engineering & Technology",
  description: "Statistical inference, big data analytics, distributed computing with Spark, and predictive modeling.",
  hasContent: true,
  academicYears: [
    commonBTechYear1,
    {
      year: 2,
      label: "Year 2 - Data Structures, Probability & R/Python",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      hasContent: true,
      subjects: [
        cse205Subject,
        {
          id: "sub-cse221",
          code: "CSE221",
          name: "Applied Statistics & Probability Modeling",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse222",
          code: "CSE222",
          name: "Data Wrangling & Exploratory Analysis",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 3,
      label: "Year 3 - Big Data Analytics & Distributed Systems",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-cse361",
          code: "CSE361",
          name: "Big Data Processing with Spark & Hadoop",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse310-ds",
          code: "CSE310",
          name: "Database Management & NoSQL Systems",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse363",
          code: "CSE363",
          name: "Data Visualization & BI Dashboards",
          credits: 3,
          semester: 6,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Predictive Modeling, AI & Capstone",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-cse465",
          code: "CSE465",
          name: "Predictive Analytics & Time Series",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cap776-ds",
          code: "CAP776",
          name: "Data Science Capstone & Internship",
          credits: 12,
          semester: 8,
          hasContent: false,
          chapters: []
        }
      ]
    }
  ]
};
btechDataScienceBranch.years = btechDataScienceBranch.academicYears;

// 4. Electronics & Communication Engineering (ECE)
export const btechEceBranch: SpecializationBranch = {
  id: "branch-btech-ece",
  code: "ECE",
  name: "Electronics & Communication Engineering (ECE)",
  shortName: "ECE",
  degreeCode: "B.Tech",
  facultyDomain: "Engineering & Technology",
  description: "Semiconductor devices, analog/digital communication, VLSI design, DSP, and embedded systems.",
  hasContent: false,
  academicYears: [
    commonBTechYear1,
    {
      year: 2,
      label: "Year 2 - Electronic Circuits & Signals",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-ece213",
          code: "ECE213",
          name: "Analog Electronics & Circuit Theory",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-ece216",
          code: "ECE216",
          name: "Digital Electronics & Logic Design",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-ece218",
          code: "ECE218",
          name: "Signals and Systems",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-ece220",
          code: "ECE220",
          name: "Electromagnetic Field Theory",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 3,
      label: "Year 3 - Microprocessors, DSP & Communication",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-ece310",
          code: "ECE310",
          name: "Microprocessors & Microcontrollers (ARM / 8051)",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-ece312",
          code: "ECE312",
          name: "Digital Signal Processing (DSP)",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-ece315",
          code: "ECE315",
          name: "Analog and Digital Communication Systems",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-ece318",
          code: "ECE318",
          name: "VLSI Design & Hardware Description Language",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Wireless Networks, IoT & Capstone",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-ece411",
          code: "ECE411",
          name: "Wireless & 5G Cellular Networks",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-ece422",
          code: "ECE422",
          name: "Embedded Systems & IoT Architectures",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cap776-ece",
          code: "CAP776",
          name: "ECE Capstone Project & Core Industry Internship",
          credits: 12,
          semester: 8,
          hasContent: false,
          chapters: []
        }
      ]
    }
  ]
};
btechEceBranch.years = btechEceBranch.academicYears;

// 5. Mechanical Engineering (ME)
export const btechMeBranch: SpecializationBranch = {
  id: "branch-btech-me",
  code: "ME",
  name: "Mechanical Engineering (ME)",
  shortName: "ME",
  degreeCode: "B.Tech",
  facultyDomain: "Engineering & Technology",
  description: "Thermal sciences, solid mechanics, manufacturing automation, robotics, and machine design.",
  hasContent: true,
  academicYears: [
    commonBTechYear1,
    {
      year: 2,
      label: "Year 2 - Thermodynamics & Mechanics of Solids",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      hasContent: true,
      subjects: [
        mec212Subject,
        {
          id: "sub-mec107",
          code: "MEC107",
          name: "Engineering Graphics & Computer-Aided Design",
          credits: 3,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-mec201",
          code: "MEC201",
          name: "Engineering Mechanics & Statics",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-mec215",
          code: "MEC215",
          name: "Strength of Materials & Solid Mechanics",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-mec220",
          code: "MEC220",
          name: "Fluid Mechanics & Hydraulic Machinery",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        }
      ]
    },

    {
      year: 3,
      label: "Year 3 - Kinematics, Manufacturing & Heat Transfer",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-mec301",
          code: "MEC301",
          name: "Kinematics and Dynamics of Machines",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-mec305",
          code: "MEC305",
          name: "Manufacturing Technology & CNC Machining",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-mec312",
          code: "MEC312",
          name: "Heat and Mass Transfer",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-mec320",
          code: "MEC320",
          name: "Design of Machine Elements",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Automobile, Robotics & Capstone",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-mec408",
          code: "MEC408",
          name: "Automobile Engineering & EV Powertrains",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-mec414",
          code: "MEC414",
          name: "Robotics & Industrial Automation",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cap776-me",
          code: "CAP776",
          name: "Mechanical Capstone Project",
          credits: 12,
          semester: 8,
          hasContent: false,
          chapters: []
        }
      ]
    }
  ]
};
btechMeBranch.years = btechMeBranch.academicYears;

// 6. Civil Engineering (CE)
export const btechCeBranch: SpecializationBranch = {
  id: "branch-btech-ce",
  code: "CE",
  name: "Civil Engineering (CE)",
  shortName: "CE",
  degreeCode: "B.Tech",
  facultyDomain: "Engineering & Technology",
  description: "Structural engineering, surveying, geomatics, concrete technology, and geotechnical analysis.",
  hasContent: false,
  academicYears: [
    commonBTechYear1,
    {
      year: 2,
      label: "Year 2 - Surveying & Structural Analysis",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-civ201",
          code: "CIV201",
          name: "Surveying and Geomatics",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-civ205",
          code: "CIV205",
          name: "Fluid Mechanics & Open Channel Hydraulics",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-civ210",
          code: "CIV210",
          name: "Structural Analysis - I",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-civ215",
          code: "CIV215",
          name: "Building Materials & Construction Technology",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 3,
      label: "Year 3 - Concrete Design, Geotech & Transportation",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-civ301",
          code: "CIV301",
          name: "Design of Concrete Structures (RCC)",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-civ305",
          code: "CIV305",
          name: "Geotechnical Engineering & Soil Mechanics",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-civ310",
          code: "CIV310",
          name: "Transportation Engineering & Highway Design",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-civ315",
          code: "CIV315",
          name: "Environmental Engineering & Water Supply",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Steel Design, BIM & Capstone",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-civ402",
          code: "CIV402",
          name: "Design of Steel Structures",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-civ418",
          code: "CIV418",
          name: "Construction Project Management & BIM",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cap776-ce",
          code: "CAP776",
          name: "Civil Engineering Capstone Project",
          credits: 12,
          semester: 8,
          hasContent: false,
          chapters: []
        }
      ]
    }
  ]
};
btechCeBranch.years = btechCeBranch.academicYears;

// 7. Aerospace Engineering
export const btechAerospaceBranch: SpecializationBranch = {
  id: "branch-btech-aero",
  code: "AEROSPACE",
  name: "Aerospace Engineering",
  shortName: "Aerospace",
  degreeCode: "B.Tech",
  facultyDomain: "Engineering & Technology",
  description: "Incompressible/supersonic aerodynamics, flight mechanics, propulsion systems, and orbital mechanics.",
  hasContent: false,
  academicYears: [
    commonBTechYear1,
    {
      year: 2,
      label: "Year 2 - Aerodynamics & Aircraft Structures",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-aer201",
          code: "AER201",
          name: "Aerodynamics - I (Incompressible Flow)",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-aer205",
          code: "AER205",
          name: "Aircraft Structures - I",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-aer210",
          code: "AER210",
          name: "Aerospace Materials & Metallurgy",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-aer215",
          code: "AER215",
          name: "Flight Mechanics & Aircraft Performance",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 3,
      label: "Year 3 - Compressible Flow, Propulsion & Spaceflight",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-aer301",
          code: "AER301",
          name: "Aerodynamics - II (Compressible & Supersonic Flow)",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-aer305",
          code: "AER305",
          name: "Aircraft Propulsion & Gas Turbines",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-aer310",
          code: "AER310",
          name: "Spaceflight Dynamics & Orbital Mechanics",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-aer315",
          code: "AER315",
          name: "Avionics & Flight Control Systems",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Rocket Propulsion, UAVs & Capstone",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-aer405",
          code: "AER405",
          name: "Rocket Propulsion & Missile Systems",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-aer412",
          code: "AER412",
          name: "UAV Design & Autonomous Flight Systems",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cap776-aero",
          code: "CAP776",
          name: "Aerospace Capstone & Flight Vehicle Design",
          credits: 12,
          semester: 8,
          hasContent: false,
          chapters: []
        }
      ]
    }
  ]
};
btechAerospaceBranch.years = btechAerospaceBranch.academicYears;

// 8. Biotechnology
export const btechBiotechBranch: SpecializationBranch = {
  id: "branch-btech-biotech",
  code: "BIOTECH",
  name: "Biotechnology",
  shortName: "Biotechnology",
  degreeCode: "B.Tech",
  facultyDomain: "Engineering & Technology",
  description: "Cell biology, microbiology, genetic engineering, bioprocess kinetics, and bioinformatics.",
  hasContent: false,
  academicYears: [
    {
      year: 1,
      label: "Year 1 - Biology, Chemistry & Basic Sciences",
      semesters: ["Semester 1 (Autumn)", "Semester 2 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-che110",
          code: "CHE110",
          name: "Engineering Chemistry",
          credits: 4,
          semester: 1,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-bty101",
          code: "BTY101",
          name: "Fundamentals of Cell Biology",
          credits: 4,
          semester: 1,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-mth165-bt",
          code: "MTH165",
          name: "Mathematics for Engineers - I",
          credits: 4,
          semester: 1,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-phy110-bt",
          code: "PHY110",
          name: "Engineering Physics",
          credits: 4,
          semester: 2,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cse101-bt",
          code: "CSE101",
          name: "Computer Programming (C / Python)",
          credits: 4,
          semester: 2,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 2,
      label: "Year 2 - Microbiology & Bioprocess Engineering",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-bty201",
          code: "BTY201",
          name: "Cell Biology and Genetics",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-bty205",
          code: "BTY205",
          name: "Microbiology and Microbial Technology",
          credits: 4,
          semester: 3,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-bty210",
          code: "BTY210",
          name: "Molecular Biology & Recombinant DNA",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-bty215",
          code: "BTY215",
          name: "Bioprocess Engineering Principles",
          credits: 4,
          semester: 4,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 3,
      label: "Year 3 - Genetic Engineering, Immunology & Bioinformatics",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-bty301",
          code: "BTY301",
          name: "Genetic Engineering & CRISPR Technology",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-bty305",
          code: "BTY305",
          name: "Immunology and Immunotechnology",
          credits: 4,
          semester: 5,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-bty310",
          code: "BTY310",
          name: "Bioinformatics & Computational Genomics",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-bty315",
          code: "BTY315",
          name: "Plant and Animal Biotechnology",
          credits: 4,
          semester: 6,
          hasContent: false,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Pharma Biotech, Bioethics & Capstone",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      hasContent: false,
      subjects: [
        {
          id: "sub-bty402",
          code: "BTY402",
          name: "Pharmaceutical & Medical Biotechnology",
          credits: 4,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-bty410",
          code: "BTY410",
          name: "Biosafety, Bioethics & IPR",
          credits: 3,
          semester: 7,
          hasContent: false,
          chapters: []
        },
        {
          id: "sub-cap776-bty",
          code: "CAP776",
          name: "Biotechnology Capstone Project",
          credits: 12,
          semester: 8,
          hasContent: false,
          chapters: []
        }
      ]
    }
  ]
};
btechBiotechBranch.years = btechBiotechBranch.academicYears;

// ────────────────────────────────────────────────────────────────────────────
// Tier 2: Degree Courses Under "Engineering & Technology"
// ────────────────────────────────────────────────────────────────────────────

export const btechDegreeCourse: DegreeCourse = {
  id: "degree-btech",
  code: "B.Tech",
  name: "Bachelor of Technology",
  facultyDomain: "Engineering & Technology",
  durationYears: 4,
  hasContent: true,
  specializations: [
    btechCseBranch,
    btechAimlBranch,
    btechDataScienceBranch,
    btechEceBranch,
    btechMeBranch,
    btechCeBranch,
    btechAerospaceBranch,
    btechBiotechBranch
  ]
};
btechDegreeCourse.programs = btechDegreeCourse.specializations;

export const mtechDegreeCourse: DegreeCourse = {
  id: "degree-mtech",
  code: "M.Tech",
  name: "Master of Technology",
  facultyDomain: "Engineering & Technology",
  durationYears: 2,
  hasContent: false,
  specializations: [
    {
      id: "branch-mtech-cse",
      code: "MTECH_CSE",
      name: "Computer Science & Engineering (M.Tech)",
      shortName: "CSE (M.Tech)",
      degreeCode: "M.Tech",
      facultyDomain: "Engineering & Technology",
      hasContent: false,
      academicYears: [
        {
          year: 1,
          label: "Year 1 - Advanced Systems & Research",
          semesters: ["Semester 1", "Semester 2"],
          hasContent: false,
          subjects: [
            {
              id: "sub-cse501",
              code: "CSE501",
              name: "Advanced Data Structures & Algorithms",
              credits: 4,
              semester: 1,
              hasContent: false,
              chapters: []
            }
          ]
        }
      ]
    }
  ]
};
mtechDegreeCourse.programs = mtechDegreeCourse.specializations;

// ────────────────────────────────────────────────────────────────────────────
// Tier 1: 6 Core Faculty Categories of LPU
// ────────────────────────────────────────────────────────────────────────────

// 1. Engineering & Technology
export const facultyEngineering: FacultyCategory = {
  id: "faculty-engineering",
  name: "Engineering & Technology",
  code: "FOET",
  tagline: "School of Computer Science & Engineering and School of Electronics & Mechanical",
  hasContent: true,
  degreeCourses: [btechDegreeCourse, mtechDegreeCourse]
};

// 2. Management & Business
export const facultyManagement: FacultyCategory = {
  id: "faculty-management",
  name: "Management & Business",
  code: "FOBM",
  tagline: "Mittal School of Business (Accredited by ACBSP USA)",
  hasContent: false,
  degreeCourses: [
    {
      id: "degree-mba",
      code: "MBA",
      name: "Master of Business Administration",
      facultyDomain: "Management & Business",
      durationYears: 2,
      hasContent: false,
      specializations: [
        {
          id: "branch-mba-marketing",
          code: "MBA_MKT",
          name: "MBA (Marketing & Sales)",
          shortName: "Marketing",
          degreeCode: "MBA",
          facultyDomain: "Management & Business",
          hasContent: false,
          academicYears: [
            {
              year: 1,
              label: "Year 1 - Core Business & Management Principles",
              semesters: ["Semester 1", "Semester 2"],
              hasContent: false,
              subjects: [
                {
                  id: "sub-mgt501",
                  code: "MGT501",
                  name: "Managerial Economics & Decision Making",
                  credits: 4,
                  semester: 1,
                  hasContent: false,
                  chapters: []
                },
                {
                  id: "sub-mkt502",
                  code: "MKT502",
                  name: "Marketing Management & Consumer Insights",
                  credits: 4,
                  semester: 1,
                  hasContent: false,
                  chapters: []
                }
              ]
            }
          ]
        },
        {
          id: "branch-mba-finance",
          code: "MBA_FIN",
          name: "MBA (Finance & FinTech)",
          shortName: "Finance",
          degreeCode: "MBA",
          facultyDomain: "Management & Business",
          hasContent: false,
          academicYears: []
        }
      ]
    },
    {
      id: "degree-bba",
      code: "BBA",
      name: "Bachelor of Business Administration",
      facultyDomain: "Management & Business",
      durationYears: 3,
      hasContent: false,
      specializations: [
        {
          id: "branch-bba-core",
          code: "BBA_CORE",
          name: "BBA (General & International Business)",
          shortName: "BBA",
          degreeCode: "BBA",
          facultyDomain: "Management & Business",
          hasContent: false,
          academicYears: []
        }
      ]
    }
  ]
};

// 3. Computer Applications & IT
export const facultyComputerApplications: FacultyCategory = {
  id: "faculty-ca-it",
  name: "Computer Applications & IT",
  code: "FOCA",
  tagline: "School of Computer Applications & Enterprise Software Development",
  hasContent: false,
  degreeCourses: [
    {
      id: "degree-bca",
      code: "BCA",
      name: "Bachelor of Computer Applications",
      facultyDomain: "Computer Applications & IT",
      durationYears: 3,
      hasContent: false,
      specializations: [
        {
          id: "branch-bca-core",
          code: "BCA_CORE",
          name: "BCA (Full Stack Software Development)",
          shortName: "BCA Core",
          degreeCode: "BCA",
          facultyDomain: "Computer Applications & IT",
          hasContent: false,
          academicYears: [
            {
              year: 1,
              label: "Year 1 - Programming Fundamentals",
              semesters: ["Semester 1", "Semester 2"],
              hasContent: false,
              subjects: [
                {
                  id: "sub-cap101",
                  code: "CAP101",
                  name: "Introduction to Information Technology",
                  credits: 4,
                  semester: 1,
                  hasContent: false,
                  chapters: []
                },
                {
                  id: "sub-cap102",
                  code: "CAP102",
                  name: "Problem Solving Using C",
                  credits: 4,
                  semester: 1,
                  hasContent: false,
                  chapters: []
                }
              ]
            }
          ]
        },
        {
          id: "branch-bca-cloud",
          code: "BCA_CLOUD",
          name: "BCA (Cloud Computing & Cyber Security)",
          shortName: "Cloud & Cyber",
          degreeCode: "BCA",
          facultyDomain: "Computer Applications & IT",
          hasContent: false,
          academicYears: []
        }
      ]
    },
    {
      id: "degree-mca",
      code: "MCA",
      name: "Master of Computer Applications",
      facultyDomain: "Computer Applications & IT",
      durationYears: 2,
      hasContent: false,
      specializations: [
        {
          id: "branch-mca-ai",
          code: "MCA_AI",
          name: "MCA (Artificial Intelligence & Big Data)",
          shortName: "MCA AI",
          degreeCode: "MCA",
          facultyDomain: "Computer Applications & IT",
          hasContent: false,
          academicYears: []
        }
      ]
    }
  ]
};

// 4. Sciences & Humanities
export const facultySciences: FacultyCategory = {
  id: "faculty-sciences",
  name: "Sciences & Humanities",
  code: "FOSH",
  tagline: "School of Chemical Engineering, Physical Sciences & Humanities",
  hasContent: false,
  degreeCourses: [
    {
      id: "degree-bsc",
      code: "B.Sc",
      name: "Bachelor of Science (Hons.)",
      facultyDomain: "Sciences & Humanities",
      durationYears: 3,
      hasContent: false,
      specializations: [
        {
          id: "branch-bsc-physics",
          code: "BSC_PHY",
          name: "B.Sc (Hons.) Physics",
          shortName: "Physics",
          degreeCode: "B.Sc",
          facultyDomain: "Sciences & Humanities",
          hasContent: false,
          academicYears: [
            {
              year: 1,
              label: "Year 1 - Classical Mechanics & Waves",
              semesters: ["Semester 1", "Semester 2"],
              hasContent: false,
              subjects: [
                {
                  id: "sub-phy101",
                  code: "PHY101",
                  name: "Mathematical Methods in Physics",
                  credits: 4,
                  semester: 1,
                  hasContent: false,
                  chapters: []
                }
              ]
            }
          ]
        },
        {
          id: "branch-bsc-maths",
          code: "BSC_MTH",
          name: "B.Sc (Hons.) Mathematics",
          shortName: "Mathematics",
          degreeCode: "B.Sc",
          facultyDomain: "Sciences & Humanities",
          hasContent: false,
          academicYears: []
        }
      ]
    },
    {
      id: "degree-msc",
      code: "M.Sc",
      name: "Master of Science",
      facultyDomain: "Sciences & Humanities",
      durationYears: 2,
      hasContent: false,
      specializations: [
        {
          id: "branch-msc-data",
          code: "MSC_DATA",
          name: "M.Sc (Data Analytics)",
          shortName: "M.Sc Data",
          degreeCode: "M.Sc",
          facultyDomain: "Sciences & Humanities",
          hasContent: false,
          academicYears: []
        }
      ]
    }
  ]
};

// 5. Law, Pharmacy & Design
export const facultyLawPharmacyDesign: FacultyCategory = {
  id: "faculty-lpd",
  name: "Law, Pharmacy & Design",
  code: "FOLPD",
  tagline: "School of Pharmaceutical Sciences, School of Law & School of Design",
  hasContent: false,
  degreeCourses: [
    {
      id: "degree-bpharm",
      code: "B.Pharm",
      name: "Bachelor of Pharmacy (PCI Approved)",
      facultyDomain: "Law, Pharmacy & Design",
      durationYears: 4,
      hasContent: false,
      specializations: [
        {
          id: "branch-bpharm-core",
          code: "BPHARM_CORE",
          name: "B.Pharmacy (Pharmaceutical Sciences)",
          shortName: "B.Pharm",
          degreeCode: "B.Pharm",
          facultyDomain: "Law, Pharmacy & Design",
          hasContent: false,
          academicYears: [
            {
              year: 1,
              label: "Year 1 - Human Anatomy & Pharmaceutical Analysis",
              semesters: ["Semester 1", "Semester 2"],
              hasContent: false,
              subjects: [
                {
                  id: "sub-phr101",
                  code: "PHR101",
                  name: "Human Anatomy and Physiology I",
                  credits: 4,
                  semester: 1,
                  hasContent: false,
                  chapters: []
                },
                {
                  id: "sub-phr103",
                  code: "PHR103",
                  name: "Pharmaceutical Analysis I",
                  credits: 4,
                  semester: 1,
                  hasContent: false,
                  chapters: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "degree-llb",
      code: "LL.B",
      name: "Bachelor of Laws (Bar Council Approved)",
      facultyDomain: "Law, Pharmacy & Design",
      durationYears: 3,
      hasContent: false,
      specializations: [
        {
          id: "branch-llb-core",
          code: "LLB_CORE",
          name: "LL.B (Constitutional & Corporate Law)",
          shortName: "LL.B",
          degreeCode: "LL.B",
          facultyDomain: "Law, Pharmacy & Design",
          hasContent: false,
          academicYears: []
        }
      ]
    },
    {
      id: "degree-bdes",
      code: "B.Des",
      name: "Bachelor of Design",
      facultyDomain: "Law, Pharmacy & Design",
      durationYears: 4,
      hasContent: false,
      specializations: [
        {
          id: "branch-bdes-ux",
          code: "BDES_UX",
          name: "B.Des (User Experience & Interaction Design)",
          shortName: "UX Design",
          degreeCode: "B.Des",
          facultyDomain: "Law, Pharmacy & Design",
          hasContent: false,
          academicYears: []
        }
      ]
    }
  ]
};

// 6. Doctoral Studies (Ph.D.)
export const facultyDoctoral: FacultyCategory = {
  id: "faculty-doctoral",
  name: "Doctoral Studies (Ph.D.)",
  code: "FODS",
  tagline: "Division of Research and Development — Advanced Doctoral Fellowships",
  hasContent: false,
  degreeCourses: [
    {
      id: "degree-phd",
      code: "Ph.D.",
      name: "Doctor of Philosophy",
      facultyDomain: "Doctoral Studies (Ph.D.)",
      durationYears: 4,
      hasContent: false,
      specializations: [
        {
          id: "branch-phd-cse",
          code: "PHD_CSE",
          name: "Ph.D. in Computer Science & Engineering",
          shortName: "Ph.D. (CSE)",
          degreeCode: "Ph.D.",
          facultyDomain: "Doctoral Studies (Ph.D.)",
          hasContent: false,
          academicYears: [
            {
              year: 1,
              label: "Year 1 - Doctoral Research Methodology & Literature Survey",
              semesters: ["Semester 1 (Coursework)", "Semester 2 (Proposal Defense)"],
              hasContent: false,
              subjects: [
                {
                  id: "sub-rm701",
                  code: "RM701",
                  name: "Research Methodology & Statistical Techniques",
                  credits: 4,
                  semester: 1,
                  hasContent: false,
                  chapters: []
                },
                {
                  id: "sub-rpe702",
                  code: "RPE702",
                  name: "Research and Publication Ethics (UGC-Mandated)",
                  credits: 2,
                  semester: 1,
                  hasContent: false,
                  chapters: []
                }
              ]
            }
          ]
        },
        {
          id: "branch-phd-mgmt",
          code: "PHD_MGMT",
          name: "Ph.D. in Management Studies",
          shortName: "Ph.D. (Management)",
          degreeCode: "Ph.D.",
          facultyDomain: "Doctoral Studies (Ph.D.)",
          hasContent: false,
          academicYears: []
        }
      ]
    }
  ]
};

// ────────────────────────────────────────────────────────────────────────────
// Root University Hierarchy Store (All 6 Core Faculties)
// ────────────────────────────────────────────────────────────────────────────

export const universityCurriculumTaxonomy: UniversityTaxonomy = {
  institution: "Lovely Professional University (LPU)",
  version: "2026.1",
  faculties: [
    facultyEngineering,
    facultyManagement,
    facultyComputerApplications,
    facultySciences,
    facultyLawPharmacyDesign,
    facultyDoctoral
  ]
};

// ────────────────────────────────────────────────────────────────────────────
// Backwards Compatibility Aliases and Helper Accessors
// ────────────────────────────────────────────────────────────────────────────

export const lpuBTechCseProgram = btechCseBranch;
export const lpuBTechCseAimlProgram = btechAimlBranch;
export const lpuBTechCseDataScienceProgram = btechDataScienceBranch;

export const lpuCurriculumData = btechDegreeCourse;

/**
 * Retrieve all 6 faculties in the university taxonomy.
 */
export function getAllFaculties(): FacultyCategory[] {
  return universityCurriculumTaxonomy.faculties;
}

/**
 * Retrieve a faculty by its unique ID or Code (e.g. "faculty-engineering", "FOET").
 */
export function getFacultyById(facultyIdOrCode: string): FacultyCategory | undefined {
  const normalized = facultyIdOrCode.trim().toLowerCase();
  return universityCurriculumTaxonomy.faculties.find(
    (f) => f.id.toLowerCase() === normalized || f.code.toLowerCase() === normalized
  );
}

/**
 * Retrieve a faculty category by its strict Domain name.
 */
export function getFacultyByDomain(domain: FacultyDomain): FacultyCategory | undefined {
  return universityCurriculumTaxonomy.faculties.find((f) => f.name === domain);
}

/**
 * Find a specific specialization branch across all faculties and degree programs.
 */
export function findBranchById(branchId: string): SpecializationBranch | undefined {
  for (const faculty of universityCurriculumTaxonomy.faculties) {
    for (const degree of faculty.degreeCourses) {
      const branch = degree.specializations.find(
        (b) => b.id.toLowerCase() === branchId.toLowerCase() || b.code.toLowerCase() === branchId.toLowerCase()
      );
      if (branch) return branch;
    }
  }
  return undefined;
}

/**
 * Retrieve all subjects for a given academic year in a branch with safe fallback.
 */
export function getSubjectsByYear(
  year: AcademicYearNumber,
  branch: SpecializationBranch = btechCseBranch
): Subject[] {
  const years = branch.academicYears || branch.years || [];
  const targetYear = years.find((y) => y.year === year);
  return targetYear ? targetYear.subjects : [];
}

/**
 * Find a subject by its course code across a branch or the entire hierarchy.
 */
export function getSubjectByCode(
  code: string,
  branch: SpecializationBranch = btechCseBranch
): Subject | undefined {
  const normalized = code.trim().toUpperCase();
  const years = branch.academicYears || branch.years || [];
  for (const yr of years) {
    const found = yr.subjects.find((s) => s.code.toUpperCase() === normalized);
    if (found) return found;
  }
  return undefined;
}

/**
 * Retrieve a chapter and its questions by chapter ID.
 */
export function getChapterById(
  chapterId: string,
  branch: SpecializationBranch = btechCseBranch
): Chapter | undefined {
  const years = branch.academicYears || branch.years || [];
  for (const yr of years) {
    for (const sub of yr.subjects) {
      const chapter = sub.chapters.find((c) => c.id === chapterId);
      if (chapter) return chapter;
    }
  }
  return undefined;
}

export default universityCurriculumTaxonomy;
