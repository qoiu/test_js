window._SignCreate = function (certSubjectName, dataToSign) {
    return new Promise(function (resolve, reject) {
        cadesplugin.async_spawn(function* (args) {
            try {
                var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
                yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE,
                    cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

                var CertificatesObj = yield oStore.Certificates;
                var oCertificates = yield CertificatesObj.Find(
                    cadesplugin.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certSubjectName);

                var Count = yield oCertificates.Count;
                if (Count == 0) {
                    throw ("Certificate not found: " + args[0]);
                }
                var oCertificate = yield oCertificates.Item(1);
                var oSigner = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
                yield oSigner.propset_Certificate(oCertificate);
                yield oSigner.propset_CheckCertificate(true);

                var oSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
                yield oSignedData.propset_Content(dataToSign);

                var sSignedMessage = yield oSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES);

                yield oStore.Close();

                args[2](sSignedMessage);
            } catch (e) {
                args[3]("Failed to create signature. Error: " + cadesplugin.getLastError(err));
            }
        }, certSubjectName, dataToSign, resolve, reject);
    });
}
window._cades_certs = function (certSubjectName, dataToSign) {
    console.log(certSubjectName)
    console.log(dataToSign)
    return new Promise(function (resolve, reject) {
        cadesplugin.async_spawn(function* (args) {
            try {
                var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
                yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE,
                    cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

                var CertificatesObj = yield oStore.Certificates;
                return CertificatesObj
            } catch (e) {
                args[3]("Failed to create signature. Error: " + cadesplugin.getLastError(err));
            }
        }, certSubjectName, dataToSign, resolve, reject);
    });
}

function run() {
    var ProviderName = "Crypto-Pro GOST R 34.10-2001 Cryptographic Service Provider";
    var ProviderType = 75;

    var elem = document.getElementById("ProviderName");
    var ProviderName = elem.value;

    elem = document.getElementById("ProviderType");
    var ProviderType = elem.value;

    var Version = get_version(ProviderName, ProviderType);

    elem = document.getElementById("ProviderVersion");

    if (Version)
        elem.value = Version;
}

window._cades_get_version = function (ProviderName, ProviderType) {
    var oVersion;
    try {
        var oAbout = cadesplugin.CreateObject("CAdESCOM.About");

        oVersion = oAbout.CSPVersion(ProviderName, parseInt(ProviderType, 10));

        var Minor = oVersion.MinorVersion;
        var Major = oVersion.MajorVersion;
        var Build = oVersion.BuildVersion;
        var Version = oVersion.toString();

        return Version;
    } catch (er) {
        if (er.message.indexOf("0x80090019") + 1)
            return "Указанный CSP не установлен";
        else
            return er.message;
        return false;
    }
}
window._cades_test_string = async function () {
    await new Promise((res, _) => setTimeout(res, 1000));
    return "test text"
}
window._cades_test_certs = async function () {
    var cert
    await cadesplugin.async_spawn(function* (args) {
        // Задаем SubjectName для используемых сертификатов
        var certSignatureSubjectName = "SignCert";
        var certEncryptSubjectName = "EncryptCert";

        var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
        yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

        var oCertificates = yield oStore.Certificates;
        oCertificates = yield oCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certSignatureSubjectName);
        console.log(oCertificates);
        cert = oCertificates
    })
    return cert;
}

window._cades_test_sync = function () {

    // Задаем SubjectName для используемых сертификатов
    var certSignatureSubjectName = "SignCert";
    var certEncryptSubjectName = "EncryptCert";

    var oStore = cadesplugin.CreateObject("CAdESCOM.Store");
    oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

    var oCertificates = oStore.Certificates.Find(CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certSignatureSubjectName);
    if (oCertificates.Count === 0) {
        alert("Certificate not found: " + certSubjectName);
        return;
    }
    var oCertSignature = oCertificates.Item(1);

    oCertificates = oStore.Certificates.Find(CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certEncryptSubjectName);
    return oCertificates;
}


window._cades_test_certs4 = function (dataToSign) {
    return new Promise(function (resolve, reject) {
        var certSubjectName = "EncryptCert";
        cadesplugin.async_spawn(function* (args) {
            try {
                var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
                yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE,
                    cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

                var CertificatesObj = yield oStore.Certificates;
                var oCertificates = yield CertificatesObj.Find(
                    cadesplugin.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certSubjectName);

                var Count = yield oCertificates.Count;
                if (Count == 0) {
                    throw ("Certificate not found: " + args[0]);
                }
                var oCertificate = yield oCertificates.Item(1);
                var oSigner = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
                yield oSigner.propset_Certificate(oCertificate);
                yield oSigner.propset_CheckCertificate(true);

                var oSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
                yield oSignedData.propset_Content(dataToSign);

                var sSignedMessage = yield oSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES);

                yield oStore.Close();

                args[2](oCertificates);
//                                                            return 'test';
            } catch (e) {
                args[3]("Failed to create signature. Error: " + cadesplugin.getLastError(err));
            }
        }, certSubjectName, dataToSign, resolve, reject);
    });
}
window._cades_test_certs5 = function () {
    cadesplugin.async_spawn(function* (args) {
        // Задаем SubjectName для используемых сертификатов
        var certSignatureSubjectName = "SignCert";
        var certEncryptSubjectName = "EncryptCert";

        var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
        yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

        var oCertificates = yield oStore.Certificates;
        console.log(oCertificates);
        oCertificates = yield oCertificates.Find(1, certSignatureSubjectName);
        var count = yield oCertificates.Count;
        if (count === 0) {
            alert("Certificate not found: " + certSignatureSubjectName);
            return;
        }
        var oCertSignature = yield oCertificates.Item(1);
//                                                    console.log('oSertDone');
//                                                    console.log(oCertSignature);

        oCertificates = yield oStore.Certificates;
        oCertificates = yield oCertificates.Find(CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certEncryptSubjectName);
        count = yield oCertificates.Count;
        if (count === 0) {
            alert("Certificate not found: " + certEncryptSubjectName);
            return;
        }
        var oCertEncrypt = yield oCertificates.Item(1);
        yield oStore.Close();

        // Задание свойства Content сбрасывает состояние объекта, поэтому сначала заполняем его
        var oEnvelopedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPEnvelopedData");
        var expectedContent = "Message to encrypt с русскими буквами";
        yield oEnvelopedData.propset_Content(expectedContent);

        var oRecipients = yield oEnvelopedData.Recipients;
        yield oRecipients.Add(oCertSignature);
        yield oRecipients.Add(oCertEncrypt);

        var encMessage = yield oEnvelopedData.Encrypt(cadesplugin.CADESCOM_ENCODE_BASE64);
        if ("" === encMessage) {
            alert("oEnvelopedData.Encrypt failed");
        }

        // Проверяем, что полученное расшифрованное сообщение соответствует исходному
        var oEnvelopedData2 = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPEnvelopedData");
        yield oEnvelopedData2.Decrypt(encMessage);
        var content = yield oEnvelopedData2.Content;
        if (expectedContent !== content) {
            alert("oEnvelopedData.Decrypt failed");
        }
    });
}

window._cades_test_certs6 = async function () {
    var result = cadesplugin.async_spawn(function* (args) {
        // Задаем SubjectName для используемых сертификатов
        var certSignatureSubjectName = "Adobe Root CA 10-3";
        var certEncryptSubjectName = "EncryptCert";

        var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
        yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);
        console.log(oStore.Open);

        var oCertificates = yield oStore.Certificates;
        var count = 0
        count = yield oCertificates['Count'];
        console.log('Count '+count)
        setTimeout(()=>5000)
        var result = []
        for (let i = 1; i < count; i++) {
            var item = yield oCertificates.Item(i);
            // console.log(yield item)
            let serial = yield item['SerialNumber'];
            // var map = new WeakMap()
            // map.add('serial', serial)
            // map.add('name', yield item['IssuerName'])
            // map.add('key', yield item['PublicKey'])
            result.push({
                'serial':serial,
                'name': yield item['IssuerName'],
                'key': yield item['PublicKey']
            })
        }
        console.log('start await');
        new Promise(resolve => {
            setTimeout(()=>5000)
        })
        console.log('end await');
        console.log(result)
        return yield result;
    })
}

window._cades_test_certs7 = async function (){
    console.log('test7')
    //tes
    let systemInfo =await window.cryptoPro.getUserCertificates();
    console.log(systemInfo)
    return Promise.resolve(JSON.stringify({"result":'nothing'}))
}

window._cades_get_certificates = async function (){
    console.log('test7')
    //tes
    let systemInfo =await window.cryptoPro.getUserCertificates();
    console.log(systemInfo)
    return Promise.resolve(JSON.stringify({"result":systemInfo}))
}

window._cades_create_signature = async function (cert,data){
    console.log('test7')
    console.log('cert: '+cert)
    console.log('data: '+data)
    //tes
    // let systemInfo =await window.cryptoPro.createAttachedSignature(cert,data);
    let systemInfo =await window.cryptoPro.createAttachedSignature(cert,data);

    console.log(systemInfo)
    return Promise.resolve(JSON.stringify({"result":systemInfo}))
}


window._cades_decode = async function (data){
    console.log('test7')
    console.log('data: '+data)
    //tes
    // let systemInfo =await window.cryptoPro.createAttachedSignature(cert,data);
    var result = ''

    await cadesplugin.async_spawn(function* (args) {

        var oEnvelopedData2 = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPEnvelopedData");
        console.log('envData: ' + data);
        yield oEnvelopedData2.Decrypt(data);
        console.log('Decrypt: ');
        // console.log('Decrypt: ' + decrypt);
        var content = yield oEnvelopedData2.Content;
        // console.log('Content: ' + envPr);
        console.log('content: ' + content)
        return content;
    })

    // result = await window.cryptoPro.

    console.log('result: '+result)
    return Promise.resolve(JSON.stringify({"result":result}))
}

window._cades_get_version = async function (){
    console.log('test7')
    //tes
    let systemInfo =await window.cryptoPro.getSystemInfo();
    console.log(systemInfo)
    console.log('version '+systemInfo['cadesVersion'])
    console.log('CSPversion '+systemInfo['cspVersion'])
    return Promise.resolve(JSON.stringify({
        'version ': systemInfo['cadesVersion'],
        'CSPversion ':systemInfo['cspVersion']
    }))
}



    // var $createSignature = document.forms.createSignature,
//         $certificate = document.getElementById('certificate'),
//         $message = document.getElementById('message'),
//         $messageFile = document.getElementById('messageFile'),
//         $messageFileError = document.getElementById('messageFileError'),
//         $hash = document.getElementById('hash'),
//         $hashError = document.getElementById('hashError'),
//         $signature = document.getElementById('signature'),
//         $signatureError = document.getElementById('signatureError'),
//
//         // https://support.cryptopro.ru/index.php?/Knowledgebase/Article/View/213/12/ogrnichenie-n-rzmer-podpisyvemogo-fjjl-v-bruzere
//         MAX_FILE_SIZE = 25000000;
//
//   function readFile(messageFile) {
//     return new Promise(function (resolve, reject) {
//       var fileReader = new FileReader();
//
//       fileReader.onload = function () {
//         resolve(this.result);
//       };
//
//       if (messageFile.size > MAX_FILE_SIZE) {
//         reject('Файл для подписи не должен превышать ' + MAX_FILE_SIZE / 1000000 + 'МБ');
//
//         return;
//       }
//
//       fileReader.readAsArrayBuffer(messageFile);
//     });
//   }
//
//   function createSignature(message, data) {
//     var hash = data.hash;
//     var hashedAlgorithm = data.is512bit ? window.cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512 : null;
//     var signatureMethod = data.is512bit ? window.cadesplugin.XmlDsigGost3410Url2012512 : null;
//     var digestMethod = data.is512bit ? window.cadesplugin.XmlDsigGost3411Url2012512 : null;
//
//     var thumbprint = $certificate.value,
//       signatureType = document.querySelector('input[name="signatureType"]:checked').value,
//       signaturePromise;
//
//     $hash.value = hash;
//
//     $signature.placeholder = 'Создается...';
//     $signature.value = '';
//
//     switch (signatureType) {
//       case 'attached':
//         signaturePromise = window.cryptoPro.createAttachedSignature(thumbprint, message);
//
//         break;
//       case 'xml':
//         signaturePromise = window.cryptoPro.createXMLSignature(thumbprint, message, { signatureMethod: signatureMethod, digestMethod: digestMethod });
//
//         break;
//       case 'detached':
//         signaturePromise = window.cryptoPro.createDetachedSignature(thumbprint, hash, { hashedAlgorithm: hashedAlgorithm });
//
//         break;
//     }
//
//     signaturePromise.then(function (signature) {
//       $signature.value = signature;
//       $signatureError.textContent = '';
//     }, function (error) {
//       $signature.placeholder = 'Не создана';
//       $signatureError.textContent = error.message;
//     });
//   }
//
//   $message.addEventListener('keydown', function() {
//     $messageFile.value = null;
//   });
//
//   if ($messageFile) {
//     $messageFile.addEventListener('change', function() {
//       $message.value = '';
//     });
//   }
//
//   $createSignature.addEventListener('submit', function (event) {
//     var messageFile = $messageFile && $messageFile.files.length && $messageFile.files[0],
//       messagePromise = Promise.resolve($message.value),
//       thumbprint = $certificate.value,
//       is512bit = false;
//
//     if (messageFile) {
//       messagePromise = readFile(messageFile);
//     }
//
//     event.preventDefault();
//
//     messagePromise.then(function (message) {
//       $hash.placeholder = 'Вычисляется...';
//       $hash.value = '';
//
//       // Определение алгоритма хеширования в зависимости от сертификата ЭП
//       window.cryptoPro.getCertificate(thumbprint)
//         .then(function (certificate) { return certificate.getAlgorithm(); })
//         .then(function (algorithm) {
//           // Замена алгоритма хеширования для 512 бит
//           if (algorithm.oid === '1.2.643.7.1.1.1.2')
//             is512bit = true;
//
//           return window.cryptoPro.createHash(message, { hashedAlgorithm: is512bit ? window.cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512 : null });
//         })
//         .then(
//           function (hash) {
//             createSignature(message, { hash: hash, is512bit: is512bit });
//           },
//           function (hashError) {
//             $hash.placeholder = 'Не вычислен';
//             $hashError.textContent = hashError.message;
//           }
//         );
//     }, function (fileError) {
//       $messageFileError.textContent = fileError;
//     })
// })();


window._cades_file_test = function() {

    if (window.FileReader) {

        const fileInput = document.createElement('input'); // Create a hidden input element
        fileInput.type = 'file';
        fileInput.style.display = 'none'; // Hide it

        document.body.appendChild(fileInput); // Add it to the document


        fileInput.addEventListener("change", function() {
            console.log('call listener')
            const file = this.files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);
        });
        fileInput.click();
        // Браузер поддерживает File API.
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}

function cades_load_files(){

    cadesplugin.async_spawn(function* (args) {
        // Проверяем, работает ли File API
        if (0 === document.getElementById("uploadFile").files.length) {
            alert("Select the file.");
            return;
        }
        var oFile = document.getElementById("uploadFile").files[0];
        var oFReader = new FileReader();

        if (typeof (oFReader.readAsDataURL) != "function") {
            alert("Method readAsDataURL() is not supported in FileReader.");
            return;
        }

        oFReader.readAsDataURL(oFile);

        oFReader.onload = function (oFREvent) {
            cadesplugin.async_spawn(function* (args) {
                var header = ";base64,";
                var sFileData = oFREvent.target.result;
                var sBase64Data = sFileData.substr(sFileData.indexOf(header) + header.length);

                var oCertName = document.getElementById("CertName");
                var sCertName = oCertName.value; // Здесь следует заполнить SubjectName сертификата
                if ("" == sCertName) {
                    alert("Введите имя сертификата (CN).");
                    return;
                }
                var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
                yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE,
                    cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

                var oStoreCerts = yield oStore.Certificates;
                var oCertificates = yield oStoreCerts.Find(
                    cadesplugin.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, sCertName);
                var certsCount = yield oCertificates.Count;
                if (certsCount === 0) {
                    alert("Certificate not found: " + sCertName);
                    return;
                }
                var oCertificate = yield oCertificates.Item(1);
                var oSigner = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
                yield oSigner.propset_Certificate(oCertificate);
                yield oSigner.propset_CheckCertificate(true);

                var oSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
                yield oSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
                yield oSignedData.propset_Content(sBase64Data);

                try {
                    var sSignedMessage = yield oSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES, true);
                } catch (err) {
                    alert("Failed to create signature. Error: " + cadesplugin.getLastError(err));
                    return;
                }

                yield oStore.Close();

                // Выводим отделенную подпись в BASE64 на страницу
                // Такая подпись должна проверяться в КриптоАРМ и cryptcp.exe
                document.getElementById("signature").innerHTML = sSignedMessage;

                var oSignedData2 = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
                try {
                    yield oSignedData2.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
                    yield oSignedData2.propset_Content(sBase64Data);
                    yield oSignedData2.VerifyCades(sSignedMessage, cadesplugin.CADESCOM_CADES_BES, true);
                    alert("Signature verified");
                } catch (err) {
                    alert("Failed to verify signature. Error: " + cadesplugin.getLastError(err));
                    return;
                }
            });
        };
    });
}