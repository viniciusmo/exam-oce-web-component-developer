import re
linestring = open('custom_tags_questions.txt', 'r').read()
result = ''.join(linestring)

linestring = open('custom_tags_questions_respostas.txt', 'r').read()
result_respostas = ''.join(linestring)
rerespostas = re.compile ('<li>.*?</li>')
arrayresultado = []

resultado_respostas = rerespostas.findall(result_respostas)

for item_resposta in resultado_respostas:
     arrayresultado.append(item_resposta.replace("<li>","").replace("</li>",""))
     
requestions = re.compile ("question.+?999\n\n", re.DOTALL)
result_requestions = requestions.findall(result)
realternativas = re.compile ('111.+?999', re.DOTALL)

total = 0
resultado = []
resultado.append("<questoes>")
for item in result_requestions:
	 result_alternativas = realternativas.findall(item)
	 alternativa = 'a'
	 resultado.append("<questao>")
	 resultado.append("<alternativas>")
	 
	 for item_alternativa in result_alternativas:
	     resultado.append("<alternativa>")
	     resultado.append("<name><![CDATA[")
	     resultado.append(item_alternativa.replace('111','').replace('999',''))
	     resultado.append("]]></name>")
	     resultado.append("<id>"+alternativa+"</id>")
	     alternativa = chr(ord(alternativa) + 1)
	     resultado.append("</alternativa>")
	 resultado.append ("<corretas>")
	 resultado.append (arrayresultado[total].replace(" ",""))
	 resultado.append ("</corretas>")	 
	 resultado.append("</alternativas>")
	 item = re.sub('111.+?999',"",item)
	 resultado.append("<pergunta><![CDATA[")
	 resultado.append(item.replace("question.",""))
	 resultado.append("]]></pergunta>")
	 resultado.append("</questao>")
	 total = total + 1
resultado.append("</questoes>")

myFile = open('custom_tags_questions.xml', 'w')
myFile.write(''.join(resultado))
myFile.close()
print total


