const imagenes = document.querySelectorAll('.img-galleria')
const imagenesLight = document.querySelector('.agregar-img')
const contenedorLight = document.querySelector('.imagen-light')

imagenes.forEach(imagen =>{
    imagen.addEventListener ('click', ()=>{
        aparecerImagen(imagen.getAttribute ('src')) 
    })
})

contenedorLight.addEventListener('click', (e) =>{
console.log(e.target)
})


const aparecerImagen = (imagen)=>{
    imagenesLight.src = imagen;
    contenedorLight.classList.toggle('show')
    imagenesLight.classList.toggle('showImage')
}
