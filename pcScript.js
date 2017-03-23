 //Author: Igor Mandić 
 //Purpose: Competing in "RenderedText's Pizza Coding Challenge 2017"



 var getURL = "http://coding-challenge.renderedtext.com/";
 var sendURL = "http://coding-challenge.renderedtext.com/submit";

 var result;

 $(document).on('click', '#get_menu_button', function (e) {

     $.ajax({
         type: 'GET',
         url: getURL,
         dataType: "text",
         success: function (data) {
             $('#original_json').empty();
             $('#original_json').append(data);

             processing_function(data);
         }
     });

 });

 $(document).on('click', '#send', function (e) {
     console.log("REZULTAT:");
     console.log(result);

     $.ajax({
				type:'POST',
				url : sendURL,
				contentType:'application/json',
				dataType : "text",
				data: result,
				success : function(data)
				{
					$('#end').empty();
					$('#end').append("<h2>Result has been sent to the server!</h2>");
				}	
			});

 });

 function processing_function(data) {
     var pl = $.parseJSON(data);
     var menu = pl.pizzas;

     var list_of_meats = ["ham", "cocktail_sausages", "salami", "crab_meat", "minced_meat", "sausage", "kebab", "minced_beef","anchovies","tuna","mussels","shrimps"];
     var list_of_cheases = ["mozzarella_cheese", "parmesan_cheese", "mozzarella", "blue_cheese", "goat_cheese"];

     var list_of_pizzas = [];
     var pwm = [];
     var pwmtotoc = [];
     var pwmao = [];
     var pwmam = [];

     //Constructing list of pizzas from recieved JSON
     for (var i in menu) {
         var single_pizza = {};
         for (var object in menu[i]) {
             if (object !== "nil") {
                 single_pizza.name = object;
                 single_pizza.price = menu[i].price;

                 for (var ing in menu[i][object]) {
                     single_pizza.ingredients = menu[i][object][ing];
                 }
                 list_of_pizzas.push(single_pizza);
             }
             break;
         }
     }

     //Detecting pizzas with meat
     for (var i in list_of_pizzas) {
         for (var y in list_of_pizzas[i].ingredients) {
             ingredient = list_of_pizzas[i].ingredients[y];
             var found = false;
             for (var x in list_of_meats) {
                 if (ingredient == list_of_meats[x]) {
                     found = true;
                     break;
                 }
             }
             if (found == true) {
                 pwm.push(list_of_pizzas[i]);
                 break;
             }
         }
     }
     console.log(pwm);

     //Pizzas with more than one type of cheese
     for (var i in list_of_pizzas) {
         var counter = 0;
         for (var y in list_of_pizzas[i].ingredients) {
             ingredient = list_of_pizzas[i].ingredients[y];

             for (var x in list_of_cheases) {
                 if (ingredient == list_of_cheases[x]) {
                     counter++;
                 }
             }

         }
         if (counter > 1) {
             pwmtotoc.push(list_of_pizzas[i]);
         }
     }

     console.log(pwmtotoc);

     //Pizzas with meat and olives
     for (var i in list_of_pizzas) {
         var found_meat = false;
         var found_olives = false;
         for (var y in list_of_pizzas[i].ingredients) {
             ingredient = list_of_pizzas[i].ingredients[y];

             if (ingredient == "olives" || ingredient == "green_olives" || ingredient == "black_olives") {
                 found_olives = true;
             }

             for (var x in list_of_meats) {
                 if (ingredient == list_of_meats[x]) {
                     found_meat = true;
                     break;
                 }
             }

         }

         if (found_meat == true && found_olives == true) {
             pwmao.push(list_of_pizzas[i]);

         }
     }

     console.log(pwmao);

     //Pizzas with mozzarela and mushrooms
     for (var i in list_of_pizzas) {
         var found_moz = false;
         var found_mushrooms = false;
         for (var y in list_of_pizzas[i].ingredients) {
             ingredient = list_of_pizzas[i].ingredients[y];

             if (ingredient == "mozzarella_cheese" || ingredient == "mozzarella") {
                 found_moz = true;
             }

             if (ingredient == "mushrooms") {
                 found_mushrooms = true;
             }

         }

         if (found_moz == true && found_mushrooms == true) {
             pwmam.push(list_of_pizzas[i]);

         }
     }

     console.log(pwmam);

     var percentage_pwm = (pwm.length / list_of_pizzas.length) * 100;
     var percentage_pwmtotoc = (pwmtotoc.length / list_of_pizzas.length) * 100;
     var percentage_pwmao = (pwmao.length / list_of_pizzas.length) * 100;
     var percentage_pwmam = (pwmam.length / list_of_pizzas.length) * 100;

     console.log(percentage_pwm);
     console.log(percentage_pwmtotoc);
     console.log(percentage_pwmao);
     console.log(percentage_pwmam);
     
     //Calculate cheapest pizzas
     
     var pwm_min=find_min_price(pwm);
     var pwmtotoc_min=find_min_price(pwmtotoc);
     var pwmao_min=find_min_price(pwmao);
     var pwmam_min=find_min_price(pwmam);

     console.log(pwm_min);
     console.log(pwmtotoc_min);
     console.log(pwmao_min);
     console.log(pwmam_min);

     
    var  personal_infox ={};
     personal_infox.full_name="Igor Mandic";
     personal_infox.email="igacpizcha@yahoo.com";
     personal_infox.code_link="https://github.com/igx33/rt_pizza_challenge_2017";
    
    var answerx=[];
    
    var group_1 ={};
     group_1.percentage=percentage_pwm+"%";
     group_1.cheapest=pwm_min;

    var group_2 ={};
     group_2.percentage=percentage_pwmtotoc+"%";
     group_2.cheapest=pwmtotoc_min;
     
    var group_3 ={};
     group_3.percentage=percentage_pwmao+"%";
     group_3.cheapest=pwmao_min;
     
    var group_4 = {};
     group_4.percentage= percentage_pwmam+"%";
     group_4.cheapest=pwmam_min;
     
     var x1 ={};
     x1.group_1=group_1;
     var x2 ={};
     x2.group_2=group_2;
     var x3 ={};
     x3.group_3=group_3;
     var x4 ={};
     x4.group_4=group_4;
    
    answerx.push(x1);
    answerx.push(x2);
    answerx.push(x3);
    answerx.push(x4);
     
     
    result= JSON.stringify({
    
         "personal_info":personal_infox,
         "answer" : answerx
    });
    
    //result_of_processing
         
    $('#result_of_processing').empty();
    $('#result_of_processing').append(result);
     


 }

function find_min_price(list)
{
    var min_piz=list[0];
    var min_pri=list[0].price;
    
    for(var i=0; i<list.length; i++)
        {
            if(min_pri>list[i].price)
                {
                    min_piz=list[i];
                    min_pri=list[i].price;
                }
        }
    
    return min_piz;
}
