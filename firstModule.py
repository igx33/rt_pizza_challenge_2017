#Author: Igor Mandic

import requests, json

class Pizza():
    def __init__(self):
        self.name=None
        self.ingr=None
        self.price=None
    def __str__(self):
        return "{}".format(self.name)

def find_min_price(list):
    min_piz=list[0]
    min_pri=list[0].price

    for p in list:
        if min_pri>p.price:
            min_piz = p
            min_pri = p.price
    return min_piz

response = requests.get("http://coding-challenge.renderedtext.com/")
data = response.json()

list_of_pizzas =[]
all_pizzas_at_once = None

for val1  in data.values():
    all_pizzas_at_once=val1

# Let me fill list_of_pizzas the way I like it..
for one_pizza in all_pizzas_at_once:
    sp = Pizza()
    for key in one_pizza:
        if(type(one_pizza[key])==dict):
            sp.name=key
            for ing in one_pizza[key].values():
                sp.ingr=ing
        else:
            sp.price=one_pizza[key]
    if(sp.price!='nil' and sp.name!='nil'):
        list_of_pizzas.append(sp)

list_of_meats = ["ham", "cocktail_sausages", "salami", "crab_meat", "minced_meat", "sausage", "kebab", "minced_beef","anchovies","tuna","mussels","shrimps"]
list_of_cheases = ["mozzarella_cheese", "parmesan_cheese", "mozzarella", "blue_cheese", "goat_cheese"]

pgl=[[],[],[],[]] #0,1,2,3

#0 - Pizzas with meat
#1 - Pizzas with more than one type of cheese
#2 - Pizzas with meat and olives
#3 - Pizzas with mozzerella and mushrooms

#Pizzas with meat (PWM) calc.
for sinPiz in list_of_pizzas:
    found = False
    for ifp in sinPiz.ingr:
        for ifl in list_of_meats:
            if ifp==ifl:
                found=True
                break
    if found==True:
        pgl[0].append(sinPiz)

#Pizzas with more than one type of cheese (PWMTOTOC) calc.
for sinPiz in list_of_pizzas:
    counter =0
    for ifp in sinPiz.ingr:
        for ifl in list_of_cheases:
            if ifp==ifl:
                counter=counter+1
    if counter>1:
        pgl[1].append(sinPiz)

#Pizzas with meat and olives (PWMAO) calc.
for sinPiz in list_of_pizzas:
    found_meat=False
    found_olives=False
    for ifp in sinPiz.ingr:
        if(ifp=="olives" or ifp=="green_olives" or ifp=="black_olives"):
            found_olives=True

        for ifl in list_of_meats:
            if ifp==ifl:
                found_meat=True
                break
    if(found_meat==True and found_olives==True):
        pgl[2].append(sinPiz)

#Pizzas with mozzerella and mushroms (PWMAM) calc.
for sinPiz in list_of_pizzas:
    found_moz=False
    found_mushrooms=False
    for ifp in sinPiz.ingr:
        if ifp == "mozzarella_cheese" or ifp=="mozzarella":
            found_moz=True
        if ifp == "mushrooms":
            found_mushrooms=True
    if(found_moz==True and found_mushrooms==True):
        pgl[3].append(sinPiz)


#Calculate Percentages
list_of_percentages=[(len(pgl[0])/len(list_of_pizzas))*100, (len(pgl[1])/len(list_of_pizzas))*100, (len(pgl[2])/len(list_of_pizzas))*100, (len(pgl[3])/len(list_of_pizzas))*100]

#Get min. prices
list_of_min_prices = [find_min_price(pgl[0]), find_min_price(pgl[1]), find_min_price(pgl[2]), find_min_price(pgl[3])]

#Personal information
personal_info = dict()
personal_info["full_name"] = "Igor Mandic"
personal_info["email"]="igacpizcha@yahoo.com"
personal_info["code_link"]="https://github.com/igx33/rt_pizza_challenge_2017"

answer = []

#Create groups output so it looks nice and ... is nice

for i in range(0,4):
    gd = dict()
    gld = dict()
    gld["percentage"] = "{}%".format(list_of_percentages[i])
    gld["cheapest"]="{}, {}, {}".format(list_of_min_prices[i].name,list_of_min_prices[i].price,list_of_min_prices[i].ingr)
    gd["group_{}".format(i+1)]=gld
    answer.append(gd)

data_to_export = dict()
data_to_export["personal_info"]=personal_info
data_to_export["answer"]=answer

stringed = json.dumps(data_to_export)
print(stringed)

#Sending data to server..

headers = {'Content-type': 'application/json'}
r = requests.post("http://coding-challenge.renderedtext.com/submit", data=stringed, headers=headers)

print(r.status_code)
print(r.headers)
print(r.content)
