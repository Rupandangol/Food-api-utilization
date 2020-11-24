def validateRequestParams(request, validation):
    validState = True
    result = []
    for key, value in validation.items():
        if (value == 'required'):
            reqVal = request.GET.get(key, False)
            if (reqVal):
                result.append({key: {"value": reqVal}})
            else:
                validState = False
                result.append({key: {"message": key + " is required"}})

    return {"state": validState, "result": result}
