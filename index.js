let element = document.getElementById('nav-id')
let elementA = document.getElementById('footer-grid')
let elementB = document.getElementById('choose-scheme')
let elementC = document.getElementById('get-color')
let elementI = document.getElementById('toggle-btn')

elementC.addEventListener('click', getColor)
elementI.addEventListener('click', function(){
    element.classList.toggle('light-mode')
    elementA.classList.toggle('light-mode')
    elementB.classList.toggle('light-btn')
    elementC.classList.toggle('light-btn')
    elementI.classList.toggle('fa-toggle-on')
})

document.addEventListener('click', function (e){
    if(e.target.textContent.charAt() === "#"){
        let copyText = e.target.textContent
        navigator.clipboard.writeText(copyText)
        alert("Copied the hex color: " + copyText)
    }else if(e.target.classList.contains("colordiv")){
        let copyText = e.target.style.backgroundColor
        navigator.clipboard.writeText(copyText)
        .then(() => {
            alert(`Copied ${copyText} successfull!`);
        })
        .catch(() => {
            alert("Copy failed, something went wrong.");
        })
    }
})

function getColor(){
    const color = document.getElementById('seed-color-input').value.slice(1)
    const colorScheme = document.getElementById('choose-scheme').value
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorScheme}&count=5`)
        .then(res => res.json())
        .then(data => renderColors(data))
}

function renderColors(colors){
    const colorArray = colors.colors
    let mainHtml = ``
    let footerHtml = ``
    const choosenColors = colorArray.map(color => color.hex.value)
    choosenColors.forEach(function(colorDiv, i){mainHtml += `
    <div 
        id="a${i}"
        class="colordiv" 
        style="background-color: ${colorDiv};">
    </div>`})
    document.getElementById('color-grid').innerHTML = mainHtml
    choosenColors.forEach(function(colorDiv, i){footerHtml += `
    <div>
        <h3 id="b${i}">${colorDiv}</h3>
    </div>`})
    document.getElementById('footer-grid').innerHTML = footerHtml
}

getColor()