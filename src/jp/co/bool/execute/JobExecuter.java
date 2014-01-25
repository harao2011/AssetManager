package jp.co.bool.execute;

import java.util.Arrays;
import java.util.List;

import jp.co.bool.make.AbsJsonCsvMaker;
import jp.co.bool.make.JsonCsvMakerFactory;

import org.directwebremoting.io.FileTransfer;
import org.json.JSONArray;
import org.json.JSONObject;

public class JobExecuter {
	
	private static final List<String> csvOrder = Arrays.asList("id","header","body");

	public String getString() {
		return "java method execute";
	}

//	public FileTransfer getDownloadFile(String fileName, String csvText) {
//		byte[] byteText = csvText.getBytes();
//		String filename = fileName;
//		FileTransfer ft = new FileTransfer(filename, "csv/text", byteText);
//		return ft;
//	}

	public FileTransfer getDownloadFile(String fileName, String params) {
		String filename = fileName;
		String csvText = "";
		JSONArray jsonArray = new JSONArray(params);
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject jsonObject = (JSONObject) jsonArray.get(i);
//			for (Iterator<?> itr = jsonObject.keys(); itr.hasNext();) {
//				String keyString = itr.next().toString();
//				String value = jsonObject.get(keyString).toString();
//				AbsJsonCsvMaker csvMaker = JsonCsvMakerFactory.getInstanse(keyString);
//				csvText += csvMaker.getCsvString(value);
//			}
			for (int j = 0; j < csvOrder.size(); j++) {
				String keyString = csvOrder.get(j);
				String value = jsonObject.get(keyString).toString();
				AbsJsonCsvMaker csvMaker = JsonCsvMakerFactory.getInstanse(keyString);
				csvText += csvMaker.getCsvString(value);
			}
		}

		byte[] byteText = csvText.getBytes();
		FileTransfer ft = new FileTransfer(filename, "csv/text", byteText);
		return ft;
	}
	
}
