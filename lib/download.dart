import 'dart:convert';
// ignore: avoid_web_libraries_in_flutter
import 'dart:html';
import 'dart:typed_data';
import 'package:http/http.dart' as http;

void download(
    List<int> bytes, {
      required String downloadName,
    }) {
  final base64 = base64Encode(bytes);
  final anchor =
  AnchorElement(href: 'data:application/octet-stream;base64,$base64')
    ..target = 'blank';
    anchor.download = downloadName;
  document.body?.append(anchor);
  anchor.click();
  anchor.remove();
  return;
}


Future<Uint8List?> getQRCode() async {
  final response = await http.get(Uri.parse('https://zm2.itpw.ru:19544/media/defaults/recycle.png'), headers: {

    'Accept': 'application/octet-stream', // Specify desired file type
    // Add other headers if necessary
  });

  if (response.statusCode == 200) {
    final bytes = response.bodyBytes;
    return Future.value(bytes);
    // download(bytes, downloadName: 'qr_test.png');
  } else {
    print('Error downloading file: ${response.statusCode}');
  }

  // var response = await http.get(Uri.parse(s));
  // jsonDecode(utf8.decode(response.bodyBytes)).toString().dpYellow().print();
}
