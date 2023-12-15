async function createTodoItem(){
  let novoItem = {
    id: items.length + 1,
    descricao: document.getElementById('novoItem').value,
    completo: false
  }

  let response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    body: JSON.stringify({
        name: novoItem.descricao,
        owner:'Rafael'
    })
  })

  itemCriado = await response.json()

  adicionarItem(itemCriado)
}

async function loadTodoItems(){
  let response = await fetch('http://localhost:3000/api/todos')
  let todoItems = await response.json()

  todoItems.forEach(todoItem => {
    adicionarItem(todoItem)
  })
}

async function deleteTodoItems(id){
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE"
  })
}

async function atualizaTodoItems(id){
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PATCH"
  })
}

function marcarComoCompletado(item, completo) {
  item.completo = completo
  items[item.id - 1] = item
  localStorage.setItem('items', JSON.stringify(items))
}

function adicionarItem(novoItem) {
  console.log(novoItem)

  let itemsList = document.getElementById('lista')
  let itemElement = document.createElement('li')

  let itemText = document.createElement('p')
  itemText.innerText = novoItem.name

  if (novoItem.completo) {
    itemText.style.textDecoration = 'line-through'
  }

  let completarCheckbox = document.createElement('input')
  completarCheckbox.setAttribute('type', 'checkbox')
  completarCheckbox.checked = novoItem.done

  completarCheckbox.addEventListener('change', () => {
    if (completarCheckbox.checked) {
      itemText.style.textDecoration = 'line-through'
    } else {
      itemText.style.textDecoration = 'none'
    }

    marcarComoCompletado(novoItem, completarCheckbox.checked)
  })

  // Cria um elemento button para remover o item
  let removerButton = document.createElement('button')
  removerButton.innerText = 'Apagar'

  removerButton.addEventListener('click', () => {
    console.log(`Apagando item id: ${novoItem.id}`)
    deleteTodoItems(novoItem.id)
    itemElement.remove()
  })

  itemText.appendChild(completarCheckbox)
  itemText.appendChild(removerButton)
  itemElement.appendChild(itemText)
  itemsList.appendChild(itemElement)
}
