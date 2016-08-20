//console.log("loaded user.js");

function storeUser(id) {
    sessionStorage.setItem('user_id', id);
};

function getUser() {
    sessionStorage.getItem('user_id');
};
