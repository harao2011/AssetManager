package jp.co.bool.make;

public class JsonCsvMakerFactory {
	
	private static final String KEY_ID = "id";
	private static final String KEY_HEADER = "header";
	private static final String KEY_BODY = "body";
	
	public static AbsJsonCsvMaker getInstanse(String keyString) {
		//TODO: singleton
		if (KEY_ID.equalsIgnoreCase(keyString)) {
			return new IdJsonCsvMaker();
		} else if (KEY_HEADER.equalsIgnoreCase(keyString)) {
			return new HeaderCsvMaker();
		} else if (KEY_BODY.equalsIgnoreCase(keyString)) {
			return new BodyCsvMaker();
		}
		throw new RuntimeException("Illegal KeyString Exception: " + keyString);
	}

}
