'use strict';
// DOM Nodes
const table = document.getElementById('main-table');
const tbody = document.getElementById('book-club-table-body');
const loginUserBtn = document.getElementById('login-user');
const loginUserField = document.getElementById('change-user');
const currentUserSpan = document.getElementById('current-user');
const errorContainer = document.getElementById('error-container');
const tabelActions = document.getElementsByClassName('table-actions');

// helpers
function loadAddingBook() {
  const id = document.createTextNode(Books.length + 1);
  const title = document.createElement('input');
  const author = document.createElement('input');
  const lender = document.createTextNode(currentUserSpan.innerText);
  const borrower = document.createTextNode('-');
  const action = document.createElement('button');
  title.placeholder = 'Book title';
  author.placeholder = 'Author';
  action.innerHTML = 'Add Book';
  action.id = 'add-book';

  action.addEventListener('click', function() {
    const id = Books.length + 1;
    const titleOfNewBook = title.value;
    const authorOfNewBook = author.value;
    const lender = currentUserSpan.innerText;
    const borrower = '';

    if (titleOfNewBook.length === 0 || authorOfNewBook.length === 0) {
      showError('Please enter all field values');
      return;
    }
    Books.push({
      id,
      title: titleOfNewBook,
      author: authorOfNewBook,
      lender,
      borrower
    });

    loadInitialTableData();
    loadAddingBook();
  });

  const elements = [id, title, author, lender, borrower, action];
  const tableRow = document.createElement('tr');
  for (let ele of elements) {
    const tableData = document.createElement('td');
    tableData.append(ele);
    tableRow.appendChild(tableData);
  }
  tbody.appendChild(tableRow);
}

function changeUser(userName) {
  if (userName.length > 0) {
    errorContainer.classList.add('hide');
    if (tbody.innerHTML.length === 0) loadTableBody();
    currentUserSpan.innerHTML = userName;

    loadInitialTableData();
    for (let ele of tabelActions) {
      ele.disabled = false;
    }
    loadAddingBook();
  } else {
    showError(`Please enter a user name`);
  }
}

function addListners() {
  loginUserBtn.addEventListener('click', function() {
    const newUserName = loginUserField.value;
    changeUser(newUserName);
  });
}

function shouldDisable() {
  return true;
}

function loadInitialTableData() {
  tbody.innerHTML = '';
  for (let { title, author, id, lender, borrower } of Books) {
    const tableRow = document.createElement('tr');
    const actionButton = getCurrnetActionScenario(lender, borrower);
    tableRow.innerHTML = `<td>${id}</td
                        <td>${title}</td>
                        <td>${author}</td>
                        <td>${lender}</td>
                        <td>${borrower}</td>
                        <td><input type="button" value="some action"
                        disabled="${shouldDisable()}"
                        class="table-actions"/></td>`;
    tbody.appendChild(tableRow);
  }
}

function getCurrnetActionScenario(lender) {
  if (currentUserSpan.innerText === lender) {
    return document.createTextNode('-');
  }
}

function showError(errorMessage) {
  errorContainer.innerHTML = errorMessage;
  errorContainer.classList.remove('hide');
  setTimeout(function() {
    errorContainer.classList.add('hide');
  }, 2000);
}

// window load
window.onload = function() {
  loadInitialTableData();
  addListners();
};
