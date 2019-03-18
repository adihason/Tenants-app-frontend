{

    const $tenantsForm = document.querySelector("#tenants-form");

    function login() {
        fetch(route(`users/signin`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: $userName.value,
                password: $userPassword.value,
            })
        })
            .then(res => res.json())
            .then(resJsonBody => {
                if (resJsonBody.status !== 200) {
                    //TODO: Very good!
                    moveToUnauthorizedAccessPage("Unauthorized Access");
                }
                else {
                    showTenantsList(resJsonBody.name);
                    localStorage.setItem('token', resJsonBody.token);
                }
            })
            .catch(reason => console.log("Error", reason.message));
    }

    function moveToUnauthorizedAccessPage(msg) {
        $loginForm.classList.add("d-none");
        $errorForm.classList.remove("d-none");
        $errorMessage.innerText = `${msg}`;
    }

    function logout() {
        fetch(route(`users/signout`))
            .then(() => {
                localStorage.removeItem('token');
                // $welcomeUser.innerText = ``;
                $loginForm.classList.remove("d-none");
                $tenantsForm.classList.add("d-none");
            });
    }
}