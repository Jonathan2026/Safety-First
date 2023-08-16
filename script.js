const firebaseConfig = {
  apiKey: "AIzaSyCIUqF1aH50w4HKGU_1hHPckm7NbWnq3gc",
  authDomain: "demoday-eab45.firebaseapp.com",
  projectId: "demoday-eab45",
  storageBucket: "demoday-eab45.appspot.com",
  messagingSenderId: "275425812457",
  appId: "1:275425812457:web:3b06ad3ee1f00491327578",
  measurementId: "G-T9ENK0KFMC"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Setting up your database
let db = firebase.firestore();
console.log(db);


// Every piece of information from blog_info (database) : an object like firebase thing
const usersCollection = db.collection("blog_info");


const querySnapshot = usersCollection.get() // Gets all the data from database (hence .get())
  .then(function(querySnapshot) {
    // Iteraring through each database submission fully (.docs is for each submit, .length for for loop)
    for (let i = 0; i < querySnapshot.docs.length; i++) {
      doc = querySnapshot.docs[i]; // Current submission
      console.log(doc) // Some weird thing, but doc.data() is the object of title + content
      console.log("Document data: ", doc.data());
      console.log(doc.id) // ID of submission in database

      let outputDIV = document.getElementById("output");
      let outputTitle = document.createElement("h2");
      let outputContent = document.createElement("p");
      let space = document.createElement("br");
      let deleteButton = document.createElement("button")

      // We're changing the actual text on the screen
      outputTitle.innerHTML = doc.data().Title;
      outputContent.innerHTML = doc.data().Content;
      deleteButton.innerHTML = "Delete"

      // Updating the DOM for it to actually show up
      outputDIV.appendChild(outputTitle)
      outputDIV.appendChild(outputContent)
      outputDIV.appendChild(deleteButton)
      outputDIV.appendChild(space)

      //Delete Button
      deleteButton.addEventListener("click", function(e) {
        e.preventDefault()
        db.collection("blog_info").doc(doc.id).delete()

      })

    }
  })
  //Catches error
  .catch(function(error) {
    console.error("Error getting documents: ", error);
  });

// Declare our button in our DOM, and then listen for a click of the submit
let submit = document.getElementById("submit");
submit.addEventListener("click", getInfo)

function getInfo(e) {
  let titleField = document.getElementById("title-input");
  let contentField = document.getElementById("writing-input");
  e.preventDefault();
  title = titleField.value;
  content = contentField.value;


  let blog = {
    Title: title,
    Content: content,
  };

  let outputDIV = document.getElementById("output");
  let outputTitle = document.createElement("h2");
  let outputContent = document.createElement("p");
  let space = document.createElement("br");
  let deleteButton = document.createElement("button");

  // We're changing the actual text on the screen
  outputTitle.innerHTML = blog.Title;
  outputContent.innerHTML = blog.Content;
  deleteButton.innerHTML = "Delete"

  // Updating the DOM for it to actually show up
  outputDIV.appendChild(outputTitle)
  outputDIV.appendChild(outputContent)
  outputDIV.appendChild(deleteButton)
  outputDIV.appendChild(space)
  // Send data

  db.collection("blog_info").add(blog)
    .then(function(data) {
      console.log("Data Sent", data)

    })
    .catch(function(err) {
      console.log("this is an Error:", err)
    })
}