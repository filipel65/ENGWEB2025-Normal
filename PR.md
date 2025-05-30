
## PR.md

### Persistência de Dados

O ficheiro de dados original estava estruturado como um objeto JSON, onde cada edição do festival era uma propriedade com uma chave identificadora. Para facilitar o uso em MongoDB, essa estrutura foi convertida para um array JSON, no qual cada item representa uma edição distinta. O campo `id` original de cada entrada foi usado como valor do `_id`.

- **Base de Dados**: em MongoDB, com o nome `eurovisao`
- **Coleção**: `edicoes`
- **Schema (`ex1/models/editions-model.js`)**:
  - `_id`: String, obrigatório (identificador da edição)
  - `anoEdição`: String, obrigatório
  - `musicas`: Lista de objetos com os campos (`id`, `link`, `título`, `país`, `compositor`, `intérprete`, `letra`)
  - `organizacao`: String, obrigatório
  - `vencedor`: String

---

### Setup da Base de Dados

- **Importação**: foi realizada com o comando `mongoimport` sobre o ficheiro JSON já convertido para array:
```bash
mongoimport --db eurovisao --collection edicoes --file db.json --jsonArray
```

---

### Queries (exercício 1.2 - ficheiro `ex1/queries.txt`)

1. **Número total de registos (edições)**:
```javascript
db.edicoes.countDocuments()
```

2. **Edições em que "Ireland" foi vencedora**:
```javascript
db.edicoes.countDocuments({ vencedor: "Ireland" })
```

3. **Lista de intérpretes únicos (ordenada alfabeticamente)**:
```javascript
db.edicoes.aggregate([
  { $unwind: "$musicas" },
  { $group: { _id: "$musicas.intérprete" } },
  { $sort: { _id: 1 } }
])
```

4. **Número de músicas por edição**:
```javascript
db.edicoes.aggregate([
  { $project: { _id: 1, anoEdição: 1, numMusicas: { $size: "$musicas" } } },
  { $sort: { anoEdição: 1 } }
])
```

5. **Número de vitórias por país**:
```javascript
db.edicoes.aggregate([
  { $match: { vencedor: { $ne: null, $ne: "" } } },
  { $group: { _id: "$vencedor", numVitorias: { $sum: 1 } } },
  { $sort: { numVitorias: -1, _id: 1 } }
])
```

---

### Instruções de Execução

**Pré-requisitos**: Ter o Node.js, npm e MongoDB instalados e configurados.

**Para correr cada aplicação (`ex1` ou `ex2`):**
1. Acede à pasta da aplicação:
```bash
cd ex1
```
ou
```bash
cd ex2
```

2. Instala as dependências:
```bash
npm i
```

3. Inicia a aplicação:
```bash
npm start
```

**Portas utilizadas**:
- **ex1 (API de dados/backend)**: http://localhost:25000
- **ex2 (interface/frontend)**: http://localhost:25001
