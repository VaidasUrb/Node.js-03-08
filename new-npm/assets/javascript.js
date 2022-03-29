
document.querySelectorAll('.delete-button').forEach((element) => {
    element.addEventListener('click', () => {
        let id = element.getAttribute('data-id')
        fetch('http://localhost:3000/' + id, { method: 'DELETE' })
            .then(resp => {
                window.location.reload()
            })
    })
})

