import './style.css'

document.querySelector('#app').innerHTML = `

<ul
				class="w-80 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
			>
				<li
					class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
				>
					All text from list will go here
				</li>
</ul>
`
const textInput = document.querySelector('text-input')
const dropdown = document.querySelector('dropdown')
const list = document.querySelector('list')
const enterBtn = document.querySelector('enter-btn')

async function getRequestedData(request) {
	const requested = request.map(req => fetch(req))
	const promise = Promise.all([...requested])
	const responce = await promise
	console.log()

	const json = await Promise.allSettled(responce.map(res => res.json()))

	json.map(data => {
		console.log(data.value)
		// load data to local storage to be used later
		localStorage.setItem('data', JSON.stringify(data.value))
	})
}

function saveData() {
	const getLocalData = JSON.parse(localStorage.getItem('data'))
	const json = JSON.stringify(getLocalData)
	const blob = new Blob([json], { type: 'application/json' })
	const upload = URL.createObjectURL(blob)
	return upload
}

getRequestedData(['/data.json'])
