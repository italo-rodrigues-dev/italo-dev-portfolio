const gameState = {
  level: 1,
  score: 0,
  mode: "dining",
  maxLevel: 5,
  currentOrder: "",
  currentTable: null,
  holdingOrder: false,
  completedOrders: 0,
  requiredOrders: 2,
  waiter: {
    x: 84,
    y: 275,
    speed: 3
  },
  keys: new Set(),
  tables: [],
  dialogTimers: []
};

const diningScene = document.getElementById("dining-scene");
const orderScene = document.getElementById("order-scene");
const floor = document.getElementById("restaurant-floor");
const tableLayer = document.getElementById("table-layer");
const waiter = document.getElementById("waiter");
const interactButton = document.getElementById("interact-button");
const kitchenCounter = document.getElementById("kitchen-counter");
const dialogBox = document.getElementById("dialog-box");
const orderInput = document.getElementById("order-input");
const typedOrder = document.getElementById("typed-order");
const typingFeedback = document.getElementById("typing-feedback");
const scoreValue = document.getElementById("score-value");
const levelValue = document.getElementById("level-value");
const ordersValue = document.getElementById("orders-value");

function getGameObjects() {
  return window.GameObjects || {
    dialogues: [{ greetings: ["Good evening!"], speech: ["Please take note."] }],
    orders: [{ options: ["a coffee"] }],
    reviews: [{ stars: 2, comments: ["Order recorded."] }]
  };
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getLevelOrderGoal(level) {
  return Math.min(level, gameState.maxLevel) * 2;
}

function createLevel(level) {
  tableLayer.innerHTML = "";
  gameState.tables = [];
  gameState.currentTable = null;
  gameState.holdingOrder = false;
  gameState.completedOrders = 0;
  gameState.requiredOrders = getLevelOrderGoal(level);

  const levelTables = createTablePlan(gameState.requiredOrders);

  levelTables.forEach((table) => {
    const tableElement = document.createElement("button");
    tableElement.className = "restaurant-table";
    tableElement.type = "button";
    tableElement.setAttribute("aria-label", "Table with customer");
    tableElement.innerHTML = `
      <span class="table-top"></span>
      <span class="chair chair-left"></span>
      <span class="chair chair-right"></span>
      <span class="customer ${table.customer ? "" : "hidden"}"></span>
      <span class="review-bubble hidden"></span>
    `;
    tableLayer.appendChild(tableElement);
    gameState.tables.push({ ...table, element: tableElement });
  });
  positionTables();
  updateHud();
  kitchenCounter.classList.remove("delivered");
}

function createTablePlan(amount) {
  const positions = [];
  const minDistance = 0.24;
  let attempts = 0;

  while (positions.length < amount && attempts < 800) {
    const candidate = {
      xRatio: 0.08 + Math.random() * 0.78,
      yRatio: 0.12 + Math.random() * 0.66
    };
    const hasSpace = positions.every((position) => {
      return Math.hypot(position.xRatio - candidate.xRatio, position.yRatio - candidate.yRatio) >= minDistance;
    });

    if (hasSpace) {
      positions.push(candidate);
    }
    attempts += 1;
  }

  while (positions.length < amount) {
    const index = positions.length;
    positions.push({
      xRatio: 0.06 + (index % 4) * 0.24,
      yRatio: 0.12 + Math.floor(index / 4) * 0.3
    });
  }

  return positions.map((position, index) => ({
    id: `table-${gameState.level}-${index + 1}`,
    ...position,
    customer: true,
    served: false,
    orderTaken: false,
    review: null
  }));
}

function positionTables() {
  const floorRect = floor.getBoundingClientRect();

  gameState.tables.forEach((table) => {
    const tableRect = table.element.getBoundingClientRect();
    table.x = clamp(floorRect.width * table.xRatio, 16, floorRect.width - tableRect.width - 16);
    table.y = clamp(floorRect.height * table.yRatio, 16, floorRect.height - tableRect.height - 16);
    table.element.style.left = `${table.x}px`;
    table.element.style.top = `${table.y}px`;
  });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function updateWaiterPosition() {
  const floorRect = floor.getBoundingClientRect();
  const waiterRect = waiter.getBoundingClientRect();
  const maxX = floorRect.width - waiterRect.width;
  const maxY = floorRect.height - waiterRect.height;

  gameState.waiter.x = clamp(gameState.waiter.x, 0, maxX);
  gameState.waiter.y = clamp(gameState.waiter.y, 0, maxY);

  waiter.style.transform = `translate(${gameState.waiter.x}px, ${gameState.waiter.y}px)`;
}

function distanceFromWaiter(targetX, targetY) {
  const waiterCenterX = gameState.waiter.x + 24;
  const waiterCenterY = gameState.waiter.y + 52;
  return Math.hypot(waiterCenterX - targetX, waiterCenterY - targetY);
}

function distanceFromWaiterToElement(element) {
  const floorRect = floor.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const targetX = elementRect.left - floorRect.left + elementRect.width / 2;
  const targetY = elementRect.top - floorRect.top + elementRect.height / 2;
  return distanceFromWaiter(targetX, targetY);
}

function getNearbyAction() {
  if (gameState.mode !== "dining") {
    return null;
  }

  if (gameState.holdingOrder) {
    const nearKitchen = distanceFromWaiterToElement(kitchenCounter) < 145;
    if (nearKitchen) {
      return {
        label: "Deliver to kitchen",
        action: deliverOrder
      };
    }
    return null;
  }

  const openTable = gameState.tables.find((table) => {
    if (table.orderTaken || table.served) {
      return false;
    }
    return distanceFromWaiter(table.x + 72, table.y + 52) < 95;
  });

  if (openTable) {
    return {
      label: "Take order",
      action: () => startOrder(openTable)
    };
  }
  return null;
}

function updateInteractButton() {
  const action = getNearbyAction();
  if (!action) {
    interactButton.classList.add("hidden");
    interactButton.onclick = null;
    return;
  }

  interactButton.textContent = action.label;
  interactButton.classList.remove("hidden");
  interactButton.onclick = action.action;
}

function gameLoop() {
  if (gameState.mode === "dining") {
    if (gameState.keys.has("arrowup") || gameState.keys.has("w")) {
      gameState.waiter.y -= gameState.waiter.speed;
    }
    if (gameState.keys.has("arrowdown") || gameState.keys.has("s")) {
      gameState.waiter.y += gameState.waiter.speed;
    }
    if (gameState.keys.has("arrowleft") || gameState.keys.has("a")) {
      gameState.waiter.x -= gameState.waiter.speed;
    }
    if (gameState.keys.has("arrowright") || gameState.keys.has("d")) {
      gameState.waiter.x += gameState.waiter.speed;
    }

    updateWaiterPosition();
    updateInteractButton();
  }
  requestAnimationFrame(gameLoop);
}

function renderDialogLine(line) {
  const row = document.createElement("p");
  row.textContent = line;
  dialogBox.appendChild(row);

  while (dialogBox.children.length > 3) {
    dialogBox.removeChild(dialogBox.firstElementChild);
  }
}

function rollDialog(orderText) {
  gameState.dialogTimers.forEach((timer) => window.clearTimeout(timer));
  gameState.dialogTimers = [];

  const gameObjects = getGameObjects();
  const customerLines = gameObjects.dialogues[0];
  const lines = [
    `Customer: ${pickRandom(customerLines.greetings)}`,
    pickRandom(customerLines.speech),
    `Order: ${orderText}`
  ];
  dialogBox.innerHTML = "";

  lines.forEach((line, index) => {
    const timer = window.setTimeout(() => renderDialogLine(line), index * 900);
    gameState.dialogTimers.push(timer);
  });
}

function startOrder(table) {
  gameState.mode = "ordering";
  gameState.keys.clear();
  gameState.currentTable = table;
  gameState.currentOrder = pickRandom(getGameObjects().orders[0].options);
  table.orderTaken = true;
  interactButton.classList.add("hidden");
  interactButton.onclick = null;
  diningScene.classList.add("hidden");
  orderScene.classList.remove("hidden");
  typedOrder.textContent = "";
  orderInput.value = "";
  typingFeedback.textContent = "Type the order exactly as shown.";
  rollDialog(gameState.currentOrder);
  window.setTimeout(() => orderInput.focus(), 120);
}

function finishOrder() {
  gameState.mode = "dining";
  gameState.holdingOrder = true;
  gameState.score += 100;
  orderScene.classList.add("hidden");
  diningScene.classList.remove("hidden");
  typingFeedback.textContent = "Order recorded.";
  updateHud();
  updateInteractButton();
}

function deliverOrder() {
  if (!gameState.currentTable) {
    return;
  }

  gameState.currentTable.served = true;
  gameState.holdingOrder = false;
  gameState.completedOrders += 1;
  gameState.score += 150;
  kitchenCounter.classList.add("delivered");
  interactButton.classList.add("hidden");
  interactButton.onclick = null;
  updateHud();
  scheduleCustomerReview(gameState.currentTable);
  gameState.currentTable = null;

  if (gameState.completedOrders >= gameState.requiredOrders) {
    window.setTimeout(advanceLevel, 1800);
  }
}

function scheduleCustomerReview(table) {
  const customer = table.element.querySelector(".customer");
  const reviewBubble = table.element.querySelector(".review-bubble");
  const review = pickRandom(getGameObjects().reviews);
  const comment = pickRandom(review.comments);
  table.review = { stars: review.stars, comment };

  window.setTimeout(() => {
    customer.classList.add("leaving");
    reviewBubble.textContent = `${"★".repeat(review.stars)} ${comment}`;
    reviewBubble.classList.remove("hidden");
  }, 900);

  window.setTimeout(() => {
    customer.classList.add("hidden");
  }, 1800);
}

function advanceLevel() {
  if (gameState.level >= gameState.maxLevel) {
    typingFeedback.textContent = "All levels are complete.";
    return;
  }

  gameState.level += 1;
  gameState.waiter.x = 84;
  gameState.waiter.y = 275;
  createLevel(gameState.level);
  updateWaiterPosition();
  updateInteractButton();
}

function updateHud() {
  levelValue.textContent = gameState.level;
  scoreValue.textContent = gameState.score;
  ordersValue.textContent = `${gameState.completedOrders}/${gameState.requiredOrders}`;
}

function handleTyping() {
  const typed = orderInput.value.toLowerCase();
  const expected = gameState.currentOrder.toLowerCase();
  typedOrder.textContent = orderInput.value;

  if (!expected.startsWith(typed)) {
    typingFeedback.textContent = "Oops, check the note before the customer complains.";
    return;
  }

  typingFeedback.textContent = "Keep typing...";
  if (typed === expected) {
    finishOrder();
  }
}

function initGame() {
  createLevel(gameState.level);
  updateWaiterPosition();
  updateInteractButton();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", () => {
  positionTables();
  updateWaiterPosition();
});

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
    if (gameState.mode !== "dining" || event.target === orderInput) {
      return;
    }
    event.preventDefault();
    gameState.keys.add(key);
  }
});

window.addEventListener("keyup", (event) => {
  gameState.keys.delete(event.key.toLowerCase());
});

orderInput.addEventListener("input", handleTyping);

window.addEventListener("load", initGame);