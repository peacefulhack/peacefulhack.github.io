var app = new Vue({
    el: '#app',
    data: {
        errorMsg: "",
        successMsg: "",
        showModal: false,
        showModal2: false,
        showModal3: false,
        users: [],
        newUser: {name: "", nrp: "", email: ""},
        currentUser: {}
    },
    mounted: function(){
        this.getAllUsers();
    },
    methods: {
        getAllUsers(){
            axios.get("https://peacefulhack.github.io/controller/conn.php?action=read").then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }
                else{
                    app.users = response.data.users;
                }
            });
        },
        addUser(){
            var formData = app.toFormData(app.newUser);
            axios.post("https://peacefulhack.github.io/controller/conn.php?action=create", formData).then(function(response){
                app.newUser = {name: "",nrp: "",email: ""};
                if(response.data.error){ 
                    app.errorMsg = response.data.message;
                }
                else{
                    app.successMsg = response.data.message;
                    app.getAllUsers();
                }
            });
        },

        updateUser(){
            var formData = app.toFormData(app.currentUser);
            axios.post("https://peacefulhack.github.io/controller/conn.php?action=update", formData).then(function(response){
                app.currentUser = {};
                if(response.data.error){ 
                    app.errorMsg = response.data.message;
                }
                else{
                    app.successMsg = response.data.message;
                    app.getAllUsers();
                }
            });
        },

        deleteUser(){
            var formData = app.toFormData(app.currentUser);
            axios.post("https://peacefulhack.github.io/controller/conn.php?action=delete", formData).then(function(response){
                app.currentUser = {};
                if(response.data.error){ 
                    app.errorMsg = response.data.message;
                }
                else{
                    app.successMsg = response.data.message;
                    app.getAllUsers();
                }
            });
        },
        toFormData(obj){
            var fd = new FormData();
            for(var i in obj){
                fd.append(i,obj[i]);
            }
            return fd;
        },
        selectUser(user){
            app.currentUser = user;
        },
        clearMsg(){
            app.errorMsg = "";
            app.successMsg = "";
        }
    }
})