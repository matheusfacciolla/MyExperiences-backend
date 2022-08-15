# <p align = "center"> Projeto MyExperiences </p>

<p align="center">
   <img src="https://user-images.githubusercontent.com/98189571/184582846-5c5c55f0-75a6-40e9-9a7b-074a91eb93d1.png" alt="dp" height="140" width="140"/>
</p>


<p align = "center">
   <img src="https://img.shields.io/badge/author-Matheus_Tassi-4dae71?style=flat-square" />
</p>

## :clipboard: Descrição

Durante a vida passamos por diversas experiências interessantes, vamos a um show da banda que gostamos, um jogo de futebol do time de coração, viajamos para lugares bonitos. As vezes é tanta coisa que acabamos esquecendo de uma ou outra. Pensando nisso foi criado o "My Experiences" um serviço em que você pode anotar todas suas experiências de vida e os detalhes sobre ela. Nunca mais alguma experiência de vida passará despercebida.

---

## :computer: Tecnologias e Conceitos

- JWTs & refresh tokens
- Node.js
- Express.js
- TypeScript
- Postgresql
- Heroku

---

## :rocket: Rotas

```yml
POST /signup
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body: {
        "email": "fulano@gmail.com",
        "name": "fulano"
        "password": "12345"
    }
```

```yml
POST /signin
    - Rota para fazer login
    - headers: {}
    - body: {
        "email": "fulano@gmail.com",
        "senha": "12345"
    }
```

```yml
POST /experiences/create (autenticada)
    - Rota para criar uma experiência
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "show tal",
        "place": "festival tal",
        "date": "dd/mm/yyyy",
        "description": "descrição",
        "category_id": "show"
    }
```

```yml
GET /experiences (autenticada)
    - Rota para listar suas experiências
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
DELETE /experiences/delete/:id (autenticada)
    - Rota para deletar uma experiência a partir do id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
POST /experiences/planned/create (autenticada)
    - Rota para planejar uma experiência
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "show tal",
        "place": "festival tal",
        "date": "dd/mm/yyyy",
        "description": "descrição",
        "category_id": "show"
    }
```

```yml
GET /experiences/planned (autenticada)
    - Rota para listar suas experiências planejadas
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
PUT /experiences/planned (autenticada)
    - Rota para marcar suas experiências planejadas como concluidas
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
DELETE /experiences/planned/delete/:id (autenticada)
    - Rota para deletar uma experiência planejada a partir do id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

---

## 🏁 Rodando a aplicação

Certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/matheusfacciolla/MyExperiences-backend
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor

```
npm run dev
```
