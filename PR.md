
## PR.md

### Armazenamento dos Dados

O ficheiro original encontrava-se estruturado como um objeto JSON, onde cada chave representava uma edição. Para facilitar a importação para MongoDB, essa estrutura foi convertida para um array de objetos JSON, sendo que cada objeto corresponde a uma edição específica do festival. O campo `id` original passou a ser usado como `_id` para identificação de cada documento.

- **Base de Dados**: MongoDB, com o nome `eurovisao`
- **Coleção utilizada**: `edicoes`
- **Modelo (`ex1/models/editions-model.js`)**:
  - `_id`: String, obrigatório (identificador da edição)
  - `anoEdição`: String, obrigatório
  - `musicas`: Array de objetos contendo (`id`, `link`, `título`, `país`, `compositor`, `intérprete`, `letra`)
  - `organizacao`: String, obrigatório
  - `vencedor`: String

---

### Configuração da Base de Dados

- **Importação dos dados**: foi feito com o comando `mongoimport`, usando a versão em array do dataset JSON:
  ```bash
  mongoimport --db eurovisao --collection edicoes --file <DATASET>.json --jsonArray
  ```

---

### Consultas (exercício 1.2 - ficheiro `ex1/queries.txt`)

1. **Número total de documentos (edições)**:
   ```javascript
   db.edicoes.countDocuments()
   ```

2. **Número de edições onde "Ireland" foi vencedor**:
   ```javascript
   db.edicoes.countDocuments({ vencedor: "Ireland" })
   ```

3. **Lista de intérpretes (sem repetições e por ordem alfabética)**:
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

### Como Executar as Aplicações

**Pré-requisitos**: Ter o Node.js, npm e MongoDB instalados e com a base de dados em funcionamento.

**Para correr cada uma das aplicações (ex1 ou ex2):**
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
3. Inicia o servidor:
   ```bash
   npm start
   ```

**Portas utilizadas:**
- **ex1 (backend/API)**: `http://localhost:25000`
- **ex2 (frontend/interface)**: `http://localhost:25001`
