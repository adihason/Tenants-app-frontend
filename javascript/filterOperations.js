function filterByTenantsHaveDebts() {
    fetch(route(`tenants`))
        .then(res => res.json())
        .then(resJsonBody => {
            document.querySelector("#tenants-list").innerHTML = '';
            for (let i = 0; i < resJsonBody.length; i++) {
                if (resJsonBody[i].debts === 1) {
                    renderSingleTenantRow(resJsonBody[i]);
                }
            }
        })
        .catch(reason => console.log("Error", reason.message));
}

function filterByTenantsDontHaveDebts() {
    fetch(route(`tenants`))
        .then(res => res.json())
        .then(resJsonBody => {
            document.querySelector("#tenants-list").innerHTML = '';
            for (let i = 0; i < resJsonBody.length; i++) {
                if (resJsonBody[i].debts === 0) {
                    renderSingleTenantRow(resJsonBody[i]);
                }
            }
        })
        .catch(reason => console.log("Error", reason.message));
}

function filterTenantByName() {
    fetch(route(`tenants`))
        .then(res => res.json())
        .then(resJsonBody => {
            //TODO: inefficient dom query (-5)
            document.querySelector("#tenants-list").innerHTML = '';
            for (let i = 0; i < resJsonBody.length; i++) {
                if (resJsonBody[i].name === $userNameSearch.value) {
                    renderSingleTenantRow(resJsonBody[i]);
                }
            }
        })
        .catch(reason => console.log("Error", reason.message));
}