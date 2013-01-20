import re
linestring = open('el_questions.txt', 'r').read()
result = ''.join(linestring)
requestions = re.compile ('question.+?999\n\n', re.DOTALL)
result_requestions = requestions.findall(result)
realternativas = re.compile ('111.+?999', re.DOTALL)

total = 0
for item in result_requestions:
	 result_alternativas = realternativas.findall(item)
	 alternativa = 1
	 for item_alternativa in result_alternativas:
	    print str(alternativa) +" " + item_alternativa.replace('111','').replace('999','')
	    alternativa = alternativa + 1
	 item = re.sub('111.+?999',"",item)
	 print "\n"
	 print item
	 print "\n"
	 total = total + 1
print total

