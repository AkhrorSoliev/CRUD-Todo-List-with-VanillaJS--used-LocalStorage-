const createForm = document.getElementById('create-form')
const createInput = document.getElementById('input-create')
const todosUlList = document.getElementById('todos-ul-list')
const changeForm = document.getElementById('change-form')
const changeInput = document.getElementById('change-input')
const changeError = document.getElementById('change-error')
const changeErrorMain = document.getElementById('change-error-main')
const colseModal = document.getElementById('close-modal')

// modal
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
let indexForEdit = 0

const todos = JSON.parse(localStorage.getItem('list-todos'))
  ? JSON.parse(localStorage.getItem('list-todos'))
  : []

if (todos.length) {
  showTodos()
}

// show todos DOM
function showTodos() {
  todosUlList.innerHTML = ''
  todos.forEach((todo, i) => {
    todosUlList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${todo}
        <div class="button-div">
            <img onclick="editTodo(${i})" src="img/edit.svg" width="20" height="20" alt="edit image" />
            <img
              src="img/delete.svg"
              width="20"
              height="20"
              alt="delete image"
              onclick="deleteTodo(${i})"
            />
        </div>
       </li>
      `
  })
  noText()
}

// create todo
createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (createInput.value) {
    todos.push(createInput.value)
    setTodoLocal()
    showTodos()
    clearInput(createInput)
  } else {
    changeErrorMain.textContent = 'Enter some text...'
    setTimeout(() => {
      changeErrorMain.textContent = ''
    }, 5000)
  }
})

// clearInput
function clearInput(clear) {
  const input = clear
  input.value = ''
}

// set todo localeStorage
function setTodoLocal() {
  localStorage.setItem('list-todos', JSON.stringify(todos))
}

// edit todo
function editTodo(id) {
  indexForEdit = id
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

changeForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (changeInput.value) {
    todos.splice(indexForEdit, 1, changeInput.value)
    setTodoLocal()
    showTodos()
    close()
  } else {
    changeError.textContent = 'Enter text for change'
    setTimeout(() => {
      changeError.textContent = ''
    }, 5000)
  }
})

function deleteTodo(id) {
  todos.splice(id, 1)
  setTodoLocal()
  showTodos()
}

colseModal.addEventListener('click', () => {
  close()
})

overlay.addEventListener('click', () => {
  close()
})

function close() {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

function noText() {
  if (!todosUlList.childNodes.length) {
    const h3 = document.createElement('h3')
    h3.textContent = 'No Todos Yet :)'
    h3.style.cssText = `
      opacity: 0.5;
      text-align: center;
      margin-top: 50px;
      user-select: none;
    `
    todosUlList.appendChild(h3)
  }
}

noText()
