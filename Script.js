
const taskList=[];

const taskelement=document.getElementById("tasklist");
const state=document.getElementById("state");


//voice reconition
const SpeechRecoginition= window.SpeechRecognition();
const recognition= new SpeechRecoginition();
recognition.continuous=false;
recognition.lang='en-US';


recognition.onresult=(data) =>{
    const transcript=data.results[0][0].transcript.toLowerCase();
    state.innerText=`Heard: "${transcript}"`;
    if(transcript.startsWith("naya task")){
        const taskText=transcript.replace("Naya task","").trim();
        if(textTask)
            AddTask(textTask);}




        else if(transcript.startWith("Delete Task 2"))  {
            const num=parseInt(transcript.split("")[2])-1;
        }
        if(!isNaN(num)){
            deleteTask(num);

        }
        function AddTask(Task){

        }

        function deleteTask(num){

        }



