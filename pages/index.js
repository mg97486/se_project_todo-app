import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupwithForm from "../components/PopupwithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupwithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    newTodoValidator.resetValidation();

    const date = new Date(values.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const todoData = { name: values.name, date, id };

    const todoElement = generateTodo(todoData);
    section.addItem(todoElement);

    todoCounter.updateTotal(true);

    addTodoPopup.close();
    addTodoForm.reset();
  },
});

addTodoPopup.setEventListeners();

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", ({ type, increment }) => {
    if (type === "completed") {
      todoCounter.updateCompleted(increment);
    } else if (type === "total") {
      todoCounter.updateTotal(increment);
    }
  });
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
