//Shathah Saleem

const openfilters = document.getElementById('openfilters');
const closefilters = document.getElementById('closefilters');
const filtersidebar = document.getElementById('filtersidebar');
const backdrop = document.createElement('div'); //adding a backdrop when sidebar is opened
backdrop.className = 'sidebar-backdrop';

document.body.appendChild(backdrop);

function show() 
{
    filtersidebar.style.right = '0'; //move sidebar into view, before it was -250px
    backdrop.style.display = 'block';
}

function close() 
{
    filtersidebar.style.right = '-410px'; //move sidebar back to -250px, making it hidden from screen
    backdrop.style.display = 'none';
}

backdrop.addEventListener('click', close);
openfilters.addEventListener('click', show);
closefilters.addEventListener('click', close);