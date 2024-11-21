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
        console.log('Count ' + count)
        setTimeout(() => 5000)
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
                'serial': serial,
                'name': yield item['IssuerName'],
                'key': yield item['PublicKey']
            })
        }
        console.log('start await');
        new Promise(resolve => {
            setTimeout(() => 5000)
        })
        console.log('end await');
        console.log(result)
        return yield result;
    })
}

window._cades_test_certs7 = async function () {
    console.log('test7')
    //tes
    let systemInfo = await window.cryptoPro.getUserCertificates();
    console.log(systemInfo)
    return Promise.resolve(JSON.stringify({"result": 'nothing'}))
}

window._cades_get_certificates = async function () {
    console.log('test7')
    //tes
    let systemInfo = await window.cryptoPro.getUserCertificates();
    console.log(systemInfo)
    return Promise.resolve(JSON.stringify({"result": systemInfo}))
}

window._cades_create_signature = async function (cert, data) {
    console.log('test7')
    console.log('cert: ' + cert)
    console.log('data: ' + data)
    //tes
    // let systemInfo =await window.cryptoPro.createAttachedSignature(cert,data);
    let systemInfo = await window.cryptoPro.createAttachedSignature(cert, data);

    console.log(systemInfo)
    return Promise.resolve(JSON.stringify({"result": systemInfo}))
}


window._cades_decode = async function (data) {
    console.log('test7')
    console.log('data: ' + data)
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

    console.log('result: ' + result)
    return Promise.resolve(JSON.stringify({"result": result}))
}

window._cades_get_version = async function () {
    console.log('test7')
    //tes
    let systemInfo = await window.cryptoPro.getSystemInfo();
    console.log(systemInfo)
    console.log('version ' + systemInfo['cadesVersion'])
    console.log('CSPversion ' + systemInfo['cspVersion'])
    return Promise.resolve(JSON.stringify({
        'version ': systemInfo['cadesVersion'],
        'CSPversion ': systemInfo['cspVersion']
    }))
}


window._cades_file_test = async function (certName, baseUrl, token) {

    if (window.FileReader) {

        const fileInput = document.createElement('input'); // Create a hidden input element
        fileInput.type = 'file';
        fileInput.style.display = 'none'; // Hide it

        document.body.appendChild(fileInput); // Add it to the document


        fileInput.addEventListener("change", async function () {
            console.log('call listener')
            const file = this.files[0];
            await cades_load_files(certName, file, baseUrl, token)
        });
        await fileInput.click();
        // Браузер поддерживает File API.
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}

window._cades_bytes_test = async function (base64bytes, fileName, certName, baseUrl, token) {

    console.log('bytes' + base64bytes);

    function base64ToFile(base64Data, fileName) {
//       const byteCharacters = atob(base64Data);
//       const byteNumbers = new Array(byteCharacters.length);
//       for (let i = 0; i < byteCharacters.length; i++) {
//           byteNumbers[i] = byteCharacters.charCodeAt(i);
//       }
//       const byteArray = new Uint8Array(byteNumbers);
//       const blob = new Blob([byteArray], { type: 'application/octet-stream' }); // Adjust type if known
        return new File(base64Data, fileName);
    }

    // 'data:image/png;base64,'+
    //  const file = base64ToFile('data:image/png;base64,'+base64bytes, fileName)
    //  console.log('fileName'+fileName);
    //  console.log(file);
    // window.parent.postMessage('image:' + base64bytes, '*');
//remove data:image/png;base64,
//     cades_load_files(certName, file,baseUrl,token)
    return await cades_load_bytes(certName, base64bytes, baseUrl, token)


}

async function cades_load_bytes(certName, bytes, baseUrl, token) {

    var messageResponse = '';
    return await cadesplugin.async_spawn(function* (args) {
        // Проверяем, работает ли File API

        // const oFReader = new FileReader();
        // oFReader.readAsDataURL(oFile);
        // oFReader.onload = async function (oFREvent) {
        // var header = ";base64,";
        // var sFileData = oFREvent.target.result;
        // var sBase64Data = sFileData.substr(sFileData.indexOf(header) + header.length);

        // console.log('start cades');
        var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
        yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE,
            cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

        var oStoreCerts = yield oStore.Certificates;
        var oCertificates = yield oStoreCerts.Find(
            cadesplugin.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certName);
        console.log('oCertificates');
        var certsCount = yield oCertificates.Count;
        if (certsCount === 0) {
            alert("Certificate not found: " + certName);
            return;
        }
        var oCertificate = yield oCertificates.Item(1);
        var oSigner = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
        yield oSigner.propset_Certificate(oCertificate);
        yield oSigner.propset_CheckCertificate(true);
        // console.log('oSigner');

        var oSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
        yield oSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
        yield oSignedData.propset_Content(bytes);
        // console.log('oSignedData.propset_Conten');

        try {
            const sSignedMessage = yield oSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES, true);
            // console.log('message: ' + sSignedMessage)
            // window.parent.postMessage('sign:' + sSignedMessage, '*');
            yield oStore.Close();
            return Promise.resolve(JSON.stringify({
                'message': sSignedMessage,
                'bytes': bytes
            }))
        } catch (err) {
            alert("Failed to create signature. Error: " + cadesplugin.getLastError(err));
            return;
        }


        // yield sendFormData(oFile,certName,baseUrl,token)
    });
}


async function cades_load_files(certName, oFile, baseUrl, token) {

    var messageResponse = '';
    await cadesplugin.async_spawn(function* (args) {
        // Проверяем, работает ли File API

        const oFReader = new FileReader();
        oFReader.readAsDataURL(oFile);

        oFReader.onload = async function (oFREvent) {
            await cadesplugin.async_spawn(function* (args) {
                var header = ";base64,";
                var sFileData = oFREvent.target.result;
                var sBase64Data = sFileData.substr(sFileData.indexOf(header) + header.length);

                var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
                yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE,
                    cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

                var oStoreCerts = yield oStore.Certificates;
                var oCertificates = yield oStoreCerts.Find(
                    cadesplugin.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certName);
                var certsCount = yield oCertificates.Count;
                if (certsCount === 0) {
                    alert("Certificate not found: " + certName);
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
                console.log('message: ' + sSignedMessage)
                window.parent.postMessage('sign:' + sSignedMessage, '*');

                yield oStore.Close();

                // yield sendFormData(oFile,certName,baseUrl,token)
            });
        };
    });
}

async function sendFormData(file, signature, baseUrl, token) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('signature', signature);

    const request = new Request(baseUrl + '/shipment_points/admin/acts/upload_test_signed_file/', {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}` // Добавляем токен авторизации
        },
        body: formData
    });

    fetch(request)
        .then(async response => {
            if (response.ok) {
                console.log(response.status);
                alert('Файл успешно отправлен');
                // Дополнительная обработка ответа (например, обновление UI)
            } else {
                console.error('Ошибка отправки данных.');
            }
        })
        .catch(error => {
            console.error('Ошибка запроса:', error);
        });
}