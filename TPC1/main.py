import os
import xmltodict
import xml.etree.ElementTree as ET


def constroi_rua(element):
    html_content = ''
    meta_numero = element.find('meta/número')
    meta_nome = element.find('meta/nome')

    if meta_numero is not None:
        html_content += "<h1>{}</h1>".format(meta_numero.text)
    if meta_nome is not None:
        html_content += "<h2>{}</h2>".format(meta_nome.text)

    for para in element.findall('.//corpo/para'):
        html_content += f"<p>{ET.tostring(para, method='text', encoding='unicode')}</p>"
    return html_content

def constroi_imagem(ficheiro, rua):
    imgs = []
    with open(f"./MapaRuas-materialBase/texto/{ficheiro}", "r+", encoding="utf-8") as ruaXML:
        ficheiroXML = ruaXML.read()
        ruaDict = xmltodict.parse(ficheiroXML)
        corpo = ruaDict['rua']['corpo']
        figuras = corpo['figura']

        rua += "<h2>Figuras</h2>"
        if isinstance(figuras, list):
            for image in figuras:
                imgs.append(("../MapaRuas-materialBase" + image['imagem']['@path'][2:], image['legenda']))
        else:
            imgs.append(("../MapaRuas-materialBase" + figuras['imagem']['@path'][2:], figuras['legenda']))
        for img in imgs:
            rua += f'<img src="{img[0]}" alt="{img[1]}"><br>'
            rua += f'<p>{img[1]}</p>'
    return rua


def constroi_casa(element, ficheiro, rua):
    casas = element.find('.//lista-casas')
    if casas is not None:
        rua += "<h2>Casas</h2>"
        for casa in casas.findall('.//casa'):
            num = casa.find('.//número')
            rua += f"<h3>{num.text}</h3>"
            enfiteuta = casa.find('.//enfiteuta')
            if enfiteuta is not None:
                rua += f"<p>Enfiteuta: {enfiteuta.text}</p>"
            foro = casa.find('.//foro')
            if foro is not None:
                rua += f"<p>Foro: {foro.text}</p>"
            desc = casa.find('.//desc/para')
            if desc is not None:
                test = ET.tostring(desc, method='text', encoding='unicode').strip()
                rua += f"<p>Descrição: {test}</p>"

    filename = ficheiro.split(".xml")[0]
    with open(f"./Ruas/{filename}.html", "w") as f:
        f.write(rua)


def constroi_indice(ruas, nomes_para_ficheiros):
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
    for rua in nomes_para_ficheiros:
        indice += f'<a href="./Ruas/{rua}.html">{rua.split("-")[2]}</a><br>'
    indice += "</body></html>"
    return indice


def main():
    os.makedirs("Ruas", exist_ok=True)
    nomes_para_ficheiros = []
    ficheiros = []
    ruas = []
    for rua in os.listdir("./MapaRuas-materialBase/texto"):
        nomes_para_ficheiros.append(rua.split(".xml")[0])
        ficheiros.append(rua)
        ruas.append(rua.split("-")[2].split(".xml")[0])
    ruas = sorted(ruas)
    htmlindex = constroi_indice(ruas, nomes_para_ficheiros)
    with open("index.html", "w") as f:
        f.write(htmlindex)

    for ficheiro in ficheiros:
        xml_file = f"./MapaRuas-materialBase/texto/{ficheiro}"
        tree = ET.parse(xml_file)
        element = tree.getroot()
        rua = constroi_rua(element)
        rua = constroi_imagem(ficheiro, rua)
        constroi_casa(element, ficheiro,rua)

if __name__ == "__main__":
    main()
