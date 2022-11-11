//check if there is localstorage color option
let maincolor = localStorage.getItem("color_li");
//click on toggle spin class on icon 
if(maincolor !== null){
    document.documentElement.style.setProperty(`--main-color`, maincolor);
      //remove class active from all children
     document.querySelectorAll(".colors-list li").forEach(Element=>{
      Element.classList.remove("active");
    
      if(Element.dataset.color === maincolor){
        Element.classList.add("active")
    } 
    })
    
}
//select landing page element
let landingpage = document.querySelector(".landing-page");
//localstoreg background random
backgroundrandom = localStorage.getItem("background_random");


//random background option 
let backgroundoption = true ;
//varible to controle the intereval
let backgroundinterval ;

//check if randome background of local storge is not empty
backgroundlocalitem = localStorage.getItem("background_option")
if(backgroundlocalitem !== null){

if(backgroundlocalitem ==="true"){
  backgroundoption = true;
}else{
  backgroundoption = false;
  landingpage.style.backgroundImage = backgroundrandom ; 
}
//remove active frome all span
document.querySelectorAll(".random-background span").forEach (element => {
 element.classList.remove("active");
})
if(backgroundlocalitem ===`true`){
  document.querySelector(".random-background .yes").classList.add("active");
}else{
  document.querySelector(".random-background .no").classList.add("active");
}
}
let iconsetting =document.querySelector(".fa-gear").onclick=function(){
    //toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin")
    //toggle class on main seting box
    document.querySelector(".setting-box").classList.toggle("open")
}
//handle active to use in any function like it
function handleactive(ev){
  //remove all active from all 
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
   element.classList.remove("active");

  })
  ev.target.classList.add("active");
  }
//switch colors
const colorsLi = document.querySelectorAll(".colors-list li")

//loop on all list Items
colorsLi.forEach(li => {
    //Click on every list Items
      li.addEventListener("click" , (e) => {
     //set color on root 
        document.documentElement.style.setProperty(`--main-color`, e.target.dataset.color);
      //set color on local storage
        localStorage.setItem("color_li" ,e.target.dataset.color);

      //remove class active from all children by function handle 
       handleactive(e);
    }); 
});

//switch  random background option
const randomBackEl = document.querySelectorAll(".random-background span")
//loop on all spans
randomBackEl.forEach(span => {
    //Click on every span
  span.addEventListener("click" , (e) => {
      //remove class active from all children
      handleactive(e);
      if(e.target.dataset.background === `yes`){
        backgroundoption = true ;
        randomizeimgs ()
        localStorage.setItem("background_option" , true)
      }else{
        backgroundoption = false ;
        clearInterval(backgroundinterval);
        localStorage.setItem("background_option" , false)

      }
      
    }); 

});
//get array imags
let imagsArray=["image1.webp","image2.webp","image3.jpg","image4.webp","image5.webp"];
//select landing page element
//landingpage.style.backgroundImage =`url("image/image2.webp")`; 

function randomizeimgs (){
  if (backgroundoption === true){
    backgroundinterval = setInterval(function(){
      //get random number 
        let randomNumber = Math.floor(Math.random() * (imagsArray.length ) );
         landingpage.style.backgroundImage =`url("image/` + imagsArray[randomNumber] + `")`;
         localStorage.setItem("background_random" ,landingpage.style.backgroundImage  )

    },1700);
  }
}randomizeimgs ()

//select skills selector
let ourskills = document.querySelector(".skills")
window.onscroll = function(){
  //skills of set top geting me all height from start to end  div skills by pixles
 let skillsoffsettop  = ourskills.offsetTop;
 //skills of set height geting  me height of this div by pixles
  let skillsouterheight =ourskills.offsetHeight;
 //window scroll top getin a part from height scroll now
 let windowscrolltop = this.pageYOffset ;
 //windw height  geting height this page
 let windowheight = this.innerHeight
//نفذ كذا هتديني نفس النتيجه  windowscrolltop > skillsoffsettop هنا لو انا هعملها هقوله لو ال
 if (windowscrolltop > skillsoffsettop + skillsouterheight  - windowheight -200){
  let allskills =document.querySelectorAll(".skills .skills_box .skills_progress span")
  allskills.forEach(skill => {
    skill.style.width = skill.dataset.progress;
    
  });
}

}

 //creat popup with the image يظهر فجاه 
 ourgallery=document.querySelectorAll(".images_box img");
 ourgallery.forEach(img => {
   img.addEventListener(`click`, (e)=>{
     //creat div
     let overlay=document.createElement('div');
    //add class
     overlay.className ='popup_overlay' ;
     //append the overlay to body   
     document.body.appendChild(overlay) ;
     //creat div 
     let popupbox = document.createElement('div');
     //add class nam
     popupbox.className='popup_box';
      //creat text in h3 in header popup box and add in text img.alt
     if(img.alt !== null){

      let imageheading = document.createElement("h3");
      let imagetext    = document.createTextNode(img.alt);
      imageheading.appendChild(imagetext);
      popupbox.appendChild(imageheading);
     }
     //creat image
     popupimage=document.createElement('img');
     //img.src دي لوحدها بتجبلي السورس الخاص بالصوره الي هضغط عليها set image source 
     popupimage.src = img.src 
    //append the popupimage to popupbox
     popupbox.appendChild(popupimage);
     //append the popup box to body
     document.body.appendChild(popupbox);

     //creat a close span
     closebutton = document.createElement("span");
     //creat the close button text
     closebuttontext=document.createTextNode("X");
     closebutton.appendChild(closebuttontext);
     //add class to closebutton
     closebutton.className='close_button';
     //add closebutton to popupbox
     popupbox.appendChild(closebutton);

   })
   document.addEventListener("click" , function(e){
     if(e.target.className === 'close_button'){
       //remove the current popup
       e.target.parentNode.remove();
      //remov the popup_overlay
    document.querySelector('.popup_overlay').remove();
     }
     
   })
  
 })
 //select all bullets
 const allbullets=document.querySelectorAll(".nav_bullets .bullet");
 //select all links
 const alllinks=document.querySelectorAll(".links a");

function scrolltosomewhere(elements){
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();// الافتراضي الي بحصلbehavior لو معملتش دي في بيهيفيور بيحصل او الاسكرول مابيشتغلش معايا لازم الغي ال
      //خاصيه جديده بتعمل سكرول للمكان الي انت عاوزه 
       document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior:`smooth`
      });
    });
  });
}
scrolltosomewhere(allbullets)
scrolltosomewhere(alllinks)

let bulletsspan=document .querySelectorAll(".bullets-option span");
let bulletscontaner=document.querySelector(".nav_bullets"); 
 //get localstorage bullets
 bulletslocalitem=localStorage.getItem("bullets_option");
 if(bulletslocalitem!== null){
  bulletsspan.forEach(span =>{
    span.classList.remove("active");
    if(bulletslocalitem==="block"){
      bulletscontaner.style.display='block';
      document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
      bulletscontaner.style.display='none';
      document.querySelector(".bullets-option .no").classList.add("active");
    }
  })
 }
bulletsspan.forEach(span => {
  span.addEventListener("click" , (e) => {
     handleactive(e)
    if(span.dataset.display==='show') {
      bulletscontaner.style.display='block';
      localStorage.setItem("bullets_option",'block');
    }else{
      bulletscontaner.style.display='none';
      localStorage.setItem("bullets_option",'none');
      }
    })
  })
//reset option and remov all local storage
document.querySelector(".option-box .reset_option").addEventListener("click" , (e) => {

  localStorage.clear();//يحذفلي كل اللوكال استورج الي موجوده 
  //هنا لو مش عاوز احذف كل اللوكال ستورج عاوز احذف اسماء معينه 
  //localStorage.removeItem("bullets_option");
  //localStorage.removeItem("background_random");
  window.location.reload();

})
//toggle menue
let togglebtn = document.querySelector(".toggle_menu")
let tlinks    =document.querySelector(".links")

togglebtn.addEventListener("click" , (e)=>{
  e.stopPropagation()// لو جيت ضغط علي الاسبان الثلاث شرط هيعتبرها غيرهم الحل هنا tlinks ,togglebtnعامل تحت فانكشن ان لو ضغط علي اي عنصر غير ال 
  tlinks.classList.toggle("open");
  togglebtn.classList.toggle("menu_active")/*خصائص للبيفور لكلاس مش موجود بضيفه بالجافا لما اعمل كليك cssبضيف في ال  */
  
})
//when to click on eny place in page close the links
let overlayclick =document.querySelector(".overlaye")
let closelinks=document.querySelector(".links_cover")
document.addEventListener("click",(e)=>{
  if(e.target!==togglebtn && e.target!==tlinks){
    if(tlinks.classList.contains("open")){//مهمه جدا بتمسكلي الكلاس الي مش معروف غير بعد الكليك******
 tlinks.classList.toggle("open");
  togglebtn.classList.toggle("menu_active")
    }
  }
 
})
tlinks.onclick=function(e){
  e.stopPropagation();// هيعتبرها غيرهم فال الحل هناli لو جيت ضغط علي tlinks ,togglebtnعامل فوق فانكشن ان لو ضغط علي اي عنصر غير ال 
}

 //toggle position night color
 let bodycolor=document.querySelector(".body1");
 let aboutcolor=document.querySelector(".night0_color");
 let skillscolor=document.querySelector(".night_color");
 let gallerycolor=document.querySelector(".night1_color");
 let timelincolor=document.querySelector(".night2_color");
 let featurescolor=document.querySelector(".night3_color");
 //local storage to body color
 let bodylocalget=localStorage.getItem("bodylocal");
  if(bodylocalget!== null){
   
    if(bodylocalget==="bodynight_color"){
      bodycolor.classList.add(bodylocalget);
      bodycolor.classList.remove("body1");
    }
    }else{
      console.log("2") 
  }
 //local storage background all dives
let nightcolor=localStorage.getItem("night-background");
if(nightcolor !==null){
  if(nightcolor==="bacground_night_color"){
    aboutcolor.classList.add(nightcolor)
    aboutcolor.classList.remove("night0_color")
    document.querySelector(".about-us p").style.color="#000"
  }
if(nightcolor==="bacground_night_color"){
  skillscolor.classList.add(nightcolor)
  skillscolor.classList.remove("night_color")
}

if(nightcolor==="bacground_night_color"){
  gallerycolor.classList.add(nightcolor)
  gallerycolor.classList.remove("night1_color")
}
if(nightcolor==="bacground_night_color"){
  timelincolor.classList.add(nightcolor)
  timelincolor.classList.remove("night2_color")
}
if(nightcolor==="bacground_night_color"){
  featurescolor.classList.add(nightcolor)
  featurescolor.classList.remove("night3_color")
}

}

 document.querySelector(".around_option").addEventListener("click",(e)=>{
   document.querySelector(".about-us p").style.color="#000"
   bodycolor.classList.toggle("body1");
   bodycolor.classList.toggle("bodynight_color");
   localStorage.setItem("bodylocal",bodycolor.className)
   console.log(bodycolor.className)

  aboutcolor.classList.toggle("night0_color")
   aboutcolor.classList.toggle("bacground_night_color")
  skillscolor.classList.toggle("night_color")
   skillscolor.classList.toggle("bacground_night_color")
  gallerycolor.classList.toggle("night1_color")
   gallerycolor.classList.toggle("bacground_night_color")
  timelincolor.classList.toggle("night2_color")
   timelincolor.classList.toggle("bacground_night_color")
  featurescolor.classList.toggle("night3_color")
   featurescolor.classList.toggle("bacground_night_color")

  localStorage.setItem("night-background" ,aboutcolor.className )
  localStorage.setItem("night-background" ,skillscolor.className )
  localStorage.setItem("night-background" ,gallerycolor.className )
  localStorage.setItem("night-background" ,timelincolor.className )
  localStorage.setItem("night-background" ,featurescolor.className )

 
 })

 
 





