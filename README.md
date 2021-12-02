# project2
This repository is reserved for Bootcamp Project 2

Wireframe
![image](https://user-images.githubusercontent.com/88950849/144348863-b1f1eef9-eea2-49dc-ba55-8a8a7b324a34.png)

![image](https://user-images.githubusercontent.com/88950849/144350272-6535d383-113d-460e-b83d-64c6f6518c8f.png)

![image](https://user-images.githubusercontent.com/88950849/144350918-81f0513c-2168-439f-8a4d-c8c41e1ee87b.png)

![image](https://user-images.githubusercontent.com/88950849/144351197-1e6069be-7f85-49f5-bc2b-665385f03309.png)

![image](https://user-images.githubusercontent.com/88950849/144351318-f07f9333-b375-4ade-83df-31f562b4cfef.png)


Steps to Seed DB: 
1. Make a pull request of the main branch
2. Checkout a new branch (git checkout -b <branchName>
3. Run npm installl to create your local node_modules flder
4. Add your secrets to the .env file:
    DB_NAME=subscription_db
    DB_USER=
    DB_PASSWORD=
    PORT=3000
5. Connect to mySQL in the terminal (mysql -u <username> -p) and run db/schema.sql to create the DB
6. Quit your mysql connection and run the following to seed the DB: npm run seed
