from django.http import JsonResponse
import json
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404, render
from .db_service import check_user_type, get_mhps
from django.contrib.auth.models import User
from .models import Appointment
import random

class MakeAppointment(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_type = check_user_type(request.user.username)
        if user_type == "employee":
            employee = User.objects.get(username=request.user.username)

            if not request.data.get('mhp'):
                response = get_mhps()
                mhp_num = random.randrange(0, len(response.data))
                mhp_key = response.data[mhp_num]
                mhp_id = mhp_key["mhp_id"]
            
            mhp_id = request.data.get('mhpId')
            mhp = User.objects.get(username=mhp_id)

            reason = request.data.get('reason')
            date_time = request.data.get('date_time')

            appointment = Appointment.objects.create(
                date_time = date_time,
                reason = reason,
                employee = employee,
                mhp = mhp
            )

            print("Appointment made successfully")
            return Response({'success': 'Appointment made successfully.'})
        
class FetchUsers(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_type = check_user_type(request.user.username)
        if user_type == "employee":
            employee = User.objects.get(username=request.user.username)
            
            mhps = []
            response = get_mhps()
            for mhp in response.data:
                mhp_user = User.objects.get(username=mhp['mhp_id'])
                name = mhp_user.first_name + " " + mhp_user.last_name
                mhps.append({
                    'mhp_id': mhp['mhp_id'],
                    'name': name
                })
            
            print(mhps)
            return JsonResponse({'mhps': mhps}, safe=False)




        

