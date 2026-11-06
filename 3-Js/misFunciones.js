/**
 * Descripción
 * @method convertirUnidades
 * @param {string} id - id del elemento input en el html
 * @param {number} valor- valor ingresado por el usuario
 */

convertirUnidades = (id, valor) => {
    let metro, pulgada, pie, yarda;

    valor = valor.replace(",",".");

    if(isNaN(valor)){
        alert("se ingreso un valor incorrecto donde deberia haber "+id); 

        metro="";

        pulgada="";

        pie="";

        yarda="";

    } else if(id === "metro"){
        metro = valor;

        pulgada = valor * 39.3701; 

        pie = valor * 3.28084 ; 

        yarda = valor * 1.09361; 

    } else if(id === "pulgada"){

        pulgada=valor;

        metro = valor * 0.0254;

        pie = valor * 0.08333333;

        yarda = valor * 0.02777778;

    } else if(id === "pie"){

        pie=valor;

        metro = valor * 0.3048;

        yarda = valor * 0.3333333;

        pulgada = valor * 12; 
        
    } else if(id === "yarda"){

        yarda=valor;

        metro = valor * 0.9144

        pulgada = valor * 36; 

        pie = valor * 3; 
        
    }

    document.getElementById("metro").value = Math.round(metro*100)/100;
    document.getElementById("pulgada").value = Math.round(pulgada*100)/100;
    document.getElementById("pie").value = pie.toFixed(2);
    document.getElementById("yarda").value = yarda.toFixed(2);

}

/**
 * Convertor grados a radianes
 * @method convertirGR
 * @param {string} id - id del elemento input en el html
 */

function convertirGR(id){
    let grad, rad;

    if(id==="grados"){
        grad= document.getElementById("grados").value;
        rad= grad*Math.PI/180;
    }else{
        rad= document.getElementById("radianes").value;
        grad= rad*180/Math.PI;
    }
    document.getElementById("grados").value = grad;
    document.getElementById("radianes").value = rad;
}

/**
 * mostrar ocultar Div
 * @method mostrarocultar
 * @param {string} valor - valor del id del radio button seleccionado
 */
mostrarocultar = (valor) => {
    const displayDiv = valor==="val_mostrar" ? 'block' : 'none';
    document.getElementById("unDiv").style.display = displayDiv;

    //if (valor=="val_mostrar"){
 //       document.getElementById("unDiv").style.display = 'block';
//    }else{
 //       document.getElementById("unDiv").style.display = 'none';
 //   }
}

/**
 * calcular la suma de los numeros
 * @method calcularsuma
 */
calcularsuma = () =>{
    let sum1, sum2;
    sum1= Number(document.getElementById("nums1").value);
    sum2= Number(document.getElementById("nums2").value);
    document.getElementById("totalS").innerText = sum1 + sum2;
}

/**
 * calcular la resta de los numeros
 * @method calcularresta
 */
calcularresta = () =>{
    let res1, res2;
    res1= Number(document.getElementById("numr1").value);
    res2= Number(document.getElementById("numr2").value);
    document.getElementById("totalR").value = res1 - res2;
}

/**
 * calcular la multiplicacion de los numeros
 * @method calcularmultiplicacion
 */
calcularmultiplicacion = () =>{
    let mul1, mul2;
    mul1= Number(document.getElementById("numm1").value);
    mul2= Number(document.getElementById("numm2").value);
    document.getElementById("totalM").value = mul1 * mul2;
}

/**
 * calcular la division de los numeros
 * @method calculardivision
 */
calculardivision = () =>{
    let div1, div2;
    div1= Number(document.getElementById("numd1").value);
    div2= Number(document.getElementById("numd2").value);

    if(div2 === 0){
        alert("no se puede dividir por cero");
        document.getElementById("totalD").value = "";
    }else{
        document.getElementById("totalD").value = div1 / div2;
    }
}