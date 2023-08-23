//Esta funcion evita que se dejen campos sin rellenar en el formulario
function validateForm() {

    //Al declarar las siguientes variables se les indica que capturen y guarden el valor ingresado en los campos del formulario
    let user = document.getElementById('inputUser').value; 
    let product = document.getElementById('inputProduct').value; 
    let assess = document.getElementById('inputAssess').value;

    //Con las siguientes estructuras de control se asegura que el usuario ingrese correctamete los datos requeridos
    //Validacion de usuario
    if(user ==''){

        //Si cualquiera de los compos esta vacio, se genera una alarma que le indica al usuario que rellene el campo correspondiente
        alert('El nombre de usuario es obligatorio');
        return false; 
    }

    //Validacion de producto
    if(product == ''){
        alert('El nombre del producto es obligatorio');
        return  false
    }

    //Validacion de valoracion (nota del 1 al 10 que se le debe dar al producto)
    if(assess == ''){
        alert('La valoración del producto es obligatoria');
        return  false
    }else if(assess < 1 || assess > 10){
        alert('La evaluación debe corresponder a un número entre el 1 y el 10')
        return false
    };
    //estaba haciendo esta condicional por que no quiere que se pueda introducir un numero menor a 1 o mayor a 10
    // }else if(assess < 1 || > 10 ){
    //     alert('jkdsjkds')
    // }

    //Si todos los campos son introducidos correctamente, entonces se retorna un valor verdadero
    return true;
}

//La siguiente funcion es para "pintar" (mostrar) en la tabla del HTML los datos una vez
//estos fueron correctamente introducidos y enviados por el usuario.
//Al igual que en que en la funcion de addData (mas abajo) primero hay que inicializar un array vacio para guardar informacion
function showData() {
    let assessSub;
    if (localStorage.getItem('assessSub') == null) {
        assessSub = [];
    } else {
        assessSub = JSON.parse(localStorage.getItem('assessSub'));
    }

    //Con esta variable permitira pintar en la tabla los datos introducidos por el usuario
    let html = '';

    //A continuacion, el metodo forEach va a leer el array creando anteriormente y cada vez que se encuentre
    //con un elemento en su interior lo guardara con su index en la variable let html 
    assessSub.forEach(function (element, index) {

        //Con esta sentencia se le indica a la funcion que traiga desde <td> en el HTML el elemento que contiene
        html += '<tr>';
        html += '<td>' +element.user+ '</td>'
        html += '<td>' +element.product+ '</td>'
        html += '<td>' +element.assess+ '</td>'

        //Tambien se agregan los botones para borrar y editar los datos ingresados
        //y al boton deleteData se le pasa como parametro el index del alemento para ques identifique que tiene que borrar
        html += '<td><button onclick="deleteData('+index+')" class="delete-btn">Eliminar</button> <button onclick="updateData('+index+')" class="update-btn">Editar</button></td>';
        html += '</tr>'
    });

    //Se actualiza en contenido de la pagina web, los datos ingresados se muestran en la tabla.
    //El tbody dentro de los parentesis es donde se va a mostrar (pintar) esta info
    document.querySelector('#tableData tbody').innerHTML = html;    
  
}

//Una vez se ingresan los datos y se aprieta el boton para enviarlos, la pagina se recarga y estos se pinten en la tabla
document.onload = showData();

//Esta funcion agregara los datos ingresados en la pagina en el localStorage cuando se apriete el boton de "Enviar datos"
function addData() {

    //Primero se comprueba que la validacion de los datos sea verdadera
    if(validateForm() == true){ 

        //Si la validacion es verdadera entonces se capturan los valores introducidos en los campos (inputs)
        let user = document.getElementById('inputUser').value; 
        let product = document.getElementById('inputProduct').value; 
        let assess = document.getElementById('inputAssess').value;

        //Esta variable va a contener y a guardar los datos ingresados en el formulario en un array
        let assessSub;

        if(localStorage.getItem('assessSub') == null) {
            assessSub = [];
        }else{

            //localStorage solo puede guardar cadenas de texto
            //por lo tanto debemos usar JSON para convertir los objetos en strings antes de guardarlos ahi
            assessSub = JSON.parse(localStorage.getItem('assessSub'));
        }

        //Se construye el objeto que JSON tranformara en strings,
        //este objeto contiene todos los datos que ingresamos en los inputs.
        //Se almacenan los valores del objeto bajo una clave o key especifica en el LS
            assessSub.push({
            user: user,
            product: product,
            assess: assess
        });

        localStorage.setItem('assessSub', JSON.stringify(assessSub));

        //Por ultimo se muestran los datos enviados en la pagina
        showData();

        //Luego de que los datos fueron pintados y guardados, los inputs deben limpiarse para volver a ser utilizados
        document.getElementById('inputUser').value = '';
        document.getElementById('inputProduct').value = '';
        document.getElementById('inputAssess').value = '';
    }
}

//Funcion qpara borrar datos
function deleteData(index){
    let assessSub;
    if(localStorage.getItem('assessSub') == null) {
        assessSub = [];
    }else{
        assessSub = JSON.parse(localStorage.getItem('assessSub'));
    }

    //Se utiliza el metodo splice para eliminar un array de datos desde la tabla
    assessSub.splice(index, 1);

    //Se actualiza la informacion guardada en el localStorage y esta se refleja en el la pagina
    localStorage.setItem('assessSub', JSON.stringify(assessSub));

    //Los datos actualizados se vuelven a mostrar
    showData();
}

//Funcion para actualizar los datos (con los botones "editar" y "actulizar")
function updateData(index){

    //Con esta sentencia se indica que el boton de "actualizar" que esta estatico en el html desaparezca
    document.getElementById('btnAdd').style.display = 'none';

    //Para actualizar los datos, una vez se apriete el boton "editar" de la tabla
    //solo debe quedar el boton "actualizar" en el formulario, por lo tanto el boton de "enviar datos" 
    //se bloquara cuando se ejecute esta funcion.
    //En los parametros se indican los ids de los dos botones, el que se quiere dejar y el que se quiere bloquear
    document.getElementById('btnUpdate', btnAdd).style.display = 'block';

    let assessSub;

    if(localStorage.getItem('assessSub') == null) {
        assessSub = [];
    }else{
        assessSub = JSON.parse(localStorage.getItem('assessSub'));
    }
    
    //Se vuelven a rellenan los campos del formulario con informacion existemte, es decir
    //se le pasan a los inputs los valores indexados en los array que guardan datos
    document.getElementById('inputUser').value = assessSub[index].user;
    document.getElementById('inputProduct').value = assessSub[index].product;
    document.getElementById('inputAssess').value = assessSub[index].assess;

    //Funcion para actulizar datos
    document.querySelector('#btnUpdate').onclick = function(){
        if(validateForm() == true){

            //Se recuperan los datos del array con sus respectivos indexs para poder ser modfificados
            assessSub[index].user = document.getElementById('inputUser').value;
            assessSub[index].product = document.getElementById('inputProduct').value;
            assessSub[index].assess = document.getElementById('inputAssess').value;

            //Luego se guarda el array modificado en el LS
            localStorage.setItem('assessSub', JSON.stringify(assessSub));

            //Se actualiza la informacion de la tabla
            showData();

            //Se borran los datos para que no se repitan o vuelvan a salir cuando se actualizan
            document.getElementById('inputUser').value = '';
            document.getElementById('inputProduct').value = '';
            document.getElementById('inputAssess').value = '';

            document.getElementById('btnAdd').style.display = 'block';
            document.getElementById('btnUpdate', btnAdd).style.display = 'none' 

        }
    }
}


