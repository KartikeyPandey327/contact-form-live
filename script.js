const contact_form = document.querySelector("#contact-form");
const client_name = document.querySelector("#client-name");
const client_email = document.querySelector("#client-email");
const send_btn = document.querySelector("#send-btn");
const status_msg = document.querySelector("#status-msg");
const client_message = document.querySelector("#client-message");

contact_form.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    send_btn.textContent="Sending...."; 
    try {
        const userPost = {
            access_key: "ba0753fc-68ca-4c69-beaf-e858e4488b65",
            name: client_name.value,
            email: client_email.value,
            message: client_message.value
        };

        const response = await fetch("https://api.web3forms.com/submit", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
            },
            body : JSON.stringify(userPost)
        });

        const data = await response.json();

        if (data.success){
            status_msg.textContent = "Message sent! I'll reply soon.";
            client_name.value="";
            client_email.value="";
            client_message.value="";
        }else{
            status_msg.textContent="Something went wrong. Please try again.";
        }

    }catch(error){
        status_msg.textContent="Network error! Check your connection.";
    }
    send_btn.textContent="Send Inquiry";
})