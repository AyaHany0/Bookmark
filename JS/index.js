//project variables:

var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("bookmarkUrl");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var bookmarks = [];

///////////////////////////////////////////////////////////////////
// if satement to show if there is any data in the local storage and displaying the old data if there is one
if (localStorage.Bookmarks != null) {
  bookmarks = JSON.parse(localStorage.Bookmarks);
  displayBookmarks();
}
//function to add a new bookmark
function addBookmark() {
  //adding validation
  if (
    validateInputs(siteNameInput) == true &&
    validateInputs(siteUrlInput) == true
  ) {
    //creating object store the data from the user through input
    var newBookmark = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };
    //every click on the button it will add the newBookmark object to the array"allBookmarks"
    bookmarks.push(newBookmark);
    //store the data at the local storage
    localStorage.setItem("Bookmarks", JSON.stringify(bookmarks));
    //clearinputs & display call
    clearInputs();
    displayBookmarks();
    console.log("hello");
  } else {
    boxModal.classList.remove("d-none");
    clearInputs();
  }
}

//function clearInputs
function clearInputs() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}
//function displayBookmarks
function displayBookmarks() {
  var fill = "";

  for (var i = 0; i < bookmarks.length; i++) {
    fill += `<tr>
    <td class="web-index">${i + 1}</td>
    <td class="web-name">${bookmarks[i].siteName}</td>
    <td>
    <button onclick="setInputForUpdate(${i})" class="btn btn-primary" ">
    <i class="fa-solid fa-pen-to-square"></i>Update
    </button>
  </td>
    <td>
      <a target="_blank" class="btn btn-visit" href="${bookmarks[i].siteUrl}">
        <i class="fa-solid fa-eye pe-2"></i> Visit
      </a>
    </td>
    <td>
      <button class="btn btn-delete" onclick="deleteBookmark(${i})">
        <i class="fa-solid fa-trash-can pe-2"></i>Delete
      </button>
    </td>
  </tr>`;
    document.getElementById("tableContent").innerHTML = fill;
  }
}
//function to delete athe current bookmark
function deleteBookmark(deletedIndex) {
  bookmarks.splice(deletedIndex, 1);
  document.getElementById("tableContent").innerHTML = " ";
  displayBookmarks();
  localStorage.setItem("Bookmarks", JSON.stringify(bookmarks));
}
//function to search for an exisiting bookmark
function searchBookmark(term) {
  var fill = "";
  var term = document.getElementById("searchInput").value;
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].siteName.toLowerCase().includes(term.toLowerCase())) {
      fill += `<tr>
    <td class="web-index">${i + 1}</td>
    <td class="web-name">${bookmarks[i].siteName}</td>
    <td>
    <button onclick="setInputForUpdate(${i})" class="btn btn-primary" ">
    <i class="fa-solid fa-pen-to-square"></i>Update
    </button>
  </td>
    <td>
      <a class="btn btn-visit" target="_blank" href="${bookmarks[i].siteUrl}">
        <i class="fa-solid fa-eye pe-2"></i> Visit
      </a>
    </td>
    <td>
      <button class="btn btn-delete" onclick="deleteBookmark(${i})">
        <i class="fa-solid fa-trash-can pe-2"></i>Delete
      </button>
    </td>
  </tr>`;
      document.getElementById("tableContent").innerHTML = fill;
    }
  }
  console.log(0);
}
//global valiable that will carry the current index
var updatedIndex;
function setInputForUpdate(currentIndex) {
  updatedIndex = currentIndex;
  siteNameInput.value = bookmarks[currentIndex].siteName;
  siteUrlInput.value = bookmarks[currentIndex].siteUrl;
  document.getElementById("submitBtn").classList.add("d-none");
  document.getElementById("updateBtn").classList.remove("d-none");
}
//function to update bookmark
function updateBookmark() {
  //replace the old values with the new ones
  bookmarks[updatedIndex].siteName = siteNameInput.value;
  bookmarks[updatedIndex].siteUrl = siteUrlInput.value;
  //in this point the array itself changed but not the local storage
  //so we need to replace the old local storage with the new ones
  localStorage.setItem("Bookmarks", JSON.stringify(bookmarks));
  //then call the display function to show the new values
  displayBookmarks();
  //reset the form
  clearInputs();
  document.getElementById("submitBtn").classList.remove("d-none");
  document.getElementById("updateBtn").classList.add("d-none");
}
//validation

function validateInputs(element) {
  var regex = {
    bookmarkName: /^[a-z]{3,}/i,
    bookmarkUrl:
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");

    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
function closeModal() {
  boxModal.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);
