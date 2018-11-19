function button_click() {
  console.log("button_click!!");
}

var config = {
        apiKey: "<api-key-here>",
        authDomain: "sefp-tool.firebaseapp.com",
        databaseURL: "https://sefp-tool.firebaseio.com",
        projectId: "sefp-tool",
        storageBucket: "sefp-tool.appspot.com",
        messagingSenderId: "938786106931"
      };
firebase.initializeApp(config);


try{

function setDOMInfo(info) {
  var inform=info[2];
  //document.getElementById('dummy-paragraph').textContent = info[1];
  var rand = Boolean(Math.round(Math.random()));
  if(rand==true)
    document.getElementById('isoriginal').textContent='Original';
  else{
    document.getElementById('isoriginal').textContent='Duplicate';
    document.getElementById('linkoriginal').textContent='<link_to_original_post>'
  }
  document.getElementById('dummy-heading').textContent = "Question: "+info[0];
  document.getElementById('dummy-paragraph').textContent =info[1];
  // for(ele in info[2])
  // {
  //   var para = document.createElement("p");
  //   var node = document.createTextNode(info[2][ele]);
  //   para.appendChild(node);

  //   var element = document.getElementById("tag-elements");
  //   element.appendChild(para);
  // }
  document.getElementById("o_button").addEventListener("click", send_response);
  document.getElementById("d_button").addEventListener("click", send_response2);
  var s = function(sketch) {

  sketch.setup = function() {
    console.log("setup");
    //sketch.createCanvas(200, 200);
    //var elem = document.getElementById('dummy-paragraph');
    /* for using chrome extension's internal storage
    chrome.storage.sync.get('question', function(result) {
          elem.innerText = (result.question);
          console.log(result);
        });*/
    var info_length=info[2].length;
    var data = [];
    for (var i = 0; i < info[2].length; i++) {
      data.concat(info[2][i].length);
    }
    var width = 400, 
    height = 350,
    margin = 20,
    w = width - 2 * margin, 
    h = height - 2 * margin;

    var barWidth =  (h / info[2].length) * 0.8; 
    var barMargin = (h / info[2].length) * 0.2; 
    
    sketch.createCanvas(width, height);
    
    sketch.textSize(14);
    
    sketch.push();
    sketch.translate(margin, margin); 
    
    for(var i=0; i<info[2].length; i++) {
      sketch.push();
      sketch.fill('steelblue');
      sketch.noStroke();
      sketch.translate(0, i* (barWidth + barMargin)); 
      sketch.rect(0, 0, info[2][i].length*20, barWidth); 

      sketch.fill('#FFF');
      sketch.text(info[2][i]+","+info[2][i].length, 5, barWidth/2 + 5);

      sketch.pop();
          }
          
          sketch.pop();
        };

        // sketch.draw = function() {
        //   sketch.background(0);
        //   sketch.fill(255);
        // };

      };

      var myp5 = new p5(s);


}
window.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'ele_question'},
        setDOMInfo);
  });
});
function send_response()
{
  var review = document.getElementById("review").value;
  var firebaseRef = firebase.database().ref();
  firebaseRef.child(review).set("original",function(error){
    if(error){
      alert(error);
    }
    else
    {
      alert("success");
    }
  });
  // var firebaseRef = firebase.database().ref('duplicate/');
  // firebaseRef.set(review,function(error) {
  //   if (error) {
  //     alert(error);
  //   } else {
  //     // Data saved successfully!
  //     alert("success")
  //   }
  // });
  alert("review sent");
}
function send_response2()
{
  var review = document.getElementById("review").value;
  var firebaseRef = firebase.database().ref();
  firebaseRef.child(review).set("duplicate",function(error){
    if(error){
      alert(error);
    }
    else
    {
      alert("success");
    }
  });
  // firebaseRef.set(review,function(error) {
  //   if (error) {
  //     alert(error);
  //   } else {
  //     // Data saved successfully!
  //     alert("success")
  //   }
  // });
  alert("review sent");
}

}
catch(e){
  console.log(e);
}

