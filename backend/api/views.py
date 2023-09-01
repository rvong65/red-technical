from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from transformers import pipeline

#Send output to frontend
class generateOutputView(APIView): 
    def post(self, request, format="json"):
        try: 
            user_input = "".join(map(str, dict(request.data)['user_input']))
            pipe = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")
            response = pipe(user_input)
            label = response[0]['label'].capitalize()
            accuracy = response[0]['score']
            rounded_accuracy = round(accuracy, 5) * 100
            return Response({"label": label, "accuracy": str(rounded_accuracy)[0:5], "userInput": user_input})
        
        except:
            return Response("Failed")

#Create a new user
class signUpView(APIView):
    def post(self, request, format="json"):
        request_data = dict(request.data)
        get_username = request_data["username"]
        username = ' '.join(map(str, get_username))
        get_password = request_data["password"]
        password = ' '.join(map(str, get_password))
        try:
            user = User.objects.create_user(username, password=password)
            if user is not None:
                return Response("Success")
            else:
                return Response("Failed")
        except IntegrityError:
            return Response("Duplicates")

#Check user authentication
class loginView(APIView):
    def post(self, request, format="json"):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            return Response("Success")
        else:
            return Response("Failed")