import json

def concatenate_json_file(periodos, file_raw):
    with open(file_raw, "r", encoding="utf-8") as file:
        data = json.load(file)
        pers = []
        cont = 0
        nomes_por_periodo = {}
        for periodo in periodos:
            for compositor in periodos[periodo]:
                nome = compositor.split(";")[0]
                if periodo in nomes_por_periodo:
                    nomes_por_periodo[periodo].append(nome)
                else:
                    nomes_por_periodo[periodo] = [nome]

        for periodo in periodos:
            cont += 1
            pers.append({
                "id": periodo,
                "compositores": nomes_por_periodo[periodo]
            })
    data["periodos"] = pers
       
    with open("dataset.json", "w", encoding="utf-8") as file:
        json.dump(data, file, indent=5, ensure_ascii=False)
            

def read_json_file():

    periodos = {}
    with open("dataset_raw.json", "r", encoding="utf-8") as file:
        data = json.load(file)
        compositores = data["compositores"]
        for compositor in compositores:
            print("entrei")

            if "periodo" not in compositor:
                if "Outro" in periodos:
                    periodos["Outro"].append(compositor["nome"] + ";" + compositor["id"])
                else:
                    if "nome" in compositor:
                        if "id" in compositor:
                            periodos["Outro"] = [compositor["nome"] + ";" + compositor["id"]]
                        else:
                            periodos["Outro"] = [compositor["nome"]+ ";" + "id"]
                    elif "id" in compositor:
                        periodos["Outro"] = ["Unnamed;"+compositor["id"]]

            else:
                periodo = compositor["periodo"]
                if periodo in periodos:
                    periodos[periodo].append(compositor["nome"] + ";" +compositor["id"])
                else:
                    periodos[periodo] = [compositor["nome"] + ";" + compositor["id"]]
        
        concatenate_json_file(periodos, "dataset_raw.json")


    
    

if __name__ == "__main__":
    read_json_file()