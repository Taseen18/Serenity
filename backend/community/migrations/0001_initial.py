# Generated by Django 5.0.3 on 2024-04-04 22:04

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_id', models.CharField(max_length=255, unique=True)),
                ('post_title', models.TextField()),
                ('post_content', models.TextField()),
                ('likes', models.IntegerField(default=0)),
                ('posted_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postList', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]