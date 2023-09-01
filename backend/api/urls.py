from django.urls import path 
from.views import *

urlpatterns = [
    path('submit/', generateOutputView.as_view()), 
    path('signUp/', signUpView.as_view()), 
    path('signIn/', loginView.as_view())
]