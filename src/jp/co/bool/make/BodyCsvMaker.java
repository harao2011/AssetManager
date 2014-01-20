package jp.co.bool.make;

import java.util.Arrays;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

public class BodyCsvMaker extends AbsJsonCsvMaker {

	private static final List<String> csvOrder = Arrays.asList("date","target","result");

	@Override
	public String getCsvString(String value) {
		String resultString = "";
		JSONArray jsonArray = new JSONArray(value);
		for(int i = 0; i < jsonArray.length(); i++) {
			JSONObject jsonObject = (JSONObject) jsonArray.get(i);
			boolean isFirst = true;
//			for (Iterator<?> itr = jsonObject.keys(); itr.hasNext();) {
//				if (!isFirst) {
//					resultString += ",";
//				} else {
//					isFirst = false;
//				}
//				resultString +=  jsonObject.get(itr.next().toString());
//			}
			
			for (int j = 0; j < csvOrder.size(); j++) {
				if (!isFirst) {
					resultString += ",";
				} else {
					isFirst = false;
				}
				resultString +=  jsonObject.get(csvOrder.get(j));	
			}
			
			resultString += "¥n";
		}
		return resultString;
	}

}
