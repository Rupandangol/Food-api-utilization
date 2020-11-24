def errorApi(type, data):
    if (type == "not_found"):
        return {
            "state": "error",
            "code": 404,
            "message": "Not found",
            "data": data
        }
    if (type == "validation"):
        return {
            "state": "error",
            "code": 422,
            "message": "validation failed",
            "data": data
        }
    return {"state": "error", "code": 400, "message": "Error", "data": data}


def successApi(type, data):
    if (type == "success"):
        return {
            "state": "success",
            "code": 200,
            "message": "Success",
            "data": data
        }
    return {
        "state": "success",
        "code": 200,
        "message": "success",
        "data": data
    }
