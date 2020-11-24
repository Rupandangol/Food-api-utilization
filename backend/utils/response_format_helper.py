import json
from django.http import JsonResponse, HttpResponseNotFound, HttpResponseBadRequest


def errorApi(type, data):
    if (type == "not_found"):
        return HttpResponseNotFound('Not found')

    if (type == "validation"):
        return HttpResponseBadRequest(
            json.dumps({
                "state": "error",
                "code": 422,
                "message": "validation failed",
                "data": data
            }))
    return HttpResponseNotFound('Not found')


def successApi(type, data):
    if (type == "success"):
        return JsonResponse({
            "state": "success",
            "code": 200,
            "message": "Success",
            "data": data
        })
    return JsonResponse({
        "state": "success",
        "code": 200,
        "message": "success",
        "data": data
    })
