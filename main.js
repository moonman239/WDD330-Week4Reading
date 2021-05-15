const quiz = [
    { name: "Superman",realName: "Clark Kent" },
    { name: "Wonder Woman",realName: "Diana Prince" },
    { name: "Batman",realName: "Bruce Wayne" },
    { name: "The Hulk",realName: "Bruce Banner" },
    { name: "Spider-man",realName: "Peter Parker" },
    { name: "Cyclops",realName: "Scott Summers" }
];
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
var exampleArray = ["Bruce","John","Wayne"];
exampleArray.shuffle();
alert(exampleArray);
const game = {
	start(quiz) { // note the lack of the "function" keyword. Why?
		this.questions = [...quiz]; // What exactly does this line do?
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
		var buttonTexts = [this.question.realName,this.questions[1].realName,this.questions[2].realName];
		
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