import sys
import json

def corr():
    with open("dataset.json", "r", encoding="utf-8") as file:
        data = file.readlines()
        data.insert(0, '{"filmes":[')
        data.append(']}')
        cont = 0
        for i in range(1,len(data)-2):
            cont += 1
            data[i] = data[i].replace("\n", ",\n")
        data = "".join(data)

    with open("dataset.json", "w", encoding="utf-8") as file:
        file.write(data)

def formatar_json(nome_arquivo):
    espacos_identacao = 4
    with open(nome_arquivo, 'r+') as arquivo:
        dados_json = json.load(arquivo)
        arquivo.seek(0)
        json.dump(dados_json, arquivo, indent=espacos_identacao)
        arquivo.truncate()


    
if __name__ == "__main__":
    corr()
    formatar_json("dataset.json")