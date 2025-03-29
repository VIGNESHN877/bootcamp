const fs = require('fs');
const path = require('path');

class UserManager {
    constructor(filename = 'users.json') {
        this.filename = path.join(__dirname, filename);
        this.loadUsers();
    }

    loadUsers() {
        if (fs.existsSync(this.filename)) {
            const data = fs.readFileSync(this.filename, 'utf-8');
            this.users = JSON.parse(data);
        } else {
            this.users = [];
        }
    }

    saveUsers() {
        fs.writeFileSync(this.filename, JSON.stringify(this.users, null, 4));
    }

    createUser (user) {
        this.users.push(user);
        this.saveUsers();
    }

    readUsers() {
        return this.users;
    }

    updateUser (userId, updatedUser ) {
        const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...updatedUser  };
            this.saveUsers();
            return true;
        }
        return false;
    }

    deleteUser (userId) {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== userId);
        if (this.users.length < initialLength) {
            this.saveUsers();
            return true;
        }
        return false;
    }
}

// Example usage
if (require.main === module) {
    const userManager = new UserManager();

    // Create new users
    userManager.createUser ({ id: 1, name: 'Alice', age: 30 });
    userManager.createUser ({ id: 2, name: 'Bob', age: 25 });

    // Read all users
    console.log("Users after creation:");
    console.log(userManager.readUsers());

    // Update a user
    userManager.updateUser (1, { name: 'Alice Smith', age: 31 });

    // Read all users after update
    console.log("Users after update:");
    console.log(userManager.readUsers());

    // Delete a user
    userManager.deleteUser (2);

    // Read all users after deletion
    console.log("Users after deletion:");
    console.log(userManager.readUsers());
}