
const {Encryptor} = require('../Encryptor.js')


function encryptCmd(yargs){
    yargs.command({

        //comando richiamabile usando quest'app
        command: 'encrypt',
        //descrizione del comando
        describe: 'Codifica una stringa numerica O alfabetica',

        //flags che mi apsetto
        builder: {

            //mi  aspetto il flag nome
            string:{
                //descrizione del flag
                describe: 'Stringa da crittografare, deve essere SOLO numerica, oppure SOLO alfabetica',
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
            _encryptCmdHandler(argv);
        }

    })

}

function _encryptCmdHandler(args){
   let key = args['key'];
   let strToEncrypt = args['string'];

   let encryptor = new Encryptor(key);
   let errorMsg = encryptor.getErrors(strToEncrypt);

   if(errorMsg){
       console.log(errorMsg);
   }
   else{
       let encryptedStr = encryptor.encrypt(strToEncrypt);
       console.log(encryptedStr);
   }
}


module.exports = {
    encryptCmd
}