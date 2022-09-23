package ohgwang.demori.api.response;

import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.common.model.response.BaseResponseBody;

@Getter
@Setter
public class BaseRes extends BaseResponseBody {
    Object response;

    public static BaseRes of(Integer statusCode, String message, Object object) {
        BaseRes res = new BaseRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setResponse(object);
        return res;
    }
}
