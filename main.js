import './style.css'

const list = document.querySelector('#app')
const listTextInput = document.querySelector('#text-input')
const listSort = document.querySelector('#dropdown')
const listEnterBtn = document.querySelector('#enter-btn')
const title = document.querySelector('#app-title')
const titleInputModal = document.querySelector('#text-input-modal')
const titleBtnModal = document.querySelector('#save-list-name')
const titleListModel = document.querySelector('#list-modal')
const saveloadBtn = document.querySelector('#save-load-btn')
const newListSave = document.querySelector('#new-empty-list')

//Events
document.addEventListener('DOMContentLoaded', () => {
	checkForSaveKey()
	getPreservedData('unsaved')
	createTitleElement('unsaved', 0)
})

saveloadBtn.addEventListener('click', () => {
	getKeyListFromLocalStorage()
})

list.addEventListener('click', e => {
	if (e.target.id === 'check-off' || e.target.parentElement.id === 'check-on') return
	removeSelectedElement(e)

	setPreservedData(nodeListToArray(), title.firstChild.id)
})

list.addEventListener('click', e => {
	if (e.target.id === 'trash-btn') return
	completedElement(e)

	setPreservedData(nodeListToArray(), title.firstChild.id)
})
newListSave.addEventListener('click', () => {
	checkForSaveKey(titleInputModal.value)
	titleListModel.innerHTML = ''
	getKeyListFromLocalStorage()
	createTitleElement(titleInputModal.value, 0)
	list.innerHTML = ''
	getPreservedData(title.firstChild.id)
	titleInputModal.value = ''
})
titleBtnModal.addEventListener('click', () => {
	checkForSaveKey(titleInputModal.value)
	createTitleElement(titleInputModal.value, 0)
	setPreservedData(nodeListToArray(), title.firstChild.id)
	list.innerHTML = ''
	getPreservedData(title.firstChild.id)
	titleInputModal.value = ''
})

titleListModel.addEventListener('click', e => {
	const target = e.target
	target.innerHTML
	createTitleElement(target.innerHTML, 0)
	list.innerHTML = ''
	getPreservedData(target.innerHTML)
})

listEnterBtn.addEventListener('click', event => {
	event.preventDefault()
	createListItems(listTextInput, 0)
	//nodeListToArray()
	if (title.firstChild.id === null || undefined) {
		setPreservedData(nodeListToArray(), 'unsaved')
	} else {
		setPreservedData(nodeListToArray(), title.firstChild.id)
	}
	listTextInput.value = ''
})

listTextInput.addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		event.preventDefault()
		listEnterBtn.click()
	}
})

titleInputModal.addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		event.preventDefault()
		titleBtnModal.click()
	}
})

//Creating DOM elements

function createListItems(text, id) {
	const containerDiv = document.createElement('div')
	containerDiv.classList.add('flex', 'items-center', 'justify-center', 'w-full', 'max-w-md', 'text-sm', 'font-medium', 'text-gray-900', 'bg-white', 'rounded-lg', 'border', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white')
	containerDiv.id = 'element-container'

	if (id.id === 'completed-element') {
		containerDiv.classList.add('line-through', 'text-gray-400', 'bg-gray-200', 'border', 'border-gray-200', 'dark:bg-gray-600', 'dark:border-gray-600', 'dark:text-gray-400')
		containerDiv.classList.remove('text-gray-900', 'bg-white', 'border', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white')
		containerDiv.id = 'completed-element'
	}

	const elementLi = document.createElement('li')
	elementLi.classList.add('py-2', 'px-4', 'w-full', 'rounded-t-lg', 'border-b', 'border-gray-200', 'dark:border-gray-600')
	elementLi.id = 'text-element'
	containerDiv.appendChild(elementLi)

	const completedBtn = document.createElement('div')
	//Dont create an element if the input is empty
	if (text.value === '' || undefined) {
		return
	} else {
		elementLi.innerText = text.value
	}
	completedBtn.classList.add('completed-btn')
	completedBtn
	if (id.id === 'completed-element') {
		completedBtn.classList.add('btn', 'btn-sm', 'btn-ghost', 'text-green-600')
		completedBtn.id = 'check-on'
		completedBtn.innerHTML = `<div class="pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></div>`
	} else {
		completedBtn.classList.add('btn', 'btn-sm', 'btn-ghost', 'text-gray-500')
		completedBtn.id = 'check-off'
		completedBtn.innerHTML = `<div class="pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></div>`
	}

	containerDiv.appendChild(completedBtn)

	const trashBtn = document.createElement('button')
	trashBtn.classList.add('btn', 'btn-sm', 'btn-ghost', 'text-gray-500')
	trashBtn.innerHTML = `<div class="pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
	<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg></div>`
	trashBtn.id = 'trash-btn'
	containerDiv.appendChild(trashBtn)

	list.appendChild(containerDiv)
}

function createSaveListElements(data) {
	if (data === undefined) return
	const elementLi = document.createElement('li')
	elementLi.id = 'all'

	const elementLabel = document.createElement('label')
	elementLabel.classList.add('btn', 'btn-ghost')
	elementLabel.setAttribute('for', 'save-modal')
	//elementLabel.id = textInputModal.value
	elementLabel.innerHTML = data
	elementLi.appendChild(elementLabel)
	titleListModel.appendChild(elementLi)
}

function createTitleElement(text, id) {
	const containerDiv = document.createElement('div')
	containerDiv.classList.add('flex', 'items-center', 'justify-center', 'w-full', 'max-w-md', 'text-lg', 'capitalize', 'text-center', 'font-semibold', 'text-gray-900', 'bg-white', 'rounded-lg', 'border', 'border-gray-200', 'dark:bg-gray-600', 'dark:border-gray-500', 'dark:text-white')
	containerDiv.id = text

	if (id.id === 'completed-element') {
		containerDiv.classList.add('line-through', 'text-gray-400', 'bg-gray-200', 'border', 'border-gray-200', 'dark:bg-gray-600', 'dark:border-gray-600', 'dark:text-gray-400')
		containerDiv.classList.remove('text-gray-900', 'bg-white', 'border', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white')
		containerDiv.id = 'title-element'
	}

	const elementLi = document.createElement('li')
	elementLi.classList.add('py-2', 'px-4', 'w-full', 'rounded-t-lg', 'border-b', 'border-gray-200', 'dark:border-gray-600')
	elementLi.id = 'text-element'
	containerDiv.appendChild(elementLi)

	if (text === '' || undefined) {
		return
	} else {
		elementLi.innerText = text
	}
	title.innerHTML = ''
	title.appendChild(containerDiv)
	//console.log(title.innerHTML)
}

//Mod the DOM elements
function removeSelectedElement(e) {
	const trashIcon = e.target
	//console.log(trashIcon)
	const selectedElement = trashIcon.parentElement
	const selectedElementId = trashIcon.parentElement.id
	if ((selectedElementId === 'element-container' || 'completed-element') && trashIcon.id === 'trash-btn') {
		selectedElement.remove()
	} else {
		return
	}
}

function completedElement(e) {
	const checkIcon = e.target
	if (checkIcon.parentElement.parentElement === null) return
	const selectedElement = checkIcon.parentElement
	const selectedElementId = checkIcon.parentElement.id
	if (checkIcon.id === 'check-on') {
		checkIcon.classList.remove('text-green-600')
		checkIcon.classList.add('text-gray-500')
		checkIcon.id = 'check-off'
	} else if (checkIcon.id === 'check-off') {
		checkIcon.classList.remove('text-gray-500')
		checkIcon.classList.add('text-green-600')
		checkIcon.id = 'check-on'
	} else {
		return
	}
	//toggle completed element with tailwind classes
	if (selectedElementId === 'element-container') {
		selectedElement.classList.remove('text-gray-900', 'bg-white', 'border', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white')
		selectedElement.classList.add('line-through', 'text-gray-400', 'bg-gray-200', 'border', 'border-gray-200', 'dark:bg-gray-600', 'dark:border-gray-600', 'dark:text-gray-400')
		selectedElement.id = 'completed-element'
	} else if (selectedElementId === 'completed-element') {
		selectedElement.classList.remove('line-through', 'text-gray-400', 'bg-gray-200', 'border', 'border-gray-200', 'dark:bg-gray-600', 'dark:border-gray-600', 'dark:text-gray-400')
		selectedElement.classList.add('text-gray-900', 'bg-white', 'border', 'border-gray-200', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white')
		selectedElement.id = 'element-container'
	} else {
		return
	}
}

//Storage

function setPreservedData(input, key) {
	if (key === undefined) {
		key = 'unsaved'
	}
	localStorage.removeItem(key)

	let inputs
	if (localStorage.getItem(key) === null) {
		inputs = []
	} else {
		inputs = JSON.parse(localStorage.getItem(key))
	}
	inputs.push(input)

	localStorage.setItem(key, JSON.stringify(inputs))
}

function getPreservedData(key) {
	let save
	if (localStorage.getItem(key) === null) {
		save = [[]]
	} else {
		save = JSON.parse(localStorage.getItem(key))
	}
	if (save[0] === undefined) {
		return
	} else {
		save[0].forEach(function (save) {
			createListItems(save, save)
		})
	}
}
//Data

function nodeListToArray() {
	let target = []
	target = list.childNodes
	const targetValue = Array.from(target).map(item => item.innerText)
	const targetId = Array.from(target).map(item => item.id)
	//create a third array with the id and value objects
	const targetArray = []
	for (let i = 0; i < targetValue.length; i++) {
		targetArray.push({ id: targetId[i], value: targetValue[i] })
	}
	return targetArray
}

function getKeyListFromLocalStorage() {
	let keyList = []
	for (let i = 0; i < localStorage.length; i++) {
		keyList.push(localStorage.key(i))
	}
	titleListModel.innerHTML = ''
	keyList.map(data => {
		if (data === 'unsaved') return
		return createSaveListElements(data)
	})
	return keyList
}

function checkForSaveKey(text) {
	if (!getKeyListFromLocalStorage().includes('default')) localStorage.setItem('unsaved', '[]')
	//console.log(getKeyListFromLocalStorage())
	getKeyListFromLocalStorage().map(data => {
		if (!data === titleInputModal.value) {
			return data
		} else if (text === undefined) {
			return
		} else {
			localStorage.setItem(text.toLowerCase(), '[]')
			localStorage.removeItem('unsaved')
			return
		}
	})
}
