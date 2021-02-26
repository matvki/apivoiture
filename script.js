let listC = '';
let prev = document.getElementById('previously');

let marques = document.getElementById('allMarques');
let index = document.getElementById('index');
let carOM = document.getElementById('carOM');
let dateOC = document.getElementById('dateOC');
let car = document.getElementById('car');

let ulIndex = document.getElementById('ulIndex');
let ulCarOM = document.getElementById('ulCarOM');
let ulDateOC = document.getElementById('ulDateOC');
let tCar = document.getElementById('tCar');

// fonction retour arriere
function previously(idM, idC) {
    if (idM == 0 && idC == 0) {
    //allMarques
    allMarques();
}else if (idM > 0 && idC == 0) {
    //allMCars
    allMCars(idM);
} else if(idM > 0 && idC > 0){
    //allDCars
    allDCars(idM,idC)
}
}
function allMarques() {
    index.classList.add('none');
    carOM.classList.add('none');
    dateOC.classList.add('none');
    car.classList.add('none');
    marques.classList.remove('none');
    fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        listC = '';
        data.forEach(mark => {
            listC += `<li class="pointer" onclick="allMCars(${mark.codigo})">${mark.nome}</li>`
        });
        ulIndex.innerHTML = listC;
    })
}
// toutes les voitures d'une marque
function allMCars(id) {
    index.classList.add('none');
    dateOC.classList.add('none');
    car.classList.add('none');
    marques.classList.add('none');
    carOM.classList.remove('none');
    fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${id}/modelos`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        listC = '';
        data = data.modelos;
        data.forEach(mark => {
            listC += `<li class="pointer" onclick="allDCars(${id},${mark.codigo})">${mark.nome}</li>`
        });
        prev.innerHTML = `<p id="previously" class="pointer" onclick="previously('0','0')">Précedents</p>`
        ulCarOM.innerHTML = listC;
    })
}
// toutes les dates de sortie de voiture d'une marque
function allDCars(idM, idC) {
    index.classList.add('none');
    car.classList.add('none');
    marques.classList.add('none');
    carOM.classList.add('none');
    dateOC.classList.remove('none');
    fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idM}/modelos/${idC}/anos`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        listC = '';
        data.forEach(mark => {
            listC += `<li class="pointer" onclick="theCar(${idM},${idC},'${mark.codigo}')">${mark.nome}</li>`
        });
        prev.innerHTML = `<p id="previously" class="pointer" onclick="previously('${idM}','0')">Précedents</p>`
        ulDateOC.innerHTML = listC;
    })
}
//toute les infos de la voiture en question
function theCar(idM, idC, idD) {
    index.classList.add('none');
    marques.classList.add('none');
    carOM.classList.add('none');
    dateOC.classList.add('none');
    car.classList.remove('none');
    fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idM}/modelos/${idC}/anos/${idD}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        listC = '';
        listC += `<tr><td>${data.AnoModelo}</td>`;
        listC += `<td>${data.Combustivel}</td>`;
        listC += `<td>${data.Marca}</td>`;
        listC += `<td>${data.MesReferencia}</td>`;
        listC += `<td>${data.Modelo}</td>`;
        let valor = data.Valor;
        valor = valor.replace("R$ ", "");
        valor = valor.replace(".", "");
        valor = parseInt(valor);
        let price = valor * 0.15125;
        listC += `<td>${price}</td></tr>`;
        prev.innerHTML = `<p id="previously" class="pointer" onclick="previously('${idM}','${idC}')">Précedents</p>`
        tCar.innerHTML = listC;
    })
}


