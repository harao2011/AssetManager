package jp.co.bool;



import org.directwebremoting.io.FileTransfer;
import org.json.JSONArray;
import org.json.JSONObject;


public class JobExecuter {

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
		byte[] byteText = params.getBytes();
		String filename = fileName;
		JSONArray jsonArray = new JSONArray(params);
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject jsonObject = (JSONObject) jsonArray.get(i);
			int test = 0;
			
		}
		FileTransfer ft = new FileTransfer(filename, "csv/text", byteText);
		return ft;
	}
	

}
