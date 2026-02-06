(function () {
  var count = 0;
  var presents = [];

  var countDisplay = document.getElementById("count");
  var presentNameInput = document.getElementById("presentName");
  var presentListEl = document.getElementById("presentList");
  var emptyMessage = document.getElementById("emptyMessage");
  var incrementBtn = document.getElementById("incrementBtn");
  var decrementBtn = document.getElementById("decrementBtn");
  var resetBtn = document.getElementById("resetBtn");
  var addPresentBtn = document.getElementById("addPresentBtn");

  function updateCountDisplay() {
    countDisplay.textContent = count;
  }

  function renderPresentList() {
    presentListEl.innerHTML = "";

    if (presents.length === 0) {
      emptyMessage.style.display = "block";
      return;
    }

    emptyMessage.style.display = "none";

    for (var i = 0; i < presents.length; i++) {
      var li = document.createElement("li");

      var nameSpan = document.createElement("span");
      nameSpan.textContent = (i + 1) + ". " + presents[i];
      li.appendChild(nameSpan);

      var removeBtn = document.createElement("button");
      removeBtn.textContent = "x";
      removeBtn.className = "btn-remove";
      removeBtn.setAttribute("data-index", i);
      li.appendChild(removeBtn);

      presentListEl.appendChild(li);
    }
  }

  function addPresent(name) {
    presents.push(name);
    count = presents.length;
    updateCountDisplay();
    renderPresentList();
  }

  function removePresent(index) {
    presents.splice(index, 1);
    count = presents.length;
    updateCountDisplay();
    renderPresentList();
  }

  incrementBtn.addEventListener("click", function () {
    count++;
    updateCountDisplay();
  });

  decrementBtn.addEventListener("click", function () {
    if (count > 0) {
      count--;
      updateCountDisplay();
    }
  });

  resetBtn.addEventListener("click", function () {
    count = 0;
    presents = [];
    updateCountDisplay();
    renderPresentList();
  });

  addPresentBtn.addEventListener("click", function () {
    var name = presentNameInput.value.trim();
    if (name !== "") {
      addPresent(name);
      presentNameInput.value = "";
      presentNameInput.focus();
    }
  });

  presentNameInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      var name = presentNameInput.value.trim();
      if (name !== "") {
        addPresent(name);
        presentNameInput.value = "";
      }
    }
  });

  presentListEl.addEventListener("click", function (e) {
    if (e.target.className === "btn-remove") {
      var index = parseInt(e.target.getAttribute("data-index"), 10);
      removePresent(index);
    }
  });

  updateCountDisplay();
  renderPresentList();
})();
