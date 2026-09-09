(function () {

    const USER_KEY = "fpy_username";
    const ACCESS_KEY = "fpy_key";
    const DEVICE_KEY = "fpy_device_id";
    const SESSION_KEY = "fpy_session";

    const API = "https://YOUR-SERVER.com/api";

    function getDeviceId() {

        let deviceId = localStorage.getItem(DEVICE_KEY);

        if (!deviceId) {
            deviceId = crypto.randomUUID();
            localStorage.setItem(DEVICE_KEY, deviceId);
        }

        return deviceId;
    }


    async function authenticate(username, accessKey) {

        const deviceId = getDeviceId();

        const response = await fetch(
            API + "/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    accessKey,
                    deviceId
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Authentication failed."
            );
        }

        localStorage.setItem(
            USER_KEY,
            username
        );

        localStorage.setItem(
            ACCESS_KEY,
            accessKey
        );

        localStorage.setItem(
            SESSION_KEY,
            data.sessionToken
        );

        return true;
    }


    async function checkSession() {

        const username =
            localStorage.getItem(USER_KEY);

        const accessKey =
            localStorage.getItem(ACCESS_KEY);

        const deviceId =
            localStorage.getItem(DEVICE_KEY);

        const sessionToken =
            localStorage.getItem(SESSION_KEY);


        if (
            !username ||
            !accessKey ||
            !deviceId ||
            !sessionToken
        ) {
            return false;
        }


        try {

            const response = await fetch(
                API + "/check-session",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + sessionToken
                    },

                    body: JSON.stringify({
                        username,
                        deviceId
                    })
                }
            );


            if (!response.ok) {

                localStorage.removeItem(USER_KEY);
                localStorage.removeItem(ACCESS_KEY);
                localStorage.removeItem(SESSION_KEY);

                return false;
            }

            return true;

        } catch (error) {

            console.error(
                "Session check failed:",
                error
            );

            return false;
        }
    }


    // Keep the device lock alive
    function startHeartbeat() {

        setInterval(async function () {

            const sessionToken =
                localStorage.getItem(SESSION_KEY);

            const deviceId =
                localStorage.getItem(DEVICE_KEY);


            if (!sessionToken || !deviceId)
                return;


            try {

                const response =
                    await fetch(
                        API + "/heartbeat",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    "Bearer " +
                                    sessionToken
                            },

                            body: JSON.stringify({
                                deviceId
                            })
                        }
                    );


                // Another device took the account
                if (!response.ok) {

                    localStorage.clear();

                    location.reload();
                }

            } catch (error) {

                console.warn(
                    "Heartbeat failed",
                    error
                );
            }

        }, 30000);
    }


    function startMainCode() {

        // =================================================
        // YOUR EXISTING CODE GOES HERE
        // =================================================


       (function () {
    var selector =
        "#ngForm > fieldset > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > app-vob-history > div > div:nth-child(3) > div.small.text-muted.d-inline-flex.align-items-center.gap-1.user-select-none";

    var tries = 0;
    var maxTries = 20;

    function showAgePopup() {
        var dobElement = document.querySelector("#DOB");
        if (!dobElement) return;

        var dobValue =
            dobElement.value ||
            dobElement.textContent ||
            dobElement.innerText;

        var dob = new Date(dobValue);

        if (isNaN(dob)) return;

        var today = new Date();

        // Calculate age
        var age = today.getFullYear() - dob.getFullYear();

        if (
            today.getMonth() < dob.getMonth() ||
            (today.getMonth() === dob.getMonth() &&
                today.getDate() < dob.getDate())
        ) {
            age--;
        }

        // Calculate 65th birthday (logic preserved)
        var sixtyFifthBirthday = new Date(dob);
        sixtyFifthBirthday.setFullYear(dob.getFullYear() + 65);

        var todayOnly = new Date();
        todayOnly.setHours(0, 0, 0, 0);

        var birthdayOnly = new Date(sixtyFifthBirthday);
        birthdayOnly.setHours(0, 0, 0, 0);

        var diffDays = Math.ceil(
            (birthdayOnly - todayOnly) /
                (1000 * 60 * 60 * 24)
        );

        // Indicator logic preserved
        var indicatorColor = "#2ecc71";

        if (age >= 65) {
            indicatorColor = "#ff4d4f";
        }

        // Remove existing popup
        var existingPopup = document.getElementById(
            "agePopupBookmarklet"
        );

        if (existingPopup) {
            existingPopup.remove();
        }

        // Create popup
        var popup = document.createElement("div");
        popup.id = "agePopupBookmarklet";

        popup.style.cssText =
            "position:fixed;" +
            "top:100px;" +
            "left:50%;" +
            "transform:translateX(-50%);" +
            "z-index:99999999;" +
            "background:rgba(0,0,0,0.88);" +
            "backdrop-filter:blur(10px);" +
            "padding:20px 28px;" +
            "border-radius:16px;" +
            "box-shadow:0 10px 30px rgba(0,0,0,.45);" +
            "font-family:'Segoe UI',Arial,sans-serif;" +
            "color:#fff;" +
            "text-align:center;" +
            "min-width:250px;";

        popup.innerHTML = `
            <button
                style="
                    position:absolute;
                    top:8px;
                    right:10px;
                    background:none;
                    border:none;
                    color:white;
                    font-size:20px;
                    cursor:pointer;
                    font-weight:bold;
                "
            >&times;</button>

            <div
                style="
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                "
            >
                <div
                    style="
                        width:16px;
                        height:16px;
                        border-radius:50%;
                        background:${indicatorColor};
                        box-shadow:0 0 12px ${indicatorColor};
                        margin-bottom:10px;
                    "
                ></div>

                <div
                    style="
                        font-size:32px;
                        font-weight:900;
                        line-height:1;
                    "
                >
                    AGE: ${age}
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        popup.querySelector("button").onclick = function () {
            popup.remove();
        };

        setTimeout(function () {
            var popupExists =
                document.getElementById("agePopupBookmarklet");

            if (popupExists) {
                popupExists.remove();
            }
        }, 5000);
    }

    var interval = setInterval(function () {
        var element = document.querySelector(selector);

        if (element) {
            clearInterval(interval);

            element.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            element.dispatchEvent(
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window
                })
            );

            element.style.outline = "3px solid orange";

            showAgePopup();
        }

        if (++tries > maxTries) {
            clearInterval(interval);
            alert("Element not found after waiting");
        }
    }, 300);
})();



        // =================================================
        // END YOUR EXISTING CODE
        // =================================================
    }


    async function showLogin() {

        if (
            document.getElementById(
                "fpy-auth-overlay"
            )
        ) {
            return;
        }


        const overlay =
            document.createElement("div");

        overlay.id =
            "fpy-auth-overlay";


        overlay.style.cssText = `
            position:fixed;
            inset:0;
            background:rgba(0,0,0,.75);
            z-index:9999999999;
            display:flex;
            justify-content:center;
            align-items:flex-start;
            padding-top:60px;
        `;


        overlay.innerHTML = `
            <div style="
                width:420px;
                max-width:90vw;
                background:#1f1f1f;
                border-radius:22px;
                padding:25px;
                box-sizing:border-box;
                box-shadow:0 20px 60px rgba(0,0,0,.5);
                position:relative;
            ">

                <button id="fpy-close-btn" style="
                    position:absolute;
                    right:12px;
                    top:12px;
                    width:32px;
                    height:32px;
                    border:none;
                    border-radius:50%;
                    cursor:pointer;
                    color:white;
                    background:rgba(255,255,255,.08);
                ">✕</button>

                <div style="
                    font-size:40px;
                    text-align:center;
                    margin-bottom:10px;
                ">🔐</div>

                <h2 style="
                    color:white;
                    text-align:center;
                    margin:0 0 5px;
                ">
                    Automation Access
                </h2>

                <div style="
                    color:#aaa;
                    text-align:center;
                    margin-bottom:20px;
                    font-size:13px;
                ">
                    One account = one active device
                </div>

                <input
                    id="fpy-username"
                    placeholder="Username"
                    style="
                        width:100%;
                        padding:14px 16px;
                        margin-bottom:15px;
                        border-radius:999px;
                        border:1px solid rgba(255,255,255,.15);
                        background:rgba(255,255,255,.08);
                        color:white;
                        box-sizing:border-box;
                    "
                >

                <input
                    id="fpy-accesskey"
                    type="password"
                    placeholder="Access Key"
                    style="
                        width:100%;
                        padding:14px 16px;
                        margin-bottom:15px;
                        border-radius:999px;
                        border:1px solid rgba(255,255,255,.15);
                        background:rgba(255,255,255,.08);
                        color:white;
                        box-sizing:border-box;
                    "
                >

                <button
                    id="fpy-save-btn"
                    style="
                        width:100%;
                        border:none;
                        border-radius:999px;
                        padding:14px;
                        cursor:pointer;
                        color:white;
                        font-weight:bold;
                        background:linear-gradient(
                            135deg,
                            #0078d4,
                            #00a2ff
                        );
                    "
                >
                    Login
                </button>

                <div
                    id="fpy-status"
                    style="
                        color:#ff7777;
                        text-align:center;
                        margin-top:15px;
                        font-size:13px;
                    "
                ></div>

            </div>
        `;


        document.body.appendChild(overlay);


        overlay.querySelector(
            "#fpy-close-btn"
        ).onclick = function () {

            overlay.remove();
        };


        overlay.querySelector(
            "#fpy-save-btn"
        ).onclick = async function () {

            const username =
                overlay.querySelector(
                    "#fpy-username"
                ).value.trim();

            const accessKey =
                overlay.querySelector(
                    "#fpy-accesskey"
                ).value.trim();

            const status =
                overlay.querySelector(
                    "#fpy-status"
                );


            if (!username || !accessKey) {

                status.textContent =
                    "Username and Access Key are required.";

                return;
            }


            status.textContent =
                "Checking account...";


            try {

                await authenticate(
                    username,
                    accessKey
                );


                overlay.remove();

                startHeartbeat();

                startMainCode();


            } catch (error) {

                status.textContent =
                    error.message;
            }
        };
    }


    // =====================================================
    // START
    // =====================================================

    (async function () {

        const valid =
            await checkSession();


        if (valid) {

            startHeartbeat();

            startMainCode();

        } else {

            showLogin();
        }

    })();

})();

