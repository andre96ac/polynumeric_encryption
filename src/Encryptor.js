class Encryptor {

    dimTable = 10;
    _table = [];
    _privateKey;
    _encryptionType;

    constructor(key) {
        this._privateKey = key;
        
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
        return /^[a-z]+$/.test(str);
    }

    getErrors(str){
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
   
    _encryptAlphabetic(str){
        //#TODO
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
    
    _decryptAlphabetic(str){
        //#TODO
    }
    

    encrypt(strToEncrypt) {
        if(this._encryptionType == EncryptionTypes.NUMERIC){
            return this._encryptNumeric(strToEncrypt);
        }
        else if(this._encryptionType == EncryptionTypes.ALPHABETIC){
            return this._encryptAlphabetic(strToEncrypt);
        }
    }
    
    decrypt(strToDecrypt) {
        if(this._encryptionType == EncryptionTypes.NUMERIC){
            return this._decryptNumeric(strToDecrypt);
        }
        else if(this._encryptionType == EncryptionTypes.ALPHABETIC){
            return this._decryptAlphabetic(strToDecrypt);
        }
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


