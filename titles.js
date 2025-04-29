//Shathah Saleem

//JS file to change the placeholder in
//the Book Search page

//https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript

//https://stackoverflow.com/questions/901712/how-do-i-check-whether-a-checkbox-is-checked-in-jquery


const books = [
    { title: "The Da Vinci Code", genre: ["thriller", "action"], cover: 'danbrown.jpg'},
    { title: "Harry Potter and the Prisoner of Azkaban", genre: ["fantasy", "action"], cover: 'harrypotter.jpg' },
    { title: "Surrounded by Idiots", genre: ["nonfiction"], cover:'surroundedbyidiots.jpg' },
    { title: "It Ends With Us", genre: ["romance", "drama"], cover: 'T1.jpg' },
    { title: "The Seven Husbands of Evelyn Hugo", genre: ["romance", "psychological"], cover:'T3.jpeg' },
    { title: "The Housemaid", genre: ["thriller", "mystery", "psychological"], cover:'T2.jpeg' },
    {title: "Charlie and the Chocolate Factory", genre: ["children","fantasy"], cover:'CharlieandtheChocolateFactory.jpg' },
    {title: "Head by the Ceiling", genre: ['horror','thriller'], cover: 'HeadbytheCeiling.jpg'},
    {title: "Nineteen Eighty-Four", genre: ['scifi'], cover: 'nineteenEightyFour.jpeg'}

];


const resultsdiv=document.getElementById('bookresults');
const searchbar= document.getElementById('searchbar');
const genrecheckboxes=document.querySelectorAll('.filteroptions input[type="checkbox"]');


let i=0;

//https://stackoverflow.com/questions/13506481/change-placeholder-text
function changeplaceholder()
{
    searchbar.placeholder=books[i].title;
    i=i+1;

    if (i>=books.length)
    {
        i=0;
    }
}

setInterval(changeplaceholder,3000); //3 sec

changeplaceholder();


function displaybooks(booklist) 
{
    resultsdiv.innerHTML = ''; //clear previous results

    if (booklist.length === 0) 
        {
        resultsdiv.innerHTML = '<p>Oops! No books match your search! :(</p>';
        return;
    }

    booklist.forEach(function(book) 
    {
        const bookelement = document.createElement("div");
        bookelement.className = "book";
        bookelement.style.marginBottom = "20px";

        //create image
        const img = document.createElement("img");
        img.src = book.cover;
        img.alt = book.title;
        img.style.width = "120px";
        img.style.height = "180px";
        img.style.display = "block";

        //create title
        const title = document.createElement("p");
        title.textContent = book.title;
        title.className="booktitle";
        title.style.fontWeight = "bold";

        bookelement.appendChild(img);
        bookelement.appendChild(title);
        resultsdiv.appendChild(bookelement);
    });
}



function filterbooks() 
{
const searchterm = searchbar.value.toLowerCase();

const selectedgenres = [];
genrecheckboxes.forEach(function(checkbox) 
{
    if (checkbox.checked) 
        {
        selectedgenres.push(checkbox.value);
    }
});

const filteredbooks = books.filter(function(book) 
{
    const matchessearch = book.title.toLowerCase().includes(searchterm);
    const matchesgenre = selectedgenres.length === 0 ||
        selectedgenres.some(function(genre) 
        {
            return book.genre.includes(genre);
        });
    return matchessearch && matchesgenre;
});

displaybooks(filteredbooks);
}

searchbar.addEventListener("input", filterbooks);
genrecheckboxes.forEach(function(checkbox) 
{
checkbox.addEventListener("change", filterbooks);
});


displaybooks(books);
