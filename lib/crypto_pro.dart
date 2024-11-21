
@JS()
library js_interop;
import 'dart:html' as html;
import 'dart:convert';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/cupertino.dart';
import 'package:js/js.dart';
import 'dart:js' as js;

import 'package:js/js_util.dart';
import 'package:test_js/download.dart';

@JS()
external _helloWorld2(String text);
@JS()
external var code;
@JS()
external _cadies();
@JS()
external _loadExtention();
@JS()
external _check_browser();
@JS()
external _test_check_browser();
@JS()
external _init_crypto_pro();
@JS()
external _cds_plugin();
@JS()
external _test_outer();
@JS()
external cryptoPro();
@JS()
external __check_plugin_working();
@JS()
external _SignCreate();
@JS()
external _cades_get_version();
@JS()
external _cades_certs(String certSubjectName, String data);
@JS()
external _cades_check_npapi();
@JS()
external _cades_test_certs();
@JS()
external _cades_test_certs2();
@JS()
external _cades_test_string();
@JS()
external _cades_test_sync();
@JS()
external _cades_test_certs4(String test);
@JS()
external _cades_test_certs5(String test);
@JS()
external _cades_test_certs6(String test);
@JS()
external _cades_test_certs7(String test);

@JS()
external _cades_get_certificates();

@JS()
external _cades_create_signature(String cert, String data);

@JS()
external _cades_decode(String data);
@JS()
external _cades_file_test(String certName, String baseUrl, String token);
@JS()
external _cades_bytes_test(String bytes, String fileName, String certName, String baseUrl, String token);

class CryptoPro{



  static init(){
    html.window.onMessage.listen((event) {
      debugPrint('Flutter: Получено сообщение  от JavaScript: ${event.data}');
      if (event.data.toString().startsWith('sign:')) {
        var encode = event.data.toString().split(':')[1];
        debugPrint('encode: $encode');
        var oneLine = encode.replaceAll('\n', '');
        debugPrint('encode one line: $oneLine');
        // download(utf8.encode(oneLine), downloadName: 'test_sign.sig');
      }
      if (event.data.toString().startsWith('image:')) {
        var encode = event.data.toString().split(':')[1];
        debugPrint('encode: $encode');
        debugPrint('encode one line: ${encode.replaceAll('\n', '')}');
        // download(utf8.encode( event.data.toString()), downloadName: 'recycle.png');

        //correct
        // download(base64Decode(encode), downloadName: 'recycle.pdf');
      }
    });
  }

  static helloWorld(String text){
    _helloWorld2(text);
  }

  static load(){
    // _loadExtention();
    // print(cryptoPro());
    // final cryptoPro = js.context['cryptoPro'];
    // print('cryptoPro: $cryptoPro');
    // if (cryptoPro != null) {
    //   cryptoPro.callMethod('assertSize',332);
    // }
    js.context.callMethod('window._get_sert');
  }
  static testOuter(){
    var result = _test_outer();
    print(result);
  }

  static Future<List<Map>> test()async{

    var qr = (await getQRCode())!;
    debugPrint('qr = $qr');

          String base64String = base64Encode(qr);
          // var decode = utf8.decode(qr);
    // debugPrint('decode: $decode');
          var jsPromise = await _cades_bytes_test(base64String, 'recycle.png', 'Никита', '', '');
    // var certs  = await promiseToFuture(jsPromise);
          download(base64Decode(base64String), downloadName: 'recycle.png');



    //       String base64String = base64Encode(bytes);
    //       debugPrint('base64String: $base64String');
    //       var jsPromise = await _cades_bytes_test(bytes, name, 'Никита', '', '');
    //       download(base64Decode(base64String), downloadName: 'test_result.txt');
    //     } catch (e) {
    //       debugPrint(e.toString());
    //     }

    // FilePickerResult? result = await FilePicker.platform.pickFiles();
    //
    // if (result != null) {
    //   var bytes = result.files.single.bytes; // Access bytes instead of path
    //   var name = result.files.single.name;
    //   debugPrint('bytes: $bytes');
    //   if (bytes != null) { //Check for null, in case the file doesn't have bytes
    //     try {
    //       String base64String = base64Encode(bytes);
    //       debugPrint('base64String: $base64String');
    //       var jsPromise = await _cades_bytes_test(bytes, name, 'Никита', '', '');
    //       download(base64Decode(base64String), downloadName: 'test_result.txt');
    //     } catch (e) {
    //       debugPrint(e.toString());
    //     }
    //   } else {
    //   }
    // }

    // var file = (await FilePicker.platform.pickFiles( type: FileType.any, withData: true))?.files.first;
    // if(file==null)return [];
    // File newF = File(file.bytes)
    // var utf8Decode = utf8.decode(file.bytes!);
    // debugPrint('utf8: $utf8Decode');
    // var jsPromise = await _cades_bytes_test(base64Decode(utf8Decode), file.name, 'Никита', '', '');
    print('promise: $jsPromise');
    var certs  = await promiseToFuture(jsPromise);
    // print('certs: ${certs.toString()}');
    var jsonDecode2 = jsonDecode(certs.toString().replaceAll('\n', ''));
    print('certs decode: $jsonDecode2');
    print('sign: ${jsonDecode2['message']}');
    print('bytes: ${jsonDecode2['bytes']}');
    download(utf8.encode(jsonDecode2['message'].toString().replaceAll('\n', '')), downloadName: 'test_sign.sig');
    // download(base64Decode(jsonDecode2['bytes']), downloadName: 'recycle.png');
    // var value = (jsonDecode2['result'] as List<dynamic>);
    // return Future.value(value.map((e)=>(e as Map?)).nonNulls.toList());

    return Future.value([]);
  }

  static Future<String> setData(String cert, String data)async{
    var jsPromise = await _cades_create_signature(cert, data);
    print('promise: $jsPromise');
    var certs  = await promiseToFuture(jsPromise);
    print('certs: ${certs.toString()}');
    var jsonDecode2 = jsonDecode(certs);
    print('certs decode: $jsonDecode2');
    print('certs decode: ${jsonDecode2['result']}');
    var value = (jsonDecode2['result'] as String?)??'';

    // var base64decode = base64Decode(value!.replaceAll('\n', '').replaceAll('\r', ''));
    // debugPrint('response decode: ${base64decode}');
    return Future.value(value);
  }


  static Future<String> decode(String data)async{
    var jsPromise = await _cades_decode(data);
    print('promise: $jsPromise');
    var certs  = await promiseToFuture(jsPromise);
    print('certs: ${certs.toString()}');
    var jsonDecode2 = jsonDecode(certs);
    print('certs decode: $jsonDecode2');
    print('certs decode: ${jsonDecode2['result']}');
    var value = (jsonDecode2['result'] as String?)??'';

    var base64decode = base64Decode(value!.replaceAll('\n', '').replaceAll('\r', ''));
    debugPrint('response decode: ${base64decode}');
    return Future.value(value);
  }

  static cadesFile()async{
    var jsPromise = await  _cades_file_test("Никита",' https://zm2.itpw.ru:19544','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYjI2ZmJmNmEtNmQzYS00YzlhLTlmZmYtM2RiYjQxMGFiNWYwIiwidXNlcm5hbWUiOiJxIiwiZXhwIjoxNzMxNDA3MzI3fQ.psHEP2yuaOgDYWG6uyFRxvsJl0mDSJod86ck1uC_jEY');
    print('promise: $jsPromise');
    var certs  = await promiseToFuture(jsPromise);
    print('certs: ${certs.toString()}');
    var jsonDecode2 = jsonDecode(certs);
    print('certs decode: $jsonDecode2');
    print('certs decode: ${jsonDecode2['result']}');
    var value = (jsonDecode2['result'] as String?)??'';
  }

  static cadies(){
    __check_plugin_working();
    // var _cadesplugin = code;
    // debugPrint(_cadesplugin);
  }
}