/* *************************
 *** POST JOURNAL ***
 ************************** */
function postJournal() {
  let title = document.getElementById('title').value
  let date = document.getElementById('date').value
  let entry = document.getElementById('entry').value
  const accessToken = localStorage.getItem('SessionToken')
  let newEntry = { journal: { title: title, date: date, entry: entry } }


  fetch('http://localhost:3000/journal/create', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': accessToken
    }),
    body: JSON.stringify(newEntry)
  })
    .then(response => {
      console.log(response.json())
      displayMine()
    })
    .catch((err) => {
      console.log(err)
    })
}
// function postJournal() {
//   console.log("postJournal Function Called");
//   let title = document.getElementById("title").value;
//   let date = document.getElementById("date").value;
//   let entry = document.getElementById("entry").value;

//   let bodyObj = {
//     journal: {
//       title: title,
//       date: date,
//       entry: entry,
//     },
//   };

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", localStorage.getItem("SessionToken"));
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify(bodyObj);

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch("http://localhost:3000/journal/create", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
/* *************************
 *** UPDATE JOURNAL ***
 ************************** */
function editJournal(postId) {
  console.log("editJournal Function Called");
}

/* *************************
 *** DELETE JOURNAL ***
 ************************** */
function deleteJournal(postId) {
  console.log("deleteJournal Function Called");
}
