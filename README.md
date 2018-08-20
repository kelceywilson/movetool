# movetool

## WORK IN PROGRESS

### repository lacks /config/keys_dev.js which contains the following object:

```module.exports = {
mongoURI: [this will be your MongoDB connection URI],
secretOrKey: [yours]
};
```

### You will also need a .env file with the following keys you can get from your Cloudinary account:

#### CLOUD_NAME=[yours]

#### API_KEY=[yours]

#### API_SECRET=[yours]

## TODO

1. Fix change photo

2. Only allow logged in users to create alert

- Make Create Alert button Login to Create Alert Button

3. Only allow users to edit/delete their own alerts

- Hide delete & edit buttons for others
- Add validation to route
- Empty SET_current_user on logout
- style buttons

4. Disable input boxes until edit button is clicked

- Add edit button to detail component

5. Add alerts for particular user link to each of their alerts

- Add posted by line in detail

6. Add description input etc to alert

7. Add how to guide

8. Type limits & max file size cloudinary

9. License? AGPL, LGPL, GPL?
