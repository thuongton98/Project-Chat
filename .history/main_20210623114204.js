const check = document.querySelector('#checkbox')
const pass = document.querySelector('#pass')

check.addEventListener('click',()=>{
    pass.type = 'text'
})