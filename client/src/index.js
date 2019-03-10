const axios = require('axios')
const swal = require('sweetalert')
const Swal = require('sweetalert2')
const validUrl = require('valid-url')

const h = document.getElementById("h")
const ip = document.getElementById("ip")
const btn = document.getElementById("btn")
const btn2 = document.getElementById("btn2")
const btn3 = document.getElementById('btn3')
const iplink = document.getElementById('iplink')
const mainButton = document.getElementById('mainButton')
const mainPage = document.getElementById('mainPage')
const dashboard = document.getElementById('dashboard')

dashboard.style.display = 'none'


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

iplink.addEventListener('click',(event)=>{

})

mainButton.addEventListener('click',(event)=>{
    
    if (validUrl.isUri(iplink.value)){
        axios.post('http://d5ad6a7c.ngrok.io/api/without',{
            "users_link":iplink.value
        }).then((response)=>{
            console.log(response);
            iplink.value = ''
            
            if(response.data['status']=='success'){
                mainPage.style.display ='none'
                
                dashboard.style.display = 'block'
                var bar_ctx = document.getElementById('chart2').getContext('2d');

                var purple_orange_gradient = bar_ctx.createLinearGradient(0, 0, 0, 600);
                purple_orange_gradient.addColorStop(0, '#667eea');
                purple_orange_gradient.addColorStop(1, 'purple');

                var bar_chart = new Chart(bar_ctx, {
                    type: 'bar',
                    data: {
                        labels: response.data['sources'],
                        datasets: [{
                            
                            data: response.data['similarity'],fill:false,borderColor: "#667eea",pointBackgroundColor: "white",
                            pointRadius: 5,
                            pointHoverRadius: 7,
                
                            // Changes this dataset to become a line
                            type: 'line'
                        },{
                            label: 'similarity',
                            data: response.data['similarity'],
                                        backgroundColor: purple_orange_gradient,
                                        hoverBackgroundColor: purple_orange_gradient,
                                        hoverBorderWidth: 2,
                                        hoverBorderColor: 'purple'
                        }]
                    },
                    options: {
                        scales: {xAxes: [{
                            gridLines: {
                                display:false
                            }
                        }],
                            yAxes: [{ gridLines: {
                                display:false
                            },
                                ticks: {
                                    beginAtZero:true,
                                    max: 1,
                                    min: 0,
                                    stepSize: 0.1
                                }
                            }]
                        },responsive: true,
                        maintainAspectRatio: true,
                    }
                });
            }
            
            if(response.data['status']=="fail"){

                Swal.fire({
                    titleText:"Kindly enter the keywords",
                    text:response.data['suggestions'],
                    input:'text'
                }).then((event)=>{
                    console.log(event.value.split(","))
                    axios.post('http://d5ad6a7c.ngrok.io/api/with',{
                        "users_link":response.data['user_link'],
                        "keywords":event.value.split(",")
                    }).then((res)=>{
                        console.log(res)
                        mainPage.style.display ='none'
                        
                        dashboard.style.display = 'block'

                        var bar_ctx = document.getElementById('chart2').getContext('2d');

                        var purple_orange_gradient = bar_ctx.createLinearGradient(0, 0, 0, 600);
                        purple_orange_gradient.addColorStop(0, '#667eea');
                        purple_orange_gradient.addColorStop(1, 'purple');
        
                        var bar_chart = new Chart(bar_ctx, {
                            type: 'bar',
                            data: {
                                labels: res.data['sources'],
                                datasets: [{
                                    
                                    data: res.data['similarity'],fill:false,borderColor: "#667eea",pointBackgroundColor: "white",
                                    pointRadius: 5,
                                    pointHoverRadius: 7,
                        
                                    // Changes this dataset to become a line
                                    type: 'line'
                                },{
                                    label: 'similarity',
                                    data: res.data['similarity'],
                                                backgroundColor: purple_orange_gradient,
                                                hoverBackgroundColor: purple_orange_gradient,
                                                hoverBorderWidth: 2,
                                                hoverBorderColor: 'purple'
                                }]
                            },
                            options: {
                                scales: {xAxes: [{
                                    gridLines: {
                                        display:false
                                    }
                                }],
                                    yAxes: [{ gridLines: {
                                        display:false
                                    },
                                        ticks: {
                                            beginAtZero:true,
                                            max: 1,
                                            min: 0,
                                            stepSize: 0.1
                                         
                                        }
                                    }]
                                },responsive: true,
                                maintainAspectRatio: true,
                            }
                        });
                    })
                })

            }
        }).catch((error)=>{
            console.log(error);
        })
    } else {
        Swal.fire({
            title: 'The given url is invalid',
            text: 'Kindly provide a valid url',
            type: 'error',
            confirmButtonText: 'Ok'
          })
    }
})




// Chart.defaults.global.elements.rectangle.backgroundColor = '#FF0000';


// var bar_ctx = document.getElementById('chart2').getContext('2d');

// var purple_orange_gradient = bar_ctx.createLinearGradient(0, 0, 0, 600);
// purple_orange_gradient.addColorStop(0, '#667eea');
// purple_orange_gradient.addColorStop(1, 'purple');

// var bar_chart = new Chart(bar_ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
            
//             data: [12, 19, 3, 8, 14, 5],fill:false,borderColor: "#667eea",pointBackgroundColor: "white",
//             pointRadius: 5,
//             pointHoverRadius: 7,
  
//             // Changes this dataset to become a line
//             type: 'line'
//         },{
//             label: '# of Votes',
//             data: [12, 19, 3, 8, 14, 5],
// 						backgroundColor: purple_orange_gradient,
// 						hoverBackgroundColor: purple_orange_gradient,
// 						hoverBorderWidth: 2,
// 						hoverBorderColor: 'purple'
//         }]
//     },
//     options: {
//         scales: {xAxes: [{
//             gridLines: {
//                 display:false
//             }
//         }],
//             yAxes: [{ gridLines: {
//                 display:false
//             },
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });

const q = document.getElementById("q")


const show = document.getElementById('show')

show.addEventListener('click',(event)=>{
    console.log('kkkkkkkkkkkkkkkkkkkk')
    q.style.display ='none'
})
