package jp.co.bool;

import org.directwebremoting.io.FileTransfer;

public class JobExecuter {

	public String getString() {
		return "test";
	}

	public FileTransfer getDownloadFile(String fileName, String csvText) {
		byte[] byteText = csvText.getBytes();
		String filename = fileName;
		FileTransfer ft = new FileTransfer(filename, "csv/text", byteText);
		return ft;
	}

}
