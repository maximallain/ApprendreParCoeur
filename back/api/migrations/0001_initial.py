# Generated by Django 4.1.3 on 2022-11-10 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WordDefinition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=80)),
                ('definition', models.TextField()),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
