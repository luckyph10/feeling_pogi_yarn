
(function () {

    const USER_KEY = "fpy_username";
    const ACCESS_KEY = "fpy_key";

    function startMainCode() {

        // =================================================
        // YOUR EXISTING CODE GOES HERE
        // =================================================


(async () => {

    const E = [
        /no\s*ssl/i,
        /federal\s*idr\s*process/i,
        /rarc\s*code\s*n859/i,
        /self[-\s]*funded/i,
        /erisa/i,
        /oos/i,
        /out\s*of\s*state/i,
        /anthem\s*bcbs\s*ohio/i,
        /balanced\s*funding/i,
        /exchange\s*\/?\s*marketplace/i,
        /fully\s*insured/i,
        /fully\s*insured\s*-\s*over\s*65/i,
        /fully\s*insured\s*\(opt\s*in\)/i,
        /fully\s*insured\s*bluecard/i
    ];


    /* =========================================================
       CLIPBOARD
       ========================================================= */

    const copyToClipboard = async text => {

        if (!text) {
            return false;
        }


        /* -----------------------------------------
           MODERN CLIPBOARD API
           ----------------------------------------- */

        try {

            if (
                navigator.clipboard &&
                typeof navigator.clipboard.writeText === "function"
            ) {

                await navigator.clipboard.writeText(text);

                return true;

            }

        } catch (e) {

            console.warn(
                "Clipboard API failed:",
                e
            );

        }


        /* -----------------------------------------
           FALLBACK
           ----------------------------------------- */

        try {

            const textarea =
                document.createElement("textarea");


            textarea.value = text;

            textarea.setAttribute(
                "readonly",
                ""
            );


            Object.assign(
                textarea.style,
                {
                    position: "fixed",
                    left: "-10000px",
                    top: "0",
                    width: "1px",
                    height: "1px",
                    opacity: "0",
                    pointerEvents: "none",
                    zIndex: "2147483647"
                }
            );


            document.body.appendChild(
                textarea
            );


            textarea.focus();

            textarea.select();

            textarea.setSelectionRange(
                0,
                text.length
            );


            const result =
                document.execCommand("copy");


            textarea.remove();


            return result;

        } catch (e) {

            console.error(
                "Clipboard fallback failed:",
                e
            );

            return false;

        }

    };


    /* =========================================================
       NOTIFICATION
       ========================================================= */

    const showNotification = (
        message,
        success = true
    ) => {

        const old =
            document.getElementById(
                "case-history-evidence-notification"
            );


        if (old) {
            old.remove();
        }


        const p =
            document.createElement("div");


        p.id =
            "case-history-evidence-notification";


        p.textContent =
            message;


        Object.assign(
            p.style,
            {
                position: "fixed",
                top: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: "2147483647",
                background:
                    success
                        ? "#198754"
                        : "#dc3545",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "7px",
                fontSize: "14px",
                fontWeight: "600",
                fontFamily:
                    "Arial,sans-serif",
                boxShadow:
                    "0 4px 15px rgba(0,0,0,.35)",
                opacity: "0",
                transition:
                    "opacity .2s",
                maxWidth:
                    "calc(100vw - 40px)",
                textAlign: "center",
                whiteSpace: "normal",
                wordBreak: "break-word"
            }
        );


        document.body.appendChild(p);


        requestAnimationFrame(() => {
            p.style.opacity = "1";
        });


        setTimeout(() => {

            p.style.opacity = "0";


            setTimeout(() => {

                if (p.parentNode) {
                    p.remove();
                }

            }, 250);

        }, 2500);

    };


    /* =========================================================
       OPEN NEW DROPDOWN FIRST
       ========================================================= */

    try {

        const dropBtn =
            document.querySelector(
                "#ngForm > fieldset > div:nth-child(24) > div.d-flex.mb-2 > button"
            );


        if (dropBtn) {

            const collapse =
                document.querySelector(
                    "#ngForm > fieldset > div:nth-child(24) > div.collapse"
                );


            if (
                collapse &&
                !collapse.classList.contains("show")
            ) {

                dropBtn.click();

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            500
                        )
                );

            }

        }

    } catch (e) {

        console.warn(
            "Could not open Case Notes section:",
            e
        );

    }


    /* =========================================================
       VOB HISTORY
       ========================================================= */

    let vDate = "";
    let vNote = "";
    let vTime = 0;


    try {

        const btn =
            document.querySelector(
                "#ngForm > fieldset > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > app-vob-history > div > div:nth-child(3) > div.small.text-muted.d-inline-flex.align-items-center.gap-1.user-select-none"
            );


        if (btn) {

            const panel =
                document.querySelector(
                    "#ngForm > fieldset > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > app-vob-history > div > div:nth-child(3) > div.collapse.mt-1.small"
                );


            if (
                panel &&
                !panel.classList.contains("show")
            ) {

                btn.click();

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            500
                        )
                );

            }


            const vd =
                document.querySelector(
                    "#ngForm > fieldset > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > app-vob-history > div > div:nth-child(3) > div.collapse.mt-1.small.show > div > div > div.d-flex.align-items-center.flex-wrap.gap-1.mb-1 > span.text-muted.ms-auto.text-nowrap"
                )?.innerText
                    ?.trim()
                || "";


            vNote =
                document.querySelector(
                    "#ngForm > fieldset > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > app-vob-history > div > div:nth-child(3) > div.collapse.mt-1.small.show > div > div > div.text-muted.fst-italic"
                )?.innerText
                    ?.trim()
                    .replace(
                        /^"+|"+$/g,
                        ""
                    )
                || "";


            const m =
                vd.match(
                    /(\d{4})-(\d{2})-(\d{2})/
                );


            if (m) {

                vDate =
                    `${parseInt(m[2],10)}/${parseInt(m[3],10)}/${m[1]}`;


                vTime =
                    new Date(
                        Number(m[1]),
                        Number(m[2]) - 1,
                        Number(m[3])
                    ).getTime();

            }

        }

    } catch (e) {

        console.warn(
            "VOB History extraction error:",
            e
        );

    }


    /* =========================================================
       NEW SELECTOR
       ========================================================= */

    let sDate = "";
    let sNote = "";
    let sTime = 0;


    try {

        const newSelector =
            "#ngForm > fieldset > div:nth-child(24) > div.collapse.show > div > div:nth-child(3)";


        const newEl =
            document.querySelector(
                newSelector
            );


        if (newEl) {

            const txt =
                (
                    newEl.innerText ||
                    ""
                )
                .replace(/\s+/g, " ")
                .trim();


            let dm =
                txt.match(
                    /([A-Z][a-z]{2,8}\s+\d{1,2},\s+\d{4}\s+\d{1,2}:\d{2}\s*[AP]M)/i
                );


            if (dm) {

                const d =
                    new Date(
                        dm[1]
                    );


                if (!isNaN(d.getTime())) {

                    sTime =
                        d.getTime();

                    sDate =
                        d.toLocaleDateString(
                            "en-US"
                        );

                }

            }


            if (!sTime) {

                dm =
                    txt.match(
                        /(\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}\s*[AP]M)/i
                    );


                if (dm) {

                    const d =
                        new Date(
                            dm[1]
                        );


                    if (!isNaN(d.getTime())) {

                        sTime =
                            d.getTime();

                        sDate =
                            d.toLocaleDateString(
                                "en-US"
                            );

                    }

                }

            }


            if (!sTime) {

                dm =
                    txt.match(
                        /(\d{4}-\d{2}-\d{2}\s+\d{1,2}:\d{2}\s*[AP]M)/i
                    );


                if (dm) {

                    const d =
                        new Date(
                            dm[1]
                        );


                    if (!isNaN(d.getTime())) {

                        sTime =
                            d.getTime();

                        sDate =
                            d.toLocaleDateString(
                                "en-US"
                            );

                    }

                }

            }


            sNote =
                txt
                    .replace(
                        /([A-Z][a-z]{2,8}\s+\d{1,2},\s+\d{4}\s+\d{1,2}:\d{2}\s*[AP]M)/i,
                        ""
                    )
                    .replace(
                        /(\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}\s*[AP]M)/i,
                        ""
                    )
                    .replace(
                        /(\d{4}-\d{2}-\d{2}\s+\d{1,2}:\d{2}\s*[AP]M)/i,
                        ""
                    )
                    .trim();


            if (
                !E.some(
                    x => x.test(txt)
                )
            ) {

                sNote = "";

            }

        }

    } catch (e) {

        console.warn(
            "New selector extraction error:",
            e
        );

    }


    /* =========================================================
       CASE NOTE
       ========================================================= */

    let cDate = "";
    let cNote = "";
    let cTime = 0;


    try {

        for (
            const r of
            [
                ...document.querySelectorAll("tr")
            ].reverse()
        ) {

            const t =
                (
                    r.innerText ||
                    ""
                )
                .replace(
                    /\s+/g,
                    " "
                )
                .trim();


            if (
                E.some(
                    x => x.test(t)
                )
            ) {

                const dm =
                    t.match(
                        /([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4}.*?[AP]M)/i
                    );


                if (dm) {

                    cTime =
                        new Date(
                            dm[1]
                        ).getTime();


                    cDate =
                        new Date(
                            dm[1]
                        ).toLocaleDateString(
                            "en-US"
                        );


                    cNote =
                        t
                            .replace(
                                /^.*?[AP]M\s+/,
                                ""
                            )
                            .trim();

                }


                break;

            }

        }

    } catch (e) {

        console.warn(
            "Case note extraction error:",
            e
        );

    }


    /* =========================================================
       PICK BEST / NEWEST
       ========================================================= */

    const candidates = [];


    if (
        cTime > 0 &&
        cNote
    ) {

        candidates.push({
            time: cTime,
            date: cDate,
            note: cNote,
            source: "Case Note"
        });

    }


    if (
        sTime > 0 &&
        sNote
    ) {

        candidates.push({
            time: sTime,
            date: sDate,
            note: sNote,
            source: "New Selector"
        });

    }


    if (
        vTime > 0 &&
        vNote
    ) {

        candidates.push({
            time: vTime,
            date: vDate,
            note: vNote,
            source: "VOB History"
        });

    }


    candidates.sort(
        (a,b) =>
            b.time - a.time
    );


    let out = "";
    let source = "";


    if (candidates.length) {

        const best =
            candidates[0];


        out =
            `${best.date} - ${best.note}`;


        source =
            best.source;

    }


    /* =========================================================
       COPY RESULT
       ========================================================= */

    if (out) {

        const copied =
            await copyToClipboard(
                out
            );


        if (copied) {

            showNotification(
                `Copied: ${source}`,
                true
            );

            console.log(
                "CASE/HISTORY EVIDENCE COPIED:",
                out
            );

        } else {

            showNotification(
                "Evidence found, but clipboard copy failed.",
                false
            );

            console.warn(
                "Clipboard failed. Evidence:",
                out
            );

        }

    } else {

        showNotification(
            "No supporting note found",
            false
        );

        console.warn(
            "No supporting note found."
        );

    }

})();


 // =================================================
        // END YOUR EXISTING CODE
        // =================================================
    }


    // =====================================================
    // STRICT AUTH CHECK
    // =====================================================

    const username =
        localStorage.getItem(USER_KEY);

    const accessKey =
        localStorage.getItem(ACCESS_KEY);


    // REGISTERED
    if (username && accessKey) {

        startMainCode();

        return;
    }


    // =====================================================
    // NOT REGISTERED → STOP EVERYTHING
    // =====================================================

    if (document.getElementById("fpy-auth-overlay")) {
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
                One-time registration only
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
                Save & Continue
            </button>

        </div>
    `;


    document.body.appendChild(overlay);


    // Close = stay blocked
    overlay
        .querySelector("#fpy-close-btn")
        .onclick = function () {

            overlay.remove();

            // IMPORTANT:
            // Main code still does NOT run.

        };


    // Save registration
    overlay
        .querySelector("#fpy-save-btn")
        .onclick = function () {

            const newUsername =
                overlay
                    .querySelector("#fpy-username")
                    .value
                    .trim();

            const newAccessKey =
                overlay
                    .querySelector("#fpy-accesskey")
                    .value
                    .trim();


            if (!newUsername || !newAccessKey) {

                alert(
                    "Username and Access Key are required."
                );

                return;
            }


            localStorage.setItem(
                USER_KEY,
                newUsername
            );


            localStorage.setItem(
                ACCESS_KEY,
                newAccessKey
            );


            overlay.remove();


            // NO reload.
            // Start the previously blocked code now.

            startMainCode();

        };

})();
