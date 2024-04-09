// Obtener el formulario y agregar un evento de escucha para enviarlo
const $form = document.querySelector('#form');
$form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe
  
  // Obtener los datos del formulario
  const formData = new FormData(event.target);
  const fromNumber = formData.get('from').toString(); // Número de origen
  const fromBase = Number(formData.get('fromBase')); // Base del número de origen
  const toBase = Number(formData.get('toBase')); // Base a la que se desea convertir
  
  // Validar la entrada del usuario
  if (!isValidInput(fromNumber, fromBase)) {
    alert('Por favor, ingrese un número válido en la base correcta.');
    return;
  }
  
  // Convertir de la base de origen a decimal
  const fromDecimal = parseInt(fromNumber, fromBase);
  
  // Convertir de decimal a la base de destino y mostrar el resultado
  const toNumber = convertDecimalToBase(fromDecimal, toBase).toUpperCase(); // Convertir a mayúsculas
  const $toElement = document.querySelector('#to');
  $toElement.value = toNumber; // Mostrar el resultado en el formulario
});

// Agregar un evento de escucha para el campo de entrada 'from'
const $fromElement = document.querySelector('#from');
$fromElement.addEventListener('input', (event) => {
  const inputValue = event.target.value;
  
  // Validar la entrada de solo 0 y 1 para la base binaria
  if ($fromElement.getAttribute('data-base') === '2' && !isValidBinaryInput(inputValue)) {
    event.target.value = inputValue.slice(0, -1); // Eliminar el último carácter ingresado si no es 0 o 1
  }
});

// Función para validar la entrada del usuario
function isValidInput(number, base) {
  // Verificar si el número es válido para la base especificada
  if (isNaN(Number(number))) return false; // No es un número válido
  if (base < 2 || base > 36) return false; // La base debe estar entre 2 y 36
  
  // Verificar que los dígitos estén dentro del rango permitido para la base
  const maxDigit = base <= 10 ? base - 1 : 9 + String.fromCharCode(65 + base - 11);
  const regex = new RegExp(`^[0-${maxDigit}]+$`, 'i');
  return regex.test(number);
}

// Función para validar entrada binaria (solo 0 y 1)
function isValidBinaryInput(inputValue) {
  const regex = /^[01]+$/;
  return regex.test(inputValue);
}

// Función para convertir decimal a la base de destino
function convertDecimalToBase(decimal, base) {
  if (base < 2 || base > 36) return ''; // Base no válida
  
  let result = '';
  while (decimal > 0) {
    const remainder = decimal % base;
    result = (remainder < 10 ? remainder : String.fromCharCode(65 + remainder - 10)) + result; // Convertir dígitos hexadecimales a mayúsculas
    decimal = Math.floor(decimal / base);
  }
  return result || '0'; // Retornar '0' si el número es cero
}
