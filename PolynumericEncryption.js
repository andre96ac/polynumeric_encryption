export class PolynumericEncryption {

    dimMatrice = 10;
    table =  [];

    privateKey

    strPari = '';
    strDispari = '';
    constructor(key) {
        this.privateKey = key;

        // for(let i = 0; i< this.privateKey.length; i+=2){
        //     this.strPari += this.privateKey[i];
        //     this.strDispari += this.privateKey[i+1];
        // }

        this._initMatrice();

       
      }

      _initMatrice(){
        //devo fare 9 righe
       for (let i = 0; i < this.dimMatrice; i++){

           //Creo la colonna
           let row = [];

           //nella colonna devo inserire 9 numeri; il primo numero deve aumentare ogni volta
           let myNum = i;
           for(let i2 = 0; i2<this.dimMatrice; i2++ ){
               if(myNum == this.dimMatrice){
                   //sono arrivato a 9, devo ricominciare
                   myNum = 0;
               }

               row.push(myNum);
               myNum ++;
           }

           //la riga è pronta, la aggiungo
           this.table.push(row);
       }
       console.log(this.table);
    }

    // getStringToEncript(){
    //     let myNow = new Date();
    //     let str = '' + myNow.getUTCFullYear() + (myNow.getUTCMonth()+ 1) + myNow.getUTCDate() + myNow.getUTCHours() + myNow.getUTCMinutes() + myNow.getUTCSeconds();
    //     return str;
    // }
  
      
    _encrypt(str){
        let encryptedStr = '';
        
        let keyPointer = 0;


        for(let i = 0; i< str.length; i++){
            //recupero il carattere (numerico) da crittografare
            let initialValue = str[i];

            //recupero il carattere della chiave da usare per la codifica
            let keyValue = this.privateKey[keyPointer];

            //recupero dalla matrice il valore codificato
            let finalValue = this.table[initialValue][keyValue];

            //aggiungo il valore trovato alla stringa finale codificata
            encryptedStr += finalValue

            //avanzo di una posizione con il puntatore alla chiave
            keyPointer ++;

            //se il puntatore alla chiave è arrivato alla fine, torno all'inizio
            if(keyPointer == this.privateKey.length){
                keyPointer = 0;
            }
        }


        return encryptedStr;
    }

    _decrypt(encryptedStr){

        let decryptedStr = '';
        let keyPointer = 0;

        for(let i = 0; i< encryptedStr.length; i++){

            //recupero il carattere giusto della chiave
            let keyValue = this.privateKey[keyPointer];

            let encryptedChar = encryptedStr[i];

            //con il carattere della chiave, recupero la riga:
            let myRow = this.table[keyValue];

            //nella riga, l'indice del carattere crittografato è il carattere non crittografato
            let decryptedChar = myRow.findIndex(value => {
                return value == encryptedChar;
            })
            
            //aggiungo il carattere trovato alla mia stringa finale 
            decryptedStr += decryptedChar;

            //avanzo di una posizione con il puntatore alla chiave
            keyPointer ++;

            //se il puntatore alla chiave è arrivato alla fine, torno all'inizio
            if(keyPointer == this.privateKey.length){
                keyPointer = 0;
            }
        }

        return decryptedStr;

    }

    encrypt(str, nLayers = 1){
        let encryptedStr = str;
        for(let i = 0; i < nLayers; i++){
            encryptedStr = this._encrypt(encryptedStr);
        }

        return encryptedStr;
    }

    decrypt(str, nLayers = 1){
        let decryptedStr = str;
        for(let i = 0; i < nLayers; i++){
            decryptedStr = this._decrypt(decryptedStr);
        }

        return decryptedStr;
    }

    
}


