from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ['id','username','email']

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','password']
        extra_kwargs = {'password': {'write_only':True}}

    def create(self,validated_data):
        user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
        return user

# Login Serializer
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password']

    def validate(self, data):
        print(data)
        print(data['username'])
        user = authenticate(username=data['username'],password=data['password'])
        print(user)
        if user:
            return user
        raise serializers.ValidationError('Incorrect Credentials')