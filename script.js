// Add event listeners to the civilization buttons
document.getElementById("asisthan-btn").addEventListener("click", function() {
    document.getElementById("civilization").value = "asisthan"; // Set the civilization value
    document.getElementById("form-message").innerHTML = "You selected Asisthan - Green Horizon.";
});

document.getElementById("obsilon-btn").addEventListener("click", function() {
    document.getElementById("civilization").value = "obsilon"; // Set the civilization value
    document.getElementById("form-message").innerHTML = "You selected Obsilon - Quiet Resolve.";
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    let discordName = document.getElementById("discord-name").value;
    let inGameTag = document.getElementById("ingame-tag").value;
    let civilization = document.getElementById("civilization").value;
    let referralCode = document.getElementById("refferal").value; // Assuming the input field has id="refferal"

    if (discordName && inGameTag && civilization && referralCode) {
        document.getElementById("form-message").innerHTML = "Thank you, " + discordName + "! We'll reach out to you soon!";
        
        // Send the form data to Discord Webhook
        sendToDiscord(discordName, inGameTag, civilization, referralCode);
    } else {
        document.getElementById("form-message").innerHTML = "Please fill in all fields.";
    }

    // Clear the form fields
    document.getElementById("contact-form").reset();
});

// Function to send form data to Discord webhook
function sendToDiscord(discordName, inGameTag, civilization, referralCode) {
    const webhookUrl = "https://discord.com/api/webhooks/1370312491212476451/PHBiLu5yespJgkBwl53O_dyTKWRudctxbCgMWTfhR-JC4Yc_Uo0bEdW_DHwYcQmIQEQ9"; // Your Discord Webhook URL
    
    const payload = {
        content: `**New Contact Form Submission**\n**Discord Name:** ${discordName}\n**In-Game Tag:** ${inGameTag}\n**Civilization:** ${civilization}\n**Referral Code:** ${referralCode}`,
    };
    
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (response.ok) {
            console.log("Message sent to Discord!");
        } else {
            console.error("Error sending message to Discord:", response);
        }
    })
    .catch(error => {
        console.error("Error sending request:", error);
    });
}
