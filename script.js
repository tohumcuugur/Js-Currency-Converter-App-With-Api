const api_key = "665293304a60491de5ecdad3";
const url = "https://v6.exchangerate-api.com/v6/" + api_key

const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const amount = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");



fetch(url + "/codes")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const items = data.supported_codes;
    let options;
    for (let item of items){    // ***********ÖNEMLİ************* for of string ve arrayler için kullanılabilir for in ise objeler için kullanılabilir.
      // console.log(`${item}: ${items[item]}`);
        options += `<option value=${item[0]}>${item[1]}</option>`
    }
    list_one.innerHTML= options;
    list_two.innerHTML= options;

  })

calculate.addEventListener("click", () =>{
  const doviz1 = currency_one.value;
  const doviz2 = currency_two.value;
  const miktar = amount.value;
  const doviz5 = "Azerbaijan Manat";
  const doviz6 = "Sterlin";
  const doviz7 = "Ukrayna Grivnası";

  console.log(doviz1, doviz2, miktar);

  fetch(url + "/latest/" + doviz1)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const sonuc = (data.conversion_rates[doviz2] * miktar).toFixed(2);
      const manatSonuc = (data.conversion_rates.AZN * miktar).toFixed(2);
      const sterlinSonuc = (data.conversion_rates.GBP * miktar).toFixed(2);
      const ukraynaGrivnasıSonuc = (data.conversion_rates.UAH * miktar).toFixed(2);


      result.innerHTML = `
        <div class="card border-primary">
          <div class="card-body text-center" style="font-size:30px;">
            ${miktar} ${doviz1}  = ${sonuc} ${doviz2} 
          </div>
        </div>
        <div id="another-results">
          <div class="card border-secondary mt-5">
            <div class="card-body text-center" style="font-size:30px;">
              <div class="d-flex flex-column">
                <span>${miktar} ${doviz1} = ${manatSonuc} ${doviz5}</span>
                <hr />
                <span>${miktar} ${doviz1} = ${sterlinSonuc} ${doviz6}</span>
                <hr />
                <span>${miktar} ${doviz1} = ${ukraynaGrivnasıSonuc} ${doviz7}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    })
})