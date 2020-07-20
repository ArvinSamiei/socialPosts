from django.contrib import admin
from .models import Post, Account

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    pass

admin.site.register(Account)
