const  formSearch = document.querySelector('.form-search'),
        inputCitiesFrom = document.querySelector('.input__cities-from'),
        dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
        inputCitiesTo = document.querySelector('.input__cities-to'),
        dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
        inputDateDepart = document.querySelector('.input__date-depart');


const city = ['Moskow', 'Kiev', 'Warsaw', 'Lublin', 'Gdansk' , 'New York', 'Paris', 'Milan', 'Washington D.C.' , 'Wroclaw', 'Lviv','London'];

inputCitiesFrom.addEventListener('input', () => {
    const filterCity = city.filter((item) =>{ // filter похожа функція до forEach
        const fixItem = item.toLowerCase();   // Якщо ми вводимо в інпут n(маленька буква н), то нам не показує New York(бо буква Н написана з великої), для цього всі букви переводимо в нижній регістр
        return fixItem.includes(inputCitiesFrom.value.toLowerCase());   // вертаємо масив городів, з тими буквами, які ми ввели
    });
    
}); 

