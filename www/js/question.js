

var ResultQuestion  =  function (){ 
  this.total = 10;
  this.corrects = 0;
  this.incorrects = 0;
};


ResultQuestion.prototype.getPercentageResult = function () {
   return (this.corrects*100)/this.total;
};

ResultQuestion.prototype.clear = function () {
   this.corrects = 0;
   this.incorrects = 0;
};

var ControllerQuestion = function (questions,result) {
    this.questions = questions;
    this.atualQuestion = 0;
    this.result = result;
    this.shuffle(this.questions);
};

ControllerQuestion.prototype.shuffle = function (arr) {
   for(
      var j, x, i = arr.length; i;
      j = parseInt(Math.random() * i),
      x =  arr[--i],  arr[i] =  arr[j],  arr[j] = x
    );
};



ControllerQuestion.prototype.addQuestion = function (question) {
    $("#question").text("");
    $("#alternatives").text("");
    $("#question").text(question.questionName);
    this.shuffle(question.alternatives);
    for (var i = 0; i < question.alternatives.length; i++) {
        var id = question.alternatives[i].id;
        var name = question.alternatives[i].name;
        $("#alternatives").append("<input id='alternative" + i + "' type='checkbox' value='" + id + "'>( "+ id +" ) "+ name + "</input></br>");
    }
}

ControllerQuestion.prototype.nextQuestion = function () {
    var atual = this.atualQuestion;
    var question = this.questions[atual];
    this.addQuestion(question);
};

ControllerQuestion.prototype.validAlternative = function (corrects, alternative,i) {
    var correct = true;
    var checked = $("#alternative" + i).is(':checked');
    var value = $("#alternative" + i).val();
    var countChecked = 0;
    if (checked) {
        if ($.inArray(value, corrects) == -1) {
            correct = false;
        }
        countChecked += 1;
    } else {
        if ($.inArray(value, corrects) >= 0) {
            correct = false;
        }
    }
    if (countChecked == 0) return false;
    return correct;
};

ControllerQuestion.prototype.accountingScore =  function() {
    var correct  = this.isCorrectQuestion();
    (correct == true) ?this.result.corrects += 1:this.result.incorrects += 1;  
    alert(this.questions[this.atualQuestion].corrects)
    this.nextQuestion();
    (this.atualQuestion >= 10) ? this.clear():
    $('#total').text(this.result.getPercentageResult());
    $('#corrects').text(this.result.corrects);
    $('#incorrects').text(this.result.incorrects);
    this.atualQuestion += 1;
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


ControllerQuestion.prototype.clear =  function() {
    this.result.clear();
    this.atualQuestion  = 0;
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
var resultQuestion = new ResultQuestion();

var onFinish =  function (questions){
   controllerQuestion = new ControllerQuestion(questions,resultQuestion);
   controllerQuestion.nextQuestion();
}
parserQuestions.getQuestions (onFinish);

