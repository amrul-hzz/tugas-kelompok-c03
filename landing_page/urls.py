from django.urls import path
from landing_page.views import logout_user, register, login_user, logout_user, welcome, main

app_name = 'landing_page'

urlpatterns = [
    path('', welcome, name='welcome'),
    path('register/', register, name='register'),
    path('login/', login_user, name='login_user'),
    path('logout/', logout_user, name='logout_user'),
    path('main/', main, name='main'),
]