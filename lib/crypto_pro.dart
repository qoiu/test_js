
@JS()
library js_interop;

import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:js/js.dart';
import 'dart:js' as js;

import 'package:js/js_util.dart';

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
external _cades_file_test();

class CryptoPro{



  static init(){
    _init_crypto_pro();
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
    var jsPromise = await _cades_get_certificates();
    print('promise: $jsPromise');
    var certs  = await promiseToFuture(jsPromise);
    print('certs: ${certs.toString()}');
    var jsonDecode2 = jsonDecode(certs);
    print('certs decode: $jsonDecode2');
    print('certs decode: ${jsonDecode2['result']}');
    var value = (jsonDecode2['result'] as List<dynamic>);
    return Future.value(value.map((e)=>(e as Map?)).nonNulls.toList());
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
    await  _cades_file_test();
  }

  static cadies(){
    __check_plugin_working();
    // var _cadesplugin = code;
    // debugPrint(_cadesplugin);
  }
}