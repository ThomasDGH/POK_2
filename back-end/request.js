const express = require('express');
const cors = require('cors');
const { mainModule } = require('process');

const app = express();

app.use(express.json());
app.use(cors());

const requests = [
    {id:1, prénom: 'Thomas', nom: 'Duroy', mail:'exemple.com', type_projet:"data", titre:"Reconnaissance visuelle de limaces"},
    {id:2, prénom: 'Thomas', nom: 'Duroy', mail:'exemple.com', type_projet:"dev", titre:"Un site plus beau"}
];



app.get('/api/requests', (req,res) =>{
    res.send(requests);
});

app.get('/api/requests/:id',(req,res) => {
    //Vérifier que la proposition existe
    const proposition = requests.find(p => p.id === parseInt(req.params.id));
    if (!proposition) res.status(404).send("La requête n'a pas encore été formulée, je vous invite à le faire !");
    res.send(proposition);
});

app.post('/api/requests',(req,res) =>{
    //checker si la requête est valide
    if (!req.body.prénom || !req.body.nom || !req.body.mail || !req.body.type_projet || !req.body.titre ) {
        res.status(400).send('Demande incomplète');
    }
    //ajouter la nouvelle proposition
    const proposition = {
        id: requests.length + 1,
        prénom: req.body.prénom,
        nom: req.body.nom,
        mail: req.body.mail,
        type_projet: req.body.type_projet,
        titre: req.body.titre
    };

    requests.push(proposition);
    res.send(proposition);
});

app.put('/api/requests/:id', (req,res)=>{
    //Vérifier que la proposition existe
    const proposition = requests.find(p => p.id === parseInt(req.params.id));
    if (!personne) res.status(404).send("La requête n'existe pas");

    //checker si la requête est valide
    if (!req.body.prénom || !req.body.nom || !req.body.mail || !req.body.type_projet || !req.body.titre) {
        res.status(400).send('Demande incomplète');
    }

    proposition.prénom= req.body.prénom;
    proposition.nom= req.body.nom;
    proposition.mail= req.body.mail;
    proposition.type_projet= req.body.type_projet;
    proposition.titre= req.body.titre;
    res.send(personne);
});

app.delete('/api/requests/:id', (req,res) => {
    //Vérifier que la proposition existe
    const proposition = répertoire.find(p => p.id === parseInt(req.params.id));
    if (!proposition) res.status(404).send("La requête n'existe pas");

    //Supprimer la personne
    const index = répertoire.indexOf(proposition);
    requests.splice(index,1);

    res.send(proposition);
});

const port = process.env.PORT || 3000 ;

app.listen(port,() => console.log(`listening on port ${port}`));