// ===========================
// SPEECH AND ORDER DATA
// ===========================
// This file contains customer dialogues, order options, and review comments.

// Use CTRL+F //obj:dialogues to update customer dialogue pools
// Use CTRL+F //obj:orders to update the order options array
// Use CTRL+F //obj:reviews to update the review object

//obj:dialogues
const dialogues = [
  {
    "greetings": [
      "Good evening!",
      "Hi waiter!",
      "How are you doing?",
      "Can you take this?",
      "I arrived hungry."
    ],
    "speech": [
      "I'll order quickly.",
      "Please write it down carefully.",
      "I want something simple today.",
      "If it's not too much trouble, I want the following.",
      "My table has already decided the order."
    ]
  }
];

//obj:orders
const orders = [
  {
    "options": [
      "Two grape juices and an empanada",
      "A coffee with milk and a coxinha",
      "Three cheese breads and an iced tea",
      "A lemonade and two ham sandwiches",
      "A carrot cake and a cappuccino"
    ]
  }
];

//obj:reviews
const reviews = [
  {
    "stars": 1,
    "comments": [
      "It needed more seasoning.",
      "The order arrived, but I almost lost my appetite.",
      "Service can be improved.",
      "It was a bit confusing.",
      "The order was right, but it wasn't fast."
    ]
  },
  {
    "stars": 2,
    "comments": [
      "Good service.",
      "I liked it, it was well organized.",
      "Correct order and pleasant atmosphere.",
      "They served me properly.",
      "I would order again."
    ]
  },
  {
    "stars": 3,
    "comments": [
      "Excellent service!",
      "Perfect notes and fast delivery.",
      "This waiter deserves applause.",
      "Very good, I'll become a loyal customer.",
      "Five-star service, even if it only counts as three."
    ]
  }
];

window.GameObjects = {
  dialogues,
  orders,
  reviews
};