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
    console.log(await response.json())
    adicionarItem(novoItem)
}

async function loadTodoItems(){
    let response = await fetch('http://localhost:3000/api/todos')
    let todoItems = await response.json()

    todoItems.forEach(todoItem => {
        let item = {
            descricao: todoItem.name,
            completo: todoItem.done
        }

        adicionarItem(item)
    })
}

async function deleteTodoItems(id){
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE"
  })
}




function marcarComoCompletado(item, completo) {
  item.completo = completo
  items[item.id - 1] = item
  localStorage.setItem('items', JSON.stringify(items))
}

function adicionarItem(novoItem) {
  let itemsList = document.getElementById('lista')
  let itemElement = document.createElement('li')

  let itemText = document.createElement('p')
  itemText.innerText = novoItem.descricao

  if (novoItem.completo) {
    itemText.style.textDecoration = 'line-through'
  }

  let completarCheckbox = document.createElement('input')
  completarCheckbox.setAttribute('type', 'checkbox')
  completarCheckbox.checked = novoItem.completo

  completarCheckbox.addEventListener('change', () => {
    if (completarCheckbox.checked) {
      itemText.style.textDecoration = 'line-through'
    } else {
      itemText.style.textDecoration = 'none'
    }

    marcarComoCompletado(novoItem, completarCheckbox.checked)
  })

  itemText.appendChild(completarCheckbox)
  itemElement.appendChild(itemText)
  itemsList.appendChild(itemElement)
}