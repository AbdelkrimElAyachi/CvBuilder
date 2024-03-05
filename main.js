const cv = document.getElementById("cv");

const errorEle = document.getElementById("error");
// displaying errors
function clearError(){
    errorEle.innerHTML = "";
}
function setError(error){
    errorEle.innerHTML = error;
    setTimeout(clearError, 2000);
}

// handle image
const imageInput = document.getElementById("image-input");
const image = document.getElementById("image");

imageInput.addEventListener('change',(event)=>{
    const file = event.target.files[0];

    if(file){
        const reader = new FileReader();

        reader.onload = (e)=>{
            image.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
})

// handle name and job 
const nameInput = document.getElementById("name-input");
const jobInput = document.getElementById("job-input");

const username = document.getElementById("name");
const job = document.getElementById("job");

nameInput.onchange = (e)=>{
    username.innerText = e.target.value;
}
jobInput.onchange = (e)=>{
    job.innerText = e.target.value;
}

// handle about element
const aboutInput = document.getElementById("about-input");
const about = document.getElementById("about")

aboutInput.onchange = (e)=>{
    about.innerText = e.target.value;
}

// handle contact elemenets
const phoneInput = document.getElementById("phone-input");
const phone = document.getElementById("phone");
const addressInput = document.getElementById("address-input");
const address = document.getElementById("address");
const emailInput = document.getElementById("email-input");
const email = document.getElementById("email");

phoneInput.onchange = (e)=>{
    phone.innerHTML = `<i class="fas fa-phone"></i><span>${e.target.value}</span>`;
    phone.setAttribute('href',`tel:${e.target.value}`);
}
addressInput.onchange = (e)=>{
    address.innerHTML = `<i class="fas fa-map-marker"></i><span>${e.target.value}</span>`;
}
emailInput.onchange = (e)=>{
    email.innerHTML = `<i class="fas fa-envelope"></i><span>${e.target.value}</span>`;
    email.setAttribute("href",`mailto:${e.target.value}@gmail.com`);
}


// handle social media
const div_social_media = document.getElementById("social-media-links");
const div_social_media_inputs = document.getElementById("links-social-media-inputs");
const socialMedias = {
    'github':'<i class="fa-brands fa-github"></i>',
    'facebook':'<i class="fa-brands fa-facebook"></i>',
    'gitlab':'<i class="fa-brands fa-gitlab"></i>',
    'instagram':'<i class="fa-brands fa-instagram"></i>',
    'youtube':'<i class="fa-brands fa-youtube"></i>',
    'linkedin':'<i class="fa-brands fa-linkedin"></i>',
    'pinterest':'<i class="fa-brands fa-pinterest"></i>',
    'snapchot':'<i class="fa-brands fa-snapchat"></i>'
}

let links = [] ;

function checkErrors(link,socialMedia){
    let res = true;
    links.forEach((lk,ind)=>{
        console.log(lk.link,link);
        if(lk.link==link){
            setError("this link already exist");
            res= false;
        }
        if(lk.name==socialMedia){
            setError("you already added this social media");
            res = false;
        }
    })
    return res;
}
// get button element with attribut data that has the ind of the link that we need to delete
function deleteLink(e){
    const index = e.target.getAttribute('data-info');
    links = links.filter((link,ind)=>{
        if(index==ind){
            return false;
        }
        return true;
    })
    renderLinks();
}
// render the links 
function renderLinks(){
    div_social_media_inputs.innerHTML = "";
    div_social_media.innerHTML = "";
    links.forEach((link,ind)=>{
        // rendering the inputs form
        const btn = document.createElement("button")
        btn.innerText = "delete";
        btn.setAttribute('data-info',ind);
        btn.addEventListener("click",deleteLink);
        div_social_media_inputs.innerHTML += `<div>${link.icon} &lt; ${link.link} &gt;&nbsp; </div> `;
        div_social_media_inputs.querySelector('div:last-child').append(btn);
        // rendering the cv part social media cv 
        div_social_media.innerHTML += `<a href="${link.link}" target="_blank">${link.icon}</a>`;
    })
}
// add new link 
function addLink(){
    let social_media_link = document.getElementById("link-input").value;
    let social_media_name = document.getElementById("social-media-name-input").value;

    let res = checkErrors(social_media_link,social_media_name);

    if (res){
        links.push( { link:social_media_link, name:social_media_name, icon:socialMedias[social_media_name]});
        renderLinks();
    }
    document.getElementById("link-input").value = "";
    
}
// listening on click for add button
document.getElementById("btn-add-social-media").addEventListener("click",addLink);

// handle the download
document.getElementById("btn-download").addEventListener("click", async ()=>{
    window.print();
});