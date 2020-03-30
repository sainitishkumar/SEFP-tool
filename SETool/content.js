console.log("hello!!!!! from content.js");

try
{
	var titleTag = document.getElementById('question-header');
	var title = titleTag.getElementsByClassName('grid--cell fs-headline1 fl1')[0].innerText

	var questionTag = document.getElementById('question');
	var question = questionTag.getElementsByClassName('post-text')[0].getElementsByTagName('p')[0].innerText;

	var tags = document.getElementsByClassName('grid ps-relative d-block')[0].innerText.split(" ");


	//getElementById('dummy-paragraph').innerText = question;
	//console.log(question);
    

	/*	for using chrome extension's storage:
    	chrome.storage.sync.set({'question':question.slice(0,question.length)}, function() {console.log('Saved');});
    */

    /*  for sending msg to background script
    	chrome.runtime.sendMessage(question);
    	console.log("message sent");
	*/

    chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	  if ((msg.from === 'popup') && (msg.subject === 'ele_question')) {
	    var domInfo = [title,question,tags];
	    response(domInfo);
	  }
	});

}

catch(e)
{
	console.log(e);
}