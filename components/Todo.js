class Todo {
  constructor(data, templateSelector, handleCheck) {
    this._data = data;
    this._templateElement = document.querySelector(templateSelector);
    this._handleCheck = handleCheck;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      const wasCompleted = this._data.completed;
      this._data.completed = !this._data.completed;

      this._handleCheck({
        type: "completed",
        increment: !wasCompleted,
      });
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      if (this._data.completed) {
        this._handleCheck({ type: "completed", increment: false });
      }

      this._handleCheck({ type: "total", increment: false });

      this._todoElement.remove();
    });
  }
  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._data.name;
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
