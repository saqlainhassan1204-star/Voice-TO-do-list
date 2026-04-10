const tasklist=[];
const elementlist=document.getElementById("tasklist");
const statustext=document.getElementById("status");

//speech reogonition
let SpeechRecognition=window.SpeechRecognition ||window.webkitSpeechRecognition; 

let recognition=new SpeechRecognition();
recognition.continuous=false;
recognition.lang="en-US";
//event
recognition.onresult=(event)=>{
    let transcript=event.results[0][0].transcript.toLowerCase();
    statustext.innerText=`Heard:"${transcript}"`;
    if(transcript.startsWith("naya task")){
    let task=transcript.replace("naya task","").trim();
    if(task)
        AddTask(task);
    




    else if (transcript.startsWith("delete task")){
        let num=parseInt(transcript.split(" ")[2]-1);
        if(!isNaN(num)){
        DeleteTask(num);
        }

    }

else if(transcript.startsWith("mark task")){
    let num=parseInt(transcript.split(" ")[2]-1);
    if(!isNaN(num)){
        MarkTask(num);
    }


}

}


function AddTask(task){
    tasklist.push({text:task,done:false});
    RenderTask();

}






function DeleteTask(num){
    if(tasklist[num]){
        tasklist.splice(num,1);
    }
RenderTask();

}



function MarkTask(num){
if(tasklist[num]){
    tasklist[num].done=true;
}
RenderTask();
}



 function RenderTask(){
    elementlist.innerHTML="";
    tasklist.forEach((task,idx)=>{
    let li=document.createElement("li");


        li.innerText=`${idx+1} ${task.text} ${task.done? "✅":""}`;
        elementlist.appendChild(li);

    });


 }


 function Start(){
    statustext.innerText="Listening...";
    recognition.start();
 }
 

 document.getElementById("startbtn").addEventListener("click",Start);