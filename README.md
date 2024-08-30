# Brave Behind Bars Final Project #

Dockerized React front end web page focusing on "Hacking College".

# The purpose #

In todays day and age, a degree is almost a requirement, yet to some people, obtaining a degree is almost unattainable, "Hacking college" is the idea, and realisation that you don't **HAVE** to go to a traditional
brick and mortar to obtain that much needed degree. This website gives a brief explanation, outline, and additional resources to help break the water on the idea of obtaining a degree, a degree just as valuable as any other degree, by utilizing non-traditional resources such as ACE credits, CLEP & DSST tests, and work experience to obtain the credits needed to get that degree. Mind you, this project still has a long way to go, I do have a vision that one day it may come to be a valuable resource to individuals trying to obtain their education through non-traditional pathways similary to how I did, but, that day is not today.

I can say, to anyone reading this that may be wondering how in the world their ever going to be able to find the time or money to go and get their education, I plead to you, look at degreeforum (The basic pathway in this application was used/referenced/pulled from degree forums wiki), look at the code on these pages, particularly the resources page (as it has links to the places you will need to go) and just go **DO IT!**. After a 6 month adventure, and 90 ish credits earned in that 6 months, I can promise you, absolutely promise you, that you won't regret it!

# Stack #

1. Vite
2. React
3. Typescript
4. Tailwind
5. DaisyUi
6. Docker compose
7. Nginx
8. Ollama

# Installation #

1. Clone the repository:

``` bash
git clone https:github.com/CK-7vn/BraveFinalProject
```

2. Install dependencies:

``` bash
  yarn install
```

# Build #

1. Start docker-compose:

   ``` bash
   docker compose up -d --build
   ```

2. Install ollama model in ollama container:

   ```bash
    docker exec ollama pull tinyllama
    ```

# Front-End Dev #

1. Run:

``` bash
yarn dev
 ```

# Note

- You must use a docker exec command to pull the llama3 model in or else you will not be able to use the chat feature
- Vite serves page on port 5173, if you run "yarn dev" you will have to enter the page through localhost:5173.
- If you run docker compose, you will need to run directly through localhost, without the port extension, as Nginx serves as a reverse proxy to
direct traffic to the respective places.

# TODO #

1. Train personalized LLM. (In progress)
2. Work on UI
3. Implement backend to provide account services to keep track of users progress. (preferably ory Kratos)

# Features Hoped For #

- Ability for users to keep track of the entirety of their alternative credits in one central application.
- Build and design a personalized "hacked" degree path with LLM help on most efficient paths.
- News section for updates on new ACE accredited courses, free courses, etc.
- Community help

## Contributing ##

This is in infancy! Mostly an idea at this point, but I would love to bring it to fruition eventually, so any and all help is *very* much appreciated!

1. Fork the repo.
2. Create a new branch: `git checkout -b {new-branch-name}`
3. Make all the amazing changes.
4. Push your branch: `git push origin {new-branch-name}`
5. Create a pull request
6. Accidently make me feel bad about how far I still have to go in my developer journy

![CollegeHackedScreenShot50](https://github.com/user-attachments/assets/90863d33-2b37-4632-a8f9-4d092e26663b)

![HackCollege](https://github.com/user-attachments/assets/18576ea7-aef8-43da-a27a-56620347a8ca)
