const {Encryptor} = require('../Encryptor.js')


function decryptCmd(yargs){
    yargs.command({

        //comando richiamabile usando quest'app
        command: 'decrypt',
        //descrizione del comando
        describe: 'decodifica una stringa numerica O alfabetica',

        //flags che mi apsetto
        builder: {

            //mi  aspetto il flag nome
            string:{
                //descrizione del flag
                describe: 'Stringa da decrittografare, deve essere SOLO numerica, oppure SOLO alfabetica',
                //flag obbligatorio
                demandOption: true,
                //tipo
                type: 'string'
                
            },
            key:{
                //descrizione del flag
                describe: 'Chiave di crittografia, deve corrispondere al tipo della stringa da codificare (SOLO numerica o SOLO alfabetica)',
                //flag obbligatorio
                demandOption: true,
                //tipo
                type: 'string'
                
            }
        },

        //handler quando richiamerò il comando get
        handler(argv){
            _decryptCmdHandler(argv);
        }

    })

}

function _decryptCmdHandler(args){

    let key = args['key'];
    let strToDecrypt = args['string'];

    let encryptor = new Encryptor(key);
    let error = encryptor.checkErrors(strToDecrypt);
    if(error){
        console.log(error);
    }

    else{
        let decryptedStr = encryptor.decrypt(strToDecrypt);
        console.log(decryptedStr);
    }

}


module.exports = {
    decryptCmd
}