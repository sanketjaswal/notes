let idCount = 0;

function deleteNote(id) {
  var delaytimer = 450;
  deleteAnimation(id);
  setTimeout(function() { 
    document.getElementById(id).remove();
    console.log("here");
    }, delaytimer);
  // document.getElementById(id).remove();
}

function deleteAnimation(id){
  document.getElementById(id).setAttribute("class","deletion_animation");  
  console.log("gg");
}

function downloadNote(id) {
  console.log(id);
  const text = document.getElementById("text" + id).value;

  console.log(text);
  const fl = new Blob([text], { type: "text/plain" });
  const URl = URL.createObjectURL(fl);

  const linker = document.createElement("a");
  linker.innerHTML = "Save";
  linker.setAttribute("href", URl);
  linker.setAttribute("download", `${id}.txt`);
  linker.setAttribute("style", "display:none");

  document.getElementById("notes_area").appendChild(linker);
  linker.click();
  console.log(linker);
}

function addNote(apiData = "") {
  idCount += 1;

  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", idCount);
  newDiv.setAttribute("class", "new_note_container");

  const trash_div = document.createElement("div");
  trash_div.setAttribute("onclick", `deleteNote(${idCount})`);
  trash_div.setAttribute("class", "note_icon trash_icon");
  trash_div.innerHTML = "<i class='fas fa-trash-alt'></i>";

  const download_div = document.createElement("div");
  download_div.setAttribute("class", "note_icon down_icon");
  download_div.innerHTML = "<i class='icon fas fa-file-download'></i>";
  download_div.setAttribute("onclick", `downloadNote(${idCount})`);

  const textArea = document.createElement("textarea");
  textArea.setAttribute("id", "text" + idCount);
  textArea.setAttribute("class", "new_text_area");
  textArea.value = apiData;

  newDiv.appendChild(trash_div);
  newDiv.appendChild(download_div);
  newDiv.appendChild(textArea);
  document.getElementById("notes_area").appendChild(newDiv);

  textArea.style.height = textArea.scrollHeight + 5 + "px";

  textArea.addEventListener("input", function () {
    textArea.style.height = "5px";
    textArea.style.height = textArea.scrollHeight + 5 + "px";
  });
}

async function getNotes() {
  let response = await fetch(
    "https://5e3qvi2p34.execute-api.us-east-1.amazonaws.com/dev/get"
  );
  response = await response.json();

  let NoteList = response.notesList;

  for (let p = 0; p < NoteList.length; p++) {
    addNote(NoteList[p]);
  }
}

function uploadData() {
  let allNotes = [];
  let notesValue = [];

  allNotes = document.getElementsByClassName("new_text_area");
  console.log(allNotes);

  for (let g = 0; g < allNotes.length; g++) {
    let trm = allNotes[g].value.trim();
    if (trm !== "") {
      notesValue.push(trm);
      console.log(g);
    }
  }

  // notesValue = allNotes.map()

  console.log(notesValue);

  postNotes(notesValue);
}

async function postNotes(allNotes) {
  let response = await fetch(
    "https://5e3qvi2p34.execute-api.us-east-1.amazonaws.com/dev/update",
    {
      method: "POST",
      body: JSON.stringify({
        notes: allNotes,
      }),
    }
  );
  response = await response.json();
  alert("Data updated");
  console.log(response);
}
