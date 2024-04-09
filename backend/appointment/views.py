from django.http import JsonResponse
import json
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import AppointmentSerializer
from django.shortcuts import get_object_or_404, render
from .db_service import check_user_type, get_mhps
from django.contrib.auth.models import User
from .models import Appointment
from chat.models import Chat, Message
import random
from dateutil.parser import parse as parse_date

class MakeAppointment(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_type = check_user_type(request.user.username)
        if user_type == "employee":
            employee = User.objects.get(username=request.user.username)

            if request.data.get('mhpId') == 'any':
                print("Assigning random MHP")
                response = get_mhps()
                mhp_num = random.randrange(0, len(response.data))
                mhp_key = response.data[mhp_num]
                mhp_id = mhp_key["mhp_id"]
            else:
                mhp_id = request.data.get('mhpId')

            print("mhp", mhp_id)
            mhp = User.objects.get(username=mhp_id)

            reason = request.data.get('reason')
            date_time = request.data.get('date_time')

            parsed_date_time = parse_date(date_time)
            formatted_date_time = parsed_date_time.strftime('%d/%m/%Y %H:%M')

            appointment = Appointment.objects.create(
                date_time = parsed_date_time,
                reason = reason,
                employee = employee,
                mhp = mhp
            )

            chat, created = Chat.objects.get_or_create(
                employee = employee,
                mhp = mhp
            )

            message_content = f"An appointment has been scheduled for {formatted_date_time}."
            message = Message.objects.create(
                chat = chat,
                sender = mhp,
                receiver = employee,
                content = message_content
            )

            if created:
                print("New chat created for the appointment")

            print("Appointment made successfully")
            return Response({'success': 'Appointment made successfully.'})
        else:
            return Response({'error', 'User is MHP'}, status=403)
        
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
        else:
            return Response({'error', 'User is MHP'}, status=403)
        
class FetchAppointments(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_type = check_user_type(request.user.username)
        user = User.objects.get(username=request.user.username)
        
        appointments_dict = Appointment.objects.filter(employee=user) | Appointment.objects.filter(mhp=user)
        
        serialiser = AppointmentSerializer(appointments_dict, many=True)
        print("")
        
        appointments = []

        for appointment in serialiser.data:
            if user_type == "employee":
                mhp = User.objects.get(username=appointment['mhp'])
                appointments.append({
                    'id': appointment['id'],
                    'employee': appointment['employee'],
                    'mhp': appointment['mhp'],
                    'date_time': appointment['date_time'],
                    'reason': appointment['reason'],
                    'created_at': appointment['created_at'],
                    'with': {'id': mhp.username, 'name': mhp.first_name + " " + mhp.last_name}
                })
            elif user_type == "mhp":
                employee = User.objects.get(username=appointment['employee'])
                appointments.append({
                    'id': appointment['id'],
                    'employee': appointment['employee'],
                    'mhp': appointment['mhp'],
                    'date_time': appointment['date_time'],
                    'reason': appointment['reason'],
                    'created_at': appointment['created_at'],
                    'with': {'id': employee.username, 'name': employee.first_name + " " + employee.last_name}
                })

        return JsonResponse({'appointments': appointments}, safe=False)






        

