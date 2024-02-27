import json
import os


def main():
    file = open("cities.json", "r", encoding="utf-8").read()
    data = json.loads(file)
    os.makedirs("Cities", exist_ok=True)

        
    cidades = {}
    for city in data['cidades']:
        ident = city["id"]
        nome = city["nome"]
        cidades[ident] = nome

    for city in data['cidades']:
        with open(f"Cities/{city['id']}.html", "w", encoding="utf-8") as f:
            html = """
                <!DOCTYPE html>
                <html lang="pt PT">
                <head>
                    <title>Índice</title>
                    <meta charset="utf-8">
                </head>

                <body>
                """
            html += f'<h1>{city["nome"]}</h1>'
            html += f'<p><b>População:</b> {city["população"]}</p>'
            html += f'<p><b>Descrição:</b> {city["descrição"]}</p>'
            html += f'<p><b>Distrito:</b> {city["distrito"]}</p>'

            ident = city["id"]

            html += "<h2>Ligações</h2>"
            html += "<ul>"
            for lig in data['ligações']:
                if lig["origem"] == ident:
                    destino = lig["destino"]
                    distancia = lig["distância"]
                    nome = cidades[destino]
                    string = ( "<b>"+nome + "</b> - <i>" + str(distancia) + " km</i>  ")
                    html += "<li>" + string + "</li>"
            html += "</ul>"
            html += "</body></html>"
            f.write(html)



if __name__ == "__main__":
    main()