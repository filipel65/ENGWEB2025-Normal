var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req,res) {
  axios.get('http://localhost:25000/edicoes')
    .then(resp => {
      res.render('editions', { lista:resp.data, 
        tit:"Lista de edições"});
    })
    .catch(err => {
      console.log(err);
      res.render('error', { error:err });
    });
});

router.get('/paises/:pais', function(req, res, next) {
  const country_name = req.params.pais;

  Promise.all([
    axios.get(`http://localhost:25000/edicoes`),
    axios.get(`http://localhost:25000/edicoes?org=${country_name}`)
  ])
  .then(([editions_res, organized_res]) => {
    const editions = editions_res.data;
    const organizedEditionsData = organized_res.data;

    const participatedEditions = [];
    if (Array.isArray(editions)) {
      editions.forEach(edition => {
        if (edition.musicas && Array.isArray(edition.musicas)) {
          edition.musicas.forEach(musica => {
            if (musica.país === country_name) {
              participatedEditions.push({
                id_edicao: edition._id,
                ano: edition.anoEdição,
                musica_nome: musica.título,
                interprete_nome: musica.intérprete,
                venceu: edition.vencedor === country_name
              });
            }
          });
        }
      });
    }

    const editionsOrganized = Array.isArray(organizedEditionsData)
      ? organizedEditionsData.map(edition => ({
          id_edicao: edition._id,
          ano: edition.anoEdição
        }))
      : [];

    res.render('country-page', {
      pais: country_name,
      participatedEditions: participatedEditions,
      organizedEditions: editionsOrganized,
      tit: `detalhes de ${country_name}`
    });
  })
  .catch(err => {
    const msg = `Não foi possível carregar os dados para o país: ${country_name}.`;
    res.render('error', { 
        error: { status: err.response ? err.response.status : 500, stack: err.stack }, 
        message: msg 
    });
  });
});

router.get('/:id', function(req,res) {
  axios.get(`http://localhost:25000/edicoes/${req.params.id}`)
    .then(resp => {
      res.render('edition-info', { obj:resp.data, 
        tit:"detalhes de edição"});
    })
    .catch(err => {
      console.log(err);
      res.render('error', { error:err });
    });
});

module.exports = router;