# React Admin Console for SaaS scenarios
Here is an administration console that I've put together that uses Azure Active Directory as its directory service.

## Installation
1. Clone this GitHub repository
```bash
git clone https://github.com/harishnarain/hcloud-admin
```
2. Install all dependent npm packages
```bash
npm install --save
```
3. Run the demo in development
```bash
npm start
```

## Usage
Update the clientId section of the /src/authConfig.js file to include your specific application ID from your Azure AD application registration.

## Screenshots
![Login](https://github.com/harishnarain/hcloud-admin/blob/master/hcloud-admin-login.gif)
![User Management](https://github.com/harishnarain/hcloud-admin/blob/master/hcloud-admin-usermgmt.gif)

## Technologies Used
* Microsoft Authentication Library (MSAL) for JS
* Microsoft Azure Active Directory
* Microsoft Graph API
* ReactJS
* Redux
* Axios
* Material-UI

##License
This project uses the Apache 2.0 license

## Contributing
Pull requests are welcome.

