package jp.co.bool.make;

public class IdJsonCsvMaker extends AbsJsonCsvMaker {

	@Override
	public String getCsvString(String value) {
		return value + "¥n";
	}

}
