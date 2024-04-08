function esprimo  (number)  {
   for (let i = 2; i <  number; i++) {
      if (number % i === 0) {
         return false;
      }
      return true;   
   }
}


const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
   event.preventDefault();
   const formData = new FormData(event.target);
   const date = formData.get('date');
   const day = new Date(date).getDate() +1 ;
   
   const aswer = document.querySelector('#answer');
   if (esprimo(day)) {
      aswer.innerHTML = 'Hoy es un día Primo' 
    } else
    {
      aswer.innerHTML ='Hoy no es un día Primo';
    } 
});

