# Setup the app locally 
1. Clone the repository
1. Install dependencies
    ```bash
    npm install
    ```
1. Run data loader
    ```bash
    npm run init:run-dataloader
    ```

# Run data loader in heroku
1. login to heroku
    ```bash
    heroku login
    ```
1. access to bash shell on heroku
    ```bash
    heroku run bash
    ``` 
1. Run data loader
    ```bash
    npm run heroku:dataloader
    ```