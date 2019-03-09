const axios = require('axios')
const swal = require('sweetalert')

const h = document.getElementById("h")
const ip = document.getElementById("ip")
const btn = document.getElementById("btn")

btn.addEventListener('click',(event)=>{
    console.log("jhgjhghg")

    // axios.post('http://10042b1d.ngrok.io/api/without',{
    //     "users_link":ip.value
    // }).then((response)=>{
    //     console.log(response)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    axios.post('http://6ef77d34.ngrok.io/api/without', {
        "users_link":ip.value
      })
      .then(function (response) {
        console.log(response);
        h.innerText = response.data['similarity']
        if(response.data["status"]=='fail'){
            console.log(response.data["user_link"])
            swal({title:"Kindly enter the keywords",
                text:response.data['suggestions'].toString(),
                content: "input",
              }).then((val)=>{
                  if(val){
                      
                        axios.post('http://6ef77d34.ngrok.io/api/with',{
                            
                            "users_link":response.data['user_link'],
                            "keywords":val.split(',')  
                        }).then((res)=>{
                            console.log("hhhhhhhhhhhhhhhhhhh")
                            console.log(res.data['similarity'])
                            h.innerText = res.data['similarity']
                            console.log(res)
                        })
                  }
              })
        }
        

      })
      .catch(function (error) {
        console.log(error);
      });
})