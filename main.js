alert("Welcome to Quiz Ninja!");

const quiz = [
    { name: "Superman",realName: "Clark Kent" },
    { name: "Wonder Woman",realName: "Diana Prince" },
    { name: "Batman",realName: "Bruce Wayne" },
    { name: "The Hulk",realName: "Bruce Banner" },
    { name: "Spider-man",realName: "Peter Parker" },
    { name: "Cyclops",realName: "Scott Summers" }
];

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
		var buttons = document.evaluate("//div[@id='response']\button", document, null, XPathResult.ANY_TYPE,null);
		
		this.question = this.questions.pop();
		document.getElementById("question").innerText = "What is " + this.question.name + "'s real name?";
		
	},
	check(button)
	{
		let response = button.value;
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