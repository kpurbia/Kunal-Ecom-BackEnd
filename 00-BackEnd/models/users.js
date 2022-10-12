export default class Users {
    constructor(
      UserID,
      UserName,
      UserEmail,
      UserPassword,
      UserContact,
      UserState,
      UserCity,
      UserRole,
      table
    ) {
      this.UserID = user_id;
      this.UserName = user_name;
      this.UserEmail = user_email;
      this.UserPassword = user_password;
      this.UserContact = user_contact;
      this.UserState = user_state;
      this.UserCity = user_city;
      this.UserRole = user_role;
      this.table = "users";
    }
  
    display() {
      console.log(`Id= ${this.UserId}`);
      console.log(`Name= ${this.UserName}`);
      console.log(`Email= ${this.UserEmail}`);
      console.log(`User Role= ${this.UserRole}`);
      console.log(`Contact= ${this.UserContact}`);
      console.log(`State= ${this.UserState}`);
      console.log(`City= ${this.UserCity}`);
    }
  }
  