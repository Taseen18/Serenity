from django.db import models
from django.contrib.auth.models import User

class Appointment(models.Model):
    employee = models.ForeignKey(User, related_name='employee', on_delete=models.CASCADE, to_field='username')
    mhp = models.ForeignKey(User, related_name='mhp', on_delete=models.CASCADE, to_field='username')
    date_time = models.DateTimeField()
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appointment for {self.employee.first_name} with Dr {self.mhp.first_name} {self.mhp.last_name} on {self.date_time}"
