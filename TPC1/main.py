import os
import xmltodict

def constroi_rua(ficheiro):
    rua = """
    <!DOCTYPE html>
    <html lang="pt PT">
    <head>
    """
    with open(f"./MapaRuas-materialBase/texto/{ficheiro}", "r+", encoding="utf-8") as ruaXML:
        ficheiroXML = ruaXML.read()
        ruaDict = xmltodict.parse(ficheiroXML)
        meta = ruaDict['rua']['meta']
        corpo = ruaDict['rua']['corpo']
        figuras = corpo['figura']
        informacoes = corpo['para']
        rua += f'<title>{meta['nome']}</title>'
        rua += "</head>"
        rua += "<body>"
        rua += f"<h1><b>{meta['nome']}</b></h1>"
        rua += f"<h2>Número: {meta['número']}</h2><hr>"
        rua+= "</body>"
        rua += "</html>"
        nomeSemEspacos = meta['nome'].replace(" ", "")
        with open(f"./Ruas/{nomeSemEspacos}.html", "w") as f:
            f.write(rua)
            print(nomeSemEspacos)

def constroi_indice(ruas):
    indice = """
    <!DOCTYPE html>
    <html lang="pt PT">
    <head>
        <title>Índice</title>
        <meta charset="utf-8">
    </head>

    <body>
        <h1> Índice </h1>
    """
    for rua in ruas:
        indice += f'<a href="./Ruas/{rua}.html">{rua}</a><br>'
    indice += "</body></html>"
    return indice


def main():
    os.makedirs("Ruas", exist_ok=True)
    ficheiros = []
    ruas = []
    for rua in os.listdir("./MapaRuas-materialBase/texto"):
        ficheiros.append(rua)
        ruas.append(rua.split("-")[2].split(".xml")[0])
    ruas = sorted(ruas)
    htmlindex = constroi_indice(ruas)
    with open("index.html", "w") as f:
        f.write(htmlindex)

    for ficheiro in ficheiros:
        constroi_rua(ficheiro)

if __name__ == "__main__":
    main()