alert("Welcome to Quiz Ninja!");

const quiz = [
{name: "Superman", realName: "Clark Kent"},
{name: "Wonder Woman", realName: "Diana Prince"},
{name: "Batman", realName: "Bruce Wayne"}];

const game = {
	start(quiz) { // note the lack of the "function" keyword. Why?
		this.questions = [...quiz]; // What exactly does this line do?
		this.score = 0;
		for (const question of this.questions){
			this.question = question; // this.question has object-wide scope
			var response = this.ask();
			this.check(response);
		}
		this.gameOver();
	},
	ask()
	{
		const question = "What is " + this.question.name + "'s real name?";
		var response = prompt(question);
		return response;
	},
	check(response)
	{
		const answer = this.question.realName;
		if (response === answer)
		{
			alert("Correct!");
			this.score++;
		}
		else
		{
			alert("Wrong! The correct answer was " + answer);
		}
	},
	gameOver()
	{
		var s = this.score === 1 ? "" : "s";
		alert("Game Over, you scored " + this.score + " point" + s);
	}
}
game.start(quiz);