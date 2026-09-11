import {
  Course,
  Program,
  AcademicYear,
  Subject,
  Chapter,
  QuizQuestion,
  AcademicYearNumber
} from "@/types/curriculum";

export * from "@/types/curriculum";

/**
 * ============================================================
 * LPU B.Tech CSE Curriculum Data Structure
 * Realistic Subject Codes & Pre-populated Practice Quiz Banks
 * ============================================================
 */

export const lpuBTechCseProgram: Program = {
  id: "prog-btech-cse-core",
  name: "B.Tech Computer Science and Engineering",
  specialization: "Core",
  years: [
    {
      year: 1,
      label: "Year 1 - Foundation & Basic Sciences",
      semesters: ["Semester 1 (Autumn)", "Semester 2 (Spring)"],
      subjects: [
        {
          id: "sub-cse101",
          code: "CSE101",
          name: "Computer Programming (C / Python)",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-mth165",
          code: "MTH165",
          name: "Mathematics for Engineers - I",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-phy110",
          code: "PHY110",
          name: "Engineering Physics",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse111",
          code: "CSE111",
          name: "Internet & Basic Web Technologies",
          credits: 3,
          chapters: []
        },
        {
          id: "sub-mth166",
          code: "MTH166",
          name: "Mathematics for Engineers - II",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-ece131",
          code: "ECE131",
          name: "Basic Electrical and Electronics Engineering",
          credits: 4,
          chapters: []
        }
      ]
    },
    {
      year: 2,
      label: "Year 2 - Core Computing, Data Structures & Systems",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      subjects: [
        {
          id: "sub-cse205",
          code: "CSE205",
          name: "Data Structures and Algorithms",
          credits: 4,
          chapters: [
            {
              id: "chap-cse205-ch1",
              chapterNumber: 1,
              title: "Arrays, Linked Lists & Asymptotic Complexity",
              description: "Linear data structures, contiguous vs pointer-based memory models, 2D row/column-major addressing, Singly/Doubly/Circular linked list operations, and Big-O/Omega/Theta analysis.",
              quizQuestions: [
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
                  explanation: "In contiguous memory allocation, array elements are stored contiguously in physical RAM. The address offset from the base address is the 0-based index multiplied by the data type's byte size (Size). Thus: Address(arr[i]) = Base + (i * Size).",
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
              ]
            },
            {
              id: "chap-cse205-ch2",
              chapterNumber: 2,
              title: "Stacks, Queues & Recursion Mechanics",
              description: "LIFO/FIFO abstractions, expression parsing (Infix, Postfix, Prefix conversions), Circular Queue implementations, Double-Ended Queues (Deque), and Call Stack mechanics.",
              quizQuestions: [
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
              ]
            },
            {
              id: "chap-cse205-ch3",
              chapterNumber: 3,
              title: "Non-Linear Structures: Trees, BSTs & Binary Heaps",
              description: "Tree terminology, binary tree traversals (DFS: Inorder, Preorder, Postorder; BFS: Level-Order), Binary Search Tree search/insert/delete, self-balancing AVL tree rotations, and Min/Max Heap invariants.",
              quizQuestions: [
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
              ]
            },
            {
              id: "chap-cse205-ch4",
              chapterNumber: 4,
              title: "Graphs, Sorting & Searching Algorithms",
              description: "Graph representations (Adjacency Matrix vs Adjacency List), Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra's Shortest Path, Minimum Spanning Trees (Prim and Kruskal), and comparison-based sorting (QuickSort, MergeSort, HeapSort).",
              quizQuestions: [
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
              ]
            }
          ]
        },
        {
          id: "sub-cse316",
          code: "CSE316",
          name: "Operating Systems",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse202",
          code: "CSE202",
          name: "Object Oriented Programming (C++)",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-mth401",
          code: "MTH401",
          name: "Discrete Mathematics",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse211",
          code: "CSE211",
          name: "Computer Organization and Architecture",
          credits: 4,
          chapters: []
        }
      ]
    },
    {
      year: 3,
      label: "Year 3 - Advanced Algorithms, Databases & Networks",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      subjects: [
        {
          id: "sub-cse320",
          code: "CSE320",
          name: "Design and Analysis of Algorithms",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse310",
          code: "CSE310",
          name: "Database Management Systems",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse306",
          code: "CSE306",
          name: "Computer Networks",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse325",
          code: "CSE325",
          name: "Software Engineering & Agile Methodologies",
          credits: 3,
          chapters: []
        },
        {
          id: "sub-cse408",
          code: "CSE408",
          name: "Theory of Computation & Automata",
          credits: 4,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Cloud Computing, AI & Capstone Projects",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      subjects: [
        {
          id: "sub-cse423",
          code: "CSE423",
          name: "Cloud Computing & DevOps",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse437",
          code: "CSE437",
          name: "Machine Learning & Neural Networks",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse412",
          code: "CSE412",
          name: "Information Security and Cyber Defense",
          credits: 3,
          chapters: []
        },
        {
          id: "sub-cap776",
          code: "CAP776",
          name: "Capstone Project & Industry Internship",
          credits: 12,
          chapters: []
        }
      ]
    }
  ]
};

export const lpuBTechCseAimlProgram: Program = {
  id: "prog-btech-cse-aiml",
  name: "B.Tech CSE (AI & Machine Learning)",
  specialization: "AI & Machine Learning",
  years: [
    lpuBTechCseProgram.years[0], // Common First Year Foundation
    {
      year: 2,
      label: "Year 2 - Mathematical Foundations & Data Structures",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      subjects: [
        lpuBTechCseProgram.years[1].subjects[0], // CSE205 Data Structures
        {
          id: "sub-cse214",
          code: "CSE214",
          name: "Advanced Python for AI & Data Science",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-mth405",
          code: "MTH405",
          name: "Linear Algebra & Probability for Machine Learning",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse316-aiml",
          code: "CSE316",
          name: "Operating Systems",
          credits: 4,
          chapters: []
        }
      ]
    },
    {
      year: 3,
      label: "Year 3 - Deep Learning, NLP & Computer Vision",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      subjects: [
        {
          id: "sub-cse343",
          code: "CSE343",
          name: "Deep Learning Architectures & PyTorch",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse344",
          code: "CSE344",
          name: "Natural Language Processing & LLMs",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse345",
          code: "CSE345",
          name: "Computer Vision & Image Processing",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse310-aiml",
          code: "CSE310",
          name: "Database Management & Vector DBs",
          credits: 4,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Generative AI, MLOps & Capstone",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      subjects: [
        {
          id: "sub-cse446",
          code: "CSE446",
          name: "Generative AI & Agentic Systems",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse448",
          code: "CSE448",
          name: "MLOps & Scalable AI Infrastructure",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cap776-aiml",
          code: "CAP776",
          name: "AI Capstone Project & Industry Internship",
          credits: 12,
          chapters: []
        }
      ]
    }
  ]
};

export const lpuBTechCseCyberProgram: Program = {
  id: "prog-btech-cse-cyber",
  name: "B.Tech CSE (Cyber Security & Defense)",
  specialization: "Cyber Security",
  years: [
    lpuBTechCseProgram.years[0],
    {
      year: 2,
      label: "Year 2 - Network Fundamentals & Secure Coding",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      subjects: [
        lpuBTechCseProgram.years[1].subjects[0], // CSE205
        {
          id: "sub-cse231",
          code: "CSE231",
          name: "Fundamentals of Cyber Security & Cryptography",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse316-cyb",
          code: "CSE316",
          name: "Operating Systems & Linux Kernel Security",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse211-cyb",
          code: "CSE211",
          name: "Computer Organization and Architecture",
          credits: 4,
          chapters: []
        }
      ]
    },
    {
      year: 3,
      label: "Year 3 - Ethical Hacking, SOC & Threat Hunting",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      subjects: [
        {
          id: "sub-cse351",
          code: "CSE351",
          name: "Ethical Hacking & Penetration Testing",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse352",
          code: "CSE352",
          name: "Web Application & API Security",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse306-cyb",
          code: "CSE306",
          name: "Computer Networks & Defense Protocols",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse354",
          code: "CSE354",
          name: "Digital Forensics & Incident Response",
          credits: 4,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Cloud Security, Zero Trust & Capstone",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      subjects: [
        {
          id: "sub-cse455",
          code: "CSE455",
          name: "Cloud Security & Zero Trust Architecture",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse456",
          code: "CSE456",
          name: "Malware Analysis & Reverse Engineering",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cap776-cyb",
          code: "CAP776",
          name: "Cyber Security Capstone Project",
          credits: 12,
          chapters: []
        }
      ]
    }
  ]
};

export const lpuBTechCseDataScienceProgram: Program = {
  id: "prog-btech-cse-ds",
  name: "B.Tech CSE (Data Science)",
  specialization: "Data Science",
  years: [
    lpuBTechCseProgram.years[0],
    {
      year: 2,
      label: "Year 2 - Data Structures, Probability & R/Python",
      semesters: ["Semester 3 (Autumn)", "Semester 4 (Spring)"],
      subjects: [
        lpuBTechCseProgram.years[1].subjects[0],
        {
          id: "sub-cse221",
          code: "CSE221",
          name: "Applied Statistics & Probability Modeling",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse222",
          code: "CSE222",
          name: "Data Wrangling & Exploratory Analysis",
          credits: 4,
          chapters: []
        }
      ]
    },
    {
      year: 3,
      label: "Year 3 - Big Data Analytics & Distributed Systems",
      semesters: ["Semester 5 (Autumn)", "Semester 6 (Spring)"],
      subjects: [
        {
          id: "sub-cse361",
          code: "CSE361",
          name: "Big Data Processing with Spark & Hadoop",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse310-ds",
          code: "CSE310",
          name: "Database Management & NoSQL Systems",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cse363",
          code: "CSE363",
          name: "Data Visualization & BI Dashboards",
          credits: 3,
          chapters: []
        }
      ]
    },
    {
      year: 4,
      label: "Year 4 - Predictive Modeling, AI & Capstone",
      semesters: ["Semester 7 (Autumn)", "Semester 8 (Spring)"],
      subjects: [
        {
          id: "sub-cse465",
          code: "CSE465",
          name: "Predictive Analytics & Time Series",
          credits: 4,
          chapters: []
        },
        {
          id: "sub-cap776-ds",
          code: "CAP776",
          name: "Data Science Capstone & Internship",
          credits: 12,
          chapters: []
        }
      ]
    }
  ]
};

/**
 * Top-level course structure for B.Tech Technical Degree
 */
export const lpuCurriculumData: Course = {
  id: "course-btech",
  name: "B.Tech",
  category: "Technical",
  programs: [
    lpuBTechCseProgram,
    lpuBTechCseAimlProgram,
    lpuBTechCseCyberProgram,
    lpuBTechCseDataScienceProgram
  ]
};

// ── Helper Accessor Functions ─────────────────────────────────

/**
 * Get all subjects for a specific academic year (1-4).
 */
export function getSubjectsByYear(
  year: AcademicYearNumber,
  program: Program = lpuBTechCseProgram
): Subject[] {
  const targetYear = program.years.find((y) => y.year === year);
  return targetYear ? targetYear.subjects : [];
}

/**
 * Retrieve a subject by its course code (e.g., "CSE205").
 */
export function getSubjectByCode(
  code: string,
  program: Program = lpuBTechCseProgram
): Subject | undefined {
  for (const yr of program.years) {
    const found = yr.subjects.find(
      (s) => s.code.toUpperCase() === code.toUpperCase()
    );
    if (found) return found;
  }
  return undefined;
}

/**
 * Retrieve a chapter and its questions by chapter ID.
 */
export function getChapterById(
  chapterId: string,
  program: Program = lpuBTechCseProgram
): Chapter | undefined {
  for (const yr of program.years) {
    for (const sub of yr.subjects) {
      const chapter = sub.chapters.find((c) => c.id === chapterId);
      if (chapter) return chapter;
    }
  }
  return undefined;
}

export default lpuCurriculumData;
