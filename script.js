/* script.js — Code2College — Function Arrangement: Intermediate
   Complete, standalone logic for the new project (no dependencies on prior repo).
   Uses: Bootstrap (modal), SortableJS (drag & drop), vanilla JS.
*/

// ------------------------------
// Globals & Config
// ------------------------------
let hintCount = 0;

const selectors = {
  // Challenge 1
  blocks1: "#blockContainer1",
  solution1: "#solutionContainer1",
  feedback1: "#feedback1",
  explanation1: "#explanation1",
  output1: "#output1",
  outputText1: "#outputText1",
  next1: "#next1",
  check1: "#check1",
  reset1: "#reset1",

  // Challenge 2
  blocks2: "#blockContainer2",
  solution2: "#solutionContainer2",
  feedback2: "#feedback2",
  explanation2: "#explanation2",
  output2: "#output2",
  outputText2: "#outputText2",
  prev2: "#prev2",
  check2: "#check2",
  reset2: "#reset2",
  complete2: "#complete2",

  // Screens
  challenge1: "#challenge1",
  challenge2: "#challenge2",
  completion: "#completion",

  // Hints & Modals
  hintBadge: "#hintCountBadge",
  termLinks: ".hint-link",
  termModal: "#termModal",
  termModalLabel: "#termModalLabel",
  termModalBody: "#termModalBody",
  termModalExample: "#termModalExample",
  restartAll: "#restartAll"
};

// Glossary / Hints content
const codingTerms = {
  "for": {
    title: "for loop",
    definition:
      "A control flow statement that repeats a block of code for each item in a sequence (e.g., range, list).",
    example: "for i in range(1, 4):\n    print(i)  # 1, 2, 3"
  },
  "range": {
    title: "range()",
    definition:
      "A built-in function that generates a sequence of integers, commonly used with for loops.",
    example: "for i in range(2, 6):\n    print(i)  # 2, 3, 4, 5"
  },
  "modulo": {
    title: "modulo (%)",
    definition:
      "The modulo operator returns the remainder of division. Useful for divisibility tests.",
    example: "if x % 2 == 0:\n    print('even')"
  },
  "guard": {
    title: "guard clause",
    definition:
      "A quick input check that returns early when arguments are invalid, keeping code simple and safe.",
    example: "def f(n):\n    if n < 0:\n        return None\n    # ... continue ..."
  },
  "accumulator": {
    title: "accumulator",
    definition:
      "A variable that collects or builds a result as you loop, such as a running total or product.",
    example: "total = 0\nfor x in values:\n    total += x"
  },
  "set": {
    title: "set",
    definition:
      "An unordered collection of unique items. Great for removing duplicates quickly.",
    example: "s = set([2, 2, 3])  # {2, 3}"
  },
  "add": {
    title: "set.add()",
    definition:
      "A method to insert a new item into a set. If the item exists, the set is unchanged.",
    example: "evens = set()\nevens.add(2)\nevens.add(2)  # still {2}"
  },
  "sorted": {
    title: "sorted()",
    definition:
      "A built-in function that returns a new sorted list from any iterable (set, list, etc.).",
    example: "sorted({3, 1, 2})  # [1, 2, 3]"
  }
};

// Content data (two challenges)
const challenges = [
  {
    id: 1,
    title: "Sum of Multiples",
    overview:
      "This function validates inputs, initialises a running total, loops over 1..n, filters by modulo, and returns the sum.",
    blocks: [
      {
        text: "def sum_of_multiples(n, k):",
        order: 1,
        explanation:
          "Defines a function named sum_of_multiples that takes two parameters: n and k."
      },
      {
        text: "if n < 0 or k <= 0:",
        order: 2,
        explanation:
          "Guard clause: invalid input should immediately return None."
      },
      {
        text: "    return None",
        order: 3,
        explanation:
          "Return a sentinel value indicating invalid input."
      },
      {
        text: "total = 0",
        order: 4,
        explanation:
          "Initialise the accumulator for the running total."
      },
      {
        text: "for i in range(1, n + 1):",
        order: 5,
        explanation:
          "Loop from 1 through n (inclusive)."
      },
      {
        text: "    if i % k == 0:",
        order: 6,
        explanation:
          "Use modulo to check if i is a multiple of k."
      },
      {
        text: "        total += i",
        order: 7,
        explanation:
          "Accumulate by adding multiples into total."
      },
      {
        text: "return total",
        order: 8,
        explanation:
          "Return the final computed total."
      }
    ]
  },
  {
    id: 2,
    title: "Unique Sorted Evens",
    overview:
      "This function builds a set to remove duplicates, filters even numbers, and returns a sorted list.",
    blocks: [
      {
        text: "def unique_sorted_evens(nums):",
        order: 1,
        explanation:
          "Defines a function that will operate on a list of integers."
      },
      {
        text: "evens = set()",
        order: 2,
        explanation:
          "A set keeps only unique values, perfect for deduplicating."
      },
      {
        text: "for n in nums:",
        order: 3,
        explanation:
          "Iterate over each item in the list."
      },
      {
        text: "    if n % 2 == 0:",
        order: 4,
        explanation:
          "Filter to keep only even numbers."
      },
      {
        text: "        evens.add(n)",
        order: 5,
        explanation:
          "Insert the even number into the set (duplicates ignored)."
      },
      {
        text: "return sorted(evens)",
        order: 6,
        explanation:
          "Convert the set back to a sorted list before returning."
      }
    ]
  }
];

// ------------------------------
// Utilities
// ------------------------------
function qs(sel, root = document) {
  return root.querySelector(sel);
}
function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}
function clearChildren(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}
function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
function incrementHintCount() {
  hintCount += 1;
  const badge = qs(selectors.hintBadge);
  if (badge) {
    badge.textContent = `${hintCount} Hints`;
  }
}
function show(el) {
  el.classList.remove("d-none");
}
function hide(el) {
  el.classList.add("d-none");
}
function setFeedback(container, type, message) {
  container.innerHTML = `
    <div class="alert alert-${type} mb-0" role="alert">
      ${message}
    </div>
  `;
}
function removeBlockStateClasses(el) {
  el.classList.remove("correct", "incorrect");
}

// ------------------------------
// Block Explanation Modal (dynamic)
// ------------------------------
let dynamicBlockModal = null;
function ensureBlockModal() {
  if (dynamicBlockModal) return dynamicBlockModal;

  const modalHtml = document.createElement("div");
  modalHtml.className = "modal fade";
  modalHtml.id = "blockExplainModal";
  modalHtml.tabIndex = -1;
  modalHtml.setAttribute("aria-hidden", "true");
  modalHtml.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Line explanation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <pre class="bg-body-tertiary p-2 rounded small"><code id="blockExplainCode"></code></pre>
          <p id="blockExplainText" class="mt-3 mb-0"></p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalHtml);
  dynamicBlockModal = new bootstrap.Modal(modalHtml);
  return dynamicBlockModal;
}

function showBlockExplanation(codeText, explanation) {
  const modal = ensureBlockModal();
  qs("#blockExplainCode").textContent = codeText;
  qs("#blockExplainText").textContent = explanation;
  modal.show();
  incrementHintCount();
}

// ------------------------------
// Create a draggable block element
// ------------------------------
function createBlockElement(block) {
  const wrapper = document.createElement("div");
  wrapper.className =
    "code-block border rounded p-2 mb-2 d-flex align-items-start justify-content-between gap-2";
  wrapper.dataset.order = String(block.order);
  wrapper.dataset.explanation = block.explanation;

  // Left: code text
  const codePre = document.createElement("pre");
  codePre.className = "m-0 flex-grow-1";
  const codeEl = document.createElement("code");
  codeEl.textContent = block.text;
  codePre.appendChild(codeEl);

  // Right: info icon
  const info = document.createElement("span");
  info.className = "block-info text-muted small ms-2";
  info.title = "Explain this line";
  info.style.cursor = "pointer";
  info.innerHTML = `<i class="far fa-question-circle"></i>`;
  info.addEventListener("click", (e) => {
    e.preventDefault();
    showBlockExplanation(block.text, block.explanation);
  });

  wrapper.appendChild(codePre);
  wrapper.appendChild(info);

  return wrapper;
}

// ------------------------------
// Challenge initialisation
// ------------------------------
function initializeChallenge(id) {
  const data = challenges.find((c) => c.id === id);
  if (!data) return;

  const blockContainer =
    id === 1 ? qs(selectors.blocks1) : qs(selectors.blocks2);
  const solutionContainer =
    id === 1 ? qs(selectors.solution1) : qs(selectors.solution2);
  const feedback =
    id === 1 ? qs(selectors.feedback1) : qs(selectors.feedback2);
  const explanation =
    id === 1 ? qs(selectors.explanation1) : qs(selectors.explanation2);
  const output =
    id === 1 ? qs(selectors.output1) : qs(selectors.output2);
  const nextOrCompleteBtn =
    id === 1 ? qs(selectors.next1) : qs(selectors.complete2);

  // Clear UI
  clearChildren(blockContainer);
  clearChildren(solutionContainer);
  feedback.innerHTML = "";
  hide(explanation);
  hide(output);
  if (nextOrCompleteBtn) nextOrCompleteBtn.disabled = true;

  // Build shuffled blocks
  const blocksCopy = data.blocks.map((b) => ({ ...b }));
  shuffleInPlace(blocksCopy);
  blocksCopy.forEach((blk) => blockContainer.appendChild(createBlockElement(blk)));

  // Wire SortableJS (one-time per container; but safe to re-create)
  const groupName = `challenge-${id}`;
  Sortable.create(blockContainer, {
    group: { name: groupName, pull: true, put: true },
    animation: 150,
    sort: true
  });
  Sortable.create(solutionContainer, {
    group: { name: groupName, pull: true, put: true },
    animation: 150,
    sort: true
  });
}

// ------------------------------
// Checking logic
// ------------------------------
function checkAnswer(id) {
  const data = challenges.find((c) => c.id === id);
  if (!data) return;

  const solutionContainer =
    id === 1 ? qs(selectors.solution1) : qs(selectors.solution2);
  const feedback =
    id === 1 ? qs(selectors.feedback1) : qs(selectors.feedback2);

  const blocks = qsa(".code-block", solutionContainer);
  // Remove prior state
  blocks.forEach(removeBlockStateClasses);

  if (blocks.length !== data.blocks.length) {
    setFeedback(
      feedback,
      "danger",
      "Please place all code blocks in the <strong>Your Solution</strong> area."
    );
    return;
  }

  let allCorrect = true;
  let firstWrong = null;

  blocks.forEach((el, idx) => {
    const expectedOrder = idx + 1; // 1-based in our data
    const actualOrder = parseInt(el.dataset.order, 10);
    if (actualOrder === expectedOrder) {
      el.classList.add("correct");
    } else {
      el.classList.add("incorrect");
      if (firstWrong == null) firstWrong = idx;
      allCorrect = false;
    }
  });

  if (!allCorrect) {
    const tip =
      id === 1
        ? "Initialise your running total first; check multiples inside the loop; return at the end."
        : "Use a set to remove duplicates, filter evens inside the loop, then sort at the end.";
    setFeedback(
      feedback,
      "warning",
      `Some lines are out of order. Focus on structure: ${tip}`
    );
    // Ensure the first incorrect is scrolled into view for usability
    if (firstWrong != null && blocks[firstWrong]) {
      blocks[firstWrong].scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  // If all correct:
  setFeedback(
    feedback,
    "success",
    "Nice! Your function is correctly assembled. Read the explanation below, then try the inputs."
  );
  displayExplanation(id, blocks);
  displayOutputPreview(id);
  // Enable next/complete
  if (id === 1) {
    qs(selectors.next1).disabled = false;
  } else {
    qs(selectors.complete2).disabled = false;
  }
}

function displayExplanation(id, solutionBlocks) {
  const data = challenges.find((c) => c.id === id);
  const explanation =
    id === 1 ? qs(selectors.explanation1) : qs(selectors.explanation2);

  const content = explanation.querySelector(".explanation-content");
  content.innerHTML = "";

  // Per-line explanation
  solutionBlocks.forEach((el) => {
    const code = el.querySelector("code")?.textContent || "";
    const expl = el.dataset.explanation || "";
    const item = document.createElement("div");
    item.className = "mb-2";
    item.innerHTML = `
      <pre class="bg-body-tertiary p-2 rounded small mb-1"><code>${escapeHtml(
        code
      )}</code></pre>
      <p class="mb-0">${escapeHtml(expl)}</p>
    `;
    content.appendChild(item);
  });

  // Overview
  const overview = document.createElement("div");
  overview.className = "mt-3";
  overview.innerHTML = `
    <strong>Function Overview:</strong>
    <p class="mb-0">${escapeHtml(data.overview)}</p>
  `;
  content.appendChild(overview);

  show(explanation);
}

function displayOutputPreview(id) {
  if (id === 1) {
    // Sum of Multiples
    const n = parseInt(qs("#nInput").value, 10);
    const k = parseInt(qs("#kInput").value, 10);
    const outWrap = qs(selectors.output1);
    const outText = qs(selectors.outputText1);

    let preview = "";
    if (Number.isNaN(n) || Number.isNaN(k)) {
      preview = "Invalid input (please enter integers).";
    } else if (n < 0 || k <= 0) {
      preview = "None";
    } else {
      let total = 0;
      const hits = [];
      for (let i = 1; i <= n; i++) {
        if (i % k === 0) {
          total += i;
          hits.push(i);
        }
      }
      preview =
        hits.length > 0
          ? `${hits.join(" + ")} = ${total}`
          : `No multiples of ${k} in 1..${n} (sum = 0)`;
    }

    outText.textContent = preview;
    show(outWrap);
  } else {
    // Unique Sorted Evens
    const txt = qs("#numsInput").value ?? "";
    const outWrap = qs(selectors.output2);
    const outText = qs(selectors.outputText2);

    // Parse comma-separated integers
    const parts = txt.split(/[,\s]+/).filter(Boolean);
    const nums = [];
    for (const p of parts) {
      const val = Number(p);
      if (!Number.isNaN(val) && Number.isFinite(val)) {
        nums.push(Math.trunc(val));
      }
    }
    const evens = new Set();
    nums.forEach((n) => {
      if (n % 2 === 0) evens.add(n);
    });
    const result = Array.from(evens);
    result.sort((a, b) => a - b);

    outText.textContent = JSON.stringify(result);
    show(outWrap);
  }
}

function resetChallenge(id) {
  initializeChallenge(id);
}

function showChallenge(id) {
  // Toggle visibility
  const c1 = qs(selectors.challenge1);
  const c2 = qs(selectors.challenge2);
  const completion = qs(selectors.completion);

  hide(c1);
  hide(c2);
  hide(completion);

  if (id === 1) {
    c1.classList.remove("d-none");
    c1.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (id === 2) {
    c2.classList.remove("d-none");
    c2.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (id === "complete") {
    completion.classList.remove("d-none");
    completion.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function completeAll() {
  // Show summary
  qs("#finalHintCount").textContent = hintCount.toString();
  showChallenge("complete");
}

function restartAll() {
  hintCount = 0;
  const badge = qs(selectors.hintBadge);
  if (badge) badge.textContent = "0 Hints";
  initializeChallenge(1);
  initializeChallenge(2);
  showChallenge(1);
}

// ------------------------------
// HTML escape
// ------------------------------
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// ------------------------------
// Event wiring
// ------------------------------
function wireEvents() {
  // Glossary links
  qsa(selectors.termLinks).forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const term = a.getAttribute("data-term");
      const data = codingTerms[term];
      if (!data) return;

      // Fill modal content
      qs(selectors.termModalLabel).textContent = data.title;
      qs(selectors.termModalBody).textContent = data.definition;
      qs(selectors.termModalExample).textContent = data.example;

      const modalEl = qs(selectors.termModal);
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
      incrementHintCount();
    });
  });

  // Challenge 1
  qs(selectors.check1).addEventListener("click", () => checkAnswer(1));
  qs(selectors.reset1).addEventListener("click", () => resetChallenge(1));
  qs(selectors.next1).addEventListener("click", () => showChallenge(2));

  // Challenge 2
  qs(selectors.prev2).addEventListener("click", () => showChallenge(1));
  qs(selectors.check2).addEventListener("click", () => checkAnswer(2));
  qs(selectors.reset2).addEventListener("click", () => resetChallenge(2));
  qs(selectors.complete2).addEventListener("click", completeAll);

  // Completion
  qs(selectors.restartAll).addEventListener("click", restartAll);

  // Optional: live update preview after success if inputs change
  const nInput = qs("#nInput");
  const kInput = qs("#kInput");
  if (nInput) nInput.addEventListener("input", () => displayOutputPreview(1));
  if (kInput) kInput.addEventListener("input", () => displayOutputPreview(1));
  const numsInput = qs("#numsInput");
  if (numsInput) numsInput.addEventListener("input", () => displayOutputPreview(2));
}

// ------------------------------
// Boot
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Initialise both challenges
  initializeChallenge(1);
  initializeChallenge(2);
  // Show challenge 1 by default
  showChallenge(1);
  // Wire all events
  wireEvents();
});
