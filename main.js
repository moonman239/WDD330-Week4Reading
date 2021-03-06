// Use the Fetch API to grab quiz questions from SitePoints's S3 account.\
const url = "questions.json";
const view = document.getElementById("question");
fetch(url).then(response => {
	if (response.ok)
	{
		return response.json();
	}
	else
	{
		throw new Error("AJAX error " + response.status);
	}
}).then(quiz => {
	game.start(quiz);
})

// Shuffle array in-place.
Array.prototype.shuffle = function () {
	for (var i=0; i<this.length; i++)
	{
		const j = Math.floor(Math.random() * (this.length - 1))
		var object1 = this[j];
		var lastObject = this.pop();
		this.push(object1);
		this[j] = lastObject;
	}
}

const game = {
	start(quiz) { // note the lack of the "function" keyword. Why?
		this.questions = [...quiz]; // What exactly does this line do?
		this.answers = this.questions.map(x => x.realName);
		this.score = 0;
		this.ask();
	},
	ask()
{
		if (this.questions.length == 0)
		{
			this.gameOver();
			return;
		}
		var buttons = document.evaluate("//div[@id='response']/button", document, null, XPathResult.ANY_TYPE,null);
		this.questions.shuffle();
		this.question = this.questions.pop();
		var incorrectAnswers = this.answers.filter(x => x != this.question.realName);
		incorrectAnswers.shuffle();
		var buttonTexts = [this.question.realName,incorrectAnswers[0],incorrectAnswers[1]];
		buttonTexts.shuffle();
		var nodes = [];
// https://stackoverflow.com/questions/47017441/how-to-use-array-from-with-a-xpathresult
let node = buttons.iterateNext();
while (node) {
  nodes.push(node);
  node = buttons.iterateNext();
}
		nodes[0].innerText=buttonTexts[0];
		nodes[1].innerText=buttonTexts[1];
		nodes[2].innerText=buttonTexts[2];
		document.getElementById("question").innerText = "What is " + this.question.name + "'s real name?";
		
	},
	check(button)
	{
		let response = button.innerText;
		const answer = this.question.realName;
		if (response === answer)
		{
			document.getElementById("correct").innerText = "Correct!";
			this.score++;
			document.getElementById("score").innerText = this.score;
		}
		else
		{
			document.getElementById("correct").innerText = "Wrong! The correct answer was " + answer;
		}
this.ask();
	},
	gameOver()
	{
		var s = this.score === 1 ? "" : "s";
		document.getElementById("correct").innerText = "Game Over, you scored " + this.score + " point" + s;
	}
}
game.start(quiz);