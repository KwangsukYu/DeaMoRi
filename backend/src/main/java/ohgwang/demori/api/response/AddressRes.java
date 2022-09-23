package ohgwang.demori.api.response;


import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.common.model.response.BaseResponseBody;

@Getter
@Setter
public class AddressRes extends BaseResponseBody {
	String address;
	
	public static AddressRes of(Integer statusCode, String message, String address) {
		AddressRes res = new AddressRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAddress(address);
		return res;
	}
}
