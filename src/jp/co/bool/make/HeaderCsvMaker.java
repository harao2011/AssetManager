package jp.co.bool.make;

import org.json.JSONArray;

public class HeaderCsvMaker extends AbsJsonCsvMaker {

	@Override
	public String getCsvString(String value) {
		String resultString = "";
		JSONArray jsonArray = new JSONArray(value);
		for (int i = 0; i < jsonArray.length(); i++) {
			if (resultString != "") {
				resultString += ",";
			}
			resultString += jsonArray.get(i).toString();
		}
		resultString += "¥n";
		return resultString;
	}
	
}
