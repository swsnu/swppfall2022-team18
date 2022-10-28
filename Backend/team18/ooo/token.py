import jwt
import datetime
from decouple import config

def generate_token(payload, type):
    if type == "access":
        # 1시간
        exp = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    elif type == "refresh":
        # 12시간
        exp = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    else:
        raise Exception("Invalid tokenType")
    
    payload['exp'] = exp
    payload['iat'] = datetime.datetime.utcnow()
    encoded = jwt.encode(payload, config("JWT_SECRET_KEY"), algorithm=config("JWT_ALGORITHM"))

    return encoded