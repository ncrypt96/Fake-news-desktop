const axios = require('axios')
const swal = require('sweetalert')
const Swal = require('sweetalert2')
const validUrl = require('valid-url')
const {extract } = require('article-parser');
const remote = require('electron').remote;
const fs = require('fs')


const iplink = document.getElementById('iplink')
const mainButton = document.getElementById('mainButton')
const mainPage = document.getElementById('mainPage')
const dashboard = document.getElementById('dashboard')
const newsImage = document.getElementById('news-image')
const title = document.getElementById('news-title')
const reloadButton =document.getElementById('reload')
const newsDescription = document.getElementById('news-description')
const autoRadio = document.getElementById('autoRadio')
const advanceRadio = document.getElementById('advanceRadio')

//set server location
let serverLocation= fs.readFileSync(require('path').join(require('os').homedir(), 'Desktop/config.txt'), 'utf8')



//ui close minimize

const closeButton = document.getElementById('close')
const minimizeButton = document.getElementById('minimize')

//ui close minimize

dashboard.style.display = 'none'

autoRadio.checked = true;

// ui closec

closeButton.addEventListener('click',(event)=>{

    remote.getCurrentWindow().close()

})


minimizeButton.addEventListener('click',(event)=>{

    remote.getCurrentWindow().minimize()

})

mainButton.addEventListener('click',(event)=>{

    
    
    if (validUrl.isUri(iplink.value.trim())){

        if(autoRadio.checked==true){
            
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
    
              
              
              Toast.fire({
                type: 'success',
                title: 'Now searching for relevent articles'
              })
            axios.post(serverLocation+'/api/without',{
                "users_link":iplink.value.trim()
            }).then((response)=>{
                console.log(response);
                iplink.value = ''
                
                if(response.data['status']=='success'){
                    mainPage.style.display ='none'
                    
                    dashboard.style.display = 'block'
    
                    //update image
                    if(response.data['top_img_URL']!=''){
                        newsImage.src = response.data['top_img_URL']
                    }else{
                        extract(response.data["users_link"]).then((article) => {
                            newsImage.src = article['image'];
                        
                          }).catch((err) => {
                            console.log(err);
                          });
                    }
                    
                     
    
                    //update image
    
                    //update title
    
                    title.innerText = response.data['titles'][0]
    
                    //update title
    
    
                    //update description
    
                    newsDescription.innerText = response.data['descriptions'][0]
    
                    //update description
    
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
                        axios.post(serverLocation+'/api/with',{
                            "users_link":response.data['user_link'],
                            "keywords":event.value.split(",")
                        }).then((res)=>{
                            console.log(res)
                            mainPage.style.display ='none'
                            
                            dashboard.style.display = 'block'
                            
                            //update image
                            if(res.data['top_img_URL']!=''){
                                newsImage.src = res.data['top_img_URL']
                            }else{
                                extract(response.data["user_link"]).then((article) => {
                                    newsImage.src = article['image'];
                                
                                }).catch((err) => {
                                    console.log(err);
                                });
                            }
                        
                            //update image
    
                            //update title
                            title.innerText = res.data['titles'][0]
    
                            //update title
    
                            
                            //update description
    
                            newsDescription.innerText = res.data['descriptions'][0]
    
                            //update description
    
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
        }else{

            Swal.fire({
                titleText:"Kindly enter the keywords",
                input:'text'
            }).then((event)=>{
                console.log(event.value.split(","))

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  });

                Toast.fire({
                    type: 'success',
                    title: 'Now searching for relevent articles'
                })

                axios.post(serverLocation+'/api/with',{
                    "users_link":iplink.value.trim(),
                    "keywords":event.value.split(",")
                }).then((res)=>{
                    console.log(res)
                    mainPage.style.display ='none'
                    
                    dashboard.style.display = 'block'
                    
                    //update image
                    if(res.data['top_img_URL']!=''){
                        newsImage.src = res.data['top_img_URL']
                    }else{
                        extract(iplink.value.trim()).then((article) => {
                            newsImage.src = article['image'];
                        
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                
                    //update image

                    //update title
                    title.innerText = res.data['titles'][0]

                    //update title

                    
                    //update description

                    newsDescription.innerText = res.data['descriptions'][0]

                    //update description

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




reloadButton.addEventListener('click',(event)=>{

    remote.getCurrentWindow().reload()

})