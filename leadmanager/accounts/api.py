from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializer import UserSerializer, RegisterSerializer, LoginSerializer
from knox.views import LoginView as KnoxLoginView


# Register Api
class RegisterApi(generics.GenericAPIView):
     serializer_class = RegisterSerializer

     def post(self,request,*args,**kwargs):
         serializer = self.get_serializer(data=request.data)
         serializer.is_valid(raise_exception=True)
         user = serializer.save()
         _, token = AuthToken.objects.create(user)
         return Response({
             "user": UserSerializer(user,context=self.get_serializer_context()).data,
             "token": token
         })

# Login Api
class LoginApi(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        user = serializer.validate(request.data)
        _, token = AuthToken.objects.create(user)
        print(token)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

# User Api
class UserApi(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user