var ControllerQuestion = function (questions) {
    this.questions = questions;
    this.atualQuestion = 0;
};

ControllerQuestion.prototype.addQuestion = function (question) {
    $("#question").text("");
    $("#alternatives").text("");
    $("#question").text(question.questionName);
    for (var i = 0; i < question.alternatives.length; i++) {
        var id = question.alternatives[i].id;
        var name = question.alternatives[i].name;
        $("#alternatives").append("<input id='alternative" + i + "' type='checkbox' value='" + id + "'>" + name + "</input></br>");
    }
}

ControllerQuestion.prototype.nextQuestion = function () {
    var atual = this.atualQuestion;
    var question = this.questions[atual];
    this.addQuestion(question);
    this.atualQuestion += 1;
};

ControllerQuestion.prototype.validAlternative = function (corrects, alternative,i) {
    var correct = true;
    var checked = $("#alternative" + i).is(':checked');
    var value = $("#alternative" + i).val();
    if (checked) {
        if ($.inArray(value, corrects) == -1) {
            correct = false;
        }
    } else {
        if ($.inArray(value, corrects) >= 0) {
            correct = false;
        }
    }
    return correct;
};

ControllerQuestion.prototype.accountingScore =  function() {
    var correct  = this.isCorrectQuestion();
    if (correct){
    	alert("correct");
    }else{
      alert("incorrect");
    }    
    this.nextQuestion();
};

ControllerQuestion.prototype.isCorrectQuestion =  function() {
    var question = this.questions[this.atualQuestion];
    var  correct = true;
    var corrects = question.corrects.split(',');
    for (var i = 0; i < question.alternatives.length; i++) {
        var alternative = question.alternatives[i];
        correct = this.validAlternative(corrects, alternative,i);
        if (correct) break;
    }
    return correct;
};



var ParserQuestions = function () {
	this.onFinish = "";
};

ParserQuestions.prototype.getQuestions = function (onFinish) {
   var questions =  new Array();
    $.ajax({
        type: "GET",
        url: URL_SOURCE,
        dataType: "xml",
        success: function (xml) {
            iquestions = 0;
            $(xml).find('questions').find('question').each(function () {
                var question = new Object();
                question.alternatives = new Array();
                i = 0;
                $(this).find('alternatives').find('alternative').each(function () {
                    var alternative = new Object();
                    alternative.id = $(this).find('id').text();
                    alternative.name = $(this).find('name').text();
                    question.alternatives[i] = alternative;
                    i++;
                });
                question.questionName = $(this).find('question_name').text();
                question.corrects = $(this).find('corrects').text();
                questions[iquestions] = question;
                iquestions++;
            });
            onFinish(questions);
        }
    });
    
}

var parserQuestions =  new ParserQuestions();
var controllerQuestion;
var onFinish =  function (questions){
   controllerQuestion = new ControllerQuestion(questions);
   controllerQuestion.nextQuestion();
}
parserQuestions.getQuestions (onFinish);

