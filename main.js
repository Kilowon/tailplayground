import './style.css'

const textInput = document.querySelector('#text-input')
const dropdown = document.querySelector('#dropdown')
const list = document.querySelector('#app')
const enterBtn = document.querySelector('#enter-btn')

enterBtn.addEventListener('click', appendToList)
list.addEventListener('click', removeSelectedElement)
list.addEventListener('click', completedElement)

//event listener for text input on enter key
textInput.addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		event.preventDefault()
		enterBtn.click()
	}
})

function appendToList(event) {
	event.preventDefault()
	createListItems(textInput)
	textInput.value = ''
}

function createListItems(text) {
	const containerDiv = document.createElement('div')
	containerDiv.classList.add(
		'flex',
		'items-center',
		'justify-center',
		'w-80',
		'text-sm',
		'font-medium',
		'text-gray-900',
		'bg-white',
		'rounded-lg',
		'border',
		'border-gray-200',
		'dark:bg-gray-700',
		'dark:border-gray-600',
		'dark:text-white'
	)
	containerDiv.id = 'element-container'

	const elementLi = document.createElement('li')
	elementLi.classList.add(
		'py-2',
		'px-4',
		'w-full',
		'rounded-t-lg',
		'border-b',
		'border-gray-200',
		'dark:border-gray-600'
	)
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
	completedBtn.innerHTML = `<label class="swap swap-rotate">
  
	<!-- this hidden checkbox controls the state -->
	<input type="checkbox" />
	
	<!-- green check -->
	<div class="swap-on  text-green-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
	<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
  </div>
	
	<!-- muted check -->
  <div class="swap-off text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
</div>
  </label>`
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

function removeSelectedElement(e) {
	const trashIcon = e.target
	const selectedElement = trashIcon.parentElement
	const selectedElementId = trashIcon.parentElement.id
	if (
		selectedElementId === 'element-container' &&
		trashIcon.id === 'trash-btn'
	) {
		selectedElement.remove()
	} else {
		return
	}
}

function completedElement(e) {
	const checkIcon = e.target
	const selectedElement = checkIcon.parentElement.parentElement.parentElement
	const selectedElementId =
		checkIcon.parentElement.parentElement.parentElement.id

	//toggle completed element with tailwind classes
	if (selectedElementId === 'element-container') {
		selectedElement.classList.remove(
			'text-gray-900',
			'bg-white',
			'border',
			'border-gray-200',
			'dark:bg-gray-700',
			'dark:border-gray-600',
			'dark:text-white'
		)
		selectedElement.classList.add(
			'text-gray-400',
			'bg-gray-200',
			'border',
			'border-gray-200',
			'dark:bg-gray-600',
			'dark:border-gray-600',
			'dark:text-gray-400'
		)
		selectedElement.id = 'completed-element'
	} else if (selectedElementId === 'completed-element') {
		selectedElement.classList.remove(
			'text-gray-400',
			'bg-gray-200',
			'border',
			'border-gray-200',
			'dark:bg-gray-600',
			'dark:border-gray-600',
			'dark:text-gray-400'
		)
		selectedElement.classList.add(
			'text-gray-900',
			'bg-white',
			'border',
			'border-gray-200',
			'dark:bg-gray-700',
			'dark:border-gray-600',
			'dark:text-white'
		)
		selectedElement.id = 'element-container'
	} else {
		return
	}
}
