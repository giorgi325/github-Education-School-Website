const firebaseConfig = {
  apiKey: "AIzaSyDarX2f_Ap1SeRTedYhyKnlGlbPWoiIjPU",
  authDomain: "satesto-25969.firebaseapp.com",
  databaseURL: "https://satesto-25969-default-rtdb.firebaseio.com",
  projectId: "satesto-25969",
  storageBucket: "satesto-25969.appspot.com",
  messagingSenderId: "777380839398",
  appId: "1:777380839398:web:78e0a11733b0b7e6372027",
  measurementId: "G-36F3HXJMFF",
};

function generateFirebaseItem(ID, value) {
  return {
    id: ID,
    data: value,
  };
}

function addElementInFirebase(REF, data) {
  firebase.database().ref(`${REF}/${randomID()}`).set(data);
}

firebase.initializeApp(firebaseConfig);

function randomID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getRefFromFirebase(REF) {
  let tempArray = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (respons) => {
      respons.forEach((element) => {
        tempArray.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return tempArray;
}

function getElementFromFirebase(REF, id) {
  const array = getArrayFrmFirebase(REF);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      array.forEach((element) => {
        if (element.id === id) {
          resolve(element);
        }
      });
      reject("404");
    }, 1000);
  });
}
