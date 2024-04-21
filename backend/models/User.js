export class User{
    static users = [];
    constructor(username, password){
        this.userId= User.users.length + 1;
        this.username = username;
        this.password = password;
        User.users.push(this);
    }
    getUsername(){
        return this.username;
    }
    getPassword(){
        return this.password;
    }
    static getUsers(){
        return this.users;
    }
}