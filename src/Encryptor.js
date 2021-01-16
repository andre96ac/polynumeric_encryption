class Encryptor {

    dimTable = 10;
    _table = [];
    _privateKey;
    _encryptionType;

    constructor(key) {
        this._privateKey =  key.toUpperCase();
        
        if(this._checkIfOnlyNumbers(this._privateKey)){
            this._initNumTable();
            this._encryptionType = EncryptionTypes.NUMERIC;
        }
        else if(this._checkIfOnlyLetters(this._privateKey)){
            this._initCharTable();
            this._encryptionType = EncryptionTypes.ALPHABETIC;
        }
        else{
            this._encryptionType = EncryptionTypes.INVALID;
        }

    }

    _initNumTable() {
        //devo fare 9 righe
        for (let i = 0; i < this.dimTable; i++) {

            //Creo la colonna
            let row = [];

            //nella colonna devo inserire 9 numeri; il primo numero deve aumentare ogni volta
            let myNum = i;
            for (let i2 = 0; i2 < this.dimTable; i2++) {
                if (myNum == this.dimTable) {
                    //sono arrivato a 9, devo ricominciare
                    myNum = 0;
                }

                row.push(myNum);
                myNum++;
            }

            //la riga è pronta, la aggiungo
            this._table.push(row);
        }
        console.log(this._table);
    }

    _initCharTable(){
        this._table = [
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'BCDEFGHIJKLMNOPQRSTUVWXYZA',
            'CDEFGHIJKLMNOPQRSTUVWXYZAB',
            'DEFGHIJKLMNOPQRSTUVWXYZABC',
            'EFGHIJKLMNOPQRSTUVWXYZABCD',
            'FGHIJKLMNOPQRSTUVWXYZABCDE',
            'GHIJKLMNOPQRSTUVWXYZABCDEF',
            'HIJKLMNOPQRSTUVWXYZABCDEFG',
            'IJKLMNOPQRSTUVWXYZABCDEFGH',
            'JKLMNOPQRSTUVWXYZABCDEFGHI',
            'KLMNOPQRSTUVWXYZABCDEFGHIJ',
            'LMNOPQRSTUVWXYZABCDEFGHIJK',
            'MNOPQRSTUVWXYZABCDEFGHIJKL',
            'NOPQRSTUVWXYZABCDEFGHIJKLM',
            'OPQRSTUVWXYZABCDEFGHIJKLMN',
            'PQRSTUVWXYZABCDEFGHIJKLMNO',
            'QRSTUVWXYZABCDEFGHIJKLMNOP',
            'RSTUVWXYZABCDEFGHIJKLMNOPQ',
            'STUVWXYZABCDEFGHIJKLMNOPQR',
            'TUVWXYZABCDEFGHIJKLMNOPQRS',
            'UVWXYZABCDEFGHIJKLMNOPQRST',
            'VWXYZABCDEFGHIJKLMNOPQRSTU',
            'WXYZABCDEFGHIJKLMNOPQRSTUV',
            'XYZABCDEFGHIJKLMNOPQRSTUVW',
            'YZABCDEFGHIJKLMNOPQRSTUVWX',
            'ZABCDEFGHIJKLMNOPQRSTUVWXY',
        ]
    }

    _checkIfOnlyNumbers(str){
        return /^\d+$/.test(str);
    }
    _checkIfOnlyLetters(str){
        return /^[a-zA-Z]+$/.test(str);
    }

    _findColumByLetter(letter){
        let firstRow = this._table[0];
        let position = firstRow.find((elem) => {
            return (elem == letter);
        })

        return position;
    }

    _encryptNumeric(str){
        let encryptedStr = '';

        let keyPointer = 0;


        for (let i = 0; i < str.length; i++) {
            //recupero il carattere (numerico) da crittografare
            let initialValue = str[i];

            //recupero il carattere della chiave da usare per la codifica
            let keyValue = this._privateKey[keyPointer];

            //recupero dalla matrice il valore codificato
            let finalValue = this._table[initialValue][keyValue];

            //aggiungo il valore trovato alla stringa finale codificata
            encryptedStr += finalValue

            //avanzo di una posizione con il puntatore alla chiave
            keyPointer++;

            //se il puntatore alla chiave è arrivato alla fine, torno all'inizio
            if (keyPointer == this._privateKey.length) {
                keyPointer = 0;
            }
        }


        return encryptedStr;
    }
   
    _encryptAlphabetic(strToEncrypt){
        let str = strToEncrypt.toUpperCase();
        let encryptedStr = '';

        let keyPointer = 0;


        for (let i = 0; i < str.length; i++) {

            //recupero il carattere della chiave da usare per la codifica (mi serve a trovare la riga)
            let keyValue = this._privateKey[keyPointer];

            //recupero il carattere (lettera) da crittografare (mi serve per trovare la colonna)
            let initialValue = str[i];


            //recupero la posizione della riga che mi serve
            let indexRow = this._table.findIndex(elRow => {
                return elRow[0] == keyValue;
            }) 

            //recupero la posizione della colonna che mi serve
            let indexCol = this._table[0].indexOf(initialValue);
            // let indexCol = this._table[0].find(letter => {
            //     return letter == initialValue;
            // })

            //recupero dalla matrice il valore codificato
            let finalValue = this._table[indexRow][indexCol];

            //aggiungo il valore trovato alla stringa finale codificata
            encryptedStr += finalValue

            //avanzo di una posizione con il puntatore alla chiave
            keyPointer++;

            //se il puntatore alla chiave è arrivato alla fine, torno all'inizio
            if (keyPointer == this._privateKey.length) {
                keyPointer = 0;
            }
        }


        return encryptedStr;
    }

    _decryptNumeric(str){
        
        let decryptedStr = '';
        let keyPointer = 0;

        for (let i = 0; i < str.length; i++) {

            //recupero il carattere giusto della chiave
            let keyValue = this._privateKey[keyPointer];

            let encryptedChar = str[i];

            //con il carattere della chiave, recupero la riga:
            let myRow = this._table[keyValue];

            //nella riga, l'indice del carattere crittografato è il carattere non crittografato
            let decryptedChar = myRow.findIndex(value => {
                return value == encryptedChar;
            })

            //aggiungo il carattere trovato alla mia stringa finale 
            decryptedStr += decryptedChar;

            //avanzo di una posizione con il puntatore alla chiave
            keyPointer++;

            //se il puntatore alla chiave è arrivato alla fine, torno all'inizio
            if (keyPointer == this._privateKey.length) {
                keyPointer = 0;
            }
        }

        return decryptedStr;

    }
    
    _decryptAlphabetic(strToDecrypt){

        let str = strToDecrypt.toUpperCase();
        let decryptedStr = '';
        let keyPointer = 0;
        

        for (let i = 0; i < str.length; i++) {

            //recupero il carattere giusto della chiave (con cui trovo la riga)
            let keyValue = this._privateKey[keyPointer];

            //recupero il carattere da decrittografare (mi dice la colonna)
            let encryptedChar = str[i];

            //con il carattere della chiave, recupero la riga:
            let indexRow = this._table.findIndex(elRow => {
                return elRow[0] == keyValue;
            })

            // trovo la riga
            let myRow = this._table[indexRow];

            //nella riga, trovo l'indice del carattere crittografato 
            let indexCol = myRow.indexOf(encryptedChar);

            //guardo la prima riga, alla posizione indexCol trovo il carattere decrittografato
            let decryptedChar = this._table[0][indexCol];

            //aggiungo il carattere trovato alla mia stringa finale 
            decryptedStr += decryptedChar;

            //avanzo di una posizione con il puntatore alla chiave
            keyPointer++;

            //se il puntatore alla chiave è arrivato alla fine, torno all'inizio
            if (keyPointer == this._privateKey.length) {
                keyPointer = 0;
            }
        }

        return decryptedStr;
    }

    checkErrors(str){
        let error = undefined;
        if(this._encryptionType == EncryptionTypes.INVALID){
            error = 'Attenzione, la chiave dev\'essere composta da sole lettere minuscole, OPPURE da soli numeri';
        }
        else if(!this._checkIfOnlyLetters(str) && !this._checkIfOnlyNumbers(str)){
            error = 'Attenzione, la stringa da decodificare dev\'essere composta da sole lettere minuscole, OPPURE da soli numeri';
        }

        if(this._checkIfOnlyLetters(str) != this._checkIfOnlyLetters(this._privateKey)){
            error = 'Attenzione, stringa e chiave devono essere entrambe dello stesso tipo (SOLO numeri, oppure SOLO lettere)';
        }

        return error;
    }
    

    encrypt(strToEncrypt) {

        let result = undefined
        let error = this.checkErrors(strToEncrypt);

        if(!error){

            if(this._encryptionType == EncryptionTypes.NUMERIC){
                result = this._encryptNumeric(strToEncrypt);
            }
            else if(this._encryptionType == EncryptionTypes.ALPHABETIC){
                result = this._encryptAlphabetic(strToEncrypt);
            }

        }

        return result;

    }
    
    decrypt(strToDecrypt) {
        let result = undefined
        let error = this.checkErrors(strToDecrypt);

        if(!error){
            if(this._encryptionType == EncryptionTypes.NUMERIC){
                result = this._decryptNumeric(strToDecrypt);
            }
            else if(this._encryptionType == EncryptionTypes.ALPHABETIC){
                result = this._decryptAlphabetic(strToDecrypt);
            }
        }
        return result;
    }

}

const EncryptionTypes = {
    NUMERIC: 10,
    ALPHABETIC: 20,
    INVALID: 30
}


module.exports = {
    Encryptor
}


