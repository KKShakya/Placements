// I have not hiddent the APi key and Toekn on purpose
// because trello account is on free-trial and that too created by tempmails; 


const form = document.querySelector('#container>form')
//base url being setup
const url = 'https://api.trello.com/1/cards'


//a function to create a card
function get_card_details(e,url){

  e.preventDefault();
  
  //aadding details from form directly to params
  const params = {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({

      idList: "646f2e2d029131a102b957ce",
      key:"73d62481845725daa44b9cdfe5c58794",
      token:"ATTA2c3996d9f3995f5ed57c8660e23b334e87dd3cfe2311b25ae83d2d1ff975baec9462BA78",
      name:form.name.value,
      desc: form.desc.value,
      start:form.start.value,
      due:form.due.value,

    })
   }
   //fetch api to make post request with params
   create_card(url,params)
  
}

// ***********
form.addEventListener('submit',(e)=>get_card_details(e,url))
//* ***********


const create_card = (url,params)=>{

  fetch(url,params)
  .then((response) => response.json())

  .then((createdCard) => {
    alert('New card created successfully!');
    console.log(createdCard)
  })
  .catch(error => {
    console.error('Error:', error);
  });

}

