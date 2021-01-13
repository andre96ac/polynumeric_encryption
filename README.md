# polynumeric_encryption
Simple object providing utilies for encrypting-decriptying numeric strings using a polynumeric algorytm

usage:

```javascript

import { PolynumericEncryption } from 'script_location'

let encryptor = new PolynumericEncryption('your_private_key');

let nEncryptionLayers = 5 //optional: number of times to apply the encryption

let encryptedString = encryptor.encrypt('string_to_encrypt', nEncryptionLayers);
let decryptedString = encryptor.decrypt('string_to_decrypt' nEncryptionLayers);


```


##### ATTENTION: never use ten-multiples for nEncryptionLayers; this will result in a non-encrypted string
