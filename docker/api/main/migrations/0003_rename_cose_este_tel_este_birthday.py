# Generated by Django 5.1.2 on 2024-11-28 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_este'),
    ]

    operations = [
        migrations.RenameField(
            model_name='este',
            old_name='cose',
            new_name='tel',
        ),
        migrations.AddField(
            model_name='este',
            name='birthday',
            field=models.DateField(default='2000-01-01'),
        ),
    ]