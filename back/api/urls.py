from django.urls import path

from .views import WordDefinitionListApiView


urlpatterns = [
    path('/word_definition', WordDefinitionListApiView.as_view()),
]
