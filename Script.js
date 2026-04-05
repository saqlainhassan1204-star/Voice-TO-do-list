let tasklist = [];
const elementlist = document.getElementById("tasklist");
const statusText = document.querySelector(".status");

// Speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false;

//  Status + Voice Result
recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript.toLowerCase();

    statusText.innerHTML = `Heard: ${transcript}`;

    //  Add Task
    if (transcript.startsWith("naya task")) {
        let task = transcript.replace("naya task", "").trim();

        if (task) {
            Addtask(task);
        }
    }

    // 🗑 Delete Task
    else if (transcript.startsWith("delete task")) {
        let num = parseInt(transcript.split(" ")[2]) - 1;

        if (!isNaN(num)) {
            deleteTask(num);
        }
    }

    // ✅ Mark Task
    else if (transcript.startsWith("mark task")) {
        let num = parseInt(transcript.split(" ")[2]) - 1;

        if (!isNaN(num)) {
            Marktask(num);
        }
    }
};

//  Add Task
function Addtask(task) {
    tasklist.push({ text: task, done: false });
    RenderTask();
}

// Delete Task
function deleteTask(num) {
    if (num >= 0 && num < tasklist.length) {
        tasklist.splice(num, 1);
        RenderTask();
    }
}

// ✅ Mark Task
function Marktask(num) {
    if (tasklist[num]) {
        tasklist[num].done = true;
        RenderTask();
    }
}

// 🔁 Render Tasks (forEach)
function RenderTask() {
    elementlist.innerHTML = "";

    tasklist.forEach((task, idx) => {
        const li = document.createElement("li");

        li.innerText = `${idx + 1}. ${task.text} ${task.done ? "✅" : ""}`;

        elementlist.appendChild(li);
    });
}

// ▶ Start Listening
function Start() {
    statusText.innerText = "Listening...";
    recognition.start();   // ✅ FIXED (small s)
}

// Button Event
const startbtn = document.getElementById("startbtn");
startbtn.addEventListener("click", Start);