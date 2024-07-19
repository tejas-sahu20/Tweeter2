from rest_framework import generics, permissions, serializers
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from .models import Tweet, Comment
from .serializers import UserSerializer, TweetSerializer, CommentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import uuid
import os

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.utils.text import slugify
from .models import Tweet
from .serializers import TweetSerializer
import uuid
import os

class TweetCreateView(generics.CreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Get the uploaded image file
        image_file = self.request.FILES.get('image')

        if image_file:
            # Modify the image name
            extension = os.path.splitext(image_file.name)[1]  # Get the file extension
            new_name = f"{uuid.uuid4()}{extension}"  # Create a new unique name
            image_file.name = new_name

        serializer.save(author=self.request.user, image=image_file)


class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        tweet_id = self.request.data.get('tweet_id')
        if not tweet_id:
            raise serializers.ValidationError("Tweet ID is required.")
        try:
            tweet = Tweet.objects.get(id=tweet_id)
        except Tweet.DoesNotExist:
            raise serializers.ValidationError("Tweet not found.")
        serializer.save(author=self.request.user, tweet=tweet)


class UserFeedView(generics.ListAPIView):
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tweet.objects.filter(author=user)


class TweetFeedView(generics.ListAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Tweet.objects.all()



class GetTweetView(generics.RetrieveAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        tweet_id = self.kwargs.get('pk')
        return generics.get_object_or_404(Tweet, id=tweet_id)


class TweetUpdateView(generics.UpdateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        tweet = self.get_object()
        if tweet.author != self.request.user:
            raise PermissionDenied("You do not have permission to edit this tweet.")
        serializer.save()


class CommentUpdateView(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        comment = self.get_object()
        if comment.author != self.request.user:
            raise PermissionDenied("You do not have permission to edit this comment.")
        serializer.save()


class CommentDeleteView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionDenied("You do not have permission to delete this comment.")
        instance.delete()


class DeleteTweetView(generics.DestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        # if instance.author != self.request.user:
        #     raise PermissionDenied("You do not have permission to delete this tweet.")
        instance.delete()

class ShowDeleteButton(APIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer

    def get(self, request):
        try:
            tweet_id = request.query_params.get('id')
            if tweet_id is None:
                return Response({"error": "No tweet ID provided"}, status=status.HTTP_400_BAD_REQUEST)

            tweet = Tweet.objects.get(id=tweet_id)
            print(tweet.author.id,request.user.id,tweet_id,tweet.id)
            if tweet.author.id == request.user.id:
                return Response({"show": 1}, status=status.HTTP_200_OK)
            else:
                return Response({"show": 0}, status=status.HTTP_200_OK)
        except Tweet.DoesNotExist:
            return Response({"error": "Tweet not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class GetUser(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({'username': request.user.username})

