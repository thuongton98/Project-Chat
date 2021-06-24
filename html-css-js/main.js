const check = document.querySelector('#checkbox')
const pass = document.querySelector('#pass')

check.addEventListener('click',()=>{
    if(pass.type==='password'){
        pass.type = 'text'
    }else{
        pass.type = 'password'
    }
})