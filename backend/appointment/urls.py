from django.urls import path
from .views import MakeAppointment, FetchUsers, FetchAppointments

urlpatterns = [
    path('makeAppointment/', MakeAppointment.as_view(), name='make-appointment'),
    path('getMhps/', FetchUsers.as_view(), name="fetch-users"),
    path('getAppointments/', FetchAppointments.as_view(), name="fetch-appointments"),
]