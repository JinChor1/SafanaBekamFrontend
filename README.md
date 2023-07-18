<div align="center">
  <h1>Safana Bekam Booking Site</h1>
  <p>
    Booking Site for Safana Bekam System
  </p>

<p>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/JinChor1/SafanaBekamFrontend" alt="watchers" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/watchers/JinChor1/SafanaBekamFrontend" alt="last update" />
  </a>
</p>


<h4><a href="https://safanabekam.onrender.com/">View Demo</a></h4>
<i>Note that hosted site might be slow on booting up due to server spindown.</i>
</div>

<!-- Screenshot -->
## 📸: Screenshot


<!-- HomePage -->
### Home Page
![image](https://github.com/JinChor1/SafanaBekamFrontend/assets/136385395/6ff13a50-af1b-4a98-bf5d-81254df0d72a)

### Calendar
![image](https://github.com/JinChor1/SafanaBekamFrontend/assets/136385395/1bf2271d-4adc-431b-818a-eb7d308e826b)

### Profile
![image](https://github.com/JinChor1/SafanaBekamFrontend/assets/136385395/5194c48e-12d5-4213-9578-10ef7eeb9ebb)


<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

Set up backend service using [this repo](https://github.com/JinChor1/SafanaBekamBackend)

<!-- Run Locally -->
### :running: Run Locally or Remotely

Clone the project

```bash
  git clone https://github.com/JinChor1/SafanaBekamFrontend.git
```

Go to the project directory

```bash
  cd project-directory
```

Install dependencies

```bash
  npm install
```

Change company's id on .env file 

```bash
  REACT_APP_COMPANYID=
```

Change api domain name

1. Go to src/hooks/ueseAuthAPI.js
2. Go to line 36
```bash
  const response = await fetch(`https://safanabekam-backend.onrender.com${req.apiRoute}`, {
```
3. Change route
  - Local
  ```bash
    const response = await fetch(`${req.apiRoute}`, {
  ```
  - Remote
  ```bash
    const response = await fetch(`[your hosting domain]${req.apiRoute}`, {
  ```

4. Do the same in
   - src/hooks/useLogIn.js
   - src/hooks/useSignUp.js
   - src/pages/Home.js
   - src/pages/Contact.js
   - src/pages/Confirmation.js
   - src/pages/ResetPass.js

Run 
```bash
  npm start
```

<!-- To Do -->
## 	🔨: To Do

- environment variable for API route
