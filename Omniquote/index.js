const expression = document.querySelector('.expression');
const author = document.querySelector('.author');
const newQuote = document.querySelector('.new-quote');
const apiUrl = 'https://api.quotable.io/quotes/random';


function fetchit () {
    fetch(apiUrl).then((data) =>{
        console.log(data);
        return data.json();
    }).then((data2) => {
        console.log(data2[0]);
        console.log(data2[0].content)
        expression.textContent = data2[0].content
        author.textContent = data2[0].author;
    }).catch(
        (err) =>{
            console.error(err);
        }
    )
}

fetchit();

newQuote.addEventListener('click', fetchit)