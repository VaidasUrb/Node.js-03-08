const url = 'http://localhost:3000'


const transferData = async (url, method = 'GET', data = {}) => {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (method != 'GET')
        options.body = JSON.stringify(data)

    const resp = await fetch(url, options)

    return resp.json()
}

const getData = () => {

    transferData(url + '/show-data')
        .then(resp => {
            let html = '<ul>'

            resp.forEach(value => {

                html += `<li class="clearfix" data-id="${value._id}">
                        <span class="content">${value.content}</span>
                        ${value.data}
                        <a class="btn btn-danger float-end delete">Trinti</a>
                        <a class="btn btn-primary float-end update-todo">Redaguoti</a>
                    </li>`
            })

            html += '</ul>'

            document.querySelector('#content').innerHTML = html

            document.querySelectorAll('.delete').forEach(element => {
                let id = element.parentElement.getAttribute('data-id')

                element.addEventListener('click', () => {

                    transferData(url + '/delete-data/' + id, 'DELETE')
                        .then(resp => {
                            getData()
                        })

                })
            })
            document.querySelectorAll('.update-todo').forEach(element => {
                let id = element.parentElement.getAttribute('data-id')

                element.addEventListener('click', () => {

                    if (resp.status === 'success') {
                        mainInput.value = resp.data.task
                        mainInput.classList.add('edit-mode')
                        mainInput.setAttribute('data-mode', 'edit')
                        addButton.textContent = addButton.getAttribute('data-edit-label')
                        addButton.setAttribute('data-id', id)

                    } else {
                        messages(resp.message, resp.status)
                    }

                    transferData(url + '/' + id)
                        .then(resp => {
                            getData()
                        })

                })
            })
        })

}

window.addEventListener('load', () => {
    getData()
})