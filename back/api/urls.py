from django.urls import path

from .views import WordDefinitionListApiView


urlpatterns = [
    path('word_definition', WordDefinitionListApiView.as_view()),
    path('word_definition/<int:word_definition_id>/', WordDefinitionListApiView.as_view()),
]
