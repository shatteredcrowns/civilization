// Cooldown timer (1 minute between submissions)
let lastSubmitTime = 0;

// Prevent multiple rapid submissions
let isSubmitting = false;

// Civilization buttons
document.getElementById("asisthan-btn").addEventListener("click", function () {
    document.getElementById("civilization").value = "asisthan";
    document.getElementById("form-message").innerHTML = "You selected Asisthan - Green Horizon.";
});

document.getElementById("obsilon-btn").addEventListener("click", function () {
    document.getElementById("civilization").value = "obsilon";
    document.getElementById("form-message").innerHTML = "You selected Obsilon - Quiet Resolve.";
});

// Form submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const now = Date.now();
    const cooldown = 120 * 1000; // 120 seconds

    if (now - lastSubmitTime < cooldown) {
        document.getElementById("form-message").innerHTML = "Your details were recorded. Please do not spam.";
        return;
    }

    if (isSubmitting) return;

    const discordName = document.getElementById("discord-name").value.trim();
    const inGameTag = document.getElementById("ingame-tag").value.trim();
    const civilization = document.getElementById("civilization").value.trim();
    const referralCode = document.getElementById("refferal").value.trim();

    if (discordName && inGameTag && civilization && referralCode) {
        isSubmitting = true;
        lastSubmitTime = now;

        document.getElementById("form-message").innerHTML = "Thank you, " + discordName + "! We'll reach out to you soon!";

        sendToDiscord(discordName, inGameTag, civilization, referralCode);

        // Reset form
        document.getElementById("contact-form").reset();
        document.getElementById("civilization").value = ""; // Reset civilization selection
    } else {
        document.getElementById("form-message").innerHTML = "Please fill in all fields.";
    }

    setTimeout(() => {
        isSubmitting = false;
    }, 1000); // re-enable submit quickly in case cooldown didn't trigger
});

// Send data to Discord webhook
function sendToDiscord(discordName, inGameTag, civilization, referralCode) {
    const webhookUrl = "https://discord.com/api/webhooks/1374630525800546386/OygFYUI_L6bPawU0rtwznKh4Ikn3eqqINMtzkYWQRWUchZltdtHE2Ncyo2ktlmsAl7ZA";

    const payload = {
        content: `**New Registration Submission**\n**Discord Name:** ${discordName}\n**In-Game Tag:** ${inGameTag}\n**Civilization:** ${civilization}\n**Referral Code:** ${referralCode}`,
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (response.ok) {
                console.log("✅ Message sent to Discord!");
            } else {
                console.error("❌ Failed to send message:", response);
                document.getElementById("form-message").innerHTML = "There was an error submitting your form.";
            }
        })
        .catch(error => {
            console.error("❌ Fetch error:", error);
            document.getElementById("form-message").innerHTML = "Network error occurred.";
        });
}

// Staff button
document.addEventListener("DOMContentLoaded", function () {
    const staffBtn = document.getElementById("staffAppBtn");

    if (staffBtn) {
        staffBtn.addEventListener("click", function () {
            window.location.href = "staffapp.html";
        });
    }
});
