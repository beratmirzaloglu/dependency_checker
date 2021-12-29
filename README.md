<div id="top"></div>

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Repository Outdated Dependency Checker</h3>

</div>

<!-- ABOUT THE PROJECT -->

## About The Project

You can check the outdated dependencies of your Node.js and PHP projects and you can subscribe to get mails of outdated dependencies every 24 hours.

### Built With

- [Nest.js](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [RabbitMQ](https://www.rabbitmq.com/)

<!-- INSTALLATION -->

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/beratmirzaloglu/dependency_checker.git
   ```
2. Install dependencies of email sender microservice
   ```sh
   cd email-sender-microservice
   npm install
   ```
3. Install dependencies of outdated dependency checker API project
   ```sh
   cd dependency-checker-api
   npm install
   ```
4. Run API
   ```sh
   cd dependency-checker-api
   npm run start:dev
   ```
5. Run email sender microservice
   ```sh
   cd email-sender-microservice
   npm run start:dev
   ```

<!-- USAGE EXAMPLES -->

## Usage

After you complete the installation process, you can send Post requests to API via HTTP tool (like Postman). Here is an example for post request:

![Example API Request](https://i.hizliresim.com/s204mb4.png)

<!-- CONTACT -->

## Contact

Berat Mirzaloglu - beratmirzaloglu@gmail.com

Project Link: [https://github.com/beratmirzaloglu/dependency_checker](https://github.com/beratmirzaloglu/dependency_checker)

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/beratmirzaloglu
