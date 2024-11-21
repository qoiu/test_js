import 'dart:convert';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:test_js/crypto_pro.dart';
import 'package:test_js/download.dart';

void main() {
  runApp(const MyApp());
  CryptoPro.init();
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: Scaffold(
        body: TestScreen(),
      ),
    );
  }
}

class TestScreen extends StatefulWidget {
  const TestScreen({super.key});

  @override
  State<TestScreen> createState() => _TestScreenState();
}

class _TestScreenState extends State<TestScreen> {
  List<Map> certs = [];

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: [
            ElevatedButton(
                onPressed: () {
                  CryptoPro.init();
                },
                child: Text('init')),
            ElevatedButton(
                onPressed: () {
                  CryptoPro.helloWorld('hi');
                },
                child: Text('hi')),
            ElevatedButton(
                onPressed: () {
                  CryptoPro.cadies();
                },
                child: Text('cadies')),
            ElevatedButton(
                onPressed: () {
                  CryptoPro.cadesFile();
                },
                child: Text('load')),
            ElevatedButton(
                onPressed: () async {
                  certs = await CryptoPro.test();
                  setState(() {});
                },
                child: Text('test')),
            ElevatedButton(
                onPressed: () {
                  CryptoPro.testOuter();
                },
                child: Text('testOuter'))
          ],
        ),
        Flexible(
          child: Column(
            children: certs
                .map((i) => GestureDetector(
                    onTap: ()async {
                      var file = (await FilePicker.platform.pickFiles( type: FileType.any, withData: true))?.files.first;
                      if(file==null)return;
    var fileBytes = file.bytes!;
    String base64String = base64Encode(fileBytes);


                       var response = await CryptoPro.setData(i['thumbprint'], base64String);
                      var decode = base64Decode(response!.replaceAll('\n', '').replaceAll('\r', ''));
                       debugPrint('response: $response');
                       var dedecode = await CryptoPro.decode(response);
                       debugPrint("dedecode: $dedecode");
                      download(base64Decode(dedecode.replaceAll('\n', '').replaceAll('\r', '')), downloadName: 'test_result.txt');
                    },
                    child: Container(
                      color: Colors.grey,
                      padding: const EdgeInsets.all(10),
                      child: Text(i.toString()),
                    )))
                .toList(),
          ),
        )
      ],
    );
  }
}
