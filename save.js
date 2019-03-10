const axios = require('axios')
const swal = require('sweetalert')
const Swal = require('sweetalert2')

const h = document.getElementById("h")
const ip = document.getElementById("ip")
const btn = document.getElementById("btn")
const btn2 = document.getElementById("btn2")
const btn3 = document.getElementById('btn3')

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


btn2.addEventListener('click',(event)=>{

    swal({
        title:"Please provide the URL",
        content:"input"
    }).then((val)=>{
        if(val){
            axios.post('http://6ef77d34.ngrok.io/api/without',{
                "users_link":val
            }).then((response)=>{
                console.log(response);
                if(response.data['status']=='fail'){
                    
                }
            })
        }
    })

})

btn3.addEventListener('click',(event)=>{
    const {value: url} =  Swal.fire({
        input: 'url',
        inputPlaceholder: 'Enter the URL'
      }).then((url)=>{
        
        console.log(url.value)
        axios.post('http://f1c633cf.ngrok.io/api/without',{
            "users_link":url.value
        }).then((response)=>{
            console.log(response)
            if(response.data['status']=="success"){
                h.innerText = response.data['similarity']
            }
            else
            {
                Swal.fire({
                    titleText:"Kindly enter the keywords",
                    text:response.data['suggestions'],
                    input:'text'
                }).then((event)=>{
                    console.log(event.value.split(","))
                    axios.post('http://f1c633cf.ngrok.io/api/with',{
                        "users_link":response.data['user_link'],
                        "keywords":event.value.split(",")
                    }).then((res)=>{
                        console.log(res)
                        h.innerText = res.data['similarity']
                    })
                })
            }
        })

      })
})