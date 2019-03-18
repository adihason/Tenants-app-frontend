{
    const BASE_URL = "http://localhost:3000";
    function route(path) {
        const temp = `${BASE_URL}/${path}`;
        return temp;
    }


    function showEditForm(tenantId) {
        $saveButton.setAttribute("data-tenant-id", tenantId);
        $tenantsForm.classList.add("d-none");
        $EditForm.classList.remove("d-none");
    }


    function showPostForm() {
        $tenantsForm.classList.add("d-none");
        $postForm.classList.remove("d-none");
    }

    function showTenantsList() {
        // hide the login form
        $loginForm.classList.add("d-none");
        fetch(route(`tenants`))
            .then(res => res.json())
            .then(resJsonBody => {
                document.querySelector("#tenants-list").innerHTML = '';
                for (let i = 0; i < resJsonBody.length; i++) {
                    renderSingleTenantRow(resJsonBody[i]);
                }
            })
            .catch(reason => console.log("Error", reason.message));
    }

    function deleteTenant(tenantId) {
        fetch(route(`tenants/${tenantId}`), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                document.getElementById(tenantId).classList.add("d-none");
            })
            .catch(reason => console.log("Error", reason.message));
    }


    function editTenant() {
        let tenantId = $saveButton.getAttribute("data-tenant-id");
        var debtVal;
        if ($editTenantDebts.checked === true) {
            debtVal = 1;
        }
        else {
            debtVal = 0;
        }
        fetch(route(`tenants/${tenantId}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: $editTenantName.value,
                phoneNumber: $editTenantNumber.value,
                address: $editTenantAddress.value,
                debts: debtVal
            })
        })
            .then(res => {
                showTenantsList();
                $EditForm.classList.add("d-none");
            })
            .catch(reason => console.log("Error", reason.message));
    }

    function addTenant() {
        var debtVal;
        if ($postTenantDebts.checked === true) {
            debtVal = 1;
        }
        else {
            debtVal = 0;
        }
        fetch(route(`tenants`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: $postTenantName.value,
                phoneNumber: $postTenantNumber.value,
                address: $postTenantAddress.value,
                debts: debtVal
            })
        })
            .then(res => {
                showTenantsList();
                $postForm.classList.add("d-none");
            })
            .catch(reason => console.log("Error", reason.message));
    }

    function renderSingleTenantRow(tenant) {
        $loginForm.classList.add("d-none");
        const $tenant = $template.cloneNode(true);
        $tenant.id = tenant._id;
        $tenant.querySelector(".tenant-name").innerText = `${tenant.name}`;
        $tenant.querySelector(".tenant-phone").innerText = `${tenant.phoneNumber}`;
        $tenant.querySelector(".tenant-address").innerText = `${tenant.address}`;
        if (tenant.debts === 1) {
            $tenant.querySelector(".tenant-debts").innerText = `YES`;
        }
        else {
            $tenant.querySelector(".tenant-debts").innerText = `NO`;
        }
        $tenant.classList.remove("d-none");
        $tenantsForm.classList.remove("d-none");
//TODO: inefficient dom query (-5) -- you query for this element in every iteration of the loop(filterTenantByName)
        document.querySelector("#tenants-list").appendChild($tenant);
    }
}