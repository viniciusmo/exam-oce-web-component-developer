ControllerQuestion (questions)
var atualQuestion
var questions

->isCorrectQuestion(question)
->nextQuestion

ParserQuestion
->getQuestions


var ControllerQuestion =  function(questions){
	this.questions = questions;
	this.atualQuestion = 0;
};

ControllerQuestion.prototype.nextQuestion = function () {
	 var atual = this.atualQuestion;
	 var query =  this.questions[atual].query;
	 var size = this.questions[atual].alternatives.length;
	 $("#question").text(query);

     for (var j = 0; j < questoes[contQuestion].alternativas.length; j++) {
     	    var id = questoes[contQuestion].alternativas[j].id;
			$("#alternatives").append("<input id='alternative"+j+"' type='checkbox' value='"+questoes[contQuestion].alternativas[j].id+"'>"+questoes[contQuestion].alternativas[j].name+"</input></br>");
	 }
						contQuestion = contQuestion + 1;
};